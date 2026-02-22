import React, { useContext, useState } from 'react';
import { 
  View, Text, StyleSheet, Pressable, Image, ImageBackground, StatusBar, ScrollView, ActivityIndicator, Alert 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { GoalsContext } from '../../context/triridecontext';
import { auth, db } from '../../firebaseConfig'; // Siguradoa naa ni sa config
import { signOut } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

export default function StudentProfile() {
  const { userData, role } = useContext(GoalsContext);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    // Mangayo og permiso sa user
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    setUploading(true);
    try {
      // NOTE: Dinhi nimo i-setup ang Firebase Storage upload logic
      // Sa pagkakaron, i-update lang nato ang Firestore link
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        profileImage: uri // I-save ang URI sa Firestore
      });
      
      Alert.alert("Success", "Profile picture updated!");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <ScrollView style={styles.container} bounces={false}>
      <StatusBar barStyle="light-content" />
      
      <ImageBackground source={require('../../assets/images/back.png')} style={styles.headerBackground} resizeMode="stretch">
        <View style={styles.profileInfo}>
          <Pressable onPress={pickImage} style={styles.avatarWrapper}>
            <Image 
              source={{ uri: userData?.profileImage || 'https://via.placeholder.com/150' }} 
              style={styles.avatar} 
            />
            <View style={styles.cameraIcon}>
              {uploading ? <ActivityIndicator color="white" size="small" /> : <MaterialCommunityIcons name="camera" size={20} color="white" />}
            </View>
          </Pressable>
          <Text style={styles.name}>{userData?.firstName} {userData?.lastName}</Text>
          <View style={styles.roleBadge}><Text style={styles.roleText}>{role?.toUpperCase()}</Text></View>
        </View>
      </ImageBackground>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        
        {/* Statistics Row (Nindot ni dugang feature) */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Rides</Text>
          </View>
          <View style={[styles.statBox, { borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#eee' }]}>
            <Text style={styles.statNumber}>5.0</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>₱120</Text>
            <Text style={styles.statLabel}>Wallet</Text>
          </View>
        </View>

        <Pressable style={styles.logoutBtn} onPress={() => signOut(auth)}>
          <MaterialCommunityIcons name="logout" size={22} color="white" style={{ marginRight: 10 }} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#B3E5FC' },
  headerBackground: { height: 280, justifyContent: 'center', alignItems: 'center', paddingTop: 40 },
  avatarWrapper: { position: 'relative' },
  avatar: { width: 110, height: 110, borderRadius: 55, borderWidth: 4, borderColor: 'white' },
  cameraIcon: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#0084c2', padding: 8, borderRadius: 20, borderWidth: 2, borderColor: 'white' },
  name: { fontSize: 22, fontWeight: 'bold', color: 'white', marginTop: 12 },
  roleBadge: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 15, paddingVertical: 4, borderRadius: 20, marginTop: 5 },
  roleText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  content: { flex: 1, paddingHorizontal: 20, marginTop: -20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#005b8e', marginBottom: 15 },
  statsRow: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 15, padding: 15, marginBottom: 20, elevation: 2 },
  statBox: { flex: 1, alignItems: 'center' },
  statNumber: { fontSize: 18, fontWeight: 'bold', color: '#0084c2' },
  statLabel: { fontSize: 12, color: '#777' },
  logoutBtn: { backgroundColor: '#d9534f', flexDirection: 'row', padding: 16, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  logoutText: { color: 'white', fontWeight: 'bold' }
});
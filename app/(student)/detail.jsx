import React, { useContext, useState } from 'react';
import { 
  View, Text, StyleSheet, TextInput, StatusBar, Image, ImageBackground, Pressable 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GoalsContext } from '../../context/triridecontext';
import { useRouter } from 'expo-router';

export default function RideDetails() {
  const { userData, role } = useContext(GoalsContext);
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ImageBackground 
        source={require('../../assets/images/back.png')} 
        style={[styles.blueHeader, { height: showSearch ? 230 : 180 }]} 
        resizeMode="stretch"
      >
        <View style={styles.userInfoRow}>
          <Image source={{ uri: userData?.profileImage || 'https://via.placeholder.com/150' }} style={styles.avatar} />
          <View style={styles.userNameContainer}>
            <Text style={styles.userName}>{userData?.firstName || "Student"}</Text>
            <Text style={styles.userRole}>{role?.toUpperCase() || "STUDENT"}</Text>
          </View>

          <View style={styles.headerActionRow}>
            <Pressable onPress={() => setShowSearch(!showSearch)} style={styles.headerIconContainer}>
              <MaterialCommunityIcons name="magnify" size={26} color="#0084c2" />
            </Pressable>
            <View style={[styles.headerIconContainer, { marginLeft: 10 }]}>
               <MaterialCommunityIcons name="moped" size={26} color="#0084c2" />
            </View>
          </View>
        </View>

        {showSearch && (
          <View style={styles.searchBar}>
            <MaterialCommunityIcons name="magnify" size={24} color="#666" />
            <TextInput placeholder="Search location" style={styles.searchInput} placeholderTextColor="#666" />
          </View>
        )}

        <View style={styles.tabContainer}>
          <View style={styles.activeTab}>
            <Text style={styles.activeTabText}>Ride Details</Text>
          </View>

          {/* BALIK NA ANG MESSAGE BUTTON DINHI */}
          <Pressable style={styles.messageBtn} onPress={() => router.push('/messages')}>
            <MaterialCommunityIcons name="email-outline" size={20} color="white" />
            <Text style={styles.messageText}>Message</Text>
          </Pressable>
        </View>
      </ImageBackground>

      <View style={styles.content}>
        <View style={styles.placeholderCard}>
             <MaterialCommunityIcons name="clock-outline" size={40} color="#0084c2" />
             <Text style={styles.placeholderText}>History and active rides will appear here.</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#B3E5FC' },
  blueHeader: { paddingTop: 50, paddingHorizontal: 20, justifyContent: 'space-between' },
  userInfoRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: 'white' },
  userNameContainer: { flex: 1, marginLeft: 12 },
  userName: { color: 'white', fontSize: 17, fontWeight: 'bold' },
  userRole: { color: 'white', fontSize: 12, opacity: 0.9 },
  headerActionRow: { flexDirection: 'row' },
  headerIconContainer: { backgroundColor: '#E1F1FF', padding: 8, borderRadius: 20 },
  searchBar: { backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, borderRadius: 25, height: 40, marginTop: 10 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 14 },
  tabContainer: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  activeTab: { backgroundColor: '#B3E5FC', paddingHorizontal: 20, paddingVertical: 10, borderTopLeftRadius: 15, borderTopRightRadius: 15 },
  activeTabText: { fontWeight: 'bold', color: '#0077B6', fontSize: 15 },
  messageBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0077B6', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, marginBottom: 8 },
  messageText: { color: 'white', fontWeight: 'bold', marginLeft: 8 },
  content: { flex: 1, padding: 20, justifyContent: 'center' },
  placeholderCard: { backgroundColor: 'rgba(255,255,255,0.4)', padding: 30, borderRadius: 20, alignItems: 'center' },
  placeholderText: { marginTop: 10, color: '#005b8e', textAlign: 'center' }
});
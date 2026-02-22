import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Alert } from 'react-native';
import { auth, db } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RegisterDriver() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', 
    confirmPassword: '', mobile: '', plateNumber: '', route: '', idNumber: ''
  });
  const router = useRouter();

// Logic update for handleRegister in register-driver.jsx
const handleRegister = async () => {
  if (!form.firstName || !form.lastName || !form.mobile || !form.plateNumber) {
    Alert.alert("Missing Info", "Please fill in all required fields marked with *");
    return;
  }

try {
    const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
    
    await setDoc(doc(db, "users", userCredential.user.uid), {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      mobile: form.mobile,
      plateNumber: form.plateNumber, // Drivers have this extra field
      role: 'driver',
      createdAt: new Date()
    });

    // CHANGE THIS PART:
    Alert.alert("Success", "Driver account created! Please log in.");
    router.replace('/(auth)/login');
  } catch (error) {
    Alert.alert("Error", error.message);
  }
};

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.header}>
        <Text style={styles.logoText}>TriRide</Text>
        <Text style={styles.title}>Register</Text>
      </View>

      <View style={styles.formCard}>
        <TextInput placeholder="First name" style={styles.input} onChangeText={(t) => setForm({...form, firstName: t})} />
        <TextInput placeholder="Last name" style={styles.input} onChangeText={(t) => setForm({...form, lastName: t})} />
        <TextInput placeholder="Email" style={styles.input} autoCapitalize="none" onChangeText={(t) => setForm({...form, email: t})} />
        <TextInput placeholder="Password" style={styles.input} secureTextEntry onChangeText={(t) => setForm({...form, password: t})} />
        <TextInput placeholder="Confirm Password" style={styles.input} secureTextEntry onChangeText={(t) => setForm({...form, confirmPassword: t})} />
        
        <View style={styles.row}>
          <TextInput placeholder="Mobile number" style={[styles.input, { flex: 1, marginRight: 5 }]} onChangeText={(t) => setForm({...form, mobile: t})} />
          <TextInput placeholder="Plate number" style={[styles.input, { flex: 1, marginLeft: 5 }]} onChangeText={(t) => setForm({...form, plateNumber: t})} />
        </View>

        <View style={styles.dropdown}>
          <Text style={{ color: '#666' }}>Select your route</Text>
          <MaterialCommunityIcons name="chevron-down" size={24} color="#666" />
        </View>

        <Text style={styles.verifyText}>To verify if you're a driver, upload your driver's license id</Text>
        
        <Pressable style={styles.uploadBox}>
          <MaterialCommunityIcons name="image-plus" size={32} color="#0077b6" />
          <Text style={styles.uploadText}>Upload your id here</Text>
        </Pressable>

        <TextInput placeholder="Your id number" style={styles.input} onChangeText={(t) => setForm({...form, idNumber: t})} />

        <Pressable style={styles.registerBtn} onPress={handleRegister}>
          <Text style={styles.btnText}>Register</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#bde0fe' 
},

  header: { 
    alignItems: 'center', 
    marginTop: 40 
},

  logoText: { 
    fontSize: 32, 
    fontWeight: 'bold',
     color: '#0077b6' 
    },

  title: { fontSize: 28, fontWeight: 'bold', color: '#003566', marginBottom: 10 },

  formCard: { backgroundColor: '#d0e8f2', margin: 20, borderRadius: 20, padding: 20, elevation: 5 },

  input: { backgroundColor: 'white', padding: 12, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#ccc' },

  row: { flexDirection: 'row' },

  dropdown: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white', padding: 12, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#ccc' },
  verifyText: { fontSize: 12, textAlign: 'center', marginBottom: 10 },
  uploadBox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e1f1f7', padding: 15, borderRadius: 8, borderStyle: 'dashed', borderWidth: 1, marginBottom: 10 },
  uploadText: { marginLeft: 10, color: '#666' },
  registerBtn: { backgroundColor: '#0084c2', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 18 }
});
import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Alert } from 'react-native';
import { auth, db } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RegisterStudent() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '', // Required for confirmation code logic later
    password: '',
    confirmPassword: '',
    idNumber: '' // Optional for now
  });
  const router = useRouter();

  const handleRegister = async () => {
    // 1. Logic: Basic Validation
    if (!form.firstName || !form.lastName || !form.email || !form.mobile || !form.password) {
      Alert.alert("Required Fields", "First Name, Last Name, Email, and Mobile Number are required.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
    
    await setDoc(doc(db, "users", userCredential.user.uid), {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      mobile: form.mobile,
      role: 'student',
      createdAt: new Date()
    });

      //go back to log in 
      Alert.alert("Success", "Account created! Please log in.");
          router.replace('/(auth)/login'); 
        } catch (error) {
          Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logoText}>TriRide</Text>
        <Text style={styles.title}>Student Register</Text>
      </View>

      <View style={styles.formCard}>
        <TextInput placeholder="First Name *" style={styles.input} onChangeText={(t) => setForm({...form, firstName: t})} />
        <TextInput placeholder="Last Name *" style={styles.input} onChangeText={(t) => setForm({...form, lastName: t})} />
        <TextInput placeholder="Email *" style={styles.input} autoCapitalize="none" onChangeText={(t) => setForm({...form, email: t})} />
        <TextInput placeholder="Mobile Number *" style={styles.input} keyboardType="phone-pad" onChangeText={(t) => setForm({...form, mobile: t})} />
        <TextInput placeholder="Password *" style={styles.input} secureTextEntry onChangeText={(t) => setForm({...form, password: t})} />
        <TextInput placeholder="Confirm Password *" style={styles.input} secureTextEntry onChangeText={(t) => setForm({...form, confirmPassword: t})} />
        
        <Text style={styles.verifyText}>ID Upload (Optional for now)</Text>
        <Pressable style={styles.uploadBox}>
          <MaterialCommunityIcons name="image-plus" size={32} color="#0077b6" />
          <Text style={styles.uploadText}>Upload ID</Text>
        </Pressable>
        <TextInput placeholder="Student ID Number" style={styles.input} onChangeText={(t) => setForm({...form, idNumber: t})} />

        <Pressable style={styles.registerBtn} onPress={handleRegister}>
          <Text style={styles.btnText}>Register</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

// ... styles remain the same

// Reuse styles from RegisterDriver
// At the bottom of register-student.jsx
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#bde0fe' 
  },
  header: { 
    alignItems: 'center', 
    marginTop: 60 
  },
  logoText: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#0077b6' 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#003566', 
    marginBottom: 20 
  },
  formCard: { 
    backgroundColor: '#d0e8f2', 
    margin: 20, 
    borderRadius: 20, 
    padding: 30, 
    elevation: 5 
  },
  input: { 
    backgroundColor: 'white', 
    padding: 15, 
    borderRadius: 8, 
    marginBottom: 15, 
    borderWidth: 1, 
    borderColor: '#ccc' 
  },
  verifyText: { 
    fontSize: 12, 
    textAlign: 'center', 
    marginBottom: 15 
  },
  uploadBox: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#e1f1f7', 
    padding: 20, 
    borderRadius: 8, 
    borderStyle: 'dashed', 
    borderWidth: 1, 
    marginBottom: 15 
  },
  uploadText: { 
    marginLeft: 10, 
    color: '#666' 
  },
  registerBtn: { 
    backgroundColor: '#0084c2', 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 10 
  },
  btnText: { 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 18 
  }
});
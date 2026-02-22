import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, Image } from 'react-native';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // For the icons

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/');
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Section with Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>TriRide</Text>
        <Text style={styles.subLogoText}>Order your tricycle, enjoy and ride safe</Text>
      </View>

      {/* Bottom Blue Card Section */}
      <View style={styles.card}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.instructionText}>Log in your account to continue</Text>

        {/* Email Input Group */}
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="at" size={24} color="white" style={styles.icon} />
          <TextInput 
            placeholder="Email or username:" 
            placeholderTextColor="#a0d8ef"
            style={styles.input} 
            onChangeText={setEmail} 
            value={email} 
            autoCapitalize="none" 
          />
        </View>

        {/* Password Input Group */}
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="lock-outline" size={24} color="white" style={styles.icon} />
          <TextInput 
            placeholder="Password:" 
            placeholderTextColor="#a0d8ef"
            style={styles.input} 
            onChangeText={setPassword} 
            value={password} 
            secureTextEntry 
          />
          <MaterialCommunityIcons name="eye-outline" size={20} color="white" style={styles.eyeIcon} />
        </View>

        {/* Sign In Button */}
        <Pressable style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.signInButtonText}>Sign in</Text>
        </Pressable>

        {/* Footer Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Pressable onPress={() => router.push('/register')}>
            <Text style={styles.registerLink}>Register</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bde0fe', // Light blue background
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#0077b6',
  },
  subLogoText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
    textAlign: 'center',
  },
  card: {
    flex: 1.5,
    backgroundColor: '#0084c2', // Darker blue card
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 30,
    paddingTop: 40,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#003566',
    marginBottom: 5,
  },
  instructionText: {
    fontSize: 16,
    color: '#003566',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0096d6', // Slightly lighter than card
    borderRadius: 15,
    marginBottom: 20,
    paddingHorizontal: 15,
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: '#00a8e8',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  signInButton: {
    backgroundColor: '#8ecae6', // Lightest blue for button
    width: '100%',
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  signInButtonText: {
    color: '#003566',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  footerText: {
    color: '#8ecae6',
    fontSize: 16,
  },
  registerLink: {
    color: '#003566',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
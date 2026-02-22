import { View, Text, Pressable, StyleSheet } from 'react-native'; // Added StyleSheet
import { useRouter } from 'expo-router';

export default function RegisterSelection() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Register as:</Text>
        
        <Pressable style={styles.button} onPress={() => router.push('/register-driver')}>
          <Text style={styles.buttonText}>Driver</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => router.push('/register-student')}>
          <Text style={styles.buttonText}>Student</Text>
        </Pressable>

        <Pressable onPress={() => router.back()}>
          <Text style={styles.backText}>Go Back</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bde0fe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#0084c2',
    padding: 40,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#8ecae6',
    padding: 15,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#003566',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backText: {
    color: 'white',
    marginTop: 10,
    textDecorationLine: 'underline',
  }
});
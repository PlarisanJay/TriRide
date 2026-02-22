// Change this in app/index.jsx
import { Redirect } from 'expo-router';

export default function Index() {
  // Point this to login, NOT student
  return <Redirect href="/(auth)/login" />;
}
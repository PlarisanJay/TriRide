import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useContext } from "react";
import { GoalsProvider, GoalsContext } from "../context/triridecontext";

function RootLayoutNav() {
  const { user, loading, role } = useContext(GoalsContext);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Wait for Firebase

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (user && role) {
      if (role === 'student' && segments[0] !== "(student)") {
        router.replace("/(student)");
      } else if (role === 'driver' && segments[0] !== "(driver)") {
        router.replace("/(driver)");
      }
    }
  }, [user, loading, role, segments]);

  // ADD THIS: If loading, show a blank screen or a loading spinner
  if (loading) return null; 

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(student)" />
      <Stack.Screen name="(driver)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GoalsProvider>
      <RootLayoutNav />
    </GoalsProvider>
  );
}
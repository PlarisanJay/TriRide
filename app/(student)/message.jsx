import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, StatusBar, ImageBackground } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GoalsContext } from '../../context/triridecontext';

export default function MessagesScreen() {
  const { userData, role } = useContext(GoalsContext);

  const MOCK_CHATS = [
    { id: '1', name: 'Driver Juan', msg: 'I am arriving at the Main Gate.', time: '2m ago' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground source={require('../../assets/images/back.png')} style={styles.header} resizeMode="stretch">
        <View style={styles.userInfo}>
          <Image source={{ uri: userData?.profileImage || 'https://via.placeholder.com/150' }} style={styles.avatar} />
          <View>
            <Text style={styles.userName}>{userData?.firstName || "Student"}</Text>
            <Text style={styles.userRole}>{role?.toUpperCase() || "STUDENT"}</Text>
          </View>
        </View>
        <View style={styles.tabHeader}><Text style={styles.tabText}>Messages</Text></View>
      </ImageBackground>

      <FlatList
        data={MOCK_CHATS}
        contentContainerStyle={{ padding: 20 }}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.chatCard}>
            <View style={styles.iconCircle}><MaterialCommunityIcons name="account" size={30} color="white" /></View>
            <View style={{ flex: 1, marginLeft: 15 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.driverName}>{item.name}</Text>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
              <Text style={styles.lastMsg}>{item.msg}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#B3E5FC' },
  header: { height: 180, paddingTop: 50, paddingHorizontal: 20, justifyContent: 'space-between' },
  userInfo: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: 'white', marginRight: 15 },
  userName: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  userRole: { color: 'white', fontSize: 12, opacity: 0.8 },
  tabHeader: { backgroundColor: '#B3E5FC', alignSelf: 'flex-start', paddingHorizontal: 20, paddingVertical: 10, borderTopLeftRadius: 15, borderTopRightRadius: 15 },
  tabText: { fontWeight: 'bold', color: '#0077B6' },
  chatCard: { backgroundColor: 'white', padding: 15, borderRadius: 15, flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  iconCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#0084c2', justifyContent: 'center', alignItems: 'center' },
  driverName: { fontWeight: 'bold', fontSize: 16 },
  timeText: { fontSize: 12, color: '#999' },
  lastMsg: { color: '#666', marginTop: 4 }
});
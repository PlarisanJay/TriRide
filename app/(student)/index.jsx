import React, { useState, useContext, useEffect } from 'react';
import { 
  View, Text, StyleSheet, Pressable, TextInput, 
  ScrollView, StatusBar, Image, ImageBackground 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GoalsContext } from '../../context/triridecontext';

// --- PHOTOS DEFINITION ---
const TRICYCLE_IMAGES = {
  red: require('../../assets/images/red.png'),
  yellow: require('../../assets/images/yellow.png'),
  blue: require('../../assets/images/blue.png'),
  green: require('../../assets/images/green.png'),
};

export default function OrderRide() {
  const { userData, role } = useContext(GoalsContext);

  useEffect(() => {
    console.log("Current User Data from Context:", userData);
  }, [userData]);

  const [passengers, setPassengers] = useState(1);
  const [selectedTricycle, setSelectedTricycle] = useState('red');
  const [destination, setDestination] = useState('');
  const [pickup, setPickup] = useState('');
  const [mobile, setMobile] = useState('');

  const displayName = userData?.firstName && userData?.lastName 
    ? `${userData.firstName} ${userData.lastName}` 
    : "Guest User";
    
  const displayRole = role ? role.charAt(0).toUpperCase() + role.slice(1) : "Student";

  const handleOrder = () => {
    if (!destination || !pickup || !mobile) {
      alert("Please fill in all details!");
      return;
    }
    const orderData = {
      customerName: displayName,
      role: displayRole,
      tricycle: selectedTricycle,
      passengers,
      destination,
      pickup,
      mobile: `+63${mobile}`
    };
    console.log("Submitting Order:", orderData);
    alert("Order Successful!");
  };

  // --- TRICYCLE CARD COMPONENT (HORIZONTAL) ---
  const TricycleCard = ({ color, isSelected, onPress }) => (
    <Pressable 
      onPress={onPress}
      style={[
        styles.triCard, 
        { 
          borderColor: isSelected ? '#0084c2' : 'transparent', 
          borderWidth: isSelected ? 2 : 0 
        }
      ]}
    >
      <View style={styles.triImageWrapper}>
         <Image 
            source={TRICYCLE_IMAGES[color]} 
            style={styles.triPhoto} 
            resizeMode="contain"
         />
      </View>

      <View style={styles.triInfo}>
        <Text style={styles.triStatusText}>Available</Text>
        <View style={styles.triCountRow}>
          <View style={styles.dot} />
          <Text style={styles.triCountText}>25</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* HEADER WITH MASK IMAGE */}
      <ImageBackground 
        source={require('../../assets/images/back.png')} 
        style={styles.blueHeader}
        resizeMode="stretch"
      >
        <View style={styles.userInfoRow}>
          <Image 
            source={{ uri: userData?.profileImage || 'https://via.placeholder.com/150' }} 
            style={styles.avatar} 
          />
          <View style={styles.userNameContainer}>
            <Text style={styles.userName}>{displayName}</Text>
            <Text style={styles.userRole}>{displayRole}</Text>
          </View>
          <View style={styles.headerIconContainer}>
             <MaterialCommunityIcons name="moped" size={30} color="#0084c2" />
          </View>
        </View>

        <View style={styles.searchBar}>
          <MaterialCommunityIcons name="magnify" size={24} color="#666" />
          <TextInput 
            placeholder="Search your location" 
            style={styles.searchInput} 
            placeholderTextColor="#666" 
          />
        </View>

        <View style={styles.tabContainer}>
          <View style={styles.activeTab}>
            <Text style={styles.activeTabText}>Book your ride</Text>
          </View>
          <View style={styles.onlineStatus}>
            <Text style={styles.onlineText}>Online:</Text>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineCount}>100</Text>
          </View>
        </View>
      </ImageBackground>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Choose your route</Text>
        <View style={styles.triGrid}>
          <TricycleCard color="red" isSelected={selectedTricycle === 'red'} onPress={() => setSelectedTricycle('red')} />
          <TricycleCard color="yellow" isSelected={selectedTricycle === 'yellow'} onPress={() => setSelectedTricycle('yellow')} />
          <TricycleCard color="blue" isSelected={selectedTricycle === 'blue'} onPress={() => setSelectedTricycle('blue')} />
          <TricycleCard color="green" isSelected={selectedTricycle === 'green'} onPress={() => setSelectedTricycle('green')} />
        </View>

        <View style={styles.formCard}>
          <Text style={styles.inputLabel}>Number of passenger</Text>
          <View style={styles.passengerRow}>
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <Pressable key={num} onPress={() => setPassengers(num)} style={[styles.numBtn, passengers === num && styles.numBtnActive]}>
                <Text style={[styles.numText, passengers === num && styles.numTextActive]}>{num}</Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.inputLabel}>Your destination</Text>
          <View style={styles.inputWithIcon}>
            <MaterialCommunityIcons name="map-marker" size={20} color="#999" style={styles.formIcon} />
            <TextInput placeholder="Type your location" style={styles.formInput} value={destination} onChangeText={setDestination} />
            <MaterialCommunityIcons name="chevron-down" size={24} color="#999" />
          </View>

          <Text style={styles.inputLabel}>Pick up location</Text>
          <View style={styles.inputWithIcon}>
            <MaterialCommunityIcons name="map-marker" size={20} color="#999" style={styles.formIcon} />
            <TextInput placeholder="Type your location" style={styles.formInput} value={pickup} onChangeText={setPickup} />
          </View>

          <Text style={styles.inputLabel}>Your mobile number</Text>
          <View style={styles.phoneInputRow}>
            <View style={styles.countryCode}><Text style={styles.countryCodeText}>+63</Text></View>
            <TextInput style={styles.phoneInput} keyboardType="phone-pad" value={mobile} onChangeText={setMobile} />
          </View>

          <View style={styles.buttonRow}>
            <Pressable style={styles.cancelBtn}><Text style={styles.cancelBtnText}>Book later</Text></Pressable>
            <Pressable style={styles.confirmBtn} onPress={handleOrder}><Text style={styles.confirmBtnText}>Order now</Text></Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#B3E5FC' },
  blueHeader: { 
    paddingTop: 50, 
    paddingHorizontal: 20, 
    height: 240, // Adjusted to fit mask and content
    justifyContent: 'space-between'
  },
  userInfoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  avatar: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: 'white' },
  userNameContainer: { flex: 1, marginLeft: 15 },
  userName: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  userRole: { color: 'white', fontSize: 14, opacity: 0.9 },
  headerIconContainer: { backgroundColor: '#E1F1FF', padding: 10, borderRadius: 30 },
  searchBar: { backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, borderRadius: 25, height: 50, marginBottom: 20 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },
  
  tabContainer: { 
    flexDirection: 'row', 
    alignItems: 'flex-end', 
    justifyContent: 'space-between' 
  },
  activeTab: { 
    backgroundColor: '#B3E5FC', 
    paddingHorizontal: 20, 
    paddingVertical: 10, 
    borderTopLeftRadius: 15, 
    borderTopRightRadius: 15 
  },
  activeTabText: { fontWeight: 'bold', color: '#0077B6', fontSize: 16 },
  onlineStatus: { flexDirection: 'row', alignItems: 'center', paddingBottom: 10 },
  onlineText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  onlineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4CAF50', marginHorizontal: 5 },
  onlineCount: { color: 'white', fontWeight: 'bold', fontSize: 16 },

  content: { flex: 1, padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginVertical: 15 },
  
  triGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    paddingBottom: 10 
  },
  triCard: { 
    backgroundColor: '#E1F1FF', 
    width: '48%',
    height: 65,
    borderRadius: 15, 
    flexDirection: 'row',
    alignItems: 'center', 
    paddingHorizontal: 10, 
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  triImageWrapper: { 
    width: 50,
    height: 45, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 10,
  },
  triPhoto: { width: '90%', height: '90%' },
  triInfo: { marginLeft: 12, justifyContent: 'center' },
  triStatusText: { fontSize: 10, fontWeight: 'bold', color: '#555' },
  triCountRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#4CAF50', marginRight: 5 },
  triCountText: { fontWeight: 'bold', fontSize: 14 },

  formCard: { backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 20, padding: 20, marginBottom: 30 },
  inputLabel: { fontWeight: 'bold', color: '#333', marginBottom: 10 },
  passengerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  numBtn: { width: 35, height: 35, backgroundColor: '#90A4AE', borderRadius: 5, alignItems: 'center', justifyContent: 'center' },
  numBtnActive: { backgroundColor: '#0077B6' },
  numText: { color: 'white', fontWeight: 'bold' },
  inputWithIcon: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#999', borderRadius: 8, paddingHorizontal: 10, height: 45, marginBottom: 15 },
  formInput: { flex: 1, marginLeft: 10 },
  phoneInputRow: { flexDirection: 'row', marginBottom: 20 },
  countryCode: { borderWidth: 1, borderColor: '#999', paddingHorizontal: 10, justifyContent: 'center', borderTopLeftRadius: 8, borderBottomLeftRadius: 8, backgroundColor: '#E0E0E0' },
  phoneInput: { flex: 1, borderWidth: 1, borderColor: '#999', borderLeftWidth: 0, borderTopRightRadius: 8, borderBottomRightRadius: 8, height: 45 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  cancelBtn: { width: '48%', padding: 12, borderWidth: 2, borderColor: '#0077B6', borderRadius: 10, alignItems: 'center' },
  cancelBtnText: { color: '#0077B6', fontWeight: 'bold' },
  confirmBtn: { width: '48%', padding: 12, backgroundColor: '#0077B6', borderRadius: 10, alignItems: 'center' },
  confirmBtnText: { color: 'white', fontWeight: 'bold' },
});
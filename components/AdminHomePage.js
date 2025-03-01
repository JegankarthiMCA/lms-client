import React from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon library
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminHomePage = () => {
  const navigation = useNavigation(); // Initialize navigation

  const navigateToCodeHomepage = () => {
    navigation.navigate('codehome'); // Navigate to Codehomepage screen
  };

  const navigateToUserHomePage = () => {
    navigation.navigate('UserHomePage'); // Navigate to UserHomePage screen
  };

  const AddCourse = () => {
    navigation.navigate('AddCourse'); // Navigate to AddCourse screen
  };

  const handleLogout = async () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => {
            await AsyncStorage.removeItem('userToken');
            // Navigate to home after logout
            Alert.alert("Logout Successful", "You have been logged out.", [
              { 
                text: "OK", 
                onPress: () => navigation.navigate('Home') // Navigate to Home after clicking OK
              }
            ]);
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Admin HomePage</Text>

      {/* Image at the top of the page */}
      <Image 
        source={require('../assets/admin.png')} // Adjust the path based on your file structure
        style={styles.image} 
      />

      {/* Button to navigate to Codehomepage */}
      <TouchableOpacity style={styles.button} onPress={navigateToCodeHomepage}>
        <Text style={styles.buttonText}>User Detail</Text>
      </TouchableOpacity>

      {/* Button to navigate to UserHomePage */}
      <TouchableOpacity style={styles.button} onPress={navigateToUserHomePage}>
        <Text style={styles.buttonText}>User Home Page</Text>
      </TouchableOpacity>

      {/* Add Course Button */}
      <TouchableOpacity style={styles.button} onPress={AddCourse}>
        <Text style={styles.buttonText}>Add Course</Text>
      </TouchableOpacity>

      {/* Logout Button with Icon */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="logout" size={24} color="#fff" style={styles.logoutIcon} />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#c6dff7', // Set your desired background color
    justifyContent: 'flex-start', // Align items at the top of the screen
    alignItems: 'center', // Center the content horizontally
  },
  image: {
    width: 350, // Set width of the image
    height: 250, // Set height of the image
    marginBottom: 30, // Adjust margin to have appropriate space between image and buttons
    borderRadius: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#9c6bff',
    padding: 12,
    borderRadius: 25, // Same border radius for both buttons
    alignItems: 'center',
    width: '80%', // Ensure the buttons have the same width
    height: 50, // Set a consistent height for buttons
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  Title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 20,
    color: '#4A148C', // Set the color for the title text (e.g., dark purple)
  },
  logoutButton: {
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor: '#ff4d4d',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    width: '80%',
    height: 50,
    justifyContent: 'center',
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default AdminHomePage;

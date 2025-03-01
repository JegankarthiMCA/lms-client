import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editedUserData, setEditedUserData] = useState({ name: '', email: '', mobile: '', courseTitle: '' });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.get('https://lms-server-c937.onrender.com/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
      setEditedUserData(response.data); // Initialize the edited data with current user data
    } catch (error) {
      setError('Error fetching user data: ' + error.message);
      console.error('Error fetching user data:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
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

  const handleEditProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.put('https://lms-server-c937.onrender.com/profile', editedUserData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
      setModalVisible(false); // Close the modal after updating
    } catch (error) {
      setError('Error updating user data: ' + error.message);
      console.error('Error updating user data:', error.response?.data || error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Retry" onPress={fetchUserData} color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {userData ? (
        <>
          <Text style={styles.title}>Profile Details</Text>
          <View style={styles.iconContainer}>
            <Icon name="account-circle" size={150} color="#17202a" />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Name: <Text style={styles.infoValue}>{userData.name}</Text>
            </Text>
            <Text style={styles.infoText}>
              Email: <Text style={styles.infoValue}>{userData.email}</Text>
            </Text>
            <Text style={styles.infoText}>
              Mobile: <Text style={styles.infoValue}>{userData.mobile}</Text>
            </Text>
          </View>

          <TouchableOpacity style={styles.editButton} onPress={() => { setModalVisible(true); }}>
            <Icon name="edit" size={24} color="#fff" style={styles.editIcon} />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="logout" size={24} color="#fff" style={styles.logoutIcon} />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>

          {/* Edit Profile Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Edit Profile</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  value={editedUserData.name}
                  onChangeText={(text) => setEditedUserData({ ...editedUserData, name: text })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={editedUserData.email}
                  onChangeText={(text) => setEditedUserData({ ...editedUserData, email: text })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Mobile"
                  value={editedUserData.mobile}
                  onChangeText={(text) => setEditedUserData({ ...editedUserData, mobile: text })}
                />
           
                <TouchableOpacity style={styles.saveButton} onPress={handleEditProfile}>
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      ) : (
        <Text style={styles.noDataText}>No user data found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#343a40',
    marginTop: 30,
  },
  iconContainer:{
    alignItems:'center'
  },
  infoContainer: {
    backgroundColor: '#c6dff7',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 70,
  },
  infoText: {
    fontSize: 18,
    color: '#495057',
  },
  infoValue: {
    fontWeight: 'bold',
    color: '#141314',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 20,
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 20,
  },
  editIcon: {
    marginRight: 10,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Profile;

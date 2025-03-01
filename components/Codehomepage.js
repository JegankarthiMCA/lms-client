import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Codehomepage = () => {
  const navigation = useNavigation(); // Hook for navigation
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false); // State to track deletion loading

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://lms-server-c937.onrender.com/get-data'); // Replace with your server IP
      setData(response.data);
    } catch (error) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveUser = (name) => {
    Alert.alert(
      'Confirm Deletion',
      `Are you sure you want to delete this user: ${name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            setDeleting(true);
            try {
              const response = await axios.delete(`https://lms-server-c937.onrender.com/delete-data/${name}`);
              if (response.status === 200) {
                // Remove the user from the local state by name
                setData((prevData) => prevData.filter(item => item.name !== name));
                Alert.alert('Success', 'User removed successfully');
              } else {
                Alert.alert('Error', 'Failed to remove user');
              }
            } catch (error) {
              console.error(error); // Debug: log the error
              const errorMessage = error.response ? error.response.data.message : 'Failed to remove user';
              Alert.alert('Error', errorMessage);
            } finally {
              setDeleting(false);
            }
          },
        },
      ]
    );
  };

  if (loading) return <ActivityIndicator size="large" color="#007bff" />;
  if (error) return <Text>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.Title}>User Details</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.name} // Use name as key
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.userInfoText}>Name: {item.name}</Text>
            <Text style={styles.userInfoText}>Email: {item.email}</Text>
            <Text style={styles.userInfoText}>Mobile: {item.mobile}</Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveUser(item.name)} // Pass name for deletion
              disabled={deleting}
            >
              <Text style={styles.removeButtonText}>{deleting ? 'Removing...' : 'Remove'}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#bae0f5', // Change this color to your desired background color
  },
  itemContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#9fd2ed',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userInfoText: {
    fontSize: 15, // Increase the font size
    marginBottom: 4, // Add some spacing between text
  },
  removeButton: {
    marginTop: 8,
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  Title:{
    fontSize:30,
    textAlign:'center',
    fontWeight:'bold',
    marginBottom:30,
    marginTop:20,
    color: '#4A148C'
  }
});

export default Codehomepage;

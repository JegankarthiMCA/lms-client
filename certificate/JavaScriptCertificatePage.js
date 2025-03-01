import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CertificatePage = ({ route }) => {
  const [name, setName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          throw new Error('No token found');
        }

        // Fetch user data
        const userResponse = await axios.get('https://lms-server-c937.onrender.com/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        // Get the user's name
        setName(userResponse.data.name);
        
        // Fetch courses data
        const coursesResponse = await axios.get('https://lms-server-c937.onrender.com/courses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Assuming userResponse.data.courseTitle contains a course ID or name
        const userCourseTitle = userResponse.data.courseTitle;

        // Find the course name from the courses list
        const course = coursesResponse.data.find(course => course.title === userCourseTitle);
        setCourseName(course ? course.title : 'N/A'); // Set courseName to 'N/A' if not found

      } catch (error) {
        setError('Error fetching user data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.certificateContainer}>
        <Image
          source={require('../assets/certificate1.jpg')} 
          style={styles.backgroundImage}
        />
        <Text style={styles.title}>Learning App</Text>
        <Text style={styles.title1}>Certificate of Completion</Text>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.course}>has completed the course</Text>
        {/* Only display courseName if it's not 'N/A' */}
        {courseName !== 'N/A' ? (
          <Text style={styles.courseName}>{courseName}</Text>
        ) : (
          <Text style={styles.courseName}>Basic Of JavaScript</Text>
        )}
        <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c6dff7', // Light background for contrast
  },
  backgroundImage: {
    position: 'absolute',
    width: '119%',
    height: '121%',
    opacity: 0.4, // Slightly increase opacity for brightness
  },
  certificateContainer: {
    padding: 30,
    alignItems: 'center',
    backgroundColor: 'white', // White background for certificate content
    borderRadius: 10, // Rounded corners
    shadowColor: '#000', // Shadow for depth
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Elevation for Android
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2e4d91', // Dark blue for text
  },
  title1: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2e4d91',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333', // Dark color for readability
  },
  course: {
    fontSize: 20,
    marginVertical: 10,
    color: '#555', // Medium color for course text
  },
  courseName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#2e4d91',
  },
  date: {
    fontSize: 18,
    marginTop: 20,
    color: '#666', // Gray for date
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 16,
  },
});



export default CertificatePage;

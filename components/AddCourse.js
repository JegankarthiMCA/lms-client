import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker component
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the icon library
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddCourse = () => {
  const navigation = useNavigation();
  const [courseName, setCourseName] = useState('');
  const [courseType, setCourseType] = useState('Development'); // Default type is 'Development'
  const [videoUrl, setVideoUrl] = useState('');
  const [quizQuestion, setQuizQuestion] = useState('');
  const [quizOptions, setQuizOptions] = useState(['', '', '', '']); // Array for 4 options
  const [correctAnswer, setCorrectAnswer] = useState(0); // Index of correct answer (0-3)

  const handleCourseSubmit = () => {
    if (courseName.trim() === '') {
      Alert.alert('Error', 'Course Name is required');
      return;
    }

    if (videoUrl.trim() === '') {
      Alert.alert('Error', 'Video URL is required');
      return;
    }

    if (quizQuestion.trim() === '') {
      Alert.alert('Error', 'Quiz question is required');
      return;
    }

    if (quizOptions.some(option => option.trim() === '')) {
      Alert.alert('Error', 'All quiz options are required');
      return;
    }

    // Handle course submission (e.g., send to API)
    console.log('Course Name:', courseName);
    console.log('Course Type:', courseType);
    console.log('Video URL:', videoUrl);
    console.log('Quiz Question:', quizQuestion);
    console.log('Quiz Options:', quizOptions);
    console.log('Correct Answer:', quizOptions[correctAnswer]);

    // Show success alert
    Alert.alert('Success', 'Course added successfully', [
      { text: 'OK', onPress: () => { /* Optionally reset the form or navigate */ } },
    ]);

    // Optionally, clear the form after submission
    setCourseName('');
    setCourseType('Development');
    setVideoUrl('');
    setQuizQuestion('');
    setQuizOptions(['', '', '', '']);
    setCorrectAnswer(0);
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

  // Navigate to the Add Quiz page
  const navigateToQuizPage = () => {
    navigation.navigate('QuizPage'); // Assuming 'QuizPage' is your new quiz screen name
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New Course</Text>

      {/* Course Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Course Name"
        value={courseName}
        onChangeText={setCourseName}
      />

      {/* Course Type Dropdown */}
      <Text style={styles.label}>Course Type</Text>
      <Picker
        selectedValue={courseType}
        onValueChange={(itemValue) => setCourseType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Development" value="Development" />
        <Picker.Item label="Programming" value="Programming" />
        <Picker.Item label="Database" value="Database" />
      </Picker>

      {/* Video URL Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Video URL"
        value={videoUrl}
        onChangeText={setVideoUrl}
      />

      {/* Button to Navigate to Quiz Page */}
      <TouchableOpacity style={styles.button} onPress={navigateToQuizPage}>
        <Text style={styles.buttonText}>Add Quiz</Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleCourseSubmit}>
        <Text style={styles.buttonText}>Add Course</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="logout" size={24} color="#fff" style={styles.logoutIcon} />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#2c3e50', // Soft light blue background
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#f6ddcc', // Teal color for title
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#f6ddcc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    width: '100%',
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#f6ddcc',
    alignSelf: 'flex-start',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    borderColor: '#00796b',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#00796b',
    padding: 14,
    borderRadius: 25,
    alignItems: 'center',
    width: '80%',
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    marginTop: 30,
    backgroundColor: '#d32f2f',
    padding: 12,
    borderRadius: 25,
    width: '80%',
    marginBottom: 10,
    alignSelf: 'center',
  },
  logoutIcon: {
    marginRight: 70,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default AddCourse;

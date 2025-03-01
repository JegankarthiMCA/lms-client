import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function UserHomePage({ navigation }) {
  const [developmentCourses, setDevelopmentCourses] = useState([]);
  const [programmingCourses, setProgrammingCourses] = useState([]);
  const [databaseCourses, setDatabaseCourses] = useState([]);
  const [trendCourses, setTrendCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://lms-server-c937.onrender.com/courses');
        // Categorize courses
        const devCourses = response.data.filter(course => course.category === 'Development');
        const progCourses = response.data.filter(course => course.category === 'Programming');
        const dbCourses = response.data.filter(course => course.category === 'Database');
        const trendCourses = response.data.filter(course => course.category === 'Trending');

        setDevelopmentCourses(devCourses);
        setProgrammingCourses(progCourses);
        setDatabaseCourses(dbCourses);
        setTrendCourses(trendCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Trending Courses Section */}
      <Text style={styles.title}>Trending Courses</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
        {trendCourses.map(course => (
          <TouchableOpacity key={course._id || course.title} onPress={() => navigation.navigate(course.title)} style={styles.courseContainer}>
            <Image
              style={styles.trendImage}
              source={{ uri: course.imageURL }}
              onError={() => console.log('Error loading image:', course.imageURL)}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Development Courses Section */}
      <Text style={styles.sectionTitle}>Development Courses</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
        {developmentCourses.map(course => (
          <TouchableOpacity key={course._id || course.title} onPress={() => navigation.navigate(course.title)} style={styles.devCourseContainer}>
            <Image
              style={styles.devImage}
              source={{ uri: course.imageURL }}
              onError={() => console.log('Error loading image:', course.imageURL)}
            />
            <Text style={styles.devCourseTitle}>{course.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Programming Courses Section */}
      <Text style={styles.sectionTitle}>Programming Courses</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
        {programmingCourses.map(course => (
          <TouchableOpacity key={course._id || course.title} onPress={() => navigation.navigate(course.title)} style={styles.progCourseContainer}>
            <Image
              style={styles.progImage}
              source={{ uri: course.imageURL }}
              onError={() => console.log('Error loading image:', course.imageURL)}
            />
            <Text style={styles.progCourseTitle}>{course.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Database Courses Section */}
      <Text style={styles.sectionTitle}>Database Courses</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
        {databaseCourses.map(course => (
          <TouchableOpacity key={course._id || course.title} onPress={() => navigation.navigate(course.title)} style={styles.dbCourseContainer}>
            <Image
              style={styles.dbImage}
              source={{ uri: course.imageURL }}
              onError={() => console.log('Error loading image:', course.imageURL)}
            />
            <Text style={styles.dbCourseTitle}>{course.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#c6dff7', // Softer background color
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#02223d',
    marginBottom: 10,
    marginTop: 30,
    // textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#034780',
    marginVertical: 15,
    paddingLeft: 10,
  },
  horizontalScroll: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  trendImage: {
    width: 330,
    height: 190,
    borderRadius: 12,
    margin: 10,
  },

  // Development Courses Styles
  devCourseContainer: {
    alignItems: 'center',
    marginRight: 15,
    backgroundColor: '#c6dff7', // Slightly different background for dev course cards
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    padding: 10,
    width: 100,
  },
  devImage: {
    width: 90,
    height: 80,
    marginBottom: 8,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  devCourseTitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#00796b', // Custom color for dev courses
    fontWeight: '600',
  },

  // Programming Courses Styles
  progCourseContainer: {
    alignItems: 'center',
    marginRight: 15,
    backgroundColor: '#c6dff7', // Light yellow background for programming courses
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    padding: 10,
    width: 100,
  },
  progImage: {
    width: 90,
    height: 80,
    marginBottom: 8,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  progCourseTitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#d17a22', // Custom color for programming courses
    fontWeight: '600',
  },

  // Database Courses Styles
  dbCourseContainer: {
    alignItems: 'center',
    marginRight: 15,
    backgroundColor: '#c6dff7', // Light blue background for database courses
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    padding: 10,
    width: 100,
  },
  dbImage: {
    width: 90,
    height: 80,
    marginBottom: 8,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  dbCourseTitle: {
    textAlign: 'center',
    fontSize: 14,
    color: '#0073e6', // Custom color for database courses
    fontWeight: '600',
  },
});


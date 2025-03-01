import React, { useState } from 'react';
import { View, FlatList, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

// Sample data for demonstration with images
const DATA = [
  { id: '1', title: 'HTML', route: 'HTML', image: require('../assets/htmllogo.png') },
  { id: '2', title: 'CSS', route: 'CSS', image: require('../assets/csslogo.png') },
  { id: '3', title: 'JavaScript', route: 'JavaScript', image: require('../assets/jslogo.png') },
  { id: '4', title: 'React', route: 'React', image: require('../assets/reactlogo.png') },
  { id: '5', title: 'React Native', route: 'ReactNative', image: require('../assets/reactnative.png') },
  { id: '6', title: 'SQL', route: 'Sqldatabase', image: require('../assets/sql.png') },
  { id: '7', title: 'MySQL', route: 'Mysqldatabase', image: require('../assets/mysql.png') },
  { id: '8', title: 'MongoDB', route: 'Mongodb', image: require('../assets/mongo.png') },
  { id: '9', title: 'Access', route: 'Access', image: require('../assets/access.png') },
  { id: '10', title: 'Oracle', route: 'Oracle', image: require('../assets/oracle.png') },
  { id: '11', title: 'C', route: 'Cprogram', image: require('../assets/clogo.png') },
  { id: '12', title: 'C++', route: 'Cpp', image: require('../assets/c++logo.png') },
  { id: '13', title: 'Java', route: 'Java', image: require('../assets/Java-Logo.png') },
  { id: '14', title: 'Python', route: 'Python', image: require('../assets/pythonlogo.png') },
  { id: '15', title: 'CSharp', route: 'Csharp', image: require('../assets/C_Sharp_Logo.png') },
];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(DATA.slice(0, 15)); // Show 2 items by default
  const navigation = useNavigation(); // Get navigation object

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term) {
      const filtered = DATA.filter((item) =>
        item.title.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(DATA.slice(0, 15)); // Reset to the default 2 items when search is cleared
    }
  };

  const handleItemPress = (route) => {
    navigation.navigate(route); // Navigate to the corresponding page
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={24} color="gray" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={searchTerm}
          onChangeText={handleSearch}
        />
      </View>
      {filteredData.length > 0 ? ( // Show the FlatList if there are results
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemPress(item.route)}>
              <Image source={item.image} style={styles.itemImage} />
              <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        searchTerm.length > 0 && ( // Show a message if there are no results
          <Text style={styles.noResultsText}>No results found</Text>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#c6dff7', // Optional: Set a background color
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderColor: 'black',
    borderWidth: 1.5,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginTop: 50
  },
  icon: {
    marginRight: 10, // Space between icon and input
  },
  input: {
    flex: 1,
    height: '100%', // Ensures the input takes full height of the search bar
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemImage: {
    alignItems: 'center',
    width: 50, // Set the desired width
    height: 45, // Set the desired height
    marginRight: 50, // Space between image and text
  },
  itemText: {
    fontSize: 16,
  },
  noResultsText: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 10,
  },
});

export default Search;

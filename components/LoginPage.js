// import React, { useState } from 'react';
// import axios from 'axios';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import AsyncStorage from '@react-native-async-storage/async-storage'; 

// const HARD_CODED_ADMIN = {
//   email: 'admin@example.com',
//   password: 'admin123'
// };

// export default function LoginPage({ route }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

//   const navigation = useNavigation();
//   const { type } = route.params || {}; // get 'type' from route params

//   const handleSubmit = async () => {
//     if (!email || !password) {
//       Alert.alert('Please fill in both email and password.');
//       return;
//     }

//     if (type === 'Admin') {
//       // Hardcoded admin login validation
//       if (email === HARD_CODED_ADMIN.email && password === HARD_CODED_ADMIN.password) {
//         Alert.alert('Logged In Successfully');
//         navigation.navigate('AdminHomePage'); // Navigate to 'AdminHomePage' for admin login
//         return;
//       } else {
//         Alert.alert('Login Failed', 'Please check your email and password and try again.');
//         return;
//       }
//     }

//     // For user login
//     const userData = { email: email, password: password };

//     try {
//       const response = await axios.post("https://lms-server-c937.onrender.com/login-user", userData);
//       console.log(response.data);

//       if (response.data.status === 'ok') {
//         await AsyncStorage.setItem('userToken', response.data.data); // Save token
//         Alert.alert('Logged In Successfully');
//         navigation.navigate('UserHomePage'); // Navigate to 'UserHomePage' for user login
//       } else {
//         Alert.alert('Login Failed', 'Please check your email and password and try again.');
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert('An error occurred during login', 'Please try again later.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login Page</Text>
      
//       {/* Admin Image */}
//       {type === 'Admin' && (
//         <Image
//           source={require('../assets/adminlogin.jpeg')} // Replace with your admin image path
//           style={styles.image}
//         />
//       )}

//       {/* User Image */}
//       {type === 'User' && (
//         <Image
//           source={require('../assets/userlogin.png')} // Replace with your user image path
//           style={styles.image}
//         />
//       )}

//       <View style={styles.inputContainer}>
//         <View style={styles.inputWithIcon}>
//           <Icon name="user" size={20} color="#aaa" style={styles.icon} />
//           <TextInput 
//             placeholder='Mobile Or Email' 
//             style={styles.textInput} 
//             placeholderTextColor="#aaa"
//             onChangeText={setEmail}
//             value={email}
//           />
//         </View>
//         <View style={styles.inputWithIcon}>
//           <Icon name="lock" size={20} color="#aaa" style={styles.icon} />
//           <TextInput 
//             placeholder='Password' 
//             style={styles.textInput} 
//             placeholderTextColor="#aaa"
//             onChangeText={setPassword}
//             secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state
//             value={password}
//           />
//           <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//             <Icon name={showPassword ? "eye" : "eye-slash"} size={20} color="#aaa" style={styles.icon} />
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//           <Text style={styles.buttonText}>Log in</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#c6dff7',
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 24,
//     color: '#333',
//   },
//   inputContainer: {
//     width: '100%',
//     alignItems: 'center',
//   },
//   inputWithIcon: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: 40,
//     width: '100%',
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 8,
//     marginBottom: 12,
//     backgroundColor: '#fff',
//     paddingHorizontal: 8,
//   },
//   icon: {
//     marginRight: 8,
//   },
//   textInput: {
//     flex: 1,
//   },
//   button: {
//     backgroundColor: '#007bff',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   image: {
//     width: 100, // Adjust as needed
//     height: 100, // Adjust as needed
//     marginBottom: 20, // Space between the image and input fields
//   },
// });
import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HARD_CODED_ADMIN = {
  email: 'admin@example.com',
  password: 'admin123'
};

export default function LoginPage({ route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const navigation = useNavigation();
  const { type } = route.params || {}; // get 'type' from route params

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Please fill in both email and password.');
      return;
    }

    if (type === 'Admin') {
      // Hardcoded admin login validation
      if (email === HARD_CODED_ADMIN.email && password === HARD_CODED_ADMIN.password) {
        Alert.alert('Logged In Successfully');
        navigation.navigate('AdminHomePage'); // Navigate to 'AdminHomePage' for admin login
        return;
      } else {
        Alert.alert('Login Failed', 'Please check your email and password and try again.');
        return;
      }
    }

    // For user login
    const userData = { email: email, password: password };

    try {
      const response = await axios.post("https://lms-server-c937.onrender.com/login-user", userData);
      console.log(response.data);

      if (response.data.status === 'ok') {
        await AsyncStorage.setItem('userToken', response.data.data); // Save token
        Alert.alert('Logged In Successfully');
        navigation.navigate('UserHomePage'); // Navigate to 'UserHomePage' for user login
      } else {
        Alert.alert('Login Failed', 'Please check your email and password and try again.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('An error occurred during login', 'Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      
      {/* Admin Image */}
      {type === 'Admin' && (
        <Image
          source={require('../assets/adminlogin.jpeg')} // Replace with your admin image path
          style={styles.image}
        />
      )}

      {/* User Image */}
      {type === 'User' && (
        <Image
          source={require('../assets/userlogin.png')} // Replace with your user image path
          style={styles.image}
        />
      )}

      <View style={styles.inputContainer}>
        <View style={styles.inputWithIcon}>
          <Icon name="user" size={20} color="#4A90E2" style={styles.icon} />
          <TextInput 
            placeholder='Enter your Email or Mobile' 
            style={styles.textInput} 
            placeholderTextColor="#B0B0B0"
            onChangeText={setEmail}
            value={email}
          />
        </View>
        <View style={styles.inputWithIcon}>
          <Icon name="lock" size={20} color="#4A90E2" style={styles.icon} />
          <TextInput 
            placeholder='Password' 
            style={styles.textInput} 
            placeholderTextColor="#B0B0B0"
            onChangeText={setPassword}
            secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state
            value={password}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon name={showPassword ? "eye" : "eye-slash"} size={20} color="#4A90E2" style={styles.icon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F7FC',  // Light background color
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    width: '100%',
    borderColor: '#4A90E2',  // Blue border
    borderWidth: 1.5,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',  // White background
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#4A90E2',  // Blue button
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 120,  // Adjusted for better proportion
    height: 120,  // Adjusted for better proportion
    marginBottom: 25,  // Space between the image and input fields
  },
});

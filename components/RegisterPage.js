// import React, { useState } from 'react';
// import axios from 'axios';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/FontAwesome';

// export default function RegisterPage() {
//     const navigation = useNavigation();

//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [mobile, setMobile] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
//     const [showPassword, setShowPassword] = useState(false); 
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for toggling confirm password visibility

//     function validateEmail(email) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     }

//     function validateMobile(mobile) {
//         const mobileRegex = /^[0-9]{10}$/;  // Example: 10 digits mobile number
//         return mobileRegex.test(mobile);
//     }

//     function handleSubmit() {
//         if (!name) {
//             Alert.alert('Validation Error', 'Name is required.');
//             return;
//         }

//         if (!email || !validateEmail(email)) {
//             Alert.alert('Validation Error', 'Please enter a valid email address.');
//             return;
//         }

//         if (!mobile || !validateMobile(mobile)) {
//             Alert.alert('Validation Error', 'Please enter a valid 10-digit mobile number.');
//             return;
//         }

//         if (!password || password.length < 6) {
//             Alert.alert('Validation Error', 'Password should be at least 6 characters long.');
//             return;
//         }

//         if (password !== confirmPassword) { // Check if password and confirm password match
//             Alert.alert('Validation Error', 'Passwords do not match.');
//             return;
//         }

//         const userData = { name, email, mobile, password };
//         axios.post("https://lms-server-c937.onrender.com/register", userData)
//         // axios.post("http://192.168.209.3:8002/register", userData)

//             .then((res) => {
//                 console.log(res.data);
//                 Alert.alert('Registration Successful', 'You can now log in with your credentials.');
//                 navigation.navigate('User');
//             })
//             .catch((error) => {
//                 console.error('Error during registration:', error.response ? error.response.data : error.message);
//                 Alert.alert('Registration Failed', 'An error occurred during registration. Please try again.');
//             });
//     }

//     function handleNameInput(text) {
//         const regex = /^[a-zA-Z\s]*$/;  // Allows letters and spaces only
//         if (regex.test(text)) {
//             setName(text);
//         }
//     }

//     function handleMobileInput(text) {
//         const validMobile = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
//         if (validMobile.length <= 10) {  // Ensure max 10 digits
//             setMobile(validMobile);
//         }
//     }

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Create an Account</Text>
//             <View style={styles.inputContainer}>
//                 <View style={styles.inputWithIcon}>
//                     <Icon name="user" size={20} color="#666" style={styles.icon} />
//                     <TextInput 
//                         placeholder='Name' 
//                         style={styles.textInput} 
//                         placeholderTextColor="#666"
//                         onChangeText={handleNameInput}
//                         value={name}
//                     />
//                 </View>
//                 <View style={styles.inputWithIcon}>
//                     <Icon name="envelope" size={20} color="#666" style={styles.icon} />
//                     <TextInput 
//                         placeholder='Email' 
//                         style={styles.textInput} 
//                         placeholderTextColor="#666"
//                         onChangeText={setEmail}
//                         value={email}
//                         keyboardType='email-address'
//                         autoCapitalize='none'
//                     />
//                 </View>
//                 <View style={styles.inputWithIcon}>
//                     <Icon name="phone" size={20} color="#666" style={styles.icon} />
//                     <TextInput 
//                         placeholder='Mobile' 
//                         style={styles.textInput} 
//                         placeholderTextColor="#666"
//                         onChangeText={handleMobileInput}
//                         value={mobile}
//                         keyboardType='phone-pad'
//                     />
//                 </View>
//                 <View style={styles.inputWithIcon}>
//                     <Icon name="lock" size={20} color="#666" style={styles.icon} />
//                     <TextInput 
//                         placeholder='Password' 
//                         style={styles.textInput} 
//                         placeholderTextColor="#666"
//                         onChangeText={setPassword}
//                         value={password}
//                         secureTextEntry={!showPassword}
//                     />
//                     <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//                         <Icon name={showPassword ? "eye" : "eye-slash"} size={20} color="#666" />
//                     </TouchableOpacity>
//                 </View>
//                 <View style={styles.inputWithIcon}>
//                     <Icon name="lock" size={20} color="#666" style={styles.icon} />
//                     <TextInput 
//                         placeholder='Confirm Password' 
//                         style={styles.textInput} 
//                         placeholderTextColor="#666"
//                         onChangeText={setConfirmPassword}
//                         value={confirmPassword}
//                         secureTextEntry={!showConfirmPassword}
//                     />
//                     <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
//                         <Icon name={showConfirmPassword ? "eye" : "eye-slash"} size={20} color="#666" />
//                     </TouchableOpacity>
//                 </View>
//                 <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//                     <Text style={styles.buttonText}>Register</Text>
//                 </TouchableOpacity>
//             </View>
//             <View>
//                 <TouchableOpacity 
//                     style={styles.alreadyRegister} 
//                     onPress={() => navigation.navigate('User')}>
//                     <Text style={styles.alreadyRegisterText}>Already have an account? Login</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#c6dff7',
//         padding: 20,
//     },
//     title: {
//         fontSize: 28,
//         fontWeight: 'bold',
//         marginBottom: 30,
//         color: '#333',
//     },
//     inputContainer: {
//         width: '100%',
//         alignItems: 'center',
//     },
//     inputWithIcon: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         height: 50,
//         width: '100%',
//         borderColor: '#ddd',
//         borderWidth: 1,
//         borderRadius: 10,
//         marginBottom: 15,
//         backgroundColor: '#f9f9f9',
//         paddingHorizontal: 15,
//     },
//     icon: {
//         marginRight: 10,
//     },
//     textInput: {
//         flex: 1,
//         fontSize: 16,
//     },
//     button: {
//         backgroundColor: '#9c6bff',
//         paddingVertical: 15,
//         paddingHorizontal: 40,
//         borderRadius: 10,
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: '100%',
//         marginTop: 10,
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     alreadyRegister: {
//         marginTop: 20,
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: '100%',
//     },
//     alreadyRegisterText: {
//         color: '#007BFF',
//         fontSize: 16,
//         fontWeight: '600',
//     },
// });

import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function RegisterPage() {
    const navigation = useNavigation();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
    const [showPassword, setShowPassword] = useState(false); 
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for toggling confirm password visibility

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateMobile(mobile) {
        const mobileRegex = /^[0-9]{10}$/;  // Example: 10 digits mobile number
        return mobileRegex.test(mobile);
    }

    function handleSubmit() {
        if (!name) {
            Alert.alert('Validation Error', 'Name is required.');
            return;
        }

        if (!email || !validateEmail(email)) {
            Alert.alert('Validation Error', 'Please enter a valid email address.');
            return;
        }

        if (!mobile || !validateMobile(mobile)) {
            Alert.alert('Validation Error', 'Please enter a valid 10-digit mobile number.');
            return;
        }

        if (!password || password.length < 6) {
            Alert.alert('Validation Error', 'Password should be at least 6 characters long.');
            return;
        }

        if (password !== confirmPassword) { // Check if password and confirm password match
            Alert.alert('Validation Error', 'Passwords do not match.');
            return;
        }

        const userData = { name, email, mobile, password };
        axios.post("https://lms-server-c937.onrender.com/register", userData)
            .then((res) => {
                console.log(res.data);
                Alert.alert('Registration Successful', 'You can now log in with your credentials.');
                navigation.navigate('User');
            })
            .catch((error) => {
                console.error('Error during registration:', error.response ? error.response.data : error.message);
                Alert.alert('Registration Failed', 'An error occurred during registration. Please try again.');
            });
    }

    function handleNameInput(text) {
        const regex = /^[a-zA-Z\s]*$/;  // Allows letters and spaces only
        if (regex.test(text)) {
            setName(text);
        }
    }

    function handleMobileInput(text) {
        const validMobile = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        if (validMobile.length <= 10) {  // Ensure max 10 digits
            setMobile(validMobile);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create an Account</Text>
            <View style={styles.inputContainer}>
                <View style={styles.inputWithIcon}>
                    <Icon name="user" size={20} color="#4A90E2" style={styles.icon} />
                    <TextInput 
                        placeholder='Name' 
                        style={styles.textInput} 
                        placeholderTextColor="#B0B0B0"
                        onChangeText={handleNameInput}
                        value={name}
                    />
                </View>
                <View style={styles.inputWithIcon}>
                    <Icon name="envelope" size={20} color="#4A90E2" style={styles.icon} />
                    <TextInput 
                        placeholder='Email' 
                        style={styles.textInput} 
                        placeholderTextColor="#B0B0B0"
                        onChangeText={setEmail}
                        value={email}
                        keyboardType='email-address'
                        autoCapitalize='none'
                    />
                </View>
                <View style={styles.inputWithIcon}>
                    <Icon name="phone" size={20} color="#4A90E2" style={styles.icon} />
                    <TextInput 
                        placeholder='Mobile' 
                        style={styles.textInput} 
                        placeholderTextColor="#B0B0B0"
                        onChangeText={handleMobileInput}
                        value={mobile}
                        keyboardType='phone-pad'
                    />
                </View>
                <View style={styles.inputWithIcon}>
                    <Icon name="lock" size={20} color="#4A90E2" style={styles.icon} />
                    <TextInput 
                        placeholder='Password' 
                        style={styles.textInput} 
                        placeholderTextColor="#B0B0B0"
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Icon name={showPassword ? "eye" : "eye-slash"} size={20} color="#4A90E2" />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputWithIcon}>
                    <Icon name="lock" size={20} color="#4A90E2" style={styles.icon} />
                    <TextInput 
                        placeholder='Confirm Password' 
                        style={styles.textInput} 
                        placeholderTextColor="#B0B0B0"
                        onChangeText={setConfirmPassword}
                        value={confirmPassword}
                        secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                        <Icon name={showConfirmPassword ? "eye" : "eye-slash"} size={20} color="#4A90E2" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity 
                    style={styles.alreadyRegister} 
                    onPress={() => navigation.navigate('User')}>
                    <Text style={styles.alreadyRegisterText}>Already have an account? Login</Text>
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
        backgroundColor: '#F3F7FC', // Light background color
        padding: 20,
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
        height: 50,
        width: '100%',
        borderColor: '#4A90E2', // Blue border
        borderWidth: 1.5,
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: '#FFFFFF', // White background
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
        backgroundColor: '#4A90E2', // Blue button
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    alreadyRegister: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    alreadyRegisterText: {
        color: '#007BFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

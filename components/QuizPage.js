import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation for navigation

const QuizPage = () => {
  const navigation = useNavigation(); // Initialize navigation
  const [questions, setQuestions] = useState([
    { question: '', options: [''], correctAnswer: null } // Initialize with one question and one option
  ]);

  // Add a new question with empty options
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', options: [''], correctAnswer: null }
    ]);
  };

  // Handle the text change of a question
  const handleQuestionChange = (index, text) => {
    const newQuestions = [...questions];
    newQuestions[index].question = text;
    setQuestions(newQuestions);
  };

  // Handle the option text change for a specific question
  const handleOptionChange = (questionIndex, optionIndex, text) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = text;
    setQuestions(newQuestions);
  };

  // Add a new option to a specific question
  const addOption = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].options.push(''); // Add an empty string for the new option
    setQuestions(newQuestions);
  };

  // Handle selecting the correct answer for a question
  const handleCorrectAnswerChange = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctAnswer = optionIndex;
    setQuestions(newQuestions);
  };

  // Handle form submission and navigate back to AddCourse page
  const handleSubmit = () => {
    console.log('Submitted Questions:', questions);
    alert('Quiz Added Successfully!');

    // Navigate back to AddCourse page
    navigation.navigate('AddCourse'); // Navigate to AddCourse screen
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Quiz</Text>
      {questions.map((question, questionIndex) => (
        <View key={questionIndex} style={styles.questionContainer}>
          {/* Question Input */}
          <TextInput
            style={styles.input}
            placeholder={`Question ${questionIndex + 1}`}
            value={question.question}
            onChangeText={(text) => handleQuestionChange(questionIndex, text)}
          />

          {/* Option Inputs */}
          {question.options.map((option, optionIndex) => (
            <View key={optionIndex} style={styles.optionContainer}>
              <TextInput
                style={styles.input}
                placeholder={`Option ${optionIndex + 1}`}
                value={option}
                onChangeText={(text) => handleOptionChange(questionIndex, optionIndex, text)}
              />
              {/* Option Selectable Button */}
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  question.correctAnswer === optionIndex && styles.selectedOption,
                ]}
                onPress={() => handleCorrectAnswerChange(questionIndex, optionIndex)}
              >
                <Text style={styles.optionButtonText}>
                  {question.correctAnswer === optionIndex ? 'Correct Answer' : 'Select as Correct'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}

          {/* Add Option Button */}
          <TouchableOpacity style={styles.addOptionButton} onPress={() => addOption(questionIndex)}>
            <Text style={styles.addOptionButtonText}>+ Add Option</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Add Next Question Button */}
      <TouchableOpacity style={styles.button} onPress={addQuestion}>
        <Text style={styles.buttonText}>Next Question</Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Quiz</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4A148C',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '100%',
  },
  questionContainer: {
    marginBottom: 20,
  },
  optionContainer: {
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#4A148C', // Highlight the correct answer option
  },
  optionButtonText: {
    color: '#4A148C',
    fontWeight: 'bold',
  },
  addOptionButton: {
    backgroundColor: '#e1e1e1',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addOptionButtonText: {
    color: '#4A148C',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#9c6bff',
    padding: 12,
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
});

export default QuizPage;

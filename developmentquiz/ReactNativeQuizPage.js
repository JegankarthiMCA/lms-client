import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';

const questions = [
    {
        id: '1',
        question: 'What is React Native?',
        options: ['A framework for building web applications', 'A framework for building mobile applications', 'A programming language', 'A state management tool'],
        correctAnswer: 'A framework for building mobile applications',
      },
      {
        id: '2',
        question: 'Which of the following is used to style React Native components?',
        options: ['CSS', 'StyleSheet', 'Styled Components', 'All of the above'],
        correctAnswer: 'All of the above',
      },
      {
        id: '3',
        question: 'Which component is used to display images in React Native?',
        options: ['<Image>', '<Picture>', '<Img>', '<Photo>'],
        correctAnswer: '<Image>',
      },
      {
        id: '4',
        question: 'What does the command `npx react-native init` do?',
        options: ['Creates a new React Native project', 'Starts the development server', 'Builds the app for production', 'Runs the app on a simulator'],
        correctAnswer: 'Creates a new React Native project',
      },
      {
        id: '5',
        question: 'Which API is used to manage application state in React Native?',
        options: ['useState', 'useEffect', 'Context API', 'All of the above'],
        correctAnswer: 'All of the above',
      },
      {
        id: '6',
        question: 'How do you navigate between screens in a React Native app?',
        options: ['Using the Navigation API', 'Using React Router', 'Using the Link component', 'None of the above'],
        correctAnswer: 'Using the Navigation API',
      },
      {
        id: '7',
        question: 'What command is used to run the React Native application in development mode?',
        options: ['npm run start', 'npm start', 'react-native run-android', 'react-native start'],
        correctAnswer: 'react-native run-android',
      },
      {
        id: '8',
        question: 'Which hook is used to handle side effects in React Native?',
        options: ['useState', 'useEffect', 'useContext', 'useReducer'],
        correctAnswer: 'useEffect',
      },
      {
        id: '9',
        question: 'What is the purpose of the `View` component in React Native?',
        options: ['To create a container for other components', 'To display text', 'To show images', 'To handle gestures'],
        correctAnswer: 'To create a container for other components',
      },
      {
        id: '10',
        question: 'Which command is used to link native dependencies in React Native?',
        options: ['npm link', 'react-native link', 'npx link', 'yarn link'],
        correctAnswer: 'react-native link',
      },
];

export default function QuizPage({ navigation }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleOptionSelect = (questionId, option) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
  };

  const getOptionStyle = (questionId, option) => {
    const isSelected = selectedAnswers[questionId] === option;
    const isCorrect = option === questions.find(q => q.id === questionId).correctAnswer;

    // Show correct answer when submitted
    if (score !== null) {
      if (isCorrect) return styles.correctOption; // Correct answer styling
      if (isSelected && !isCorrect) return styles.wrongOption; // Wrong answer styling
    }

    // Change selected option color
    if (isSelected) return styles.selectedOption; // Light blue for selected option

    // Default styling
    return styles.optionButton;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.quizTitle}>ReactNative Quiz</Text>
      <FlatList
        data={questions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{item.question}</Text>
            {item.options.map((option) => (
              <TouchableOpacity
                key={option}
                style={getOptionStyle(item.id, option)}
                onPress={() => handleOptionSelect(item.id, option)}
              >
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
      {score === null ? (
        <Button title="Submit Quiz" onPress={calculateScore} />
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.scoreText}>Your Score: {score}/{questions.length}</Text>
          {score >= 7 ? (
            <>
              <Text style={styles.passText}>Congratulations, you passed!</Text>
              <Button
                title="Get Certificate"
                onPress={() => navigation.navigate('ReactNativeCertificatePage', { score, result: 'Pass' })}
              />
            </>
          ) : (
            <Text style={styles.failText}>You failed, better luck next time!</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#c6dff7',
  },
  quizTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
  },
  optionButton: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
  },
  correctOption: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#d0f0d0', // Light green for correct answers
  },
  wrongOption: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#f0d0d0', // Light red for incorrect answers
  },
  selectedOption: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#add8e6', // Light blue for selected option
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  passText: {
    fontSize: 18,
    color: 'green',
    marginTop: 10,
  },
  failText: {
    fontSize: 18,
    color: 'red',
    marginTop: 10,
  },
});

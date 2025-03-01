import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';

const questions = [
    {
        id: '1',
        question: 'What is React?',
        options: ['A JavaScript library for building user interfaces', 'A database', 'A programming language', 'A CSS framework'],
        correctAnswer: 'A JavaScript library for building user interfaces',
      },
      {
        id: '2',
        question: 'Which company maintains React?',
        options: ['Google', 'Microsoft', 'Facebook (Meta)', 'Twitter'],
        correctAnswer: 'Facebook (Meta)',
      },
      {
        id: '3',
        question: 'What is a React component?',
        options: ['A part of the DOM', 'A reusable piece of UI', 'An HTML tag', 'A CSS rule'],
        correctAnswer: 'A reusable piece of UI',
      },
      {
        id: '4',
        question: 'Which hook is used to manage state in a functional component?',
        options: ['useState', 'useEffect', 'useReducer', 'useRef'],
        correctAnswer: 'useState',
      },
      {
        id: '5',
        question: 'What is JSX?',
        options: ['A syntax extension for JavaScript', 'A database query language', 'A CSS preprocessor', 'A testing framework'],
        correctAnswer: 'A syntax extension for JavaScript',
      },
      {
        id: '6',
        question: 'Which of the following is used to handle side effects in React?',
        options: ['useEffect', 'useState', 'useReducer', 'useCallback'],
        correctAnswer: 'useEffect',
      },
      {
        id: '7',
        question: 'What is the virtual DOM in React?',
        options: ['A copy of the actual DOM', 'A React component', 'A method for managing CSS', 'An HTML renderer'],
        correctAnswer: 'A copy of the actual DOM',
      },
      {
        id: '8',
        question: 'Which method is used to render components to the DOM?',
        options: ['render()', 'display()', 'show()', 'view()'],
        correctAnswer: 'render()',
      },
      {
        id: '9',
        question: 'What is a React fragment?',
        options: ['A way to return multiple elements', 'A JavaScript variable', 'A CSS selector', 'A JavaScript loop'],
        correctAnswer: 'A way to return multiple elements',
      },
      {
        id: '10',
        question: 'Which lifecycle method runs when a component is unmounted?',
        options: ['componentDidUnmount', 'componentWillUnmount', 'useEffect', 'useMemo'],
        correctAnswer: 'componentWillUnmount',
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
      <Text style={styles.quizTitle}>React Quiz</Text>
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
                onPress={() => navigation.navigate('ReactCertificatePage', { score, result: 'Pass' })}
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

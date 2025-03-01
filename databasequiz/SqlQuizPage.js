import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';

const questions = [
    {
        id: '1',
        question: 'What does SQL stand for?',
        options: [
          'Structured Query Language',
          'Simple Query Language',
          'Standard Query Language',
          'Sequential Query Language',
        ],
        correctAnswer: 'Structured Query Language',
      },
      {
        id: '2',
        question: 'Which command is used to retrieve data from a database?',
        options: [
          'GET',
          'SELECT',
          'FETCH',
          'RETRIEVE',
        ],
        correctAnswer: 'SELECT',
      },
      {
        id: '3',
        question: 'Which SQL statement is used to update existing records in a table?',
        options: [
          'UPDATE',
          'MODIFY',
          'EDIT',
          'CHANGE',
        ],
        correctAnswer: 'UPDATE',
      },
      {
        id: '4',
        question: 'What keyword is used to sort the result set in SQL?',
        options: [
          'ORDER BY',
          'SORT BY',
          'GROUP BY',
          'FILTER BY',
        ],
        correctAnswer: 'ORDER BY',
      },
      {
        id: '5',
        question: 'Which SQL statement is used to create a new table?',
        options: [
          'CREATE TABLE',
          'NEW TABLE',
          'MAKE TABLE',
          'ADD TABLE',
        ],
        correctAnswer: 'CREATE TABLE',
      },
      {
        id: '6',
        question: 'What is a primary key?',
        options: [
          'A key that uniquely identifies each record in a table',
          'A key that links two tables together',
          'A key used for indexing purposes',
          'A key that can be duplicated in a table',
        ],
        correctAnswer: 'A key that uniquely identifies each record in a table',
      },
      {
        id: '7',
        question: 'Which command is used to delete a table?',
        options: [
          'DELETE TABLE',
          'DROP TABLE',
          'REMOVE TABLE',
          'CLEAR TABLE',
        ],
        correctAnswer: 'DROP TABLE',
      },
      {
        id: '8',
        question: 'What is a foreign key?',
        options: [
          'A key that uniquely identifies a record',
          'A key that references a primary key in another table',
          'A key used for sorting',
          'A key that can have duplicate values',
        ],
        correctAnswer: 'A key that references a primary key in another table',
      },
      {
        id: '9',
        question: 'Which SQL function is used to count the number of rows in a table?',
        options: [
          'COUNT()',
          'SUM()',
          'TOTAL()',
          'ROWS()',
        ],
        correctAnswer: 'COUNT()',
      },
      {
        id: '10',
        question: 'What does the acronym DML stand for?',
        options: [
          'Data Manipulation Language',
          'Data Management Language',
          'Database Manipulation Language',
          'Document Management Language',
        ],
        correctAnswer: 'Data Manipulation Language',
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
      <Text style={styles.quizTitle}>SQL Quiz</Text>
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
                onPress={() => navigation.navigate('SqlCertificatePage', { score, result: 'Pass' })}
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

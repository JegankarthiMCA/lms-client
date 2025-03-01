import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';

const questions = [
    {
        id: '1',
        question: 'What does PL/SQL stand for?',
        options: [
          'Procedural Language/SQL',
          'Programming Language/SQL',
          'Processing Language/SQL',
          'Procedural Language/Structured Query Language',
        ],
        correctAnswer: 'Procedural Language/SQL',
      },
      {
        id: '2',
        question: 'Which command is used to create a new user in Oracle?',
        options: [
          'CREATE USER',
          'ADD USER',
          'NEW USER',
          'INSERT USER',
        ],
        correctAnswer: 'CREATE USER',
      },
      {
        id: '3',
        question: 'What is the default table space for a new user in Oracle?',
        options: [
          'SYSTEM',
          'USER_DATA',
          'TEMP',
          'USERS',
        ],
        correctAnswer: 'USERS',
      },
      {
        id: '4',
        question: 'Which of the following is used to retrieve data from multiple tables in Oracle?',
        options: [
          'JOIN',
          'LINK',
          'UNION',
          'MERGE',
        ],
        correctAnswer: 'JOIN',
      },
      {
        id: '5',
        question: 'What does the acronym DDL stand for in Oracle?',
        options: [
          'Data Definition Language',
          'Data Description Language',
          'Data Deployment Language',
          'Database Definition Language',
        ],
        correctAnswer: 'Data Definition Language',
      },
      {
        id: '6',
        question: 'Which of the following is NOT a valid Oracle data type?',
        options: [
          'VARCHAR2',
          'CHAR',
          'NUMBER',
          'TEXT',
        ],
        correctAnswer: 'TEXT',
      },
      {
        id: '7',
        question: 'What command is used to grant privileges to a user in Oracle?',
        options: [
          'GRANT',
          'ALLOW',
          'PERMIT',
          'AUTHORIZATION',
        ],
        correctAnswer: 'GRANT',
      },
      {
        id: '8',
        question: 'Which function is used to get the current date in Oracle?',
        options: [
          'CURRENT_DATE',
          'SYSDATE',
          'GETDATE',
          'NOW',
        ],
        correctAnswer: 'SYSDATE',
      },
      {
        id: '9',
        question: 'Which keyword is used in Oracle to define a stored procedure?',
        options: [
          'PROCEDURE',
          'FUNCTION',
          'METHOD',
          'SCRIPT',
        ],
        correctAnswer: 'PROCEDURE',
      },
      {
        id: '10',
        question: 'What is the maximum length of a VARCHAR2 column in Oracle?',
        options: [
          '4000 bytes',
          '2000 bytes',
          '32767 bytes',
          '3000 bytes',
        ],
        correctAnswer: '4000 bytes',
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
      <Text style={styles.quizTitle}>Oracle Quiz</Text>
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
                onPress={() => navigation.navigate('OracleCertificatePage', { score, result: 'Pass' })}
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

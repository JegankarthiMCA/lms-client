import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';

const questions = [
    {
        id: '1',
        question: 'What type of database is MySQL?',
        options: [
          'Document-oriented database',
          'Relational database',
          'Key-value store',
          'Graph database',
        ],
        correctAnswer: 'Relational database',
      },
      {
        id: '2',
        question: 'Which command is used to create a new database in MySQL?',
        options: [
          'CREATE DATABASE',
          'NEW DATABASE',
          'ADD DATABASE',
          'MAKE DATABASE',
        ],
        correctAnswer: 'CREATE DATABASE',
      },
      {
        id: '3',
        question: 'What is the purpose of the SELECT statement in MySQL?',
        options: [
          'To insert new data',
          'To update existing data',
          'To retrieve data from a database',
          'To delete data',
        ],
        correctAnswer: 'To retrieve data from a database',
      },
      {
        id: '4',
        question: 'Which command is used to insert data into a table?',
        options: [
          'INSERT INTO',
          'ADD DATA',
          'INSERT DATA',
          'PUT INTO',
        ],
        correctAnswer: 'INSERT INTO',
      },
      {
        id: '5',
        question: 'What does the acronym SQL stand for?',
        options: [
          'Structured Query Language',
          'Simple Query Language',
          'Structured Question Language',
          'System Query Language',
        ],
        correctAnswer: 'Structured Query Language',
      },
      {
        id: '6',
        question: 'Which clause is used to filter records in a SQL query?',
        options: [
          'WHERE',
          'FILTER',
          'HAVING',
          'ORDER BY',
        ],
        correctAnswer: 'WHERE',
      },
      {
        id: '7',
        question: 'What is a primary key in MySQL?',
        options: [
          'A unique identifier for each record in a table',
          'A type of foreign key',
          'A special key used for encryption',
          'A key that can be duplicated in a table',
        ],
        correctAnswer: 'A unique identifier for each record in a table',
      },
      {
        id: '8',
        question: 'What is a foreign key?',
        options: [
          'A key that uniquely identifies a record',
          'A key that creates a link between two tables',
          'A key used for indexing',
          'A key used to filter records',
        ],
        correctAnswer: 'A key that creates a link between two tables',
      },
      {
        id: '9',
        question: 'Which SQL command is used to modify existing records in a table?',
        options: [
          'UPDATE',
          'CHANGE',
          'EDIT',
          'MODIFY',
        ],
        correctAnswer: 'UPDATE',
      },
      {
        id: '10',
        question: 'What is the purpose of the DROP TABLE command?',
        options: [
          'To delete all data from a table',
          'To remove a table from the database',
          'To create a new table',
          'To alter the structure of a table',
        ],
        correctAnswer: 'To remove a table from the database',
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
      <Text style={styles.quizTitle}>MYSQL Quiz</Text>
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
                onPress={() => navigation.navigate('MysqlCertificatePage', { score, result: 'Pass' })}
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

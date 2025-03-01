import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';

const questions = [
    {
        id: '1',
        question: 'What is Microsoft Access primarily used for?',
        options: [
          'Creating spreadsheets',
          'Designing web pages',
          'Database management',
          'Graphic design',
        ],
        correctAnswer: 'Database management',
      },
      {
        id: '2',
        question: 'What is a table in Microsoft Access?',
        options: [
          'A form to input data',
          'A collection of related records',
          'A visual representation of data',
          'A type of query',
        ],
        correctAnswer: 'A collection of related records',
      },
      {
        id: '3',
        question: 'Which of the following is a valid data type in Access?',
        options: ['Text', 'Currency', 'Date/Time', 'All of the above'],
        correctAnswer: 'All of the above',
      },
      {
        id: '4',
        question: 'What function does a primary key serve in a table?',
        options: [
          'Defines the table structure',
          'Identifies unique records',
          'Holds calculated data',
          'Sorts data',
        ],
        correctAnswer: 'Identifies unique records',
      },
      {
        id: '5',
        question: 'What type of query retrieves data from one or more tables?',
        options: ['Update query', 'Select query', 'Append query', 'Delete query'],
        correctAnswer: 'Select query',
      },
      {
        id: '6',
        question: 'How can you enforce referential integrity in Access?',
        options: [
          'By using relationships',
          'By creating forms',
          'By running queries',
          'By designing reports',
        ],
        correctAnswer: 'By using relationships',
      },
      {
        id: '7',
        question: 'What does a form in Access do?',
        options: [
          'Stores data',
          'Displays data in a user-friendly format',
          'Generates reports',
          'Runs queries',
        ],
        correctAnswer: 'Displays data in a user-friendly format',
      },
      {
        id: '8',
        question: 'Which of the following is NOT a valid way to create a query in Access?',
        options: [
          'Query Design View',
          'SQL View',
          'Import View',
          'Create from Table',
        ],
        correctAnswer: 'Import View',
      },
      {
        id: '9',
        question: 'What does the Report Wizard in Access help you create?',
        options: [
          'Forms',
          'Tables',
          'Queries',
          'Reports',
        ],
        correctAnswer: 'Reports',
      },
      {
        id: '10',
        question: 'Which of the following file extensions is used for an Access database?',
        options: ['.xls', '.docx', '.mdb', '.ppt'],
        correctAnswer: '.mdb',
      },
];

export default function QuizPage({ navigation }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const courseTitle = 'Microsoft Access'; // Define the course title

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
      <Text style={styles.quizTitle}>MS Access Quiz</Text>
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
                onPress={() => navigation.navigate('AccessCertificatePage', { score, courseTitle })} // Pass the course title
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

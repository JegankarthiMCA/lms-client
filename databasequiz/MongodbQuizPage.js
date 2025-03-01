import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';

const questions = [
    {
        id: '1',
        question: 'What type of database is MongoDB?',
        options: [
          'Relational database',
          'Document-oriented database',
          'Graph database',
          'Key-value store',
        ],
        correctAnswer: 'Document-oriented database',
      },
      {
        id: '2',
        question: 'What format does MongoDB store data in?',
        options: [
          'XML',
          'JSON-like format (BSON)',
          'CSV',
          'Plain text',
        ],
        correctAnswer: 'JSON-like format (BSON)',
      },
      {
        id: '3',
        question: 'What command is used to insert a document in MongoDB?',
        options: [
          'add()',
          'insert()',
          'save()',
          'insertOne()',
        ],
        correctAnswer: 'insertOne()',
      },
      {
        id: '4',
        question: 'Which command is used to retrieve all documents from a collection?',
        options: [
          'find()',
          'get()',
          'select()',
          'fetch()',
        ],
        correctAnswer: 'find()',
      },
      {
        id: '5',
        question: 'What is a collection in MongoDB?',
        options: [
          'A single document',
          'A group of related documents',
          'A type of database',
          'A database index',
        ],
        correctAnswer: 'A group of related documents',
      },
      {
        id: '6',
        question: 'Which of the following is a valid way to query for documents in MongoDB?',
        options: [
          '{ "name": "John" }',
          'SELECT * FROM users',
          'query.users.find()',
          'getAll("users")',
        ],
        correctAnswer: '{ "name": "John" }',
      },
      {
        id: '7',
        question: 'What does the acronym CRUD stand for?',
        options: [
          'Create, Read, Update, Delete',
          'Create, Retrieve, Update, Delete',
          'Collect, Read, Update, Delete',
          'Connect, Read, Update, Delete',
        ],
        correctAnswer: 'Create, Read, Update, Delete',
      },
      {
        id: '8',
        question: 'What is the purpose of an index in MongoDB?',
        options: [
          'To store data',
          'To speed up data retrieval',
          'To enforce data integrity',
          'To create relationships between collections',
        ],
        correctAnswer: 'To speed up data retrieval',
      },
      {
        id: '9',
        question: 'Which method is used to update a document in MongoDB?',
        options: [
          'update()',
          'modify()',
          'change()',
          'updateOne()',
        ],
        correctAnswer: 'updateOne()',
      },
      {
        id: '10',
        question: 'What does MongoDB use to represent the unique identifier for a document?',
        options: [
          'ID',
          'Key',
          'GUID',
          '_id',
        ],
        correctAnswer: '_id',
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
      <Text style={styles.quizTitle}>Mongodb Quiz</Text>
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
                onPress={() => navigation.navigate('MongodbCertificatePage', { score, result: 'Pass' })}
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

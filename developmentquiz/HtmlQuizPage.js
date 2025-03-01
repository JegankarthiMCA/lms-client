import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';

const questions = [
  {
    id: '1',
    question: 'What does HTML stand for?',
    options: ['HyperText Markup Language', 'HighText Machine Language', 'HyperType Markup Language', 'None'],
    correctAnswer: 'HyperText Markup Language',
  },
  {
    id: '2',
    question: 'Who is making the Web standards?',
    options: ['Google', 'Microsoft', 'Mozilla', 'The World Wide Web Consortium'],
    correctAnswer: 'The World Wide Web Consortium',
  },
  {
    id: '3',
    question: 'What is the correct sequence of HTML tags for starting a webpage?',
    options: ['Head, Title, HTML', 'HTML, Head, Title', 'Title, Head, HTML', 'None'],
    correctAnswer: 'HTML, Head, Title',
  },
  {
    id: '4',
    question: 'Choose the correct HTML element for the largest heading:',
    options: ['<h1>', '<h6>', '<heading>', '<head>'],
    correctAnswer: '<h1>',
  },
  {
    id: '5',
    question: 'Which HTML attribute is used to define inline styles?',
    options: ['style', 'font', 'class', 'styles'],
    correctAnswer: 'style',
  },
  {
    id: '6',
    question: 'What is the correct HTML element for inserting a line break?',
    options: ['<br>', '<lb>', '<break>', '<lnbr>'],
    correctAnswer: '<br>',
  },
  {
    id: '7',
    question: 'Which of the following is a block-level element?',
    options: ['<div>', '<span>', '<a>', '<img>'],
    correctAnswer: '<div>',
  },
  {
    id: '8',
    question: 'Which HTML element is used to specify a footer for a document or section?',
    options: ['<footer>', '<bottom>', '<section>', '<foot>'],
    correctAnswer: '<footer>',
  },
  {
    id: '9',
    question: 'How can you make a numbered list in HTML?',
    options: ['<ul>', '<ol>', '<dl>', '<list>'],
    correctAnswer: '<ol>',
  },
  {
    id: '10',
    question: 'Which HTML element defines navigation links?',
    options: ['<nav>', '<navigate>', '<menu>', '<navigation>'],
    correctAnswer: '<nav>',
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
      <Text style={styles.quizTitle}>HTML Quiz</Text>
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
                onPress={() => navigation.navigate('HtmlCertificatePage', { score, result: 'Pass' })}
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

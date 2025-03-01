import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';

const questions = [
    {
        id: '1',
        question: 'What does CSS stand for?',
        options: ['Cascading Style Sheets', 'Computer Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets'],
        correctAnswer: 'Cascading Style Sheets',
      },
      {
        id: '2',
        question: 'Which CSS property controls the text size?',
        options: ['font-size', 'text-size', 'font-style', 'text-style'],
        correctAnswer: 'font-size',
      },
      {
        id: '3',
        question: 'How do you add a background color in CSS?',
        options: ['background-color', 'color-background', 'bg-color', 'color'],
        correctAnswer: 'background-color',
      },
      {
        id: '4',
        question: 'Which is the correct CSS syntax?',
        options: ['body {color: black;}', '{body;color:black;}', 'body:color=black;', 'body[color: black;]'],
        correctAnswer: 'body {color: black;}',
      },
      {
        id: '5',
        question: 'How do you make the text bold in CSS?',
        options: ['font-weight: bold;', 'font-style: bold;', 'text-weight: bold;', 'text-style: bold;'],
        correctAnswer: 'font-weight: bold;',
      },
      {
        id: '6',
        question: 'How do you center an element horizontally in CSS?',
        options: ['margin: 0 auto;', 'text-align: center;', 'padding: auto;', 'display: block;'],
        correctAnswer: 'margin: 0 auto;',
      },
      {
        id: '7',
        question: 'Which property is used to change the font of an element?',
        options: ['font-family', 'font-style', 'font-weight', 'font-size'],
        correctAnswer: 'font-family',
      },
      {
        id: '8',
        question: 'Which property is used to change the background image?',
        options: ['background-image', 'img-background', 'background-img', 'img-src'],
        correctAnswer: 'background-image',
      },
      {
        id: '9',
        question: 'Which CSS property controls the space between elements?',
        options: ['margin', 'padding', 'border', 'spacing'],
        correctAnswer: 'margin',
      },
      {
        id: '10',
        question: 'Which property is used to underline text?',
        options: ['text-decoration', 'text-underline', 'font-decoration', 'underline'],
        correctAnswer: 'text-decoration',
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
      <Text style={styles.quizTitle}>CSS Quiz</Text>
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
                onPress={() => navigation.navigate('CssCertificatePage', { score, result: 'Pass' })}
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

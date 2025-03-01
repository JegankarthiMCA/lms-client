import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';

const questions = [
    {
        id: '1',
        question: 'What is JavaScript?',
        options: [
          'A programming language used to create dynamic content on web pages',
          'A style sheet language for describing the presentation of a document',
          'A markup language for structuring content',
          'A database management system'
        ],
        correctAnswer: 'A programming language used to create dynamic content on web pages',
      },
      {
        id: '2',
        question: 'Which of the following is a JavaScript data type?',
        options: ['String', 'Number', 'Boolean', 'All of the above'],
        correctAnswer: 'All of the above',
      },
      {
        id: '3',
        question: 'What is the purpose of the `console.log()` function?',
        options: [
          'To display output to the console',
          'To stop the execution of a script',
          'To create an alert box',
          'To prompt the user for input'
        ],
        correctAnswer: 'To display output to the console',
      },
      {
        id: '4',
        question: 'Which of the following is the correct way to define a function in JavaScript?',
        options: [
          'function myFunction() {}',
          'function:myFunction() {}',
          'def myFunction() {}',
          'myFunction() = function {}'
        ],
        correctAnswer: 'function myFunction() {}',
      },
      {
        id: '5',
        question: 'What does the `typeof` operator do?',
        options: [
          'It checks the type of a variable',
          'It converts a variable to a string',
          'It creates a new object',
          'It removes a property from an object'
        ],
        correctAnswer: 'It checks the type of a variable',
      },
      {
        id: '6',
        question: 'Which symbol is used for comments in JavaScript?',
        options: [
          '// for single-line comments and /* */ for multi-line comments',
          '# for single-line comments and /* */ for multi-line comments',
          '/* */ for single-line comments and // for multi-line comments',
          '// for multi-line comments and # for single-line comments'
        ],
        correctAnswer: '// for single-line comments and /* */ for multi-line comments',
      },
      {
        id: '7',
        question: 'What is the result of the expression `Boolean(0)`?',
        options: ['true', 'false', 'undefined', 'null'],
        correctAnswer: 'false',
      },
      {
        id: '8',
        question: 'What will `console.log(typeof null)` output?',
        options: ['null', 'object', 'undefined', 'string'],
        correctAnswer: 'object',
      },
      {
        id: '9',
        question: 'How do you create an array in JavaScript?',
        options: [
          'var myArray = {}',
          'var myArray = []',
          'var myArray = ()',
          'var myArray = <>'
        ],
        correctAnswer: 'var myArray = []',
      },
      {
        id: '10',
        question: 'Which method is used to add a new element to the end of an array?',
        options: [
          'add()',
          'push()',
          'append()',
          'insert()'
        ],
        correctAnswer: 'push()',
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
      <Text style={styles.quizTitle}>JavaScript Quiz</Text>
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
                onPress={() => navigation.navigate('JavascriptCertificatePage', { score, result: 'Pass' })}
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

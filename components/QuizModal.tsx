import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from '@/context/LanguageContext';
import LottieView from 'lottie-react-native';

// Definir la interfaz para las preguntas
interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

// Definir props para el componente
interface QuizModalProps {
  visible: boolean;
  onClose: (success: boolean) => void;
  onResetPreviousNode: () => void;
  quizType?: 'basic' | 'advanced';
}

const QuizModal: React.FC<QuizModalProps> = ({ 
  visible, 
  onClose, 
  onResetPreviousNode,
  quizType = 'basic'
}) => {
  const { t } = useLanguage();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [tooManyErrors, setTooManyErrors] = useState(false);
  
  // Reiniciar el estado cuando se abre el modal
  useEffect(() => {
    if (visible) {
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setShowResult(false);
      setIsCorrect(false);
      setIncorrectAttempts(0);
      setQuizCompleted(false);
      setTooManyErrors(false);
    }
  }, [visible]);
  
  // Función para generar las preguntas del quiz básico
  const generateBasicQuestions = (): QuizQuestion[] => {
    return [
      {
        question: t('quiz_question_1'),
        options: [
          t('quiz_q1_option_1'),
          t('quiz_q1_option_2'),
          t('quiz_q1_option_3'),
          t('quiz_q1_option_4')
        ],
        correctAnswer: 2 // Índice de la respuesta correcta (0-based)
      },
      {
        question: t('quiz_question_2'),
        options: [
          t('quiz_q2_option_1'),
          t('quiz_q2_option_2'),
          t('quiz_q2_option_3'),
          t('quiz_q2_option_4')
        ],
        correctAnswer: 0
      },
      {
        question: t('quiz_question_3'),
        options: [
          t('quiz_q3_option_1'),
          t('quiz_q3_option_2'),
          t('quiz_q3_option_3'),
          t('quiz_q3_option_4')
        ],
        correctAnswer: 1
      },
      {
        question: t('quiz_question_4'),
        options: [
          t('quiz_q4_option_1'),
          t('quiz_q4_option_2'),
          t('quiz_q4_option_3'),
          t('quiz_q4_option_4')
        ],
        correctAnswer: 3
      },
      {
        question: t('quiz_question_5'),
        options: [
          t('quiz_q5_option_1'),
          t('quiz_q5_option_2'),
          t('quiz_q5_option_3'),
          t('quiz_q5_option_4')
        ],
        correctAnswer: 1
      },
      {
        question: t('quiz_question_6'),
        options: [
          t('quiz_q6_option_1'),
          t('quiz_q6_option_2'),
          t('quiz_q6_option_3'),
          t('quiz_q6_option_4')
        ],
        correctAnswer: 2
      }
    ];
  };
  
  // Función para generar las preguntas del quiz avanzado
  const generateAdvancedQuestions = (): QuizQuestion[] => {
    return [
      {
        question: t('advanced_quiz_question_1'),
        options: [
          t('advanced_q1_option_1'),
          t('advanced_q1_option_2'),
          t('advanced_q1_option_3'),
          t('advanced_q1_option_4')
        ],
        correctAnswer: 3 // Índice de la respuesta correcta (0-based)
      },
      {
        question: t('advanced_quiz_question_2'),
        options: [
          t('advanced_q2_option_1'),
          t('advanced_q2_option_2'),
          t('advanced_q2_option_3'),
          t('advanced_q2_option_4')
        ],
        correctAnswer: 1
      },
      {
        question: t('advanced_quiz_question_3'),
        options: [
          t('advanced_q3_option_1'),
          t('advanced_q3_option_2'),
          t('advanced_q3_option_3'),
          t('advanced_q3_option_4')
        ],
        correctAnswer: 0
      },
      {
        question: t('advanced_quiz_question_4'),
        options: [
          t('advanced_q4_option_1'),
          t('advanced_q4_option_2'),
          t('advanced_q4_option_3'),
          t('advanced_q4_option_4')
        ],
        correctAnswer: 3
      },
      {
        question: t('advanced_quiz_question_5'),
        options: [
          t('advanced_q5_option_1'),
          t('advanced_q5_option_2'),
          t('advanced_q5_option_3'),
          t('advanced_q5_option_4')
        ],
        correctAnswer: 1
      },
      {
        question: t('advanced_quiz_question_6'),
        options: [
          t('advanced_q6_option_1'),
          t('advanced_q6_option_2'),
          t('advanced_q6_option_3'),
          t('advanced_q6_option_4')
        ],
        correctAnswer: 2
      }
    ];
  };
  
  // Seleccionar el conjunto de preguntas según el tipo de quiz
  const questions = quizType === 'basic' ? generateBasicQuestions() : generateAdvancedQuestions();
  
  // Obtener la pregunta actual
  const currentQuestion = questions[currentQuestionIndex];
  
  // Manejar la selección de una opción
  const handleOptionSelect = (index: number) => {
    if (!showResult) {
      setSelectedOption(index);
    }
  };
  
  // Verificar la respuesta
  const checkAnswer = () => {
    if (selectedOption === null) return;
    
    const isAnswerCorrect = selectedOption === currentQuestion.correctAnswer;
    setIsCorrect(isAnswerCorrect);
    setShowResult(true);
    
    if (!isAnswerCorrect) {
      // Incrementar el contador de intentos incorrectos
      const newIncorrectAttempts = incorrectAttempts + 1;
      setIncorrectAttempts(newIncorrectAttempts);
      
      // Si hay demasiados intentos incorrectos (3), bloquear el quiz
      if (newIncorrectAttempts >= 3) {
        setTooManyErrors(true);
      }
    }
  };
  
  // Pasar a la siguiente pregunta
  const goToNextQuestion = () => {
    setSelectedOption(null);
    setShowResult(false);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completado
      setQuizCompleted(true);
    }
  };
  
  // Manejar el cierre del modal
  const handleClose = () => {
    if (quizCompleted) {
      onClose(true); // Quiz completado con éxito
    } else if (tooManyErrors) {
      onClose(false); // Quiz no completado
      onResetPreviousNode(); // Reiniciar el nodo anterior
    } else {
      onClose(false); // Quiz no completado
    }
  };
  
  // Obtener el título del quiz según el tipo
  const quizTitle = quizType === 'basic' ? t('quiz_title') : t('advanced_quiz_title');

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity 
            style={styles.closeIconButton} 
            onPress={handleClose}
          >
            <MaterialIcons name="close" size={24} color="#666" />
          </TouchableOpacity>
          {!quizCompleted && !tooManyErrors ? (
            <>
              <Text style={styles.title}>{quizTitle}</Text>
              <Text style={styles.questionCounter}>
                {t('quiz_question_counter')
                  .replace('{current}', (currentQuestionIndex + 1).toString())
                  .replace('{total}', questions.length.toString())}
              </Text>
              
              <View style={styles.questionContainer}>
                <Text style={styles.question}>{currentQuestion.question}</Text>
                
                {currentQuestion.options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionButton,
                      selectedOption === index && styles.selectedOption,
                      showResult && index === currentQuestion.correctAnswer && styles.correctOption,
                      showResult && selectedOption === index && selectedOption !== currentQuestion.correctAnswer && styles.incorrectOption
                    ]}
                    onPress={() => handleOptionSelect(index)}
                    disabled={showResult}
                  >
                    <Text style={[
                      styles.optionText,
                      showResult && index === currentQuestion.correctAnswer && styles.correctOptionText,
                      showResult && selectedOption === index && selectedOption !== currentQuestion.correctAnswer && styles.incorrectOptionText
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              {showResult && (
                <View style={styles.resultContainer}>
                  {isCorrect ? (
                    <>
                      <Text style={styles.correctText}>{t('quiz_completed_title')}</Text>
                      <TouchableOpacity
                        style={styles.nextButton}
                        onPress={goToNextQuestion}
                      >
                        <Text style={styles.nextButtonText}>{t('continue')}</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <Text style={styles.incorrectText}>{t('quiz_incorrect_title')}</Text>
                      <Text style={styles.incorrectSubText}>{t('quiz_incorrect_message')}</Text>
                      <TouchableOpacity
                        style={styles.tryAgainButton}
                        onPress={() => {
                          setSelectedOption(null);
                          setShowResult(false);
                        }}
                      >
                        <Text style={styles.tryAgainButtonText}>{t('try_again')}</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              )}
              
              {!showResult && (
                <TouchableOpacity
                  style={[styles.checkButton, selectedOption === null && styles.disabledButton]}
                  onPress={checkAnswer}
                  disabled={selectedOption === null}
                >
                  <Text style={styles.checkButtonText}>{t('check_answer')}</Text>
                </TouchableOpacity>
              )}
            </>
          ) : quizCompleted ? (
            <View style={styles.completedContainer}>
              <Text style={styles.completedTitle}>{t('quiz_completed_title')}</Text>
              <Text style={styles.completedText}>{t('quiz_completed_message')}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => onClose(true)}
              >
                <Text style={styles.closeButtonText}>{t('continue')}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            tooManyErrors && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorTitle}>{t('quiz_too_many_errors_title')}</Text>
                <Text style={styles.errorText}>{t('quiz_too_many_errors_message')}</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    onResetPreviousNode();
                    onClose(false);
                  }}
                >
                  <Text style={styles.closeButtonText}>{t('continue')}</Text>
                </TouchableOpacity>
              </View>
            )
          )}
        </View>
      </View>
    </Modal>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  closeIconButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  modalContent: {
    width: width * 0.92,
    maxHeight: height * 0.85,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 25,
    paddingTop: 25,
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
    color: '#3498db',
    width: '80%',
  },
  questionCounter: {
    fontSize: 16,
    marginBottom: 20,
    color: '#7f8c8d',
  },
  questionContainer: {
    width: '100%',
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    width: '100%',
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedOption: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196f3',
  },
  correctOption: {
    backgroundColor: '#e8f5e9',
    borderColor: '#4caf50',
  },
  incorrectOption: {
    backgroundColor: '#ffebee',
    borderColor: '#f44336',
  },
  optionText: {
    fontSize: 16,
  },
  correctOptionText: {
    color: '#4caf50',
    fontWeight: 'bold',
  },
  incorrectOptionText: {
    color: '#f44336',
    fontWeight: 'bold',
  },
  checkButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#bdc3c7',
  },
  checkButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  animation: {
    width: 150,
    height: 150,
  },
  correctText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4caf50',
    marginTop: 10,
  },
  incorrectText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f44336',
    marginTop: 10,
  },
  incorrectSubText: {
    fontSize: 16,
    color: '#f44336',
    marginTop: 5,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tryAgainButton: {
    backgroundColor: '#f44336',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  tryAgainButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  completedContainer: {
    alignItems: 'center',
    padding: 20,
  },
  trophyAnimation: {
    width: 200,
    height: 200,
  },
  completedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4caf50',
    marginTop: 20,
  },
  completedText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorContainer: {
    alignItems: 'center',
    padding: 20,
  },
  errorAnimation: {
    width: 150,
    height: 150,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f44336',
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
});

export default QuizModal;

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Definir los tipos para nuestro contexto
type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Definir el tipo para las traducciones
interface TranslationDictionary {
  [key: string]: string;
}

interface Translations {
  es: TranslationDictionary;
  en: TranslationDictionary;
}

// Crear el contexto con un valor predeterminado
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Traducciones
const translations: Translations = {
  es: {
    // Títulos y subtítulos
    'learningPath': 'Ruta de Aprendizaje',
    'completeNodes': 'Completa los nodos para avanzar',
    
    // Nodos
    'introduction': 'Tutorial',
    'basicConcepts': 'Let\'s build GPT: from scratch, in code, spelled out.',
    'intermediateLevel': 'Quiz: Construyendo un LLM',
    'advancedLevel': 'Deep Dive into LLMs like ChatGPT',
    'finalChallenge': 'Quiz Avanzado: Dominando LLMs',
    
    // Alertas
    'nodeCompleted': 'Nodo Completado',
    'alreadyCompleted': 'Ya has completado este nivel. ¡Continúa con el siguiente!',
    'congratulations': '¡Felicidades!',
    'completedLevel': 'Has completado el nivel:',
    'allLevelsCompleted': '¡Has completado todos los niveles!',
    'continue': 'Continuar',
    'close': 'Cerrar',
    'completePreviousNodes': 'Debes completar los nodos anteriores primero.',
    'please_watch_video': 'Por favor, mira el video completo',
    'video_completed_message': '¡Video completado! Haz clic en Continuar para avanzar',
    
    // Configuración
    'language': 'Idioma',
    'spanish': 'Español',
    'english': 'Inglés',
    
    // Tutorial
    'tutorial': 'Tutorial',
    'tutorialTitle': 'Bienvenido al Tutorial',
    'tutorialStep1Title': 'Camino de Nodos',
    'tutorialStep1Text': 'Esta aplicación te permite avanzar a través de un camino de nodos de aprendizaje.',
    'tutorialStep2Title': 'Completar Nodos',
    'tutorialStep2Text': 'Toca un nodo desbloqueado para completarlo y desbloquear el siguiente nivel.',
    'tutorialStep3Title': 'Cambiar Idioma',
    'tutorialStep3Text': 'Puedes cambiar el idioma usando el botón en la parte superior derecha.',
    'tutorialStep4Title': 'Recompensa Final',
    'tutorialStep4Text': 'Al completar todos los nodos, recibirás una recompensa especial.',
    'next': 'Siguiente',
    'previous': 'Anterior',
    'finish': 'Finalizar',
    'skip': 'Omitir',
    
    // Video
    'watchVideo': 'Ver Video',
    'videoTitle': 'Let\'s build GPT: from scratch, in code, spelled out.',
    'watchVideoDescription': 'Este nodo contiene un video educativo sobre cómo construir GPT desde cero. Haz clic en el botón "Ver Video" para ver el video.',
    'advancedVideoTitle': 'Deep Dive into LLMs like ChatGPT',
    'advancedVideoDescription': 'Este nodo contiene un video avanzado sobre modelos de lenguaje grandes como ChatGPT. Haz clic en el botón "Ver Video" para ver el video.',
    
    // Quiz
    'quiz_title': 'Quiz: Construyendo un LLM como ChatGPT',
    'advanced_quiz_title': 'Quiz Avanzado: Dominando LLMs',
    'quiz_question_counter': 'Pregunta {current} de {total}',
    'check_answer': 'Verificar Respuesta',
    'try_again': 'Intentar de nuevo',
    'quiz_completed_title': '¡Quiz Completado!',
    'quiz_completed_message': '¡Felicidades! Has completado el quiz correctamente. Ahora puedes avanzar al siguiente nivel.',
    'quiz_incorrect_title': 'Respuesta Incorrecta',
    'quiz_incorrect_message': 'Tu respuesta es incorrecta. Por favor, intenta de nuevo.',
    'quiz_too_many_errors_title': 'Demasiados Intentos Fallidos',
    'quiz_too_many_errors_message': 'Has tenido demasiados intentos fallidos. Debes volver a ver el video para reforzar tus conocimientos.',
    
    // Preguntas del Quiz Básico
    'quiz_question_1': '¿Cuál es el componente principal de un modelo de lenguaje grande (LLM) como GPT?',
    'quiz_q1_option_1': 'Una red neuronal convolucional (CNN)',
    'quiz_q1_option_2': 'Una red neuronal recurrente (RNN)',
    'quiz_q1_option_3': 'Un transformador con mecanismo de atención',
    'quiz_q1_option_4': 'Un modelo de Markov oculto (HMM)',
    
    'quiz_question_2': '¿Qué significa "GPT" en el contexto de los modelos de lenguaje?',
    'quiz_q2_option_1': 'Generative Pre-trained Transformer',
    'quiz_q2_option_2': 'General Purpose Text-generator',
    'quiz_q2_option_3': 'Global Processing Technology',
    'quiz_q2_option_4': 'Graph Pattern Transformer',
    
    'quiz_question_3': '¿Cuál es el propósito del "tokenizer" en un modelo como GPT?',
    'quiz_q3_option_1': 'Verificar la gramática del texto',
    'quiz_q3_option_2': 'Convertir el texto en tokens numéricos que el modelo puede procesar',
    'quiz_q3_option_3': 'Encriptar el texto para mayor seguridad',
    'quiz_q3_option_4': 'Comprimir el texto para reducir el uso de memoria',
    
    'quiz_question_4': '¿Qué técnica se utiliza en GPT para predecir la siguiente palabra en una secuencia?',
    'quiz_q4_option_1': 'Regresión lineal',
    'quiz_q4_option_2': 'Clasificación bayesiana',
    'quiz_q4_option_3': 'Árboles de decisión',
    'quiz_q4_option_4': 'Atención de múltiples cabezas (Multi-head attention)',
    
    'quiz_question_5': '¿Qué significa "fine-tuning" en el contexto de los modelos de lenguaje?',
    'quiz_q5_option_1': 'Optimizar el código para mayor velocidad',
    'quiz_q5_option_2': 'Ajustar un modelo pre-entrenado para una tarea específica',
    'quiz_q5_option_3': 'Reducir el tamaño del modelo',
    'quiz_q5_option_4': 'Mejorar la interfaz de usuario',
    
    'quiz_question_6': '¿Cuál es uno de los principales desafíos al entrenar un LLM como GPT?',
    'quiz_q6_option_1': 'Encontrar suficientes programadores',
    'quiz_q6_option_2': 'Diseñar una interfaz de usuario atractiva',
    'quiz_q6_option_3': 'La enorme cantidad de recursos computacionales necesarios',
    'quiz_q6_option_4': 'Mantener el código compatible con diferentes navegadores',
    
    // Preguntas del Quiz Avanzado
    'advanced_quiz_question_1': '¿Qué técnica se utiliza para reducir el problema de "alucinaciones" en los LLMs?',
    'advanced_q1_option_1': 'Aumentar el tamaño del modelo',
    'advanced_q1_option_2': 'Entrenamiento con datos de mayor calidad y técnicas de RLHF',
    'advanced_q1_option_3': 'Reducir la temperatura durante la generación',
    'advanced_q1_option_4': 'Todas las anteriores',
    
    'advanced_quiz_question_2': '¿Qué es la "temperatura" en el contexto de generación de texto con LLMs?',
    'advanced_q2_option_1': 'La velocidad de procesamiento del modelo',
    'advanced_q2_option_2': 'Un parámetro que controla la aleatoriedad de las predicciones',
    'advanced_q2_option_3': 'El consumo energético durante la inferencia',
    'advanced_q2_option_4': 'La cantidad de memoria RAM utilizada',
    
    'advanced_quiz_question_3': '¿Qué significa RLHF en el contexto de los LLMs?',
    'advanced_q3_option_1': 'Reinforcement Learning from Human Feedback',
    'advanced_q3_option_2': 'Recursive Learning with Hidden Features',
    'advanced_q3_option_3': 'Robust Language Handling Framework',
    'advanced_q3_option_4': 'Responsive Language Heuristic Function',
    
    'advanced_quiz_question_4': '¿Cuál de estas NO es una aplicación común de los LLMs?',
    'advanced_q4_option_1': 'Generación de código',
    'advanced_q4_option_2': 'Traducción de idiomas',
    'advanced_q4_option_3': 'Análisis de sentimiento',
    'advanced_q4_option_4': 'Renderizado de gráficos 3D en tiempo real',
    
    'advanced_quiz_question_5': '¿Qué es un "prompt" en el contexto de los LLMs?',
    'advanced_q5_option_1': 'Un error que ocurre durante el entrenamiento',
    'advanced_q5_option_2': 'La entrada de texto que se proporciona al modelo para generar una respuesta',
    'advanced_q5_option_3': 'El hardware especializado para ejecutar modelos de lenguaje',
    'advanced_q5_option_4': 'Un método para comprimir el modelo',
    
    'advanced_quiz_question_6': '¿Qué técnica permite a los LLMs manejar contextos más largos?',
    'advanced_q6_option_1': 'Reducir el tamaño del vocabulario',
    'advanced_q6_option_2': 'Aumentar el número de capas del modelo',
    'advanced_q6_option_3': 'Técnicas como Attention with Linear Complexity o Sliding Window Attention',
    'advanced_q6_option_4': 'Disminuir la dimensión de los embeddings',
  },
  en: {
    // Titles and subtitles
    'learningPath': 'Learning Path',
    'completeNodes': 'Complete nodes to advance',
    
    // Nodes
    'introduction': 'Tutorial',
    'basicConcepts': 'Let\'s build GPT: from scratch, in code, spelled out.',
    'intermediateLevel': 'Quiz: Building an LLM',
    'advancedLevel': 'Deep Dive into LLMs like ChatGPT',
    'finalChallenge': 'Advanced Quiz: Mastering LLMs',
    
    // Alerts
    'nodeCompleted': 'Node Completed',
    'alreadyCompleted': 'You have already completed this level. Continue to the next one!',
    'congratulations': 'Congratulations!',
    'completedLevel': 'You have completed the level:',
    'allLevelsCompleted': 'You have completed all levels!',
    'continue': 'Continue',
    'close': 'Close',
    'completePreviousNodes': 'You must complete previous nodes first.',
    'please_watch_video': 'Please watch the full video',
    'video_completed_message': 'Video completed! Click Continue to proceed',
    
    // Settings
    'language': 'Language',
    'spanish': 'Spanish',
    'english': 'English',
    
    // Tutorial
    'tutorial': 'Tutorial',
    'tutorialTitle': 'Welcome to the Tutorial',
    'tutorialStep1Title': 'Node Path',
    'tutorialStep1Text': 'This application allows you to progress through a learning node path.',
    'tutorialStep2Title': 'Complete Nodes',
    'tutorialStep2Text': 'Tap an unlocked node to complete it and unlock the next level.',
    'tutorialStep3Title': 'Change Language',
    'tutorialStep3Text': 'You can change the language using the button in the top right corner.',
    'tutorialStep4Title': 'Final Reward',
    'tutorialStep4Text': 'When you complete all nodes, you will receive a special reward.',
    'next': 'Next',
    'previous': 'Previous',
    'finish': 'Finish',
    'skip': 'Skip',
    
    // Video
    'watchVideo': 'Watch Video',
    'videoTitle': 'Let\'s build GPT: from scratch, in code, spelled out.',
    'watchVideoDescription': 'This node contains an educational video about building GPT from scratch. Click the "Watch Video" button to watch the video.',
    'advancedVideoTitle': 'Deep Dive into LLMs like ChatGPT',
    'advancedVideoDescription': 'This node contains an advanced video about large language models like ChatGPT. Click the "Watch Video" button to watch the video.',
    
    // Quiz
    'quiz_title': 'Quiz: Building an LLM like ChatGPT',
    'advanced_quiz_title': 'Advanced Quiz: Mastering LLMs',
    'quiz_question_counter': 'Question {current} of {total}',
    'check_answer': 'Check Answer',
    'try_again': 'Try Again',
    'quiz_completed_title': 'Quiz Completed!',
    'quiz_completed_message': 'Congratulations! You have successfully completed the quiz. You can now advance to the next level.',
    'quiz_incorrect_title': 'Incorrect Answer',
    'quiz_incorrect_message': 'Your answer is incorrect. Please try again.',
    'quiz_too_many_errors_title': 'Too Many Failed Attempts',
    'quiz_too_many_errors_message': 'You have had too many failed attempts. You need to go back and watch the video again to reinforce your knowledge.',
    
    // Basic Quiz Questions
    'quiz_question_1': 'What is the main component of a large language model (LLM) like GPT?',
    'quiz_q1_option_1': 'A Convolutional Neural Network (CNN)',
    'quiz_q1_option_2': 'A Recurrent Neural Network (RNN)',
    'quiz_q1_option_3': 'A Transformer with attention mechanism',
    'quiz_q1_option_4': 'A Hidden Markov Model (HMM)',
    
    'quiz_question_2': 'What does "GPT" stand for in the context of language models?',
    'quiz_q2_option_1': 'Generative Pre-trained Transformer',
    'quiz_q2_option_2': 'General Purpose Text-generator',
    'quiz_q2_option_3': 'Global Processing Technology',
    'quiz_q2_option_4': 'Graph Pattern Transformer',
    
    'quiz_question_3': 'What is the purpose of the "tokenizer" in a model like GPT?',
    'quiz_q3_option_1': 'To check the grammar of the text',
    'quiz_q3_option_2': 'To convert text into numerical tokens that the model can process',
    'quiz_q3_option_3': 'To encrypt the text for better security',
    'quiz_q3_option_4': 'To compress the text to reduce memory usage',
    
    'quiz_question_4': 'What technique is used in GPT to predict the next word in a sequence?',
    'quiz_q4_option_1': 'Linear regression',
    'quiz_q4_option_2': 'Bayesian classification',
    'quiz_q4_option_3': 'Decision trees',
    'quiz_q4_option_4': 'Multi-head attention',
    
    'quiz_question_5': 'What does "fine-tuning" mean in the context of language models?',
    'quiz_q5_option_1': 'Optimizing the code for better speed',
    'quiz_q5_option_2': 'Adjusting a pre-trained model for a specific task',
    'quiz_q5_option_3': 'Reducing the size of the model',
    'quiz_q5_option_4': 'Improving the user interface',
    
    'quiz_question_6': 'What is one of the main challenges when training an LLM like GPT?',
    'quiz_q6_option_1': 'Finding enough programmers',
    'quiz_q6_option_2': 'Designing an attractive user interface',
    'quiz_q6_option_3': 'The enormous amount of computational resources required',
    'quiz_q6_option_4': 'Keeping the code compatible with different browsers',
    
    // Advanced Quiz Questions
    'advanced_quiz_question_1': 'What technique is used to reduce the "hallucination" problem in LLMs?',
    'advanced_q1_option_1': 'Increasing the model size',
    'advanced_q1_option_2': 'Training with higher quality data and RLHF techniques',
    'advanced_q1_option_3': 'Reducing temperature during generation',
    'advanced_q1_option_4': 'All of the above',
    
    'advanced_quiz_question_2': 'What is "temperature" in the context of text generation with LLMs?',
    'advanced_q2_option_1': 'The processing speed of the model',
    'advanced_q2_option_2': 'A parameter that controls the randomness of predictions',
    'advanced_q2_option_3': 'The energy consumption during inference',
    'advanced_q2_option_4': 'The amount of RAM memory used',
    
    'advanced_quiz_question_3': 'What does RLHF stand for in the context of LLMs?',
    'advanced_q3_option_1': 'Reinforcement Learning from Human Feedback',
    'advanced_q3_option_2': 'Recursive Learning with Hidden Features',
    'advanced_q3_option_3': 'Robust Language Handling Framework',
    'advanced_q3_option_4': 'Responsive Language Heuristic Function',
    
    'advanced_quiz_question_4': 'Which of these is NOT a common application of LLMs?',
    'advanced_q4_option_1': 'Code generation',
    'advanced_q4_option_2': 'Language translation',
    'advanced_q4_option_3': 'Sentiment analysis',
    'advanced_q4_option_4': 'Real-time 3D graphics rendering',
    
    'advanced_quiz_question_5': 'What is a "prompt" in the context of LLMs?',
    'advanced_q5_option_1': 'An error that occurs during training',
    'advanced_q5_option_2': 'The text input provided to the model to generate a response',
    'advanced_q5_option_3': 'The specialized hardware for running language models',
    'advanced_q5_option_4': 'A method to compress the model',
    
    'advanced_quiz_question_6': 'What technique allows LLMs to handle longer contexts?',
    'advanced_q6_option_1': 'Reducing the vocabulary size',
    'advanced_q6_option_2': 'Increasing the number of model layers',
    'advanced_q6_option_3': 'Techniques like Attention with Linear Complexity or Sliding Window Attention',
    'advanced_q6_option_4': 'Decreasing the dimension of embeddings',
  }
};

// Proveedor del contexto
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es'); // Español por defecto
  
  // Función para obtener la traducción
  const t = (key: string): string => {
    return translations[language][key] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

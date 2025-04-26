import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, SafeAreaView } from 'react-native';
import SimpleNodePath from '@/components/SimpleNodePath';
import LanguageSwitch from '@/components/LanguageSwitch';
import TrophyAnimation from '@/components/TrophyAnimation';
import TutorialStepper from '@/components/TutorialStepper';
import YouTubePlayer from '@/components/YouTubePlayer';
import QuizModal from '@/components/QuizModal';
import { useLanguage } from '@/context/LanguageContext';

export default function ExploreScreen() {
  const { t } = useLanguage();
  const [showTrophy, setShowTrophy] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showAdvancedVideo, setShowAdvancedVideo] = useState(false);
  const [showAdvancedQuiz, setShowAdvancedQuiz] = useState(false);
  
  // IDs de los videos de YouTube
  const basicConceptsVideoId = 'kCc8FmEb1nY'; // Video de "How to Learn to Code"
  const advancedConceptsVideoId = '7xTGNNLPyMI'; // Video de "Deep Dive into LLMs like ChatGPT"
  
  // Estado para los nodos del camino
  const [nodes, setNodes] = useState([
    { id: '1', title: t('introduction'), completed: true, locked: false },
    { id: '2', title: t('basicConcepts'), completed: false, locked: false },
    { id: '3', title: t('intermediateLevel'), completed: false, locked: true },
    { id: '4', title: t('advancedLevel'), completed: false, locked: true },
    { id: '5', title: t('finalChallenge'), completed: false, locked: true },
  ]);

  // Función para manejar cuando se presiona un nodo
  const handleNodePress = (id: string) => {
    // Buscar el nodo seleccionado
    const nodeIndex = nodes.findIndex(node => node.id === id);
    
    if (nodeIndex === -1) return;
    
    // Si es el primer nodo (Tutorial), mostrar el tutorial
    if (id === '1') {
      setShowTutorial(true);
      return;
    }
    
    // Si es el segundo nodo (Let's build GPT), mostrar el video
    if (id === '2') {
      setShowVideo(true);
      return;
    }
    
    // Si es el tercer nodo (Quiz), mostrar el quiz
    if (id === '3') {
      setShowQuiz(true);
      return;
    }
    
    // Si es el cuarto nodo (Advanced Video), mostrar el video avanzado
    if (id === '4') {
      setShowAdvancedVideo(true);
      return;
    }
    
    // Si es el quinto nodo (Advanced Quiz), mostrar el quiz avanzado
    if (id === '5') {
      setShowAdvancedQuiz(true);
      return;
    }
    
    // Si el nodo ya está completado, mostrar un mensaje
    if (nodes[nodeIndex].completed) {
      Alert.alert(t('nodeCompleted'), t('alreadyCompleted'));
      return;
    }
    
    // Si el nodo está bloqueado, mostrar un mensaje
    if (nodes[nodeIndex].locked) {
      Alert.alert(t('nodeCompleted'), t('completePreviousNodes'));
      return;
    }
    
    // Simular completar un nodo
    const updatedNodes = [...nodes];
    updatedNodes[nodeIndex] = {
      ...updatedNodes[nodeIndex],
      completed: true
    };
    
    // Desbloquear el siguiente nodo si existe
    if (nodeIndex < nodes.length - 1) {
      updatedNodes[nodeIndex + 1] = {
        ...updatedNodes[nodeIndex + 1],
        locked: false
      };
    }
    
    setNodes(updatedNodes);
    
    // Verificar si es el último nodo
    if (nodeIndex === nodes.length - 1) {
      // Mostrar la animación del trofeo
      setShowTrophy(true);
    } else {
      // Mostrar mensaje de felicitación normal
      Alert.alert(t('congratulations'), `${t('completedLevel')} ${nodes[nodeIndex].title}`);
    }
  };

  // Función para manejar el cierre del reproductor de video básico
  const handleVideoClose = (videoCompleted: boolean) => {
    setShowVideo(false);
    
    if (videoCompleted) {
      // Si el video fue visto completamente, marcar el nodo como completado
      const updatedNodes = [...nodes];
      const nodeIndex = 1; // Índice del segundo nodo (0-based)
      
      updatedNodes[nodeIndex] = {
        ...updatedNodes[nodeIndex],
        completed: true
      };
      
      // Desbloquear el siguiente nodo (quiz)
      if (nodeIndex < nodes.length - 1) {
        updatedNodes[nodeIndex + 1] = {
          ...updatedNodes[nodeIndex + 1],
          locked: false
        };
      }
      
      setNodes(updatedNodes);
      
      // Mostrar mensaje de felicitación
      Alert.alert(t('congratulations'), `${t('completedLevel')} ${nodes[nodeIndex].title}`);
    }
  };
  
  // Función para manejar el cierre del reproductor de video avanzado
  const handleAdvancedVideoClose = (videoCompleted: boolean) => {
    setShowAdvancedVideo(false);
    
    if (videoCompleted) {
      // Si el video fue visto completamente, marcar el nodo como completado
      const updatedNodes = [...nodes];
      const nodeIndex = 3; // Índice del cuarto nodo (0-based)
      
      updatedNodes[nodeIndex] = {
        ...updatedNodes[nodeIndex],
        completed: true
      };
      
      // Desbloquear el siguiente nodo (desafío final)
      if (nodeIndex < nodes.length - 1) {
        updatedNodes[nodeIndex + 1] = {
          ...updatedNodes[nodeIndex + 1],
          locked: false
        };
      }
      
      setNodes(updatedNodes);
      
      // Mostrar mensaje de felicitación
      Alert.alert(t('congratulations'), `${t('completedLevel')} ${nodes[nodeIndex].title}`);
    }
  };

  // Función para manejar el cierre del quiz básico
  const handleQuizClose = (success: boolean) => {
    setShowQuiz(false);
    
    if (success) {
      // Si el quiz fue completado con éxito, marcar el nodo como completado
      const updatedNodes = [...nodes];
      const nodeIndex = 2; // Índice del tercer nodo (0-based)
      
      updatedNodes[nodeIndex] = {
        ...updatedNodes[nodeIndex],
        completed: true
      };
      
      // Desbloquear el siguiente nodo si existe
      if (nodeIndex < nodes.length - 1) {
        updatedNodes[nodeIndex + 1] = {
          ...updatedNodes[nodeIndex + 1],
          locked: false
        };
      }
      
      setNodes(updatedNodes);
      
      // Mostrar mensaje de felicitación
      Alert.alert(t('congratulations'), `${t('completedLevel')} ${nodes[nodeIndex].title}`);
    }
  };
  
  // Función para manejar el cierre del quiz avanzado
  const handleAdvancedQuizClose = (success: boolean) => {
    setShowAdvancedQuiz(false);
    
    if (success) {
      // Si el quiz fue completado con éxito, marcar el nodo como completado
      const updatedNodes = [...nodes];
      const nodeIndex = 4; // Índice del quinto nodo (0-based)
      
      updatedNodes[nodeIndex] = {
        ...updatedNodes[nodeIndex],
        completed: true
      };
      
      // Mostrar mensaje de felicitación
      Alert.alert(t('congratulations'), `${t('completedLevel')} ${nodes[nodeIndex].title}`);
      
      // Mostrar la animación del trofeo ya que es el último nodo
      setShowTrophy(true);
    }
  };

  // Función para reiniciar el nodo anterior (video) cuando hay demasiados intentos fallidos en el quiz básico
  const handleResetBasicVideo = () => {
    const updatedNodes = [...nodes];
    
    // Bloquear el nodo del quiz
    updatedNodes[2].locked = true;
    
    // Marcar el nodo del video como no completado
    updatedNodes[1].completed = false;
    
    setNodes(updatedNodes);
    
    // Mostrar mensaje para que el usuario vuelva a ver el video
    Alert.alert(
      t('quiz_too_many_errors_title'),
      t('quiz_too_many_errors_message'),
      [{ text: t('continue'), onPress: () => setShowVideo(true) }]
    );
  };
  
  // Función para reiniciar el nodo anterior (video avanzado) cuando hay demasiados intentos fallidos en el quiz avanzado
  const handleResetAdvancedVideo = () => {
    const updatedNodes = [...nodes];
    
    // Bloquear el nodo del quiz avanzado
    updatedNodes[4].locked = true;
    
    // Marcar el nodo del video avanzado como no completado
    updatedNodes[3].completed = false;
    
    setNodes(updatedNodes);
    
    // Mostrar mensaje para que el usuario vuelva a ver el video
    Alert.alert(
      t('quiz_too_many_errors_title'),
      t('quiz_too_many_errors_message'),
      [{ text: t('continue'), onPress: () => setShowAdvancedVideo(true) }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('learningPath')}</Text>
        <Text style={styles.subtitle}>{t('completeNodes')}</Text>
        <View style={styles.languageSwitchContainer}>
          <LanguageSwitch style={styles.languageSwitch} />
        </View>
      </View>
      
      <View style={styles.content}>
        <SimpleNodePath 
          nodes={nodes}
          onNodePress={handleNodePress}
        />
      </View>
      
      <TrophyAnimation 
        visible={showTrophy} 
        onClose={() => setShowTrophy(false)} 
      />
      
      <TutorialStepper
        visible={showTutorial}
        onClose={() => setShowTutorial(false)}
      />
      
      <YouTubePlayer
        visible={showVideo}
        onClose={handleVideoClose}
        videoId={basicConceptsVideoId}
        title={t('videoTitle')}
      />
      
      <YouTubePlayer
        visible={showAdvancedVideo}
        onClose={handleAdvancedVideoClose}
        videoId={advancedConceptsVideoId}
        title={t('advancedVideoTitle')}
      />
      
      <QuizModal
        visible={showQuiz}
        onClose={handleQuizClose}
        onResetPreviousNode={handleResetBasicVideo}
        quizType="basic"
      />
      
      <QuizModal
        visible={showAdvancedQuiz}
        onClose={handleAdvancedQuizClose}
        onResetPreviousNode={handleResetAdvancedVideo}
        quizType="advanced"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#3498db',
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
    position: 'relative',
  },
  content: {
    flex: 1,
    position: 'relative',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },
  languageSwitchContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 100,
  },
  languageSwitch: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
});

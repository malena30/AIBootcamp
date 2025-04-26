import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ImageBackground } from 'react-native';
import SimpleNodePath from '@/components/SimpleNodePath';
import LanguageSwitch from '@/components/LanguageSwitch';
import TrophyAnimation from '@/components/TrophyAnimation';
import TutorialStepper from '@/components/TutorialStepper';
import YouTubePlayer from '@/components/YouTubePlayer';
import QuizModal from '@/components/QuizModal';
import CompletionModal from '@/components/CompletionModal';
import { useLanguage } from '@/context/LanguageContext';

export default function HomeScreen() {
  const { t, language } = useLanguage();
  const [showTrophy, setShowTrophy] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showAdvancedVideo, setShowAdvancedVideo] = useState(false);
  const [showAdvancedQuiz, setShowAdvancedQuiz] = useState(false);
  
  // States for completion modals
  const [showVideoCompletionModal, setShowVideoCompletionModal] = useState(false);
  const [showQuizCompletionModal, setShowQuizCompletionModal] = useState(false);
  const [showAdvancedVideoCompletionModal, setShowAdvancedVideoCompletionModal] = useState(false);
  const [showAdvancedQuizCompletionModal, setShowAdvancedQuizCompletionModal] = useState(false);
  const [completedContentTitle, setCompletedContentTitle] = useState('');
  
  // YouTube video IDs
  const basicConceptsVideoId = 'kCc8FmEb1nY'; // Video on "How to Learn to Code"
  const advancedConceptsVideoId = '7xTGNNLPyMI'; // Video on "Deep Dive into LLMs like ChatGPT"
  
  // Node path state
  const [nodes, setNodes] = useState([
    { id: '1', title: t('introduction'), completed: false, locked: false },
    { id: '2', title: t('basicConcepts'), completed: false, locked: true },
    { id: '3', title: t('intermediateLevel'), completed: false, locked: true },
    { id: '4', title: t('advancedLevel'), completed: false, locked: true },
    { id: '5', title: t('finalChallenge'), completed: false, locked: true },
  ]);

  // Update node titles when language changes
  useEffect(() => {
    setNodes([
      { id: '1', title: t('introduction'), completed: nodes[0].completed, locked: nodes[0].locked },
      { id: '2', title: t('basicConcepts'), completed: nodes[1].completed, locked: nodes[1].locked },
      { id: '3', title: t('intermediateLevel'), completed: nodes[2].completed, locked: nodes[2].locked },
      { id: '4', title: t('advancedLevel'), completed: nodes[3].completed, locked: nodes[3].locked },
      { id: '5', title: t('finalChallenge'), completed: nodes[4].completed, locked: nodes[4].locked },
    ]);
  }, [language, t]);

  // Function to handle node press
  const handleNodePress = (id: string) => {
    // Find selected node
    const nodeIndex = nodes.findIndex(node => node.id === id);
    
    if (nodeIndex === -1) return;
    
    // If it's the first node (Tutorial), show tutorial
    if (id === '1') {
      setShowTutorial(true);
      return;
    }
    
    // If it's the second node (Let's build GPT), show video
    if (id === '2') {
      setShowVideo(true);
      return;
    }
    
    // If it's the third node (Quiz), show quiz
    if (id === '3') {
      setShowQuiz(true);
      return;
    }
    
    // If it's the fourth node (Advanced Video), show advanced video
    if (id === '4') {
      setShowAdvancedVideo(true);
      return;
    }
    
    // If it's the fifth node (Advanced Quiz), show advanced quiz
    if (id === '5') {
      setShowAdvancedQuiz(true);
      return;
    }
    
    // If node is already completed, show message
    if (nodes[nodeIndex].completed) {
      // Alert.alert(t('nodeCompleted'), t('alreadyCompleted'));
      return;
    }
    
    // If node is locked, show message
    if (nodes[nodeIndex].locked) {
      // Alert.alert(t('nodeCompleted'), t('completePreviousNodes'));
      return;
    }
    
    // Simulate completing a node
    const updatedNodes = [...nodes];
    updatedNodes[nodeIndex] = {
      ...updatedNodes[nodeIndex],
      completed: true
    };
    
    // Unlock next node if it exists
    if (nodeIndex < nodes.length - 1) {
      updatedNodes[nodeIndex + 1] = {
        ...updatedNodes[nodeIndex + 1],
        locked: false
      };
    }
    
    setNodes(updatedNodes);
    
    // Check if it's the last node
    if (nodeIndex === nodes.length - 1) {
      // Show trophy animation
      setShowTrophy(true);
    } else {
      // Show congratulation message
      // Alert.alert(t('congratulations'), `${t('completedLevel')} ${nodes[nodeIndex].title}`);
    }
  };

  // Function to handle basic video player close
  const handleVideoClose = (videoCompleted: boolean) => {
    setShowVideo(false);
    
    if (videoCompleted) {
      // Mark node as completed
      const updatedNodes = [...nodes];
      const nodeIndex = 1; // Index of the second node (0-based)
      
      updatedNodes[nodeIndex] = {
        ...updatedNodes[nodeIndex],
        completed: true
      };
      
      // Unlock next node (quiz)
      updatedNodes[nodeIndex + 1] = {
        ...updatedNodes[nodeIndex + 1],
        locked: false
      };
      
      setNodes(updatedNodes);
      
      // Show congratulation message
      setCompletedContentTitle(t('videoTitle'));
      setShowVideoCompletionModal(true);
    }
  };
  
  // Function to handle advanced video player close
  const handleAdvancedVideoClose = (videoCompleted: boolean) => {
    setShowAdvancedVideo(false);
    
    if (videoCompleted) {
      // Mark node as completed
      const updatedNodes = [...nodes];
      const nodeIndex = 3; // Index of the fourth node (0-based)
      
      updatedNodes[nodeIndex] = {
        ...updatedNodes[nodeIndex],
        completed: true
      };
      
      // Unlock next node (final challenge)
      updatedNodes[nodeIndex + 1] = {
        ...updatedNodes[nodeIndex + 1],
        locked: false
      };
      
      setNodes(updatedNodes);
      
      // Show congratulation message
      setCompletedContentTitle(t('advancedVideoTitle'));
      setShowAdvancedVideoCompletionModal(true);
    }
  };

  // Function to handle basic quiz close
  const handleQuizClose = (success: boolean) => {
    setShowQuiz(false);
    
    if (success) {
      // Mark node as completed
      const updatedNodes = [...nodes];
      const nodeIndex = 2; // Index of the third node (0-based)
      
      updatedNodes[nodeIndex] = {
        ...updatedNodes[nodeIndex],
        completed: true
      };
      
      // Unlock next node if it exists
      updatedNodes[nodeIndex + 1] = {
        ...updatedNodes[nodeIndex + 1],
        locked: false
      };
      
      setNodes(updatedNodes);
      
      // Show completion modal
      setCompletedContentTitle(t('quiz_title'));
      setShowQuizCompletionModal(true);
    }
  };
  
  // Function to handle advanced quiz close
  const handleAdvancedQuizClose = (success: boolean) => {
    setShowAdvancedQuiz(false);
    
    if (success) {
      const updatedNodes = [...nodes];
      const nodeIndex = 4; // Index of the fifth node (0-based)
      
      updatedNodes[nodeIndex] = {
        ...updatedNodes[nodeIndex],
        completed: true
      };
      
      // Show completion modal
      setCompletedContentTitle(t('advanced_quiz_title'));
      setShowAdvancedQuizCompletionModal(true);
    }
  };

  // Function to handle video completion modal close
  const handleVideoCompletionModalClose = () => {
    setShowVideoCompletionModal(false);
  };
  
  
  const handleQuizCompletionModalClose = () => {
    setShowQuizCompletionModal(false);
  };
  
  // Function to handle advanced video completion modal close
  const handleAdvancedVideoCompletionModalClose = () => {
    setShowAdvancedVideoCompletionModal(false);
  };
  
  // Function to handle advanced quiz completion modal close
  const handleAdvancedQuizCompletionModalClose = () => {
    setShowAdvancedQuizCompletionModal(false);
    // Show trophy animation since it's the last node
    setShowTrophy(true);
  };

  // Function to reset basic video
  const handleResetBasicVideo = () => {
    const updatedNodes = [...nodes];
    
    // Block node
    updatedNodes[2].locked = true;
    
    // Mark node as not completed
    updatedNodes[1].completed = false;
    
    setNodes(updatedNodes);
    
    // Show video directly without alert
    setShowVideo(true);
  };
  
  // Function to reset advanced video
  const handleResetAdvancedVideo = () => {
    const updatedNodes = [...nodes];
    
    // Block node
    updatedNodes[4].locked = true;
    
    // Mark node as not completed
    updatedNodes[3].completed = false;
    
    setNodes(updatedNodes);
    
    // Show advanced video directly without alert
    setShowAdvancedVideo(true);
  };

  return (
    <View style={styles.container}>
     
      
      <View style={styles.languageSwitchContainer}>
        <LanguageSwitch style={styles.languageSwitch} />
      </View>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>AiBootcamp</Text>
        </View>
      </SafeAreaView>
      <ImageBackground 
        source={require('../../assets/images/fonditojpg.jpg')} 
        style={styles.content}
        resizeMode="cover"
      >
        <SimpleNodePath 
          nodes={nodes}
          onNodePress={handleNodePress}
        />
      </ImageBackground>
    
      <TrophyAnimation 
        visible={showTrophy} 
        onClose={() => setShowTrophy(false)} 
      />
      
      <TutorialStepper
        visible={showTutorial}
        onClose={(completed) => {
          setShowTutorial(false);
          
          // If tutorial was completed, update node status
          if (completed) {
            const updatedNodes = [...nodes];
            
            // Mark tutorial node as completed
            updatedNodes[0] = {
              ...updatedNodes[0],
              completed: true
            };
            
            // Unlock next node
            updatedNodes[1] = {
              ...updatedNodes[1],
              locked: false
            };
            
            setNodes(updatedNodes);
          }
        }}
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
      
     
      <CompletionModal
        visible={showVideoCompletionModal}
        onClose={handleVideoCompletionModalClose}
        type="video"
        title={completedContentTitle}
      />
      
      <CompletionModal
        visible={showQuizCompletionModal}
        onClose={handleQuizCompletionModalClose}
        type="quiz"
        title={completedContentTitle}
      />
      
      <CompletionModal
        visible={showAdvancedVideoCompletionModal}
        onClose={handleAdvancedVideoCompletionModalClose}
        type="video"
        title={completedContentTitle}
      />
      
      <CompletionModal
        visible={showAdvancedQuizCompletionModal}
        onClose={handleAdvancedQuizCompletionModalClose}
        type="quiz"
        title={completedContentTitle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4a7cb5', 
  },
  safeArea: {
    backgroundColor: '#4a7cb5',
    width: '100%',
    zIndex: 10,
  },
  header: {
    backgroundColor: '#4a7cb5', 
    padding: 15,
    paddingTop: 10,
    alignItems: 'center',
    width: '100%',
  },
  content: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  title: {
    fontSize: 40,
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
    top: 110,
    right: -10,
    zIndex: 100,
  },
  languageSwitch: {
  },
});

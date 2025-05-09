import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  Dimensions,
  Image,
  SafeAreaView
} from 'react-native';
import { useLanguage } from '../context/LanguageContext';

interface TutorialStepperProps {
  visible: boolean;
  onClose: (completed?: boolean) => void;
}

interface TutorialStep {
  title: string;
  text: string;
  image?: any;
}

const TutorialStepper: React.FC<TutorialStepperProps> = ({ visible, onClose }) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Define tutorial steps
  const tutorialSteps: TutorialStep[] = [
    {
      title: t('tutorialStep1Title'),
      text: t('tutorialStep1Text'),
      // Representative image of the node path
    },
    {
      title: t('tutorialStep2Title'),
      text: t('tutorialStep2Text'),
      // Representative image of completing nodes
    },
    {
      title: t('tutorialStep3Title'),
      text: t('tutorialStep3Text'),
      // Representative image of language switching
    },
    {
      title: t('tutorialStep4Title'),
      text: t('tutorialStep4Text'),
      // Representative image of the final reward
    }
  ];
  
  // Function to go to next step
  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // If we're on the last step, close the tutorial and mark as completed
      onClose(true);
    }
  };
  
  // Function to go to previous step
  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Function to skip tutorial
  const skipTutorial = () => {
    // Close without marking as completed
    onClose(false);
  };
  
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={() => skipTutorial()}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.tutorialTitle}>{t('tutorialTitle')}</Text>
          
          {/* Step indicator */}
          <View style={styles.stepsIndicator}>
            {tutorialSteps.map((_, index) => (
              <View 
                key={index} 
                style={[
                  styles.stepDot,
                  currentStep === index ? styles.activeDot : null
                ]} 
              />
            ))}
          </View>
          
          {/* Current step content */}
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>{tutorialSteps[currentStep].title}</Text>
            <Text style={styles.stepText}>{tutorialSteps[currentStep].text}</Text>
            
            {/* If there's an image for this step, show it */}
            {tutorialSteps[currentStep].image && (
              <Image 
                source={tutorialSteps[currentStep].image} 
                style={styles.stepImage}
                resizeMode="contain"
              />
            )}
          </View>
          
          {/* Navigation buttons */}
          <View style={styles.buttonsContainer}>
            {currentStep > 0 ? (
              <TouchableOpacity style={styles.navButton} onPress={previousStep}>
                <Text style={styles.navButtonText}>{t('previous')}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.skipButton} onPress={skipTutorial}>
                <Text style={styles.skipButtonText}>{t('skip')}</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={styles.navButton} 
              onPress={nextStep}
            >
              <Text style={styles.navButtonText}>
                {currentStep === tutorialSteps.length - 1 ? t('finish') : t('next')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
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
  modalContent: {
    width: width * 0.9,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    maxHeight: height * 0.8,
  },
  tutorialTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 20,
    textAlign: 'center',
  },
  stepsIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  activeDot: {
    backgroundColor: '#3498db',
    width: 12,
    height: 12,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  stepContent: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  stepText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  stepImage: {
    width: width * 0.7,
    height: width * 0.5,
    marginVertical: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  navButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    minWidth: 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  navButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipButton: {
    backgroundColor: '#f1f1f1',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    minWidth: 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  skipButtonText: {
    color: '#666',
    fontSize: 16,
  },
});

export default TutorialStepper;

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
  onClose: () => void;
}

interface TutorialStep {
  title: string;
  text: string;
  image?: any;
}

const TutorialStepper: React.FC<TutorialStepperProps> = ({ visible, onClose }) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Definir los pasos del tutorial
  const tutorialSteps: TutorialStep[] = [
    {
      title: t('tutorialStep1Title'),
      text: t('tutorialStep1Text'),
      // Imagen representativa del camino de nodos
    },
    {
      title: t('tutorialStep2Title'),
      text: t('tutorialStep2Text'),
      // Imagen representativa de completar nodos
    },
    {
      title: t('tutorialStep3Title'),
      text: t('tutorialStep3Text'),
      // Imagen representativa del cambio de idioma
    },
    {
      title: t('tutorialStep4Title'),
      text: t('tutorialStep4Text'),
      // Imagen representativa de la recompensa final
    }
  ];
  
  // Función para ir al siguiente paso
  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Si estamos en el último paso, cerrar el tutorial
      onClose();
    }
  };
  
  // Función para ir al paso anterior
  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Función para omitir el tutorial
  const skipTutorial = () => {
    onClose();
  };
  
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.tutorialTitle}>{t('tutorialTitle')}</Text>
          
          {/* Indicador de pasos */}
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
          
          {/* Contenido del paso actual */}
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>{tutorialSteps[currentStep].title}</Text>
            <Text style={styles.stepText}>{tutorialSteps[currentStep].text}</Text>
            
            {/* Si hay una imagen para este paso, mostrarla */}
            {tutorialSteps[currentStep].image && (
              <Image 
                source={tutorialSteps[currentStep].image} 
                style={styles.stepImage}
                resizeMode="contain"
              />
            )}
          </View>
          
          {/* Botones de navegación */}
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
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
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
  },
  activeDot: {
    backgroundColor: '#3498db',
    width: 12,
    height: 12,
    borderRadius: 6,
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
    borderRadius: 25,
    minWidth: 100,
    alignItems: 'center',
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
    borderRadius: 25,
    minWidth: 100,
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#666',
    fontSize: 16,
  },
});

export default TutorialStepper;

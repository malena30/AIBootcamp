import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Text, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { useLanguage } from '../context/LanguageContext';

interface TrophyAnimationProps {
  visible: boolean;
  onClose: () => void;
}

const TrophyAnimation: React.FC<TrophyAnimationProps> = ({ visible, onClose }) => {
  const { t } = useLanguage();
  const animationRef = useRef<LottieView>(null);
  
  useEffect(() => {
    if (visible && animationRef.current) {
      animationRef.current.play();
    }
  }, [visible]);
  
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.congratsText}>{t('congratulations')}</Text>
          <Text style={styles.completedText}>{t('allLevelsCompleted')}</Text>
          
          <View style={styles.animationContainer}>
            <LottieView
              ref={animationRef}
              source={{ uri: 'https://lottie.host/8cad7ef9-5599-43d6-87e8-5a0aaa78c6a5/OhBQaceZuO.lottie' }}
              autoPlay
              loop
              style={styles.animation}
            />
          </View>
          
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>{t('continue')}</Text>
          </TouchableOpacity>
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
  modalContent: {
    width: width * 0.85,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  congratsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
    textAlign: 'center',
  },
  completedText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  animation: {
    width: 180,
    height: 180,
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
});

export default TrophyAnimation;

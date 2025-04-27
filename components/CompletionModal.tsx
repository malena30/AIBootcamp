import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

interface CompletionModalProps {
  visible: boolean;
  onClose: () => void;
  type: 'quiz' | 'video';
  title?: string;
}

const CompletionModal: React.FC<CompletionModalProps> = ({ 
  visible, 
  onClose, 
  type,
  title = ''
}) => {
  const { t } = useLanguage();
  
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity 
            style={styles.closeIconButton} 
            onPress={onClose}
          >
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
          
          <Text style={styles.title}>
            {type === 'quiz' ? t('quizCompleted') : t('videoCompleted')}
          </Text>
          
          <Text style={styles.message}>
            {t('congratulations')}! {type === 'quiz' 
              ? t('completedQuizMessage') 
              : t('completedVideoMessage')}
            {title ? ` "${title}"` : ''}
          </Text>
          
          <TouchableOpacity 
            style={styles.continueButton} 
            onPress={onClose}
          >
            <Text style={styles.continueButtonText}>{t('continue')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.85,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  closeIconButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  closeIcon: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 24,
  },
  continueButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    minWidth: 150,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CompletionModal;

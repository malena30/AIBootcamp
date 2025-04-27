import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

interface NodeTooltipProps {
  visible: boolean;
  title: string;
  onStart: () => void;
  onClose: () => void;
  position: {
    x: number;
    y: number;
  };
}

const NodeTooltip: React.FC<NodeTooltipProps> = ({ 
  visible, 
  title, 
  onStart, 
  onClose,
  position 
}) => {
  const { t } = useLanguage();

  if (!visible) return null;

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View style={styles.tooltipContainer}>

          <Text style={styles.title}>{title.includes('GPT') ? "Let's build GPT: from scratch." : title}</Text>
          <TouchableOpacity 
            style={styles.startButton} 
            onPress={onStart}
          >
            <Text style={styles.startButtonText}>{t('start')}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  tooltipContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    width: 280,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  startButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  startButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default NodeTooltip;

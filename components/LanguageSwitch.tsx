import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Platform } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

interface LanguageSwitchProps {
  style?: object;
}

const LanguageSwitch: React.FC<LanguageSwitchProps> = ({ style }) => {
  const { language, setLanguage, t } = useLanguage();
  
  // Manejar el cambio de idioma
  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };
  
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity 
        style={styles.toggleContainer} 
        onPress={toggleLanguage}
        activeOpacity={0.8}
      >
        <View style={styles.switchTrack}>
          <View style={[
            styles.switchThumb, 
            language === 'en' ? styles.switchThumbRight : styles.switchThumbLeft
          ]}>
            <Text style={styles.thumbText}>
              {language === 'es' ? 'ES' : 'EN'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    margin: 10,
  },
  toggleContainer: {
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  switchTrack: {
    width: 80,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 3,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  switchThumb: {
    width: 40,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4a7cb5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchThumbLeft: {
    alignSelf: 'flex-start',
  },
  switchThumbRight: {
    alignSelf: 'flex-end',
  },
  thumbText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default LanguageSwitch;

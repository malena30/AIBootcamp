import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
        activeOpacity={0.7}
      >
        <View style={[styles.option, language === 'es' ? styles.activeOption : styles.inactiveOption]}>
          <Text style={[styles.optionText, language === 'es' ? styles.activeText : styles.inactiveText]}>ES</Text>
        </View>
        <View style={[styles.option, language === 'en' ? styles.activeOption : styles.inactiveOption]}>
          <Text style={[styles.optionText, language === 'en' ? styles.activeText : styles.inactiveText]}>EN</Text>
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
    flexDirection: 'row',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
  },
  option: {
    paddingVertical: 5,
    paddingHorizontal: 8,
    minWidth: 40,
    alignItems: 'center',
  },
  activeOption: {
    backgroundColor: '#333',
  },
  inactiveOption: {
    backgroundColor: '#fff',
  },
  optionText: {
    fontSize: 12,
    fontWeight: '500',
  },
  activeText: {
    color: '#fff',
  },
  inactiveText: {
    color: '#333',
  },
});

export default LanguageSwitch;

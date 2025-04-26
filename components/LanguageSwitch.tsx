import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
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
      <Text style={styles.label}>{t('language')}: {language === 'es' ? t('spanish') : t('english')}</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={language === 'en' ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleLanguage}
        value={language === 'en'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    margin: 10,
  },
  label: {
    marginRight: 10,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default LanguageSwitch;

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar, Platform } from 'react-native';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  // Crear un valor animado para la opacidad
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Animar la entrada del texto
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Mantener visible por un tiempo
      Animated.delay(1500),
      // Animar la salida
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Cuando termina la animación, llamar a onFinish
      onFinish();
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Ocultar la barra de estado o hacerla transparente */}
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <Animated.Text 
        style={[
          styles.text,
          { opacity: fadeAnim }
        ]}
      >
        AIBootcamp
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db', // Color celeste
    // Asegurar que ocupe toda la pantalla incluyendo la barra de estado
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  text: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default SplashScreen;

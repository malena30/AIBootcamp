import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  Text, 
  Dimensions,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { useLanguage } from '../context/LanguageContext';
import CompletionModal from './CompletionModal';

interface YouTubePlayerProps {
  visible: boolean;
  onClose: (videoCompleted: boolean) => void;
  videoId: string;
  title?: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ 
  visible, 
  onClose, 
  videoId,
  title 
}) => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const webViewRef = useRef<WebView>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Reset states when modal is opened/closed
  useEffect(() => {
    if (visible) {
      setLoading(true);
      setVideoCompleted(false);
      
      // Activar el botón después de 20 segundos (tiempo suficiente para ver parte importante del video)
      timerRef.current = setTimeout(() => {
        console.log("Activando botón de continuar después de 20 segundos");
        setVideoCompleted(true);
      }, 20000);
    }
    
    // Limpiar el temporizador cuando se cierra el modal
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [visible]);
  
  // Reiniciar el estado cuando se abre el modal
  // Crear la URL del video de YouTube para embeber con parámetros adicionales
  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&showinfo=0&enablejsapi=1&controls=1&origin=${encodeURIComponent('https://youtube.com')}`;
  
  // Script simple para notificar cuando se carga el WebView
  const injectedJavaScript = `
    window.ReactNativeWebView.postMessage('loaded');
    true;
  `;

  // Manejar los mensajes del WebView
  const handleWebViewMessage = (event: any) => {
    const { data } = event.nativeEvent;
    console.log("WebView message:", data);
    
    if (data === 'loaded') {
      setLoading(false);
    }
  };

  // Función para manejar el cierre del modal con el botón Continuar
  const handleContinueButtonClick = () => {
    // Cerrar el modal del video primero
    onClose(true);
  };
  
  // Función para manejar el cierre del modal con el botón X
  const handleCloseButtonClick = () => {
    // Cerrar sin marcar como completado
    onClose(false);
  };
  
  // Función para manejar el cierre del modal de completado
  const handleCompletionModalClose = () => {
    setShowCompletionModal(false);
    onClose(true);
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={handleCloseButtonClick}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity 
            style={styles.closeIconButton} 
            onPress={handleCloseButtonClick}
          >
            <MaterialIcons name="close" size={24} color="#666" />
          </TouchableOpacity>
          
          {title && <Text style={styles.title}>
            {title.replace(', in code, spelled out', '')}
          </Text>}
          
          <View style={styles.videoContainer}>
            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3498db" />
                <Text style={styles.loadingText}>Cargando video...</Text>
              </View>
            )}
            <WebView
              ref={webViewRef}
              source={{ uri: embedUrl }}
              style={styles.webview}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              allowsFullscreenVideo={true}
              mediaPlaybackRequiresUserAction={false}
              injectedJavaScript={injectedJavaScript}
              onMessage={handleWebViewMessage}
              onError={(error) => console.error("WebView error:", error)}
            />
          </View>
          
          <View style={styles.buttonContainer}>
            <Text style={styles.instructionText}>
              {videoCompleted 
                ? t('video_completed_message') 
                : t('please_watch_video')}
            </Text>
            
            <TouchableOpacity 
              style={[
                styles.closeButton,
                !videoCompleted && styles.disabledButton
              ]} 
              onPress={handleContinueButtonClick}
              disabled={!videoCompleted}
            >
              <Text style={styles.closeButtonText}>
                {t('continue')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      
      {/* Ya no mostramos el modal de confirmación aquí */}
    </Modal>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
  modalContent: {
    width: width * 0.92,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    paddingTop: 25,
    alignItems: 'center',
    position: 'relative',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    maxHeight: height * 0.8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    marginTop: 10,
    textAlign: 'center',
    width: '80%',
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  webview: {
    flex: 1,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  disabledButton: {
    backgroundColor: '#b3d9f2',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 10,
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
  },
});

export default YouTubePlayer;

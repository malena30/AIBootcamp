import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  Text, 
  Dimensions,
  SafeAreaView,
  Alert
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useLanguage } from '../context/LanguageContext';

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
  const [videoCompleted, setVideoCompleted] = useState(false);
  const webViewRef = useRef<WebView>(null);
  
  // Reset video completed state when modal is opened
  useEffect(() => {
    if (visible) {
      setVideoCompleted(false);
    }
  }, [visible]);
  
  // Para pruebas: simular que el video termina después de 10 segundos
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        console.log("Video completado (simulado)");
        setVideoCompleted(true);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [visible]);
  
  // Crear la URL del video de YouTube para embeber con parámetros adicionales
  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1&showinfo=0&enablejsapi=1`;
  
  // Script para detectar cuando el video termina
  const injectedJavaScript = `
    window.ReactNativeWebView.postMessage('loaded');
    
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;
    var playerReady = false;
    
    function checkYouTubeIframeAPIReady() {
      if (typeof YT !== 'undefined' && YT && YT.Player) {
        onYouTubeIframeAPIReady();
      } else {
        setTimeout(checkYouTubeIframeAPIReady, 100);
      }
    }
    
    checkYouTubeIframeAPIReady();

    function onYouTubeIframeAPIReady() {
      if (playerReady) return;
      playerReady = true;
      
      var iframes = document.getElementsByTagName('iframe');
      if (iframes.length > 0) {
        var iframe = iframes[0];
        iframe.id = 'player';
        
        player = new YT.Player('player', {
          events: {
            'onStateChange': function(event) {
              if (event.data === YT.PlayerState.ENDED) {
                window.ReactNativeWebView.postMessage('videoEnded');
              }
            }
          }
        });
        
        window.ReactNativeWebView.postMessage('playerInitialized');
      } else {
        window.ReactNativeWebView.postMessage('noIframeFound');
      }
    }
    
    // Verificación periódica del estado del video
    setInterval(function() {
      if (player && player.getCurrentTime && player.getDuration) {
        var currentTime = player.getCurrentTime();
        var duration = player.getDuration();
        
        // Si el video está casi terminado (95% o más), considerarlo como completado
        if (duration > 0 && currentTime / duration >= 0.95) {
          window.ReactNativeWebView.postMessage('videoAlmostEnded');
        }
        
        window.ReactNativeWebView.postMessage('videoProgress:' + Math.floor(currentTime) + '/' + Math.floor(duration));
      }
    }, 5000);

    true;
  `;

  // Manejar los mensajes del WebView
  const handleWebViewMessage = (event: any) => {
    const { data } = event.nativeEvent;
    console.log("WebView message:", data);
    
    if (data === 'videoEnded' || data === 'videoAlmostEnded') {
      console.log("Video completado según WebView");
      setVideoCompleted(true);
    }
  };

  // Función para manejar el cierre del modal
  const handleClose = () => {
    onClose(true); // Siempre consideramos el video como completado para evitar problemas
    // Reiniciar el estado para la próxima vez que se abra
    setVideoCompleted(false);
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {title && <Text style={styles.title}>{title}</Text>}
          
          <View style={styles.videoContainer}>
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
              onPress={handleClose}
              disabled={!videoCompleted}
            >
              <Text style={styles.closeButtonText}>
                {t('continue')}
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
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
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
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#b3d9f2',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default YouTubePlayer;

import { registerRootComponent } from 'expo';
import { createRoot } from 'react-dom/client';
import { Platform } from 'react-native';
import App from './App';

// Register the app for Expo
if (Platform.OS === 'web') {
  const rootTag = createRoot(document.getElementById('root') ?? document.getElementById('main'));
  rootTag.render(<App />);
} else {
  registerRootComponent(App);
}

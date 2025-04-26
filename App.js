import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import SimpleNodePath from './components/SimpleNodePath';

const App = () => {
  // Estado para los nodos del camino
  const [nodes, setNodes] = useState([
    { id: '1', title: 'Introducción', completed: true, locked: false },
    { id: '2', title: 'Conceptos Básicos', completed: false, locked: false },
    { id: '3', title: 'Nivel Intermedio', completed: false, locked: true },
    { id: '4', title: 'Nivel Avanzado', completed: false, locked: true },
    { id: '5', title: 'Desafío Final', completed: false, locked: true },
  ]);

  // Función para manejar cuando se presiona un nodo
  const handleNodePress = (id) => {
    // Buscar el nodo seleccionado
    const nodeIndex = nodes.findIndex(node => node.id === id);
    
    if (nodeIndex === -1) return;
    
    // Si el nodo ya está completado, mostrar un mensaje
    if (nodes[nodeIndex].completed) {
      Alert.alert('Nodo Completado', 'Ya has completado este nivel. ¡Continúa con el siguiente!');
      return;
    }
    
    // Simular completar un nodo
    const updatedNodes = [...nodes];
    updatedNodes[nodeIndex] = {
      ...updatedNodes[nodeIndex],
      completed: true
    };
    
    // Desbloquear el siguiente nodo si existe
    if (nodeIndex < nodes.length - 1) {
      updatedNodes[nodeIndex + 1] = {
        ...updatedNodes[nodeIndex + 1],
        locked: false
      };
    }
    
    setNodes(updatedNodes);
    
    // Mostrar mensaje de felicitación
    Alert.alert('¡Felicidades!', `Has completado el nivel: ${nodes[nodeIndex].title}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ruta de Aprendizaje</Text>
        <Text style={styles.subtitle}>Completa los nodos para avanzar</Text>
      </View>
      
      <SimpleNodePath 
        nodes={nodes}
        onNodePress={handleNodePress}
      />
      
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#3498db',
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },
});

export default App;

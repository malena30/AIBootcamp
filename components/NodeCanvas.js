import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import Node from './Node';

const NodeCanvas = () => {
  const [nodes, setNodes] = useState({
    'node-1': {
      id: 'node-1',
      title: 'Nodo 1',
      position: { x: 50, y: 100 },
      color: '#3498db',
    },
    'node-2': {
      id: 'node-2',
      title: 'Nodo 2',
      position: { x: 200, y: 200 },
      color: '#e74c3c',
    },
  });
  const [selectedNode, setSelectedNode] = useState(null);
  const [nextId, setNextId] = useState(3);

  const addNode = () => {
    const id = `node-${nextId}`;
    const newNode = {
      id,
      title: `Nodo ${nextId}`,
      position: { x: 100, y: 100 + (nextId * 50) },
      color: '#2ecc71',
    };

    setNodes(prev => ({ ...prev, [id]: newNode }));
    setNextId(prev => prev + 1);
  };

  const selectNode = (id) => {
    setSelectedNode(id);
  };

  const deleteNode = () => {
    if (!selectedNode) return;

    // Remove the node
    const newNodes = { ...nodes };
    delete newNodes[selectedNode];

    setNodes(newNodes);
    setSelectedNode(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.canvas}>
        {/* Nodes Layer */}
        {Object.values(nodes).map((node) => (
          <Node
            key={node.id}
            id={node.id}
            title={node.title}
            position={node.position}
            color={node.color}
            selected={selectedNode === node.id}
            onSelect={selectNode}
          />
        ))}
      </View>

      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.button} onPress={addNode}>
          <Text style={styles.buttonText}>Añadir Nodo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.deleteButton, (!selectedNode ? styles.buttonDisabled : null)]} 
          onPress={deleteNode}
          disabled={!selectedNode}
        >
          <Text style={styles.buttonText}>Eliminar Nodo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  canvas: {
    flex: 1,
    position: 'relative',
  },
  toolbar: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 5,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
});

export default NodeCanvas;

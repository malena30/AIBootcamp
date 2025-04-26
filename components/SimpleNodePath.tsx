import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

// Definición de tipos para TypeScript
interface NodeItem {
  id: string;
  title: string;
  completed: boolean;
  locked: boolean;
}

interface SimpleNodePathProps {
  nodes: NodeItem[];
  onNodePress: (id: string) => void;
}

const SimpleNodePath: React.FC<SimpleNodePathProps> = ({ nodes, onNodePress }) => {
  const { language } = useLanguage();
  const screenWidth = Dimensions.get('window').width;
  
  // Estado local para los nodos (para manejar animaciones en el futuro)
  const [localNodes, setLocalNodes] = useState(nodes);
  
  // Actualizar los nodos locales cuando cambian los props
  useEffect(() => {
    setLocalNodes(nodes);
  }, [nodes]);
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.pathContainer}>
        {/* Nodos en zigzag */}
        {localNodes.map((node, index) => {
          // Determinar si el nodo debe estar a la izquierda o derecha (zigzag)
          const isEven = index % 2 === 0;
          const nodePosition = isEven ? 'left' : 'right';
          
          return (
            <View 
              key={node.id} 
              style={[
                styles.nodeWrapper,
                nodePosition === 'left' ? styles.nodeWrapperLeft : styles.nodeWrapperRight
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.node,
                  node.completed ? styles.completedNode : null,
                  node.locked ? styles.lockedNode : null
                ]}
                onPress={() => !node.locked && onNodePress(node.id)}
                disabled={node.locked}
              >
                {node.completed && (
                  <View style={styles.checkmark}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
                {node.locked && (
                  <View style={styles.lock}>
                    <Text style={styles.lockText}>🔒</Text>
                  </View>
                )}
              </TouchableOpacity>
              <Text style={[
                styles.nodeTitle,
                node.locked ? styles.lockedText : null,
                nodePosition === 'left' ? styles.nodeTitleLeft : styles.nodeTitleRight
              ]}>
                {node.title}
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  pathContainer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  nodeWrapper: {
    marginVertical: 25,
    alignItems: 'center',
    width: '100%',
  },
  nodeWrapperLeft: {
    alignItems: 'flex-start',
    paddingLeft: '15%',
  },
  nodeWrapperRight: {
    alignItems: 'flex-end',
    paddingRight: '15%',
  },
  node: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  completedNode: {
    backgroundColor: '#4CAF50',
  },
  lockedNode: {
    backgroundColor: '#BDBDBD',
  },
  checkmark: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  lock: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockText: {
    fontSize: 24,
  },
  nodeTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    maxWidth: 150,
  },
  nodeTitleLeft: {
    textAlign: 'left',
  },
  nodeTitleRight: {
    textAlign: 'right',
  },
  lockedText: {
    color: '#757575',
  }
});

export default SimpleNodePath;
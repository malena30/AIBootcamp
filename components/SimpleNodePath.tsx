import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { MaterialIcons } from '@expo/vector-icons';
import NodeTooltip from './NodeTooltip';

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
  
  // Estado para el tooltip
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [selectedNode, setSelectedNode] = useState<NodeItem | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
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
                onPress={(event) => {
                  if (!node.locked) {
                    // Centrar el tooltip en la pantalla
                    setTooltipPosition({ x: 0, y: Dimensions.get('window').height / 3 });
                    setSelectedNode(node);
                    setTooltipVisible(true);
                  }
                }}
                disabled={node.locked}
              >
                {node.completed && (
                  <View style={styles.checkmark}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
                {node.locked && (
                  <View style={styles.lock}>
                    <MaterialIcons name="lock" size={28} color="white" />
                  </View>
                )}
                {!node.locked && !node.completed && (
                  <View style={styles.nodeIcon}>
                    {(node.id === '2' || node.id === '4') && (
                      <MaterialIcons name="videocam" size={28} color="white" />
                    )}
                    {(node.id === '3' || node.id === '5') && (
                      <MaterialIcons name="lightbulb" size={28} color="white" />
                    )}
                  </View>
                )}
              </TouchableOpacity>

            </View>
          );
        })}
      </View>

      {/* Tooltip para mostrar el título y botón de inicio */}
      <NodeTooltip
        visible={tooltipVisible}
        title={selectedNode?.title || ''}
        onStart={() => {
          setTooltipVisible(false);
          if (selectedNode) {
            onNodePress(selectedNode.id);
          }
        }}
        onClose={() => setTooltipVisible(false)}
        position={tooltipPosition}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
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
  nodeIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  lockedText: {
    color: '#757575',
  }
});

export default SimpleNodePath;
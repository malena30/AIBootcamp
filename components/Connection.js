import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Line } from 'react-native-svg';
// Aseguramos que se importe correctamente

const Connection = ({ startNode, endNode, nodes }) => {
  if (!startNode || !endNode || !nodes[startNode] || !nodes[endNode]) {
    return null;
  }

  const start = nodes[startNode].position;
  const end = nodes[endNode].position;

  // Calculate the center points of the nodes
  const startX = start.x + 50; // Half of node width
  const startY = start.y + 30; // Half of node height
  const endX = end.x + 50;
  const endY = end.y + 30;

  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%">
        <Line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke="#666"
          strokeWidth="2"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
});

export default Connection;

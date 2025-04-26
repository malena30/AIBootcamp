import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Node = ({ id, title, position, color, selected, onSelect }) => {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[
        styles.container,
        { backgroundColor: color },
        selected ? styles.selected : null,
        { left: position.x, top: position.y }
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 100,
    height: 60,
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 10,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selected: {
    borderWidth: 2,
    borderColor: '#FFCC00',
  }
});

export default Node;

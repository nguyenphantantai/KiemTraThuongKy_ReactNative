import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TodoItem = ({ item }) => (
  <View style={styles.todoItem}>
    <Text>{item.text}</Text>
  </View>
);

const styles = StyleSheet.create({
  todoItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
});

export default TodoItem;
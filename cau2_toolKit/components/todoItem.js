// src/components/TodoItem.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const TodoItem = ({ todo, id, onDelete }) => {
    return (
        <View style={styles.todoItem}>
            <Text>{todo}</Text>
            <Button title="Delete" onPress={() => onDelete(id)} />
        </View>
    );
};

const styles = StyleSheet.create({
    todoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default TodoItem;
// src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import TodoItem from '../components/todoItem';
import { getTodos, addTodo, deleteTodo } from '../services/api';

const HomeScreen = () => {
    const [newTodo, setNewTodo] = useState('');
    const [todos, setTodos] = useState([]);

    // Lấy danh sách nhiệm vụ khi component được mount
    useEffect(() => {
        const fetchTodos = async () => {
            const todosData = await getTodos();
            setTodos(todosData);
        };

        fetchTodos();
    }, []);

    const handleAddTodo = async () => {
        if (newTodo.trim()) {
            const newTodoItem = await addTodo(newTodo);
            setTodos([...todos, newTodoItem]); // Cập nhật danh sách nhiệm vụ
            setNewTodo('');
        }
    };

    const handleDeleteTodo = async (id) => {
        await deleteTodo(id);
        setTodos(todos.filter(todo => todo.id !== id)); // Cập nhật danh sách nhiệm vụ
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Add a new todo"
                value={newTodo}
                onChangeText={setNewTodo}
                style={styles.input}
            />
            <Button title="Add Todo" onPress={handleAddTodo} />
            <FlatList
                data={todos}
                renderItem={({ item }) => (
                    <TodoItem todo={item.title} id={item.id} onDelete={handleDeleteTodo} />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
    },
});

export default HomeScreen;
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { useRecoilState } from 'recoil';
import { todoListState } from '../state/todoState'; 
import { fetchTodos, addTodo as addTodoAPI } from '../api/api'; 

const TodoItem = ({ item }) => (
  <View style={styles.todoItem}>
    <Text>{item.text}</Text>
  </View>
);

const TodoList = () => {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todos = await fetchTodos();
        setTodoList(todos);
      } catch (error) {
        console.error('Failed to fetch todos:', error); 
      }
    };

    getTodos();
  }, []);

  const addTodo = async () => {
    if (inputValue.trim()) {
      const newTodo = { text: inputValue }; 
      try {
        const addedTodo = await addTodoAPI(newTodo); 
        setTodoList((prev) => [...prev, addedTodo]); 
        setInputValue('');
      } catch (error) {
        console.error('Failed to add todo:', error); 
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a new todo"
        value={inputValue}
        onChangeText={setInputValue}
      />
      <Button title="Add Todo" onPress={addTodo} />
      <FlatList
        data={todoList}
        renderItem={TodoItem}
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
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 10,
  },
  todoItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
});

export default TodoList;
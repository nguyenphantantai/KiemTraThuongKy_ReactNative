// components/TodoApp.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo } from '../store/todoSlice';

const TodoApp = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      dispatch(addTodo({ id: Date.now(), title: inputValue }));
      setInputValue('');
    }
  };

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Todo List</Text>
      <TextInput
        placeholder="Add a new todo"
        value={inputValue}
        onChangeText={setInputValue}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Button title="Add Todo" onPress={handleAddTodo} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
            <Text>{item.title}</Text>
            <Button title="Delete" onPress={() => handleRemoveTodo(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default TodoApp;
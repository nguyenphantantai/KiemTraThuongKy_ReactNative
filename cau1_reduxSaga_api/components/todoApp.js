// components/TodoApp.js
import React, { useEffect } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodosRequest } from '../store/todoSlice';

const TodoApp = () => {
  const dispatch = useDispatch();
  const { items: todos, loading, error } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodosRequest());
  }, [dispatch]);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Todo List</Text>
      {loading && <ActivityIndicator size = "large" color="#0000ff" />}
      {error && <Text style={{ color: 'red' }}>Error: {error}</Text>}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.title}</Text>
          </View>
        )}
      />
      <Button title="Refresh Todos" onPress={() => dispatch(fetchTodosRequest())} />
    </View>
  );
};

export default TodoApp;
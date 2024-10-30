// src/services/api.js
import axios from 'axios';

const API_URL = 'https://672184b898bbb4d93ca89d1f.mockapi.io/todos';

export const getTodos = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const addTodo = async (todo) => {
    try {
        const response = await axios.post(API_URL, {
            title: todo,
            completed: false,
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const deleteTodo = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error(error);
    }
};
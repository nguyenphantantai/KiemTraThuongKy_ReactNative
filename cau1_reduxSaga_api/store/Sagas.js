// store/sagas.js
import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchTodosRequest, fetchTodosSuccess, fetchTodosFailure } from './todoSlice';

// Hàm giả lập API fetch todos từ JSONPlaceholder
function fetchTodosApi() {
  return fetch('https://672184b898bbb4d93ca89d1f.mockapi.io/todos')
    .then((response) => response.json());
}

// Worker Saga để fetch todos từ API
function* fetchTodos() {
  try {
    const todos = yield call(fetchTodosApi);
    yield put(fetchTodosSuccess(todos));
  } catch (error) {
    yield put(fetchTodosFailure(error.message));
  }
}

// Watcher Saga để lắng nghe action fetchTodosRequest
function* rootSaga() {
  yield takeEvery(fetchTodosRequest.type, fetchTodos);
}

export default rootSaga;
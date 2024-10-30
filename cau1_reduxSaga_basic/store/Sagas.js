// store/sagas.js
import { takeEvery } from 'redux-saga/effects';
import { addTodo, removeTodo } from './todoSlice';

function* watchAddTodo() {
  yield takeEvery(addTodo.type, function* () {

  });
}

function* watchRemoveTodo() {
  yield takeEvery(removeTodo.type, function* () {
   
  });
}


function* rootSaga() {
  yield watchAddTodo();
  yield watchRemoveTodo();
}

export default rootSaga;
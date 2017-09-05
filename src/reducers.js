import { combineReducers } from 'redux';

import todos from 'src/todos/reducer';
import typing from 'src/typing/reducer';


export default combineReducers({
    todos,
    typing
});

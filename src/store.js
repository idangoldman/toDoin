import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import { loadState, saveToLocalStorage } from 'common/helpers/local-storage';
import reducers from 'src/reducers';

const logger = createLogger();
const middleware = applyMiddleware( promise(), thunk, logger, saveToLocalStorage );

export default createStore( reducers, loadState(), middleware );

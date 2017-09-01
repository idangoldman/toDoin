import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Store
import store from 'src/store';

// Main Style
import 'frontend/style.scss';

// Components
import Header from 'src/header';
import Todos from 'src/todos';
// import HelloButton from 'src/HelloButton';
// import Typing from 'src/typing';

// App Render
ReactDOM.render(
    <Provider store={ store() }>
        <BrowserRouter>
            <div>
                <Route path="/" component={ Header } />
                <Route path="/" component={ Todos } />
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('page')
);

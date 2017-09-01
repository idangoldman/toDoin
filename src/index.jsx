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
// import Todos from 'src/todos';
// import CleanButton from 'src/cleanButton';
// import Typing from 'src/typing';

// App Render
ReactDOM.render(
    <Provider store={ store() }>
        <BrowserRouter>
            <div>
                <Route path="/" component={ Header } />
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('page')
);

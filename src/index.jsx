import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Store
import 'common/helpers/language';
import store from 'src/store';

// Main Style
import 'src/style.scss';

// Components
import Header from 'src/header';
import Todos from 'src/todos';
import CleanButton from 'src/clean-button';
import Typing from 'src/typing';

// App Render
ReactDOM.render(
    <Provider store={ store }>
        <BrowserRouter>
            <div>
                <Route path="/" component={ Header } />
                <Route path="/" component={ CleanButton } />
                <Route path="/" component={ Todos } />
                <Route path="/" component={ Typing } />
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('page')
);

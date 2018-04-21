import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import configureStore from './store/configureStore';

const store = configureStore();

// tester
const subscribe = store.subscribe(() => {
    console.log(store.getState());
});

ReactDOM.render(<App store={store} />, document.getElementById('root'));
registerServiceWorker();

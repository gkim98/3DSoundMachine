import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from '../components/MainPage';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/" component={MainPage} exact={true} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;
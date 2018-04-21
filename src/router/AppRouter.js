import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DavidPage from '../components/DavidPage';
import GrantPage from '../components/GrantPage';
import MainPage from '../components/MainPage';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/" component={MainPage} exact={true}/>
                <Route path="/david" component={DavidPage} />
                <Route path="/grant" component={GrantPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;
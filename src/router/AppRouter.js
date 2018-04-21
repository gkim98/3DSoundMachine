import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DavidPage from '../components/DavidPage';
import GrantPage from '../components/GrantPage';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/david" component={DavidPage} />
                <Route path="/grant" component={GrantPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;
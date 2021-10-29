import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';
import 'antd/dist/antd.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { StorageProvider, useContextStorage } from './react-storage-state';

import { LoggedTemplate, PublicTemplate, Logout, Home, Login } from './Example';

export const VERSION = '21.11';

export default function App() {
    return (
        <StorageProvider>
            <ConfigProvider locale={ptBR}>
                <Router />
            </ConfigProvider>
        </StorageProvider>
    );
}

function Router() {
    const { useStorage } = useContextStorage();
    const [token] = useStorage('token');
    return (
        <BrowserRouter>
            {token ? <LoggedRouter /> : <PublicRouter />}
        </BrowserRouter>
    );
}

function LoggedRouter() {
    return (
        <LoggedTemplate>
            <Switch>
                <Route exact path="/about/:id/:idd" component={Home} />
                <Route exact path="/about/:id" component={Home} />
                <Route exact path="/about" component={Home} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/" component={Home} />
                {/* 404 ---------------------------------------------------- */}
                <Route render={() => <Redirect to="/logout" />} />
            </Switch>
        </LoggedTemplate>
    );
}

function PublicRouter() {
    return (
        <PublicTemplate>
            <Switch>
                <Route exact path="/" component={Login} />
                {/* 404 ---------------------------------------------------- */}
                <Route render={() => <Redirect to="/" />} />
            </Switch>
        </PublicTemplate>
    );
}

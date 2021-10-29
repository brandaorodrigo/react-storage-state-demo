import React from 'react';
import { Form, Input, Button } from 'antd';
import { NavLink, useHistory, useLocation, useParams } from 'react-router-dom';

import { useContextStorage } from './react-storage-state';

/* ========================================================================== */
/* ========================================================================== */
/* TEMPLATE ================================================================= */
/* ========================================================================== */

export const LoggedTemplate: React.FC = ({ children }) => {
    return (
        <div>
            <div style={{ padding: '20px', background: '#dd88aa' }}>
                <NavLink to="/" activeClassName="active">
                    HOME
                </NavLink>
            </div>
            <div style={{ padding: '20px', background: '#dd88aa' }}>
                <NavLink to="/about" activeClassName="active">
                    ABOUT
                </NavLink>
            </div>
            <div style={{ padding: '20px', background: '#aa65aa' }}>
                <NavLink to="/logout">SAIR</NavLink>
            </div>

            <div style={{ background: '#0ee' }}>{children}</div>
        </div>
    );
};

export const PublicTemplate: React.FC = ({ children }) => {
    return <div style={{ background: '#ee0' }}>{children}</div>;
};

/* ========================================================================== */
/* PAGES ==================================================================== */
/* ========================================================================== */

export function Login() {
    const { useStorage } = useContextStorage();
    const [, setToken] = useStorage('token');
    const [, setMall] = useStorage('mall');

    const history = useHistory();

    const onFinish = () => {
        setToken('tokenValue');
        setMall('mallValue');
        history.push('/');
        //window.location.href = '/';
    };

    return (
        <Form onFinish={onFinish}>
            <Form.Item label="Username" name="username">
                <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    );
}

export function Logout() {
    const { useStorage } = useContextStorage();
    const [, setToken] = useStorage('token');
    const [, setMall] = useStorage('mall');

    const history = useHistory();

    setTimeout(() => {
        setToken();
        setMall();
        history.push('/');
        //window.location.href = '/';
    }, 500);

    return <></>;
}

export function Home() {
    const { useStorage } = useContextStorage();
    const [token, setToken] = useStorage('token');
    const [mall, setMall] = useStorage('mall');

    const { search, hash } = useLocation();

    const history = useHistory();

    const query = new URLSearchParams(search);

    const { pathname } = useLocation();

    const { id, idd } = useParams<any>();

    return (
        <h2>
            QUERY: {query.get('teste')}
            <br />
            HASH: {hash}
            <br />
            ID: {id}
            <br />
            IDD: {idd}
            <br />
            <br />
            STATE-TOKEN: {token}
            <br />
            <br />
            MALL: {mall}
            <br />
            localStorage: {localStorage.getItem('token')}
            <br />
            <div onClick={() => setToken('newTokenValue')}>SET NEW TOKEN</div>
            <div onClick={() => setMall('newMallValue')}>SET NEW MALL</div>
            <div
                onClick={() => {
                    history.push('/reload');
                    history.replace(pathname);
                }}
            >
                RELOAD PAGE
            </div>
            <br />
            <NavLink to="/about/dsdsd?teste=444">TESTE SEARCH</NavLink>
        </h2>
    );
}

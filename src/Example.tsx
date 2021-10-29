import React, { useCallback, useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { NavLink, useHistory, useLocation, useParams } from 'react-router-dom';

import { useStorageContext, useStorage } from './react-storage-state';

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
    // MODELO 3 = MODELO 2 + CONTEXT
    const useStorage = useStorageContext();

    // MODELO 2 = LOCALSTORAGE/STATE ATRELADO DENTRO DE CADA COMPONENTE
    const [, setToken] = useStorage('token');
    const [, setMall] = useStorage('mall');

    // MODELO 1 = LOCALSTORAGE MANUALMENTE
    /*
    const [, setToken] = useState<string>();
    const [, setMall] = useState<string>();
    */

    const history = useHistory();

    const onFinish = () => {
        // MODELO 2 = LOCALSTORAGE/STATE ATRELADO DENTRO DE CADA COMPONENTE
        setToken('tokenValue');
        setMall('mallValue');
        history.push('/');

        // MODELO 1 = LOCALSTORAGE MANUALMENTE
        /*
        setToken('tokenValue');
        localStorage.setItem('token', 'zzzzz');
        setMall('mallValue');
        localStorage.setItem('mall', 'yyyyyy');
        window.location.href = '/';
        */
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
    // MODELO 3 = MODELO 2 + CONTEXT
    const useStorage = useStorageContext();

    // MODELO 2 = LOCALSTORAGE/STATE ATRELADO DENTRO DE CADA COMPONENTE
    const [, setToken] = useStorage('token');
    const [, setMall] = useStorage('mall');

    // MODELO 1 = LOCALSTORAGE MANUALMENTE
    /*
    const [, setToken] = useState<string | undefined>(
        localStorage.getItem('token') ?? undefined
    );
    const [, setMall] = useState<string | undefined>(
        localStorage.getItem('mall') ?? undefined
    );
    */

    const history = useHistory();

    const handleLogout = useCallback(() => {
        // MODELO 2 = LOCALSTORAGE/STATE ATRELADO DENTRO DE CADA COMPONENTE
        setToken(undefined);
        setMall(undefined);
        history.push('/');

        // MODELO 1 = LOCALSTORAGE MANUALMENTE
        /*
        setToken(undefined);
        localStorage.removeItem('token');
        setMall(undefined);
        localStorage.removeItem('mall');
        window.location.href = '/';
        */
    }, [history, setToken, setMall]);

    useEffect(() => {
        setTimeout(() => {
            handleLogout();
        }, 1000);
    }, [handleLogout]);

    return <div></div>;
}

export function Home() {
    // MODELO 3 = MODELO 2 + CONTEXT
    const useStorage = useStorageContext();

    // MODELO 2 = LOCALSTORAGE/STATE ATRELADO DENTRO DE CADA COMPONENTE
    const [token, setToken] = useStorage('token');
    const [mall, setMall] = useStorage('mall');

    // MODELO 1 = LOCALSTORAGE MANUALMENTE
    /*
    const [token, setToken] = useState<string | undefined>(
        localStorage.getItem('token') ?? undefined
    );
    const [mall, setMall] = useState<string | undefined>(
        localStorage.getItem('mall') ?? undefined
    );
    */

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
            <div
                onClick={() => {
                    // MODELO 2 = LOCALSTORAGE/STATE ATRELADO DENTRO DE CADA COMPONENTE
                    setToken('newTokenValue');

                    // MODELO 1 = LOCALSTORAGE MANUALMENTE
                    /*
                    setToken('newTokenValue');
                    localStorage.setItem('token', 'newTokenValue');
                    */
                }}
            >
                SET NEW TOKEN
            </div>
            <div
                onClick={() => {
                    // MODELO 2 = LOCALSTORAGE/STATE ATRELADO DENTRO DE CADA COMPONENTE
                    setMall('newMallValue');

                    // MODELO 1 = LOCALSTORAGE MANUALMENTE
                    /*
                    setMall('newMallValue');
                    localStorage.setItem('mall', 'newMallValue');
                    */
                }}
            >
                SET NEW MALL
            </div>
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

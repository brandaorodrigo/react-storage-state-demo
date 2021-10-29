import React from 'react';
import { Form, Input, Button } from 'antd';
import { NavLink, useHistory, useLocation, useParams } from 'react-router-dom';

import { StorageProvider, useStorageContext } from './react-storage-state';
import { useStorageListener } from 'react-storage-hooks/dist/common';

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
    //localStorage.clear();
    //sessionStorage.clear();
    const history = useHistory();

    const { useStorage } = useStorageContext();

    const [token, setToken] = useStorage('token');
    const [mall, setMall] = useStorage('mall');

    const onFinish = () => {
        setToken('zzzzzzzzzz');
        setMall('5');
        //setStoreId('10');
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
    const { useStorage } = useStorageContext();
    const [token, setToken] = useStorage('token');
    const [mall, setMall] = useStorage('mall');
    //const { setStorage } = useStorage();
    const history = useHistory();
    setTimeout(() => {
        setToken();
        setMall();
        //setStorage();
        //setMallId(false);
        //setStoreId(false);
        localStorage.clear();
        sessionStorage.clear();
        history.push('/');
        //window.location.href = '/';
    }, 1000);
    return <></>;
}

export function Home() {
    const { useStorage } = useStorageContext();
    const [token, setToken] = useStorage('token');
    const [mall, setMall] = useStorage('mall');

    const { search, hash } = useLocation();

    const query = new URLSearchParams(search);

    const history = useHistory();

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
                    //localStorage.setItem('token', 'ALTERADO PELA HOME');
                    setToken('AAAAA');
                    //history.push('/reload');
                    //history.replace(pathname);
                }}
            >
                RELOAD
            </div>
            <div
                onClick={() => {
                    //localStorage.setItem('token', 'ALTERADO PELA HOME');
                    setMall('x');
                    //history.push('/reload');
                    //history.replace(pathname);
                }}
            >
                MALL
            </div>
            <br />
            <NavLink to="/about/dsdsd?teste=444">TESTE SEARCH</NavLink>
        </h2>
    );
}

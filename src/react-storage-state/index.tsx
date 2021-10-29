import React, { createContext, useState, useContext } from 'react';

interface StorageContextProps {
    (key: string): [string | undefined, (value?: string | undefined) => void];
}

interface StorageProviderProps {
    children: React.ReactNode;
}

const StorageContext = createContext<StorageContextProps>(
    {} as StorageContextProps
);

const StorageProvider: React.FC<StorageProviderProps> = ({ children }) => {
    const [items, setItems] = useState<{
        [key: string]: string;
    }>({});

    const useStorage = (
        key: string,
        storage?: Storage
    ): [string | undefined, (value?: string | undefined) => void] => {
        const webStorage = storage ?? window.localStorage;

        const value = items[key] ?? webStorage.getItem(key) ?? undefined;

        const setStorage = (value?: string | undefined): void => {
            if (value) {
                webStorage.setItem(key, value);
                setItems({ ...items, [key]: value });
            } else {
                webStorage.removeItem(key);
                const current = { ...items };
                delete items[key];
                setItems(current);
            }
        };

        return [value, setStorage];
    };

    return (
        <StorageContext.Provider value={useStorage}>
            {children}
        </StorageContext.Provider>
    );
};

const useStorageContext = (): StorageContextProps => {
    const context = useContext(StorageContext);
    if (!context) {
        throw new Error('StorageContext must be use with StorageProvider');
    }
    return context;
};

const useStorage = (
    key: string,
    storage?: Storage
): [string | undefined, (value?: string | undefined) => void] => {
    const webStorage = storage ?? window.localStorage;

    const [value, setValue] = useState<string | undefined>(
        webStorage.getItem(key) ?? undefined
    );

    const setStorage = (value?: string | undefined): void => {
        setValue(value);
        if (value) {
            webStorage.setItem(key, value);
        } else {
            webStorage.removeItem(key);
        }
    };

    return [value, setStorage];
};

export { StorageProvider, useStorageContext, useStorage };

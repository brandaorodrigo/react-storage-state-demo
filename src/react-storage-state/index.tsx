import React, { createContext, useState, useContext } from 'react';

interface StorageContextProps {
    useStorage(key: string): [string, (value?: string | undefined) => void];
}

interface StorageProviderProps {
    storage?: Storage;
    children: React.ReactNode;
}

const StorageContext = createContext<StorageContextProps>(
    {} as StorageContextProps
);

const StorageProvider: React.FC<StorageProviderProps> = ({
    storage = window.localStorage,
    children,
}) => {
    const [items, setItems] = useState<{
        [key: string]: string;
    }>({});

    const useStorage = (
        key: string
    ): [string, (value?: string | undefined) => void] => {
        const value = items[key] ?? storage.getItem(key);

        if (value && !items[key]) {
            setItems({ ...items, [key]: value });
        }

        const setValue = (value?: string | undefined): void => {
            if (value) {
                storage.setItem(key, value);
                setItems({ ...items, [key]: value });
            } else {
                storage.removeItem(key);
                const current = { ...items };
                delete items[key];
                setItems(current);
            }
        };

        return [value, setValue];
    };

    return (
        <StorageContext.Provider value={{ useStorage }}>
            {children}
        </StorageContext.Provider>
    );
};

const useContextStorage = (): StorageContextProps => {
    const context = useContext(StorageContext);
    if (!context) {
        throw new Error('StorageContext must be use with StorageProvider');
    }
    return context;
};

export { StorageProvider, useContextStorage };

import React from 'react';

const context = React.createContext();

export const StoreProvider = ({ children, initialState = {} }) => {
    const [store, setStore] = React.useState(() => initialState);

    const contextValue = React.useMemo(() => [store, setStore], [store]);

    return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export default useStore = () => {
    return React.useContext(context);
};

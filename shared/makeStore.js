import React from 'react';

// Reusable store creator for generating new stores with a context for
// getting store values and dispatching to the store
export default function makeStore (reducer, initialState) {
    const storeContext = React.createContext();
    const dispatchContext = React.createContext();

    const StoreProvider = ({ children }) => {
        const [store, dispatch] = React.useReducer(reducer, initialState);
        
        return (
            <dispatchContext.Provider value={dispatch}>
                <storeContext.Provider value={store}>
                    {children}
                </storeContext.Provider>
            </dispatchContext.Provider>
        );
    };
    
    const useStore = () => {
        return React.useContext(storeContext);
    };

    const useDispatch = () => {
        return React.useContext(dispatchContext);
    }

    return [StoreProvider, useStore, useDispatch];
}

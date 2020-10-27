import React from 'react';
import { baseUrl } from '../shared/baseUrl';

const context = React.createContext();
    
const reducer = (state, action) => {
    switch (action.type) {
        case 'fetchList':
            console.log('hello');
            if (action.payload) {
                (async () => {
                    try {
                        const response = await fetch(baseUrl + action.payload.slot);
                        const jsonData = await response.json();
                        return {
                            ...state,
                            [action.payload.slot]: jsonData
                        }
                    } catch (err) {
                        throw new Error(err);                
                    }
                })();
            } else {
                throw new Error('Cannot fetchList without an action.payload');
            }
        case 'setBuildItem':
            if (!action.payload.slot) throw new Error('Cannot setBuildItem without a slot', action);
            if (!action.payload.item) throw new Error('Cannot setBuildItem without an item', action);
            return {
                ...state,
                build: {...build, [action.payload.slot]: action.payload.item}
            }
        default:
            throw new Error('Unknown action type!', action);
    }
}

export function StoreProvider ({ children, initialState = {} }) {
    const [store, dispatch] = React.useReducer(reducer, initialState);

    const contextValue = React.useMemo(() => [store, dispatch], [store, dispatch]);

    return <context.Provider value={contextValue}>{children}</context.Provider>;
};

export default useStore = () => {
    return React.useContext(context);
};

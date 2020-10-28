import makeStore from '../shared/makeStore';
import baseUrl from '../shared/baseUrl';

const initialGameData = {
    isLoading: true,
    melee: [],
    armor: [],
    ranged: [],
    artifact: [],
    enchants: [],
};

const gameDataReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { ...state, isLoading: true };
        case "FETCH":
            if (action.payload.slot) {
                (async () => {
                    try {
                        const response = await fetch(baseUrl + action.payload.slot);
                        const jsonData = await response.json();
                        return {
                            ...state,
                            isLoading: false,
                            [action.payload.slot]: jsonData
                        }
                    } catch (err) {
                        throw new Error(err);                
                    }
                })();
            } else {
                throw new Error('Cannot FETCH without an action.payload.slot');
            }
            break;
        default:
            throw new Error('Unknown action type!', action);
    }    
}

const [
    GameDataProvider,
    useGameData,
    useGameDataDispatch
] = makeStore(gameDataReducer, initialGameData);

export { GameDataProvider, useGameData, useGameDataDispatch };
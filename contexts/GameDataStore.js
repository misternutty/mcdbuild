import makeStore from '../shared/makeStore';

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
        case "LOADING_BEGIN":
            return { ...state, isLoading: true };
        case "LOADING_FINISH":
            return { ...state, isLoading: false };
        case "ADD":
            if (!action.payload.slot) throw new Error('Cannot ADD game data without action.payload.slot', action);
            if (!action.payload.data) throw new Error('Cannot ADD game data without action.payload.data', action);
            return {
                ...state,
                [action.payload.slot]: action.payload.data
            }
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
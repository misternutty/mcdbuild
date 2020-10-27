import makeStore from '../shared/makeStore';

const initialBuild = {
    melee: { name: 'Melee Weapon' },
    armor: { name: 'Armor' },
    ranged: { name: 'Ranged Weapon' },
    artifactOne: { name: 'Artifact 1' },
    artifactTwo: { name: 'Artifact 2' },
    artifactThree: { name: 'Artifact 3' },
}

const buildReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ITEM':
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

const [
    BuildProvider,
    useBuild,
    useBuildDispatch
] = makeStore(buildReducer, initialBuild);

export { BuildProvider, useBuild, useBuildDispatch };
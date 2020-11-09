import makeStore from '../shared/makeStore';

const initialWishlist = {
    items: [],
};

const wishlistReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            if (!action.payload) throw new Error('Cannot ADD item to wishlist without a payload', action);
            return {
                ...state,
                items: state.items.concat(action.payload)
            }
        case 'DELETE':
            if (!action.payload) throw new Error('Cannot DELETE item from wishlist without a payload', action);
            return {
                ...state,
                items: state.items.filter(item => item !== action.payload),
            }
        default:
            throw new Error('Unknown action type!', action);
    }    
}

const [
    WishlistProvider,
    useWishlist,
    useWishlistDispatch
] = makeStore(wishlistReducer, initialWishlist);

export { WishlistProvider, useWishlist, useWishlistDispatch };
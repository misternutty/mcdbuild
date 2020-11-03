import React from 'react';
import { ScrollView, Text } from 'react-native';
import { useWishlist } from '../contexts/WishlistStore';

export const WishlistPage = () => {
    const wishlist = useWishlist();

    const items = wishlist.items.map( (item, index) => {
        return <Text key={index}>{item.name}</Text>
    })

    return (
        <ScrollView>
            <Text>Wishlist Page</Text>
            {items}
        </ScrollView>
    );
};
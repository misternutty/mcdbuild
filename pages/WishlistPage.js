import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { useGameData } from '../contexts/GameDataStore';
import { useWishlist } from '../contexts/WishlistStore';

export const WishlistPage = () => {
    const wishlist = useWishlist();
    const { levels } = useGameData();
    const [ filteredLevels, setFilteredLevels ] = useState([]);

    useEffect(() => {
        // items may be special versions of base items and
        // levels only have a definition of base items (which may drop as the special version)
        // this effect compares level drop tables and wishlist items

        // setup an array of the base items that correspond to the wishlist items
        const baseItems = [];
        wishlist.items.map(item => baseItems.push(item.baseItem));

        // create a new array of levels that have at least one drop that matches a wishlist item
        levelsWithReleventDrops = levels.filter( level => {
            return level.drops.some(item => {
                return baseItems.includes(item);
            });
        });
        
        // go through each level and add the item data for each wishlist item
        // that can drop in that level
        levelsWithReleventDrops.forEach( level => {
            level.filteredDrops = wishlist.items.filter( item => {
                return level.drops.includes(item.baseItem);
            });
        })

        // order the levels so that the levels with the most wished for drops are first
        levelsWithReleventDrops.sort((level1, level2) => 
            level2.filteredDrops.length - level1.filteredDrops.length
        );

        // update the state now that the levels/drops have been processed
        setFilteredLevels(levelsWithReleventDrops);

    },[wishlist.items]); // run every time the wishlist store's list of items changes

    // turn the filtered levels into level components
    const levelList = filteredLevels.map( (level, index) => {
        return <Level name={level.name} drops={level.filteredDrops} key={index} />
    });

    return (
        <ScrollView style={styles.container}>
            {levelList}
        </ScrollView>
    );
};

const Level = ( {name, drops = []} ) => {
    const items = drops.map( (item, index) => 
        <Text style={styles.itemName} key={index} >{item.name}</Text>
    );

    return (
        <View style={styles.level}>
            <Text style={styles.label}>{name}</Text>
            <Divider style={styles.divider} />
            {items}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 15,
    },
    label: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    divider: {
        height: 3,
        marginVertical: 5,
    },
    level: {
        // flexDirection: 'row',
        marginBottom: 5,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
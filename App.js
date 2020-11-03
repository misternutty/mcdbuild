import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ActivityIndicator, ScrollView, Text, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GameDataProvider, useGameData, useGameDataDispatch } from './contexts/GameDataStore';
import { BuildProvider } from './contexts/BuildStore';
import { WishlistProvider, useWishlist } from './contexts/WishlistStore';
import { BuildPage } from './pages/BuildPage';
import baseUrl from './shared/baseUrl';

const App = () => {
    // hook into the game data store and dispatch for game data
    const gameData = useGameData();
    const dispatch = useGameDataDispatch();

    const Tab = createMaterialTopTabNavigator();

    // on app load, fetch all the game data
    useEffect(() => {
            fetchGameData();
        },[]
    );

    const fetchGameData = () => {
        // array of slots game data is stored in
        const slots = [
            'melee',
            'armor',
            'ranged',
            'artifact'
        ];

        // fetch the data for a given slot
        fetchSlotData = async (slot) => {
            const response = await fetch(baseUrl + slot);
            const jsonData = await response.json();
            return jsonData;
        }


        // BEGIN DISPATCHING ACTIONS FOR DATA LOADING

        // set loading to true (should be redundant with initial data)
        dispatch({ type: 'LOADING_BEGIN' });

        // group all slot data fetching promises together
        Promise.all(
            slots.map(slot => fetchSlotData(slot)))
            // then dispatch all the fetched data to the appropriate state slots
            .then(values => values.map((value, i) => {
                dispatch({
                    type: 'ADD',
                    payload: {
                        slot: slots[i],
                        data: value
                    }
                })
            }))
            // then set loading to false
            .then(() => {
                dispatch({ type: 'LOADING_FINISH' });
            });
    }

    if (gameData.isLoading) { // display loading "page" until game data is fetched
        return ( <ActivityIndicator /> );
    } else {
        return (
            <Tab.Navigator
                initialRouteName="Build"
                style={styles.container}
            >
                <Tab.Screen name="Wishlist" component={WishlistPage} />
                <Tab.Screen name="Build" component={BuildPage} />
            </Tab.Navigator>
        );
    }
};


// wrappers for App component
export default () => {
    return (
        <NavigationContainer>
            <GameDataProvider>
                <WishlistProvider>
                    <BuildProvider>
                        <App />
                    </BuildProvider>
                </WishlistProvider>
            </GameDataProvider>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,
    },
});

const WishlistPage = () => {
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
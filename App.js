import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ScrollView, Text, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GameDataProvider, useGameData, useGameDataDispatch } from './contexts/GameDataStore';
import { BuildProvider } from './contexts/BuildStore';
import { BuildPage } from './pages/BuildPage';

const App = () => {
    // hook into the game data store and dispatch for game data
    // const gameData = useGameData();
    // const dispatch = useGameDataDispatch();

    const Tab = createMaterialTopTabNavigator();

    // on app load, fetch all the game data
    // useEffect(() => {
    //         // dispatch({ type: 'LOADING' });
    //         fetchDataList('melee');
    //         fetchDataList('armor');
    //         fetchDataList('ranged');
    //         fetchDataList('artifact');
    //     },[]
    // );

    // log game data updates
    // useEffect(() => {
    //         console.log('Game Data', gameData);
    //     },[gameData]
    // );

    // const fetchDataList = (slot = '') => dispatch({
    //     type: 'FETCH',
    //     payload: {slot: slot}
    // });

    // if (!gameData.isLoading) {
        return (
            <Tab.Navigator
                initialRouteName="Build"
                style={styles.container}
            >
                <Tab.Screen name="Wishlist" component={WishlistPage} />
                <Tab.Screen name="Build" component={BuildPage} />
            </Tab.Navigator>
        );
    // } else {
    //     return ( <ActivityIndicator /> );
    // }
};

export default () => {
    return (
        <NavigationContainer>
            <GameDataProvider>
                <BuildProvider>
                    <App />
                </BuildProvider>
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
    return (
        <ScrollView>
            <Text>Wishlist Page</Text>
        </ScrollView>
    );
};
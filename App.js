import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ScrollView, Text, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StoreProvider } from './contexts/StoreContext';
import { BuildPage } from './pages/BuildPage';

export default App = () => {
    const initialStoreState = {
        build: {
            melee: { name: 'Melee Weapon' },
            armor: { name: 'Armor' },
            ranged: { name: 'Ranged Weapon' },
            artifactOne: { name: 'Artifact 1' },
            artifactTwo: { name: 'Artifact 2' },
            artifactThree: { name: 'Artifact 3' },
        },
    };

    const Tab = createMaterialTopTabNavigator();

    return (
        <StoreProvider initialState={initialStoreState}>
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName="Build"
                    style={styles.container}
                >
                    <Tab.Screen name="Wishlist" component={WishlistPage} />
                    <Tab.Screen name="Build" component={BuildPage} />
                </Tab.Navigator>
            </NavigationContainer>
        </StoreProvider>
    );
};

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

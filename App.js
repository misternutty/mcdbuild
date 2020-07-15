import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ScrollView, Text, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


export default App = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Build"
        style={styles.container}
      >
        <Tab.Screen name="Wishlist" component={WishlistPage} />
        <Tab.Screen name="Build" component={BuildPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight,
  }
})

const WishlistPage = () => {
  return (
    <ScrollView>
      <Text>Wishlist Page</Text>
    </ScrollView>
  );
}

const BuildPage = () => {
  return (
    <ScrollView>
      <Text>Melee Weapon</Text>
      <Text>Armor</Text>
      <Text>Ranged Weapon</Text>
      <Text>Artifact 1</Text>
      <Text>Artifact 2</Text>
      <Text>Artifact 3</Text>
    </ScrollView>
  );
}
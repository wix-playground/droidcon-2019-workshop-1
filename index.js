import React from 'react';
import {AppRegistry} from 'react-native';
import CharactersList from './src/CharactersList';
import HeroDetails from './src/HeroDetails';
import {name as appName} from './app.json';
import {enableScreens} from 'react-native-screens';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

enableScreens();

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3a3535',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen name="Home" component={CharactersList} />
        <Stack.Screen name="Details" component={HeroDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => App);

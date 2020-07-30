console.disableYellowBox = true;

import React from 'react';
import {AppRegistry} from 'react-native';
import CharactersList from './src/CharactersList';
import HeroDetails from './src/HeroDetails';
import {name as appName} from './app.json';
import {enableScreens} from 'react-native-screens';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

export const CHARACTERS_LIST = 'CL';
export const HERO_DETAILS = 'HD';

enableScreens();

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={CHARACTERS_LIST}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3a3535',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen name={CHARACTERS_LIST} component={CharactersList} />
        <Stack.Screen name={HERO_DETAILS} component={HeroDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => App);

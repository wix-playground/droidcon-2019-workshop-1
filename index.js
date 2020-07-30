console.disableYellowBox = true;

import React from 'react';
import CharactersList from './src/CharactersList';

import {Navigation} from 'react-native-navigation';
import HeroDetails from "./src/HeroDetails";

export const CHARACTERS_LIST = 'com.wix.rnn-rn-benchmark.CharactersList';
export const HERO_DETAILS = 'com.wix.rnn-rn-benchmark.HeroDetails';

Navigation.registerComponent(CHARACTERS_LIST, () => CharactersList);
Navigation.registerComponent(HERO_DETAILS, () => HeroDetails);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: CHARACTERS_LIST,
            },
          },
        ],
      },
    },
  });
});

import {AppRegistry} from 'react-native';
import CharactersList from './src/CharactersList';
import HeroDetails from './src/HeroDetails';
import {name as appName} from './app.json';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {useScreens} from 'react-native-screens';

useScreens();

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: CharactersList,
      navigationOptions: {
        title: 'Super Heroes',
      },
    },
    Details: {
      screen: HeroDetails,
      navigationOptions: ({navigation}) => ({
        title: navigation.state.params.hero.name,
      }),
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#3a3535',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

AppRegistry.registerComponent(appName, () => createAppContainer(AppNavigator));

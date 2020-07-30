import React from 'react';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {View, Button, Text} from 'react-native-ui-lib';
import {Navigation} from 'react-native-navigation';
import profiler from './benchmarking/ScreenProfiler';
import {CHARACTERS_LIST, HERO_DETAILS} from '../index';
import TestController from './TestController';

class HeroDetails extends React.Component {
  static options(props) {
    return {
      topBar: {
        title: {
          color: '#FFFFFF',
          text: props.hero.name
        },
        background: {
          color: '#3a3535',
        },
      },
    };
  }

  firstRender = true;

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    if (props.scenario === 'constructor') {
      profiler.scenario('constructor').sample(HERO_DETAILS, props.instanceId);
    }
  }

  componentDidAppear() {
    if (this.props.scenario === 'appear') {
      profiler.scenario('appear').sample(HERO_DETAILS, this.props.instanceId);
    }
  }

  render() {
    if (this.firstRender && this.props.scenario === 'render') {
      profiler.scenario('render').sample(HERO_DETAILS, this.props.instanceId);
    }
    this.firstRender = false;
    const hero = this.props.hero;
    return (
      <>
        <WebView testID="webview" source={{uri: this.getHeroUrl(hero)}} style={styles.content} />
        <TestController
          {...this.props}
          thisComponentName={HERO_DETAILS}
          otherComponentName={CHARACTERS_LIST}
        />
      </>
    );
  }

  getHeroUrl({urls}) {
    return (
      this.getUrl(urls, 'wiki') ||
      this.getUrl(urls, 'details') ||
      'https://www.marvel.com/'
    );
  }

  getUrl(urls, type) {
    return (urls.find(item => item.type === type) || {}).url;
  }
}

const styles = StyleSheet.create({
  content: {
    opacity: 0.99, // lol https://github.com/react-native-community/react-native-webview/issues/430
    backgroundColor: '#232020',
  },
});

export default HeroDetails;

import React from 'react';
import {StyleSheet, InteractionManager} from 'react-native';
import {WebView} from 'react-native-webview';
import profiler from './benchmarking/ScreenProfiler';
import {CHARACTERS_LIST, HERO_DETAILS} from '../index';
import TestController from './TestController';

class HeroDetails extends React.Component {
  firstRender = true;

  constructor(props) {
    super(props);
    if (this.getScenario() === 'constructor') {
      profiler.scenario('constructor').sample(HERO_DETAILS, this.getInstanceId());
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      if (this.getScenario() === 'appear') {
        profiler.scenario('appear').sample(HERO_DETAILS, this.getInstanceId());
      }
    });
  }

  getScenario = () => {
    return this.getProp('scenario');
  };

  getInstanceId = () => {
    return this.getProp('instanceId');
  };

  getProp = propName => {
    return (
      this.props[propName] ||
      (this.props.route &&
        this.props.route.params &&
        this.props.route.params[propName])
    );
  };

  render() {
    if (this.firstRender && this.getScenario() === 'render') {
      profiler.scenario('render').sample(HERO_DETAILS, this.props.instanceId);
    }
    this.firstRender = false;
    const hero = this.props.hero || this.props.route.params.hero;
    return (
      <>
        <WebView
          testID="webview"
          source={{uri: this.getHeroUrl(hero)}}
          style={styles.content}
        />
        <TestController
          {...this.props}
          hero={hero}
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

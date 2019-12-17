import React from 'react';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

class HeroDetails extends React.Component {
  render() {
    const hero = this.props.navigation.getParam('hero');
    return (
      <WebView source={{uri: this.getHeroUrl(hero)}} style={styles.content} />
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
    backgroundColor: '#232020',
  },
});

export default HeroDetails;

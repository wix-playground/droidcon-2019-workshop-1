import React from 'react';
import {StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

class HeroDetails extends React.Component {
  constructor(props) {
    super(props);
    console.log('guyca', 'HeroDetails ctor');
  }

  render() {
    const hero = this.props.hero;
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
    return (urls.find((item) => item.type === type) || {}).url;
  }
}

const styles = StyleSheet.create({
  content: {
    opacity: 0.99, // lol https://github.com/react-native-community/react-native-webview/issues/430
    backgroundColor: '#232020',
  },
});

export default HeroDetails;

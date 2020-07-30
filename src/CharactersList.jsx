import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
import ListItemCard from './CharacterListItem';
import * as MarvelApi from './service';
import {Navigation} from 'react-native-navigation';
import {CHARACTERS_LIST, HERO_DETAILS} from '../index';
import TestController from './TestController';

class CharactersList extends React.Component {
  state = {
    isLoading: true,
    characters: [],
    offset: 0,
  };

  static options = {
    topBar: {
      title: {
        text: 'Home',
        color: '#FFFFFF',
      },
      background: {
        color: '#3a3535',
      },
    },
  };

  constructor(props) {
    super(props);
    for (let i = 0; i < Math.pow(2, 20); i++);
  }

  componentDidMount() {
    this._fetchCharacters();
  }

  _fetchCharacters() {
    this.setState({isLoading: true});
    MarvelApi.fetchCharacters(this.state.offset).then(charactersData => {
      const results = charactersData.data.results;
      this.setState({
        characters:
          this.state.offset === 0
            ? results
            : [...this.state.characters, ...results],
        isLoading: false,
        offset: this.state.offset + this.state.characters.length,
      });
    });
  }

  _handleLoadMore = () => {
    if (!this.state.isLoading) {
      this._fetchCharacters();
    }
  };

  _renderFooter = () => {
    if (!this.state.isLoading) {
      return null;
    }
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE',
        }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  _removeCharacter = id => {
    this.setState({
      characters: this.filterCharacters(this.state.characters, id),
    });
  };

  _toggleFavorite = id => {
    this.setState({
      characters: this.sortCharacters(this.state.characters, id),
    });
  };

  filterCharacters(array, id) {
    return array.filter(item => item.id !== id);
  }

  sortCharacters(array, id) {
    return array
      .map(item => {
        item.isFavorite = item.id === id ? !item.isFavorite : item.isFavorite;
        return item;
      })
      .sort((char1, char2) => {
        const char1Name = char1.name;
        const char2Name = char2.name;
        let nameSortValue =
          char1Name < char2Name ? -1 : char1Name > char2Name ? 1 : 0;
        if (char1.isFavorite && char2.isFavorite) {
          return nameSortValue;
        } else if (char1.isFavorite) {
          return -1;
        } else if (char2.isFavorite) {
          return 1;
        } else {
          return nameSortValue;
        }
      });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content" backgroundColor="#232020" />
        <FlatList
          data={this.state.characters}
          style={styles.list}
          testID="character-list"
          keyExtractor={item => item.id.toString()}
          onEndReached={this._handleLoadMore}
          ListFooterComponent={this._renderFooter}
          onEndReachedThreshold={0.4}
          renderItem={({item, index}) => (
            <View testID={`hero-details-${index}`}>
              <ListItemCard
                detail={item}
                isFavorite={item.isFavorite}
                onRemoveItem={this._removeCharacter}
                onFavoriteClicked={this._toggleFavorite}
                onPress={() => {
                  Navigation.push(this.props.componentId, {
                    component: {
                      name: HERO_DETAILS,
                      passProps: {
                        hero: item,
                      },
                    },
                  });
                }}
              />
            </View>
          )}
        />
        <TestController
          {...this.props}
          thisComponentName={CHARACTERS_LIST}
          otherComponentName={HERO_DETAILS}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#232020',
  },
});

export default CharactersList;

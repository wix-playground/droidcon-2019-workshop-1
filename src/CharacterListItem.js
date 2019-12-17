import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Card, Button, Text} from 'react-native-ui-lib';

const deleteIcon = require('../img/delete.png');
const favorite = require('../img/favorite.png');
const favoriteSelected = require('../img/favorite_selected.png');

export default class CharacterListItem extends React.PureComponent {
  render() {
    let img =
      this.props.detail.thumbnail.path +
      '/portrait_medium.' +
      this.props.detail.thumbnail.extension;
    let name = this.props.detail.name;
    let desc = this.props.detail.description
      ? this.props.detail.description
      : 'no description';
    return (
      <Card row height={150} style={styles.card} onPress={this.props.onPress}>
        <Card.Image width={100} imageSource={{uri: img}} />
        <View padding-20 flex>
          <Text text70 white numberOfLines={1}>
            {name}
          </Text>
          <Text
            style={styles.testDesc}
            text90
            dark50
            numberOfLines={4}
            ellipsizeMode={'tail'}>
            {desc}
          </Text>
          <View row style={styles.btn}>
            <Button
              text90
              link
              red30
              iconSource={deleteIcon}
              label="Remove"
              onPress={() => this.props.onRemoveItem(this.props.detail.id)}
            />
            <Button
              marginL-10
              text90
              link
              red10
              iconSource={this.props.isFavorite ? favoriteSelected : favorite}
              label="Favorite"
              onPress={() => this.props.onFavoriteClicked(this.props.detail.id)}
            />
          </View>
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#3a3535',
  },
  testDesc: {
    height: 60,
    marginBottom: 15,
  },
  btn: {
    alignSelf: 'flex-end',
  },
});

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View, Card, Button, Text, Image} from 'react-native-ui-lib';

const deleteIcon = require('../img/delete.png');

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
      <Card row height={150} style={styles.card}>
        <Card.Image width={100} imageSource={{uri: img}} />
        <View padding-20 flex>
          <Text text70 dark10>
            {name}
          </Text>
          <Text style={styles.testDesc} text90 dark50>
            {desc}
          </Text>

          <View row style={styles.btn}>
            <Button
              text90
              link
              red10
              iconSource={deleteIcon}
              label="Remove"
              onPress={() => this.props.onRemoveItem(this.props.detail.id)}
            />
          </View>
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 3,
  },
  testDesc: {
    height: 60,
    marginBottom: 15,
  },
  btn: {
    alignSelf: 'flex-end',
  },
});

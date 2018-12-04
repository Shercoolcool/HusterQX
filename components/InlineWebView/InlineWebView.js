import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class InlineWebView extends Component {
  render() {
    const { navigation } = this.props;
    const html = navigation.getParam('html', '<h1>haha</h1>');
    return (
      <WebView
        originWhitelist={['*']}
        source={{ html: html }}
      />
    );
  }
}
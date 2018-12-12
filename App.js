import React from 'react';
import { Font } from 'expo';
import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';
import Util from './components/Util';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import TabNavigator from './components/TabNavigator/TabNavigator';
import { YellowBox } from 'react-native';

const uiTheme = {
  palette: {
    primaryColor: COLOR.deepPurple500,
    canvasColor: COLOR.deepPurple500,
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};

export default class App extends React.Component {

  componentDidMount() {
    Font.loadAsync({  // 设置Roboto字体
      'Roboto': require('./assets/fonts/Roboto-Light.ttf'),
    });
    YellowBox.ignoreWarnings(['Require cycle:']);
  }

  render() {
    return (
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <TabNavigator />
      </ThemeContext.Provider>
    )
  }
}
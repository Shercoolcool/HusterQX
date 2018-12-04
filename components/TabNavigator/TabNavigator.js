import React from 'react';
import { createAppContainer,createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import InfomationScreen from '../InfomationScreen/InfomationScreen.js';
import IntelligenceScreen from '../IntelligenceScreen/IntelligenceScreen.js';
import DiscussionScreen from '../DiscussionScreen/DiscussionScreen.js';
import MyScreen from '../MyScreen/MyScreen';
import { COLOR } from 'react-native-material-ui';
import SignInScreen from '../SignInScreen/SignInScreen';
import SignUpScreen from '../SignUpScreen/SignUpScreen';
import MoreInfoTemplateScreen from '../MoreInfoTemplateScreen/MoreInfoTemplateScreen';
import DetailInfoScreen from '../DetailInfoScreen/DetailInfoScreen';
import InlineWebView from '../InlineWebView/InlineWebView';
import { Feather, Ionicons, Octicons } from '@expo/vector-icons';

const MyStack = createStackNavigator(
    {
        My: MyScreen,
        SignIn: SignInScreen,
        SignUp: SignUpScreen,
    },
    {
        headerMode: 'none',
    }
);

const InfomationStack = createStackNavigator(
    {
        Information: InfomationScreen,
        SignIn: SignInScreen,
        SignUp: SignUpScreen,
        MoreInfoTemplate: MoreInfoTemplateScreen,
        DetailInfo: DetailInfoScreen,
        InlineWebView: InlineWebView,
    },
    {
        headerMode: 'none',
    }
);

const TabNavigator = createMaterialBottomTabNavigator({
    Information: { 
        screen: InfomationStack,
        navigationOptions: {
            tabBarLabel: '资讯',
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const color = focused ? COLOR.deepPurple500 : 'grey';
                return (
                    <Ionicons name="ios-paper" size={24} color={color}/>
                );
            },
        }
    },
    Intelligence: {
        screen: IntelligenceScreen,
        navigationOptions: {
            tabBarLabel: '情报',
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const color = focused ? COLOR.deepPurple500 : 'grey';
                return (
                    <Ionicons name="ios-information-circle-outline" size={24} color={color}/>
                );
            },
        }
    },
    Discussion: {
        screen: DiscussionScreen,
        navigationOptions: {
            tabBarLabel: '讨论',
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const color = focused ? COLOR.deepPurple500 : 'grey';
                return (
                    <Octicons name="comment-discussion" size={24} color={color}/>
                );
            },
        }
    },
    My: { 
        screen: MyStack,
        navigationOptions: {
            tabBarLabel: '我',
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const color = focused ? COLOR.deepPurple500 : 'grey';
                return (
                    <Feather name="user" size={24} color={color} />
                );
            }
        }
    },
}, {
        initialRouteName: 'Information',
        activeColor: COLOR.deepPurple500,
        inactiveColor: 'grey',
        barStyle: { backgroundColor: 'white' },
    });

export default createAppContainer(TabNavigator);
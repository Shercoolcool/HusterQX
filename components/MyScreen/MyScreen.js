import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, COLOR, Card, Avatar, Toolbar, ListItem } from 'react-native-material-ui';
import Util from '../Util';

const styles = StyleSheet.create(
    {
        root: {
            width: '100%',
        },
        card: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            backgroundColor: COLOR.deepPurple500,
            margin: 8,
            padding: 20,
            borderRadius: 4,
        },
        cardText: {
            color: 'white',
            marginBottom: 8,
        },
        cardText_0: {
            fontWeight: '400'
        },
        cardText_1: {
            fontSize: 24,
            fontWeight: '500'
        },
        cardText_2: {
            fontWeight: '500',
            fontSize: 18,
            marginHorizontal: 16,
            marginBottom: 0,
        },
        cardTextContainer: {
            display: 'flex',
            width: '100%',
            height: '100%',
            marginLeft: 12,
        },
        cardTextContainer_: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: 8,
        },
        divider: {
            width: '80%',
            height: 1.5,
            backgroundColor: 'rgba(0,0,0,0.3)',
            marginBottom: 8,
        },
        cardButtonContainer: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginLeft: 16,
            marginBottom: 8,
        },
        listItemContainer: {
            marginTop: 32,
            paddingHorizontal: 16,
        }
    }
)

const materialStyles = {
    button: {
        text: {
            color: 'white',
        },
        container: {
            marginRight: 1,
        }
    },
    setupBar: {
        container: {
            backgroundColor: 'white',
            marginTop: 32,
        }
    },
    listItem: { // 垃圾组件，待更换为自定义组件
        container: {
            backgroundColor: 'white',
            marginVertical: 1,
        }
    }
}

export default class MyScreen extends Component {
    state = {
        isSignedIn: false,
        userData: {  // 待更新为返回的数据
            id: 'U2017111111',
            name: '哈哈哈',
            major: '大创产工',
            grade: '17',
        },
    };

    async componentDidMount() {
        console.log("componentDidMount!");
        if(!this.state.isSignedIn) {
            const isSignedIn = await Util.storage._retrieveData('isSignedIn');
            let userDataJson = await Util.storage._retrieveData('userData');
            if (isSignedIn == 'true') {
                // let userDataJson = await Util.storage._retrieveData('userData');
                let userData = {};
                if(userDataJson != false) {
                    userData_ = JSON.parse(userDataJson);
                    userData.id = userData_.school_num;
                    userData.name = userData_.name;
                    userData.major = '大创产工';    // 后台需要更新数据
                    userData.grade = '17';
                }
                this.setState({
                    isSignedIn: true,
                    userData: userData
                });
            } else {
                console.log('未登陆！');
                if(this.state.isSignedIn == true) {
                    this.setState({
                        isSignedIn: false,
                    });
                }
            }
        }
    }

    render() {
        const { isSignedIn, userData } = this.state;
        const { navigation } = this.props;
        return (
            <View style={styles.root}>
                <Toolbar
                    centerElement="我的"
                />
                <View style={styles.card}>
                    <Avatar size={64} icon="person" iconSize={32} style={styles.avatar} />
                    {isSignedIn ? (
                        <View style={styles.cardTextContainer}>
                            <Text style={[styles.cardText, styles.cardText_0]}>{userData.id}</Text>
                            <Text style={[styles.cardText, styles.cardText_1]}>{userData.name}</Text>
                            <View style={styles.divider} />
                            <View style={styles.cardTextContainer_}>
                                <Text style={[styles.cardText, styles.cardText_2]}>{userData.major}</Text>
                                <Text style={[styles.cardText, styles.cardText_2]}>{userData.grade}</Text>
                            </View>
                        </View>
                    ) : (
                            <View style={styles.cardButtonContainer}>
                                <Button raised primary style={materialStyles.button} text="注册" onPress={() => this.props.navigation.navigate('SignUp')} />
                                <Button raised primary style={materialStyles.button} text="登陆" onPress={() => this.props.navigation.navigate('SignIn', {this: this, screen: 'My'})} />
                            </View>
                        )}
                </View>
                <View style={styles.listItemContainer}>
                    <ListItem
                        divider
                        centerElement={{
                            primaryText: '关于我们',
                        }}
                        onPress={() => { }}
                        style={materialStyles.listItem}
                    />
                    <ListItem
                        divider
                        centerElement={{
                            primaryText: '帮助',
                        }}
                        onPress={() => { }}
                        style={materialStyles.listItem}
                    />
                    <ListItem
                        centerElement={{
                            primaryText: '投诉与建议',
                        }}
                        onPress={() => { }}
                        style={materialStyles.listItem}
                    />
                    <ListItem
                        centerElement={{
                            primaryText: '设置',
                        }}
                        onPress={() => { }}
                        style={materialStyles.setupBar}
                    />
                </View>
            </View>
        );
    }
}
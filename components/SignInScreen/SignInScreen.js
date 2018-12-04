import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Image, ImageBackground, AsyncStorage } from 'react-native';
import Util from '../Util';
import { Button } from 'react-native-material-ui';
import { Ionicons } from '@expo/vector-icons';
import logo from '../../assets/logo.png';
import bg_0 from '../../assets/bg_0.png';
import CryptoJS from 'crypto-js';

const styles = StyleSheet.create(
    {
        root: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
        },
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '80%'
        },
        logo: {
            alignSelf: 'flex-start',
        },
        textInput: {
            width: '100%',
            height: 40,
            fontSize: 16,
            borderBottomWidth: 1,
            borderBottomColor: 'grey',
        },
        text: {
            alignSelf: 'flex-start',
            marginTop: 16,
            marginBottom: 16,
        },
        title: {
            fontSize: 24,
        },
        smallText: {
            fontSize: 20,
        },
        smallerText: {
            alignSelf: 'flex-start',
            color: 'red',
            fontSize: 13,
            textAlign: 'left',
            marginTop: 8,
            height: 16,
        },
        emptyView: {
            height: 24,
        },
        footContainer: {
            width: '88%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
    }
)

const materialStyles = {
    SignInButton: {
        text: {
            fontSize: 24,
            color: 'white',
        },
        container: {
            width: '75%',
            height: 40,
            marginTop: 64,
            marginBottom: 16,
            borderRadius: 24,
        }
    },
    forgotButton: {
        text: {
            color: 'grey',
        }
    }
}

export default class SignInScreen extends Component {
    static navigationOptions = {
        title: 'Huster轻讯',
        headerStyle: {
            backgroundColor: 'rgba(0,0,0,0)',
        },
        headerTitleStyle: {
            flex: 1,
            textAlign: 'center',
            fontWeight: '300',
        },
        headerBackImage: <Ionicons name="ios-arrow-back" size={32} color="black" />,
        headerRight: <View />,
    };

    state = {
        id: '',
        password: '',
        ispasswdWrong: false,
        isSignedIn: false,
    };

    _retrieveData = async (key) => {    // 同步
        try {
            const value = await AsyncStorage.getItem(key);
            console.log(value)
            if (value !== null) {
                // We have data!!
                console.log('value:', value);
                return value;
            }
        } catch (error) {
            // Error retrieving data
            console.log(error);
            return false;
        }
    }

    _storeData = async (key, value) => {    // 同步
        try {
            await AsyncStorage.setItem(key, value);
            return true;
        } catch (error) {
            // Error saving data
            console.log(error);
            return false;
        }
    }

    _handleLogin = async () => {  // 登陆逻辑
        console.log("press login!");
        const MyScreenThis = this.props.navigation.getParam('this', this);
        let hash = CryptoJS.SHA1(this.state.id + ':' + this.state.password).toString();
        try {
            const res = await fetch(Util.backgroundAPI.signIn, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    school_num: this.state.id,
                    passwd: hash,
                }),
            });
            let resJson = await res.json();
            console.log(resJson);
            // console.log(JSON.stringify(resJson))
            // if (resJson.code == 0) {
                Util.storage._storeData('isSignedIn', 'true');
                Util.storage._storeData('userData', JSON.stringify(resJson));
                MyScreenThis.setState({
                    isSignedIn: true
                });
                this.props.navigation.navigate('My', {
                    signInRes: resJson
                });
            // } else {
            //     // 待更新登陆失败逻辑
            //     // this.setState({  
            //     //     ispasswdWrong: true
            //     // });
            // }
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        const { id, ispasswdWrong } = this.state;
        const borderBottomColorStyle = {
            borderBottomColor: 'red'
        };
        let textInputStyles = [styles.textInput];
        if (id.length > 10) {
            textInputStyles.push(borderBottomColorStyle);
        }
        return (
            <ImageBackground source={bg_0} style={styles.root}>
                <View style={styles.container}>
                    <Image source={logo} style={styles.logo} />
                    <Text style={[styles.text, styles.title]}>Huster轻讯</Text>
                    <Text style={[styles.text, styles.smallText]}>学号</Text>
                    <TextInput
                        style={textInputStyles}
                        onChangeText={(text) => this.setState({ id: text })}
                        value={this.state.id}
                    />
                    {id.length > 10 ? <Text style={styles.smallerText}>请输入正确的学号</Text> : <View style={styles.emptyView} />}
                    <Text style={[styles.text, styles.smallText]}>密码</Text>
                    <TextInput
                        style={textInputStyles}
                        onChangeText={(text) => this.setState({ password: text })}
                        value={this.state.password}
                        secureTextEntry={true}
                    />
                    {ispasswdWrong ? <Text style={styles.smallerText}>请输入正确的密码</Text> : <View style={styles.emptyView} />}
                    <Button
                        raised
                        primary
                        style={materialStyles.SignInButton}
                        text='登陆'
                        onPress={this._handleLogin}
                    />
                    <View style={styles.footContainer}>
                        <Button
                            primary
                            text='忘记密码'
                            style={materialStyles.forgotButton}
                            onPress={() => console.log("forget pw!")}
                        />
                        <Button
                            primary
                            text='注册'
                            onPress={() => this.props.navigation.navigate('SignUp')}
                        />
                    </View>
                </View>
            </ImageBackground>
        );
    }
}
import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground, TextInput } from 'react-native';
import { Button } from 'react-native-material-ui';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import bg_0 from '../../assets/bg_0.png';
import CryptoJS from 'crypto-js';
import Util from '../Util';

export default class SignUpScreen extends Component {
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
        name: '',
        id: '',
        password: '',
        isPasswdWrong: false,
    };

    _bindDoneButton = async () => {
        console.log(this.state.id);
        console.log(this.state.password);
        let hash = CryptoJS.SHA1(this.state.id + ':' + this.state.password).toString();
        console.log(hash);
        try {
            const res = await fetch(Util.backgroundAPI.signUp, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.state.name,
                    school_num: this.state.id,
                    passwd: hash,
                }),
            });
            let resJson = await res.json();
            console.log(resJson);
            if(resJson.code == 0) {
                this.props.navigation.navigate('SignIn', {
                    signUpRes: resJson
                });
            }
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        const {id, password} = this.state;
        const borderBottomColorStyle = {
            borderBottomColor: 'red'
        };
        let textInputStyles = [styles.textInput];
        let textInputStyles_ = [styles.textInput];
        if(id.length > 10) {
            textInputStyles.push(borderBottomColorStyle);
        }
        if(password.length < 8 && password.length != 0) {
            textInputStyles_.push(borderBottomColorStyle);
        }
        return (
            <ImageBackground source={bg_0} style={styles.root}>
                <Text style={styles.title}>注册</Text>
                <View style={styles.container}>
                    <Text style={[styles.text, styles.smallText]}>姓名</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({ name: text })}
                        value={this.state.name}
                    />
                    <Text style={[styles.text, styles.smallText]}>学号</Text>
                    <TextInput
                        style={textInputStyles}
                        onChangeText={(text) => this.setState({ id: text })}
                        value={this.state.id}
                    />
                    {id.length > 10 ? <Text style={styles.smallerText}>请输入正确的学号</Text> : <View style={styles.emptyView}/>}
                    <Text style={[styles.text, styles.smallText]}>密码</Text>
                    <TextInput
                        style={textInputStyles_}
                        onChangeText={(text) => this.setState({ password: text })}
                        value={this.state.password}
                        secureTextEntry={true}
                    />
                    {password.length < 8 && password.length != 0 ? <Text style={styles.smallerText}>密码长度不足</Text> : <View style={styles.emptyView}/>}
                    <Text style={[styles.text, styles.smallText]}>校园卡认证</Text>
                    <View style={styles.scannerContainer}>
                        <View style={styles.scannerButton}>
                            <AntDesign name="plus" size={24} />
                        </View>
                    </View>
                    <Button
                        raised
                        primary
                        style={materialStyles.sighUpButton}
                        text="完成"
                        onPress={this._bindDoneButton}
                    />
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create(
    {
        root: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginBottom: 54,
        },
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '80%'
        },
        textInput: {
            width: '100%',
            height: 40,
            fontSize: 16,
            borderBottomWidth: 1,
            borderBottomColor: 'grey',
        },
        text: {
            marginTop: 16,
            marginBottom: 8,
            alignSelf: 'flex-start',
        },
        title: {
            marginTop: 14,
            marginBottom: 64,
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
        scannerContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '98%',
            height: '32%',
            borderColor: 'rgba(0,0,0,0.7)',
            borderWidth: 1,
        },
        scannerButton: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '24%',
            height: '24%',
            borderColor: 'rgba(0,0,0,0.7)',
            borderWidth: 1,
        }
    }
)

const materialStyles = {
    sighUpButton: {
        text: {
            fontSize: 20,
            color: 'white',
        },
        container: {
            width: '75%',
            marginTop: 24,
            marginBottom: 20,
            borderRadius: 16,
        }
    },
}
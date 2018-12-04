import React, { Component } from 'react';
import {
    ImageBackground,
    ScrollView,
    StyleSheet,
    View,
    Button,
} from 'react-native';
import Util from '../Util.js';
import image_0 from './images/guideViewImage_0.jpg';
import image_1 from './images/guideViewImage_1.jpg';
import image_2 from './images/guideViewImage_2.jpg';

export default class GuideView extends Component {
    render() {
        return (
            <ScrollView
                contentContainerStyle={styles.contentContainer}
                bounces={false}
                decelerationRate={'fast'}
                snapToInterval={Util.size.width}
                horizontal={true}
            >
                <ImageBackground key={0} source={image_0} style={styles.backgroundImage}></ImageBackground>
                <ImageBackground key={1} source={image_1} style={styles.backgroundImage}></ImageBackground>
                <ImageBackground key={2} source={image_2} style={styles.backgroundImage}>
                    <View style={styles.button}>
                        <Button title={'完成'} onPress={this._bindDoneButton}></Button>
                    </View>
                </ImageBackground>
            </ScrollView>
        );
    }

    _bindDoneButton = () => {
        console.log('click done button!');
        this.props.liftState('isFirstTime', false);
    }
}

const styles = StyleSheet.create(
    {
        contentContainer: {
            width: Util.size.width * 3,
            height: Util.size.height,
        },
        backgroundImage: {
            width: Util.size.width,
            height: Util.size.height,
        },
        button: {
            width: 100,
            height: 100,
            position: 'absolute',
            top: 16,
            right: 0,
        }
    }
)
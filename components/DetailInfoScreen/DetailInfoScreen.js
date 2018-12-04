import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { COLOR, Toolbar, Button, Divider } from 'react-native-material-ui';

const styles = StyleSheet.create(
    {
        scrollView: {
            padding: 16,
            marginBottom: 56,
        },
        title: {
            textAlign: 'center',
            fontSize: 20,
            marginBottom: 16,
        },
        smallFont: {
            color: 'rgba(0,0,0,0.9)',
            fontSize: 17,
        },
        colorFont: {
            color: COLOR.deepPurple500,
        },
        marginBottom: {
            marginBottom: 16,
        },  
    }
)

export default class DetailInfoScreen extends Component {
    _getElement = (content, index) => {
        switch (content.type) {
            case 'text':
                return (<Text
                        key={index}
                        style={[styles.smallFont, styles.marginBottom]}
                    >
                    {content.content}
                    </Text>);
            case 'table':
                return (<Button
                    key={index}
                    text='查看表格'
                    onPress={this.props.navigation.navigate('InlineWebView', {
                        html: content.content
                    })}
                />);
        }
    }

    render() {
        const { navigation } = this.props;
        let itemData = navigation.getParam('itemData', { content: [], title: 'haha', tim: '2018/12/3', place: 'hehe' });
        const title = navigation.getParam('title', 'No title');
        const title_ = itemData.title;
        const time = itemData.tim;
        const place = itemData.place;
        return (
            <View>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => this.props.navigation.goBack()}
                    centerElement={title}
                />
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.title}>{title_}</Text>
                    <Text style={[styles.smallFont, styles.colorFont]}>时间</Text>
                    <Text style={[styles.smallFont, styles.marginBottom]}>{time}</Text>
                    <Text style={[styles.smallFont, styles.colorFont]}>地点</Text>
                    <Text style={[styles.smallFont, styles.marginBottom]}>{place}</Text>
                    <Text style={[styles.smallFont, styles.colorFont]}>内容</Text>
                    {(itemData.content).map((item, index) => {
                        return (this._getElement(item, index));
                    })}
                </ScrollView>
            </View>
        );
    }
}
import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { COLOR, Toolbar, Button, Divider } from 'react-native-material-ui';
import Util from '../Util';

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
    state = {
        detailInfoData: {
            code: 0,    // 这个api响应结构真是无语啊。。。
            comments: [],
            items: {
                content: [
                    {
                        content: '',
                        type: 'text',
                    },
                ],
                created_at: 0,
                id: '',
                likes: null,
                place: '',
                tim: '',
                title: '',
                url: '',
            },
        }
    };

    _getElement = (content, index) => {
        switch (content.type) {
            case 'text':
                return (
                    <Text
                        key={index}
                        style={[styles.smallFont, styles.marginBottom]}
                    >
                        {content.content}
                    </Text>
                );
            case 'table':
                return (
                    <Button
                        key={index}
                        text='查看表格'
                        onPress={this.props.navigation.navigate('InlineWebView', {
                            html: content.content
                        })}
                    />
                );
            case 'url':
                return (
                    <Text
                        key={index}
                        style={[styles.smallFont, styles.marginBottom]}
                    >
                        {content.content}
                    </Text>
                );
        }
    }

    getDetailInfo = async () => {
        const { navigation } = this.props;
        const title = navigation.getParam('title', 'No title');
        const itemID = navigation.getParam('itemID', 'No ID');
        let url = Util.backgroundAPI.getInfoAPIByName(title);
        url = url + `/${itemID}`;
        console.log(url);

        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            let responseJson = await response.json();
            if (responseJson.code == 0) {
                this.setState({
                    detailInfoData: responseJson
                })
            }
        } catch (error) {
            console.error(error);
        }
    }

    async componentDidMount() {
        this.getDetailInfo();
    }

    render() {
        const { navigation } = this.props;
        const title = navigation.getParam('title', 'No title');
        const { detailInfoData } = this.state;
        const title_ = detailInfoData.items.title;
        const time = detailInfoData.items.tim;
        const place = detailInfoData.items.place;
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
                    {(detailInfoData.items.content).map((item, index) => {
                        return (this._getElement(item, index));
                    })}
                </ScrollView>
            </View>
        );
    }
}
import React, { Component, PureComponent } from 'react';
import { Text, View, FlatList, StyleSheet, TextInput } from 'react-native';
import { COLOR, Toolbar, Button } from 'react-native-material-ui';
import testPic from '../../assets/testPic.png';
import { SectionRenderItem } from '../InfomationScreen/InfomationScreen';
import { Ionicons } from '@expo/vector-icons';
import Util from '../Util';
import Toast from 'react-native-root-toast';

const styles = StyleSheet.create(
    {
        root: {
            width: '100%',
            marginBottom: 56,
        },
        searchBarContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        searchTextInput: {
            width: '80%',
            height: 40,
            backgroundColor: COLOR.grey300,
            borderRadius: 32,
            marginTop: 8,
            marginBottom: 8,
            paddingLeft: 32,
        },
        searchIcon: {
            position: 'absolute',
            right: '12%',
        },
        flatlist: {
            marginBottom: 56,
        },
    }
)

export default class MoreInfoTemplateScreen extends PureComponent {
    state = {
        title: '',
        searchText: '',
        infoAPI: '',
        itemData: [{
            id: "0015436617277547b34d6be99bf44eb8131d96d89a28bf0000",
            title: "haha",
            tim: "2018-12-05 16:30 ",
            place: "hehehe",
            url: "http://www.hustsvo.com",
            content: [{ type: "text", content: "xixi" }],
            likes: null,
            created_at: 1543661727.7548673
        }],
        areThereMoreDatas: true,
    }

    getMoreInfo = async (url, index) => {  // url中可加?page=2
        console.log("haha")
        if (this.state.areThereMoreDatas) {
            url = url + `?page=${Math.ceil(index / 10) + 1}`;    // 设置页码
            try {
                let response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                });
                let responseJson = await response.json();
                const { itemData } = this.state;    // 应该已经更新了

                if (responseJson.items.length > 0) {
                    this.setState({
                        itemData: itemData.concat(responseJson.items)
                    });
                } else {
                    this.setState({
                        areThereMoreDatas: false
                    });
                    Toast.show(' 没有更多消息咯！ ', {
                        duration: Toast.durations.SHORT,
                        position: -64,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        delay: 0,
                        onShow: () => {
                            // calls on toast\`s appear animation start
                        },
                        onShown: () => {
                            // calls on toast\`s appear animation end.
                        },
                        onHide: () => {
                            // calls on toast\`s hide animation start.
                        },
                        onHidden: () => {
                            // calls on toast\`s hide animation end.
                        }
                    });
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    getInfoItemData = (obj) => {
        let title = obj.title;
        let time = obj.tim;
        let content = obj.content;
        let briefIntro = '...';
        for (let i = 0; i < content.length; i++) {
            if (content[i].type == 'text') {
                briefIntro = content[i].content + '...';
                break;
            }
        }
        return {
            title: title,
            time: time,
            pic: testPic, // 待修改没有图片时的预览图
            briefIntro: briefIntro
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        const title = navigation.getParam('title', 'No title');
        let itemData = navigation.getParam('itemData', []);

        let infoAPI = Util.backgroundAPI.getInfoAPIByName(title);

        this.setState({
            title: title,
            infoAPI: infoAPI,
            itemData: itemData
        });
    }

    render() {
        const { itemData, title } = this.state;

        return (
            <View style={styles.root}>
                <Toolbar
                    leftElement="arrow-back"
                    onLeftElementPress={() => this.props.navigation.goBack()}
                    centerElement={title}
                />
                <View style={styles.searchBarContainer}>
                    <TextInput
                        style={styles.searchTextInput}
                        placeholder={`搜索${title}`}
                        onChangeText={(text) => this.setState({ searchText: text })}
                    />
                    <Ionicons name='ios-search' size={24} color={COLOR.deepPurple500} style={styles.searchIcon} />
                </View>
                <FlatList
                    data={itemData}
                    renderItem={({ item, index }) => {
                        return (
                            <SectionRenderItem
                                key={index}
                                itemData={item}
                                title={title}
                            />
                        )
                    }}
                    keyExtractor={(item, index) => item.title + index}
                    onEndReachedThreshold={0.05}
                    onEndReached={() => {
                        this.getMoreInfo(this.state.infoAPI, this.state.itemData.length);
                    }}
                    style={styles.flatlist}
                />
            </View>
        );
    }
}
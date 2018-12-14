import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableWithoutFeedback, TextInput, KeyboardAvoidingView, TouchableNativeFeedback } from 'react-native';
import { COLOR, Toolbar, Button } from 'react-native-material-ui';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Util from '../Util';
import Toast from 'react-native-root-toast';

const styles = StyleSheet.create(
    {
        scrollView: {
            padding: 16,
            marginBottom: 54,
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
        bottomToolBarContainer: {
            width: '100%',
            height: 48,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
        },
        likeIconContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 48,
            height: 48,
            marginRight: 8,
        },
        commentIconContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 48,
        },
        commentInputContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: 64,
            marginBottom: 8,
        },
        commentInput: {
            width: '100%',
        },
        commentPost: {
            marginRight: 16,
            marginBottom: 8,
            alignSelf: 'flex-end',
        }
    }
)

export default class DetailInfoScreen extends Component {
    state = {
        itemID: '',
        likes: 0,
        likePressed: false,
        commentInput: '',
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
                    firstTitle: title,
                    itemID: itemID,
                    detailInfoData: responseJson
                })
            }
        } catch (error) {
            console.error(error);
        }
    }

    _bindLike = async () => {
        console.log('like!');
        // const { itemID, firstTitle } = this.state;
        // const dataBaseName = Util.backgroundAPI.getDataBaseNameByName(firstTitle);
        // const userData = await Util.storage._retrieveData('userData');
        // const userDataJson = JSON.parse(userData);
        // console.log(userData);
        // const userID = userDataJson.id;
        // console.log(userID, dataBaseName, itemID);

        if(!this.state.likePressed) {
            this.setState({
                likePressed: true
            });
        } else {
            this.setState({
                likePressed: false
            });
        }
        Toast.show(' 待实现！ ', {
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

        // try {
        //     let response = await fetch(Util.backgroundAPI.likes, {
        //         method: 'POST',
        //         credentials: 'include',
        //         headers: {
        //             Accept: 'application/json',
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             id: itemID,
        //             ku: dataBaseName,
        //             uid: userID,
        //         }),
        //     });
        //     console.log(response);
        //     let responseJson = await response.json();
        //     console.log(responseJson);
        //     // if (responseJson.code == 0) {
        //     //     this.setState({
        //     //         detailInfoData: responseJson  // 待修改
        //     //     })
        //     // }
        // } catch (error) {
        //     console.error(error);
        // }
    }

    _bindComment = async () => {
        console.log('write comment!');
        this.setState({
            commentPressed: true
        });
    }

    _bindCommentPost = async () => {
        console.log('comment post!');

        this.setState({
            commentPressed: false
        });
        Toast.show(' 待实现！ ', {
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
        
        // const { itemID, firstTitle, commentInput } = this.state;
        // const url = Util.backgroundAPI.getInfoAPIByName(firstTitle);
        // console.log(url, itemID);
        // try {
        //     let response = await fetch(url + `/${itemID}` + '/comments', {
        //         method: 'POST',
        //         headers: {
        //             Accept: 'application/json',
        //             'Content-Type': 'application/json',
        //         },
        //         credentials: 'include',
        //         body: JSON.stringify({
        //             content: commentInput,
        //         }),
        //     });
        //     console.log(response);
        //     let responseJson = await response.json();
        //     console.log(responseJson);
        //     // if (responseJson.code == 0) {
        //     //     this.setState({
        //     //         detailInfoData: responseJson  // 待修改
        //     //     })
        //     // }
        // } catch (error) {
        //     console.error(error);
        // }
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
            <KeyboardAvoidingView behavior="padding" enabled>
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
                    <View style={styles.bottomToolBarContainer}>
                        <TouchableNativeFeedback onPress={this._bindComment}>
                            <View style={styles.commentIconContainer}>
                                <MaterialCommunityIcons name="comment-outline" size={24} />
                                <Text>写回复</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableWithoutFeedback
                            onPress={this._bindLike}
                        >
                            <View style={styles.likeIconContainer}>
                                <Text>{(this.state.likes).toString()}</Text>
                                {this.state.likePressed ? <AntDesign name="like1" size={24} /> : <AntDesign name="like2" size={24} />}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    { this.state.commentPressed ? <View style={styles.commentInputContainer}>
                        <TextInput
                            style={styles.commentInput}
                            onChangeText={(text) => this.setState({ commentInput: text })}
                            value={this.state.commentInput}
                            autoFocus={true}
                            multiline={true}
                        />
                        <TouchableNativeFeedback style={styles.commentPost} onPress={this._bindCommentPost}>
                            <Text style={styles.commentPost}>回复</Text>
                        </TouchableNativeFeedback>
                    </View> : <View/>}
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}
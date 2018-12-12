import React, { Component } from 'react';
import { Text, View, SectionList, StyleSheet, Image, TouchableNativeFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLOR, Toolbar, Button, Divider } from 'react-native-material-ui';
import testPic from '../../assets/testPic.png';
import Util from '../Util';

const styles = StyleSheet.create(
    {
        root: {
            width: '100%',
            marginBottom: 56,
        },
        SectionHeaderContentContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 8,
        },
        sectionHeaderLeftContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 16,
        },
        sectionHeaderTitleText: {
            marginLeft: 8,
            fontSize: 24,
            fontWeight: '100',
        },
        itemTouchable: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: 112, 
        },
        renderItemContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            height: 112,
            overflow: 'hidden',
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 8,
            paddingBottom: 8,
        },
        contentContainer: {
            display: 'flex',
            marginLeft: 16,
            justifyContent: 'space-between',
            overflow: 'hidden',
            height: 92,
        },
        timeText: {
            color: 'grey',
        },
        titleText: {
            fontSize: 20,
            height: 48,
            overflow: 'hidden',
        },
        contentText: {
            color: 'grey',
            flexGrow: 2,
            overflow: 'hidden',
            height: 45,
        }
    }
)

export default class InfomationScreen extends Component {
    state = {
        recruitments: [{
            id: "0015436617277547b34d6be99bf44eb8131d96d89a28bf0000",
            title: "haha",
            tim: "2018-12-05 16:30 ",
            place: "hehehe",
            url: "http://www.hustsvo.com",
            content: [{type: "text", content: "xixi"}],
            likes: null,
            created_at: 1543661727.7548673
        },{
            id: "0015436617277547b34d6be99bf44eb8131d96d89a28bf0000",
            title: "haha",
            tim: "2018-12-05 16:30 ",
            place: "hehehe",
            url: "http://www.hustsvo.com",
            content: [{type: "text", content: "xixi"}],
            likes: null,
            created_at: 1543661727.7548673
        }],
        studentsAffair: [{
            id: "0015436617277547b34d6be99bf44eb8131d96d89a28bf0000",
            title: "haha",
            tim: "2018-12-05 16:30 ",
            place: "hehehe",
            url: "http://www.hustsvo.com",
            content: [{type: "text", content: "xixi"}],
            likes: null,
            created_at: 1543661727.7548673
        },{
            id: "0015436617277547b34d6be99bf44eb8131d96d89a28bf0000",
            title: "haha",
            tim: "2018-12-05 16:30 ",
            place: "hehehe",
            url: "http://www.hustsvo.com",
            content: [{type: "text", content: "xixi"}],
            likes: null,
            created_at: 1543661727.7548673
        }],
        internation: [{
            id: "0015436617277547b34d6be99bf44eb8131d96d89a28bf0000",
            title: "haha",
            tim: "2018-12-05 16:30 ",
            place: "hehehe",
            url: "http://www.hustsvo.com",
            content: [{type: "text", content: "xixi"}],
            likes: null,
            created_at: 1543661727.7548673
        },{
            id: "0015436617277547b34d6be99bf44eb8131d96d89a28bf0000",
            title: "haha",
            tim: "2018-12-05 16:30 ",
            place: "hehehe",
            url: "http://www.hustsvo.com",
            content: [{type: "text", content: "xixi"}],
            likes: null,
            created_at: 1543661727.7548673
        }],
        lectures: [{
            id: "0015436617277547b34d6be99bf44eb8131d96d89a28bf0000",
            title: "haha",
            tim: "2018-12-05 16:30 ",
            place: "hehehe",
            url: "http://www.hustsvo.com",
            content: [{type: "text", content: "xixi"}],
            likes: null,
            created_at: 1543661727.7548673
        },{
            id: "0015436617277547b34d6be99bf44eb8131d96d89a28bf0000",
            title: "haha",
            tim: "2018-12-05 16:30 ",
            place: "hehehe",
            url: "http://www.hustsvo.com",
            content: [{type: "text", content: "xixi"}],
            likes: null,
            created_at: 1543661727.7548673
        }],
    };

    getInfo = async (url) => {  // url中可加?page=2
        try {
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            let responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.error(error);
        }
    }

    getInfoItemData = (obj) => {
        let title = obj.title;
        let time = obj.tim;
        let content = obj.content;
        let briefIntro = null;
        for(let i = 0; i < content.length; i++) {
            if(content[i].type == 'text') {
                briefIntro = content[i].content + '...';
                break;
            }
        }
        return {
            title: title,
            time: time,
            pic: testPic, // 待修改没有图片时的预览图
            briefIntro: !!briefIntro ? briefIntro : ''
        };
    }

    async componentDidMount() {
        if(this.state.recruitments.length == 2) {
            let recruitmentsRes = await this.getInfo(Util.backgroundAPI.recruitments);
            let studentsAffairRes = await this.getInfo(Util.backgroundAPI.studentsAffair);
            let internationRes = await this.getInfo(Util.backgroundAPI.internation);
            let lecturesRes = await this.getInfo(Util.backgroundAPI.lectures);
            if(!!studentsAffairRes) {
                if(studentsAffairRes.code == 0) {
                    this.setState({
                        recruitments: recruitmentsRes.items, // 更新列表内容数组
                        studentsAffair: studentsAffairRes.items,
                        internation: internationRes.items,
                        lectures: lecturesRes.items,
                    });
                }
            }
        }
    }

    render() {
        const {recruitments, studentsAffair, internation, lectures} = this.state;

        return (
            <View style={styles.root}>
                <Toolbar
                    centerElement="资讯"
                    searchable={{
                        autoFocus: true,
                        placeholder: '搜索资讯',
                    }}
                />
                <SectionList
                    renderSectionHeader={({ section: { title } }) => (
                        <SectionHeader title={title} this={this} /> // this用于直接取InfomationScreen中第一次请求的数据
                    )}
                    renderItem={({ item, index, section: { title } }) => (
                        <SectionRenderItem
                            that={this}
                            key={index}
                            itemData={item}
                            title={title}
                        />
                    )}
                    sections={[
                        {   title: '推荐', 
                            data: [{
                                id: "0015436617277547b34d6be99bf44eb8131d96d89a28bf0000",
                                title: "haha",
                                tim: "2018-12-05 16:30 ",
                                place: "hehehe",
                                url: "http://www.hustsvo.com",
                                content: [{type: "text", content: "xixi"}],
                                likes: null,
                                created_at: 1543661727.7548673
                            },{
                                id: "0015436617277547b34d6be99bf44eb8131d96d89a28bf0000",
                                title: "haha",
                                tim: "2018-12-05 16:30 ",
                                place: "hehehe",
                                url: "http://www.hustsvo.com",
                                content: [{type: "text", content: "xixi"}],
                                likes: null,
                                created_at: 1543661727.7548673
                            }]
                        },
                        { title: '招聘活动', data: [recruitments[0], recruitments[1]] },
                        { title: '教务处通知', data: [studentsAffair[0], studentsAffair[1]] },
                        { title: '国际交流', data: [internation[0], internation[1]] },
                        { title: '讲座', data: [lectures[0], lectures[1]] },
                    ]}
                    keyExtractor={(item, index) => item.title + index}    // 待修改item
                />
            </View>
        );
    }
}

class SectionHeader extends Component {
    _bindMoreButton = () => {
        // 检查是否已经登陆
        const that = this.props.this;
        const title = this.props.title;
        let itemData = null;
        switch(title) { // 也许应该写成一个工具方法
            case '招聘活动':
                itemData = that.state.recruitments; // 直接取存在InfomationScreen组件里的第一次请求的数据
                break;
            case '教务处通知':
                itemData = that.state.studentsAffair;
                break;
            case '国际交流':
                itemData = that.state.internation;
                break;
            case '讲座':
                itemData = that.state.lectures;
                break;
            default:
                itemData = [];
        };
        that.props.navigation.navigate('MoreInfoTemplate', {
            title: title,
            itemData: itemData
        });
    }

    render() {
        return (
            <View>
                <Divider />
                <View style={styles.SectionHeaderContentContainer}>
                    <View style={styles.sectionHeaderLeftContainer}>
                        <Ionicons name='md-tv' size={24} color='grey' />
                        <Text style={styles.sectionHeaderTitleText}>{this.props.title}</Text>
                    </View>
                    <Button
                        text='查看更多'
                        onPress={this._bindMoreButton}
                    />
                </View>
            </View>
        );
    }
}

export class SectionRenderItem extends Component {
    state = {
        renderItemData: {   // 后台不加briefIntro,只能自己处理了
            pic: testPic,
            title: 'item1',
            time: '2018-11-30',
            briefIntro: 'hahaha'
        },
    };

    getInfoItemData = (obj) => {
        let title = obj.title;
        let time = obj.tim;
        let content = obj.content;
        let briefIntro = '...';
        for(let i = 0; i < content.length; i++) {
            if(content[i].type == 'text') {
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

    _bindItemPress = () => {    // 待更新跳转逻辑
        console.log('item pressed!');
        let { title, itemData, that } = this.props;  // title是section分类的title

        that.props.navigation.navigate('DetailInfo', {
            title: title,
            itemID: itemData.id
        });
    }

    componentDidMount() {
        const { itemData } = this.props;

        let renderItemData = this.getInfoItemData(itemData);
        this.setState({
            renderItemData: renderItemData
        });
    }

    render() {
        return (
            <TouchableNativeFeedback style={styles.itemTouchable} onPress={this._bindItemPress}>
                <View style={styles.renderItemContainer}>
                    <Image source={this.state.renderItemData.pic} />
                    <View style={styles.contentContainer}>
                        <Text style={styles.timeText}>{this.state.renderItemData.time}</Text>
                        <Text style={styles.titleText}>{this.state.renderItemData.title}</Text>
                        <Text style={styles.contentText}>{this.state.renderItemData.briefIntro}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }
}
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
        recruitments: [],
        studentsAffair: [],
        internation: [],
        lectures: [],
    };

    getInfo = async (url) => {
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
        let title = obj.title.slice(0, 15) + '...';
        let time = obj.tim;
        let content = obj.content;
        let contentSlice = null;
        for(let i = 0; i < content.length; i++) {
            if(content[i].type == 'text') {
                contentSlice = content[i].content.slice(0, 40) + '...';
            }
        }
        return {
            title: title,
            time: time,
            pic: testPic, // 待修改没有图片时的预览图
            contentSlice: !!contentSlice ? contentSlice : ''
        };
    }

    async componentWillMount() {
        if(this.state.recruitments.length == 0) {
            let recruitmentsRes = await this.getInfo(Util.backgroundAPI.recruitments);
            let studentsAffairRes = await this.getInfo(Util.backgroundAPI.studentsAffair);
            let internationRes = await this.getInfo(Util.backgroundAPI.internation);
            let lecturesRes = await this.getInfo(Util.backgroundAPI.lectures);
            if(!!studentsAffairRes) {
                if(studentsAffairRes.code == 0) {
                    this.setState({
                        recruitments: recruitmentsRes.zphs,
                        studentsAffair: studentsAffairRes.jwcs,
                        internation: internationRes.inters,
                        lectures: lecturesRes.lectures,
                    });
                }
            }
            // let test = this.getInfoItemData(this.recruitments[0]);
        }
    }

    render() {
        const {recruitments, studentsAffair, internation, lectures} = this.state;
        let recruitmentsItemData = [
            { pic: testPic, title: 'item1', time: '2018-11-30', contentSlice: 'hahaha' },
            { pic: testPic, title: 'item1', time: '2018-11-30', contentSlice: 'hahaha' }
        ];
        let studentsAffairItemData = [
            { pic: testPic, title: 'item1', time: '2018-11-30', contentSlice: 'hahaha' },
            { pic: testPic, title: 'item1', time: '2018-11-30', contentSlice: 'hahaha' }
        ];
        let internationItemData = [
            { pic: testPic, title: 'item1', time: '2018-11-30', contentSlice: 'hahaha' },
            { pic: testPic, title: 'item1', time: '2018-11-30', contentSlice: 'hahaha' }
        ];
        let lecturesItemData = [
            { pic: testPic, title: 'item1', time: '2018-11-30', contentSlice: 'hahaha' },
            { pic: testPic, title: 'item1', time: '2018-11-30', contentSlice: 'hahaha' }
        ];


        if(recruitments.length > 0) {   // 待更新为for循环，长度为常量
            recruitmentsItemData[0] = this.getInfoItemData(recruitments[0]); 
            recruitmentsItemData[1] = this.getInfoItemData(recruitments[1]); 
            // console.log(recruitmentsItemData);
        }
        if(studentsAffair.length > 0) {   // 待更新为for循环，长度为常量
            studentsAffairItemData[0] = this.getInfoItemData(studentsAffair[0]); 
            studentsAffairItemData[1] = this.getInfoItemData(studentsAffair[1]); 
            // console.log(studentsAffairItemData);
        }
        if(internation.length > 0) {   // 待更新为for循环，长度为常量
            internationItemData[0] = this.getInfoItemData(internation[0]); 
            internationItemData[1] = this.getInfoItemData(internation[1]); 
            // console.log(internationItemData);
        }
        if(lectures.length > 0) {   // 待更新为for循环，长度为常量
            lecturesItemData[0] = this.getInfoItemData(lectures[0]); 
            lecturesItemData[1] = this.getInfoItemData(lectures[1]); 
            // console.log(lecturesItemData);
        }
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
                        <SectionHeader title={title} this={this} />
                    )}
                    renderItem={({ item, index, section: { title } }) => (
                        <SectionRenderItem 
                            item={item}
                            key={index}
                            title={title}
                            this={this}
                            key_={index}
                        />
                    )}
                    sections={[ // 待修改为请求的数据格式
                        { title: '推荐', data: [{ pic: testPic, title: 'item1' }, { pic: testPic, title: 'item2' }] },
                        { title: '招聘活动', data: [recruitmentsItemData[0], recruitmentsItemData[1]] },
                        { title: '教务处通知', data: [studentsAffairItemData[0], studentsAffairItemData[1]] },
                        { title: '国际交流', data: [internationItemData[0], internationItemData[1]] },
                        { title: '讲座', data: [lecturesItemData[0], lecturesItemData[1]] },
                    ]}
                    keyExtractor={(item, index) => item + index}    // 待修改item
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
        switch(title) { // 应该写成一个工具方法
            case '招聘活动':
                itemData = that.state.recruitments;
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
    _bindItemPress = () => {    // 待更新跳转逻辑
        console.log('item pressed!');
        const title = this.props.title;
        const index = this.props.key_;
        const that = this.props.this;
        let itemData = {};
        if(!!this.props.itemData) {
            itemData = this.props.itemData;
        } else {
            switch(title) {
                case '招聘活动':
                    itemData = that.state.recruitments[index];
                    break;
                case '教务处通知':
                    itemData = that.state.studentsAffair[index];
                    break;
                case '国际交流':
                    itemData = that.state.internation[index];
                    break;
                case '讲座':
                    itemData = that.state.internation[index];
                    break;
                default:
                    itemData = {};
            };
        }
        // console.log(itemData);
        that.props.navigation.navigate('DetailInfo', {
            title: title,
            itemData: itemData
        });
    }

    render() {
        return (     // 待修改为请求的数据格式
            <TouchableNativeFeedback style={styles.itemTouchable} onPress={this._bindItemPress}>
                <View style={styles.renderItemContainer}>
                    <Image source={this.props.item.pic} />
                    <View style={styles.contentContainer}>
                        <Text style={styles.timeText}>{this.props.item.time}</Text>
                        <Text style={styles.titleText}>{this.props.item.title}</Text>
                        <Text style={styles.contentText}>{this.props.item.contentSlice}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }
}
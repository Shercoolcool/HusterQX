import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, TextInput } from 'react-native';
import { COLOR, Toolbar, Button } from 'react-native-material-ui';
import testPic from '../../assets/testPic.png';
import { SectionRenderItem } from '../InfomationScreen/InfomationScreen';
import { Ionicons } from '@expo/vector-icons';

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
        }
    }
)

export default class MoreInfoTemplateScreen extends Component {
    state = {
        searchText: '',
    }

    getInfoItemData = (obj) => {    // 是否应该直接引用InfomationScreen类？
        let title = obj.title.slice(0, 15) + '...';
        let time = obj.tim;
        let content = obj.content;
        let contentSlice = null;
        for(let i = 0; i < content.length; i++) {
            if(content[i].type == 'text') {
                contentSlice = content[i].content.slice(0, 45) + '...';
            }
        }
        return {
            title: title,
            time: time,
            pic: testPic, // 待修改没有图片时的预览图
            contentSlice: !!contentSlice ? contentSlice : ''
        };
    }

    render() {
        const { navigation } = this.props;
        const title = navigation.getParam('title', 'No title');
        let itemData = navigation.getParam('itemData', []);
        console.log(itemData.length);
        let itemData_ = [];
        if(itemData.length > 0) {
            for(let i = 0; i < itemData.length; i++) {
                itemData_.push(this.getInfoItemData(itemData[i]));
            }
        } else {
            itemData_ = [
                { pic: testPic, title: 'item1', time: '2018-11-30', contentSlice: 'hahaha' },
                { pic: testPic, title: 'item1', time: '2018-11-30', contentSlice: 'hahaha' }
            ];
        }

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
                    <Ionicons name='ios-search' size={24} color={COLOR.deepPurple500} style={styles.searchIcon}/>
                </View>
                <FlatList
                    data={itemData_} // 待修改为请求的数据格式
                    renderItem={({ item, index }) => (
                        <SectionRenderItem
                            item={item}
                            this={this}
                            key_={index}
                            title={title}
                            itemData={itemData[index]}
                        />
                    )}
                    keyExtractor={(item, index) => item.title + index}    // 待修改item
                    style={styles.flatlist}
                />
            </View>
        );
    }
}
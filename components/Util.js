import React from 'react';
import Dimensions from 'Dimensions';
import { AsyncStorage } from 'react-native';

const Util = {
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  storage: {
    _storeData: async (key, value) => {    // 同步。只能存string!
      try {
        await AsyncStorage.setItem(key, value);
        return true;
      } catch (error) {
        // Error saving data
        console.log(error);
        return false;
      }
    },
    _retrieveData: async (key) => {    // 同步
      try {
        const value = await AsyncStorage.getItem(key);
        console.log(`${key}:`, value);
        if (value !== null) {
          // We have data!!
          return value;
        } else {
          // the data is empty!
          return null;
        }
      } catch (error) {
        // Error retrieving data
        console.log('error:\n', error);
        return false;
      }
    }
  },
  backgroundAPI: {
    signIn: 'http://47.107.247.42/api/authenticate',
    signUp: 'http://47.107.247.42/api/users',
    recruitments: 'http://47.107.247.42/api/zphs', // 招聘会
    studentsAffair: 'http://47.107.247.42/api/jwcs', // 教务处
    internation: 'http://47.107.247.42/api/inters',
    lectures: 'http://47.107.247.42/api/lectures',
    likes: 'http://47.107.247.42/api/likes', // 一次点赞，两次取消
    
    getInfoAPIByName: (title) => {
      let api = '';
      switch (title) {
        case '招聘活动':
          api = 'http://47.107.247.42/api/zphs';
          break;
        case '教务处通知':
          api = 'http://47.107.247.42/api/jwcs';
          break;
        case '国际交流':
          api = 'http://47.107.247.42/api/inters';
          break;
        case '讲座':
          api = 'http://47.107.247.42/api/lectures';
          break;
      };
      return api;
    },
    getDataBaseNameByName: (title) => {
      let DataBaseName = '';
      switch (title) {
        case '招聘活动':
          DataBaseName = 'zph';
          break;
        case '教务处通知':
          DataBaseName = 'jwc';
          break;
        case '国际交流':
          DataBaseName = 'inter';
          break;
        case '讲座':
          DataBaseName = 'lecture';
          break;
      };
      return DataBaseName;
    }
  },
};

export default Util;
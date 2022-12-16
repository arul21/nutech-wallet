import React from 'react';
import MainTabNavigator from './MainTabNavigator';
import {Topup, Transfer, History} from '../screens/Transaction';

const StackNavigationData = [
  {
    name: 'Onborading',
    component: MainTabNavigator,
    header: false,
  },
  {
    name: 'Topup',
    component: Topup,
    header: true,
  },
  {
    name: 'Transfer',
    component: Transfer,
    header: true,
  },
  {
    name: 'History',
    title: 'Riwayat Transaksi',
    component: History,
    header: true,
  },
];

export default StackNavigationData;

export const HeaderLeft = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingTop: 5,
        justifyContent: 'flex-start',
      }}>
      <Image
        source={{uri: logoDitPras}}
        resizeMode="contain"
        style={{
          width: 180,
          height: 60,
        }}
      />
    </View>
  );
};

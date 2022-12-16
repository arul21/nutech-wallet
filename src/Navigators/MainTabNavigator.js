import React, {useCallback, useState, useEffect} from 'react';
import {Platform, Keyboard} from 'react-native';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
import Icon from 'react-native-vector-icons/Feather';
import QRCode from 'react-native-vector-icons/MaterialIcons';
import {Profile} from '../screens/ProfileScreens';
import {Home} from '../screens/HomeScreen';
import {ScanQR} from '../screens/Transaction';

const Tabs = AnimatedTabBarNavigator();

const TabBarIcon = props => {
  if (props?.isQR) {
    return (
      <QRCode
        name={props.name}
        size={props.size ? props.size : 24}
        color={props.tintColor}
      />
    );
  } else {
    return (
      <Icon
        name={props.name}
        size={props.size ? props.size : 24}
        color={props.tintColor}
      />
    );
  }
};

export default () => {
  return (
    <Tabs.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Onborading"
      tabBarOptions={{
        activeTintColor: 'red',
        inactiveTintColor: '#f98a8a',
        activeBackgroundColor: 'white',
      }}
      appearance={{
        shadow: true,
        dotSize: 'medium',
        floating: true,
        tabBarBackground: 'red',
      }}>
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused, color}) => (
            <TabBarIcon focused={focused} tintColor={color} name="home" />
          ),
        }}
      />
      <Tabs.Screen
        name="Scan QR"
        component={ScanQR}
        options={{
          tabBarIcon: ({focused, color}) => (
            <TabBarIcon
              focused={focused}
              tintColor={color}
              name="qr-code-scanner"
              isQR
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused, color}) => (
            <TabBarIcon focused={focused} tintColor={color} name="user" />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

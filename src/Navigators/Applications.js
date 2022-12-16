import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, useColorScheme} from 'react-native';
import {Login} from '../screens/AuthScreens';
import StackNavigationData from './StackNavigation';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const ApplicationNavigator = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const {isLogin} = useSelector(state => state?.Auth);

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* <Stack.Navigator initialRouteName={isLogin ? 'Onborading' : 'Login'}> */}
      <Stack.Navigator initialRouteName={'Onborading'}>
        {isLogin ? (
          <>
            {StackNavigationData.map(item => (
              <Stack.Screen
                key={item?.name}
                name={item?.name}
                component={item?.component}
                options={({route}) => ({
                  headerShown: item?.header,
                  headerTitle: item.title ? item.title : item.name,
                  headerTitleStyle: {
                    color: 'white',
                  },
                  headerTintColor: '#fff',
                  headerStyle: {
                    backgroundColor: 'red',
                    shadowOffset: {
                      height: 0,
                    },
                    elevation: 20,
                    shadowOpacity: 20,
                    borderBottomWidth: 20,
                  },
                })}
              />
            ))}
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={({route}) => ({
                headerShown: false,
              })}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;

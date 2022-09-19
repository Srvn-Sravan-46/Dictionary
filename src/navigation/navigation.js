import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/splash-screen';
import HomeScreen from '../screens/home-screen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen"
       screenOptions={{headerShown: false}} >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

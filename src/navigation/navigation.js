import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/splash-screen';
import HomeScreen from '../screens/home-screen';
import SelectionScreen from '../screens/selection-screen';
import Notes from '../screens/notes-screen';
import About from '../screens/about';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="About"
       screenOptions={{headerShown: false}} >
        {/* <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="SelectionScreen" component={SelectionScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Notes" component={Notes} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

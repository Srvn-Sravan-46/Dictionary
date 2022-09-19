import React from "react";
import {View, Text, ImageBackground, Image, StyleSheet, Button, TouchableOpacity, TouchableHighlight, TouchableNativeFeedback, TouchableHighlightComponent} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = ({route, navigation}) => {
  const nav = useNavigation();

  function submit() {
    nav.navigate('HomeScreen');
  }

    return(
        <>
          <View style={{flex: 1}}>
            <ImageBackground source={require('../../src/assets/img/splash.jpg')}
        resizeMode="cover"
        style={{flex: 1}}>
        
        <Image  source={require('../../src/assets/img/dictionary.png')}
            style={styles.imageDesign}></Image>
            <View style={{position: 'absolute', bottom: 0}}>
            <TouchableOpacity onPress={submit}>
            <View style={styles.started}>
            <Image  source={require('../../src/assets/img/get.png')}
            style={styles.get}></Image>
            </View>
            </TouchableOpacity>
            </View>
            
            </ImageBackground>
            </View>
          
        </>
    )
  };
export default SplashScreen;

const styles = StyleSheet.create({
imageDesign: {
  width: '50%',
    height: '30%',
    marginLeft: 95,
    marginTop: 90,
},
logoDesign: {
  marginLeft: 10,
},
started: {
  justifyContent: 'center',
  alignItems: 'center', 
  position: 'absolute',
  bottom: 0, 
  marginBottom: 20,
  marginLeft: 10,
},
button: {
  width: 90,
  height: 40,
  borderRadius: 20,
  marginRight: 50,
  fontWeight: 'bold',
  color: 'black',
},
get: {
  width: 300,
  height: 70,
  marginLeft: 35,
}
})
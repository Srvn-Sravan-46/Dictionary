import React from "react";
import {View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function SelectionScreen ({route, navigation}) {
    const nav = useNavigation();

    function Submit () {
        nav.navigate('HomeScreen');
    }

    function Notes () {
        nav.navigate('Notes');
    }

    function About () {
        nav.navigate('About');
    }

    

    return (
        <View>
            <ImageBackground style={style.header} source={require('../../src/assets/img/blue-header-3.jpg')}>
                <View style={{justifyContent: 'center'}}>
            <Text style={style.headerText}>Choose Option</Text>
            </View>
            </ImageBackground>
        <View style={{flexDirection: 'row'}}>
        <View style={{ justifyContent: 'center'}}>
            <TouchableOpacity onPress={Submit}>
           <Image
        source={require('../../src/assets/img/spotlight-icon.png')}
        resizeMode="cover"
        style={style.search}></Image>
        </TouchableOpacity>
        </View>
        <Text style={style.searchText}>Search</Text>
        </View>

        <View style={{flexDirection: 'row'}}>
            <View>
                <TouchableOpacity>
                <Image style={style.history}source={require('../../src/assets/img/history.png')}></Image>
                </TouchableOpacity>
            </View>
            <Text style={style.historyText}>History</Text>
        </View>

        <View style={{flexDirection: 'row'}}>
            <View>
                <TouchableOpacity onPress={Notes}>
                <Image style={style.history}source={require('../../src/assets/img/1475336.png')}></Image>
                </TouchableOpacity>
            </View>
            <Text style={style.historyText}>Notes</Text>
        </View>

        <View style={{flexDirection: 'row'}}>
            <View>
                <TouchableOpacity onPress={About}>
                <Image style={style.history}source={require('../../src/assets/img/About-Symbol.png')}></Image>
                </TouchableOpacity>
            </View>
            <Text style={style.historyText}>About</Text>
        </View>

        </View>

        
    )

}

const style = StyleSheet.create ({
    search: {
        width: 100,
        height: 100,
        marginTop: 50,
        marginLeft: 50,
    },
    searchText: {
        marginTop: 80,
        fontSize: 30,
    },
    history: {
        width: 87,
        height: 87,
        marginLeft: 59,
        marginTop: 50,
    },
    historyText: {
        marginTop: 70,
        marginLeft: 10,
        fontSize: 30,
    },
    header: {
        width: 400,
        height: 80,
        marginTop: 0,

    },
    headerText: {
        color: 'white',
        marginTop: 20,
        marginLeft: 20,
        fontSize: 30,
        fontWeight: '700',
    },

},)
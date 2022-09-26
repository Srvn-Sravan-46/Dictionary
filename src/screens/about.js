import React from "react";
import {View, Text, StyleSheet} from 'react-native';

export default function About () {
return (
    <View>
    <View style={style.about}>
        <Text style={style.aboutText}>
        About the App...!
        </Text>
    </View>

    <View>
        <Text>
        A dictionary app can be a handy tool. Many have features such as a word of the day to help expand your vocabulary. Those learning languages for the first time can find them useful in defining words they don’t know
        </Text>
    </View>
    </View>
)
};

const style = StyleSheet.create ({
about: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
},
aboutText: {
    fontSize: '700',
}
})
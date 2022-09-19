import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {
  Text,
  View,
  ImageBackground,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Tts from 'react-native-tts';

export default function HomeScreen() {
  const [newWord, setNewWord] = useState('');
  const [checkedWord, setCheckedWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [example, setExample] = useState('');
  const [items, setItems] = useState([])
  

  const addItem = () => {
    setItems([checkedWord])
  }


  const searchWord = enteredWord => {
    setNewWord(enteredWord);
  };

  

  const getInfo = () => {
    var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + newWord;

    return fetch(url)
      .then(data => {
        return data.json();
      })
      .then(response => {
        var word = response[0].word;
        setCheckedWord(word);

        var def = response[0].meanings[0].definitions[0].definition;
        setDefinition(def);

        var eg = response[0].meanings[0].definitions[0].example;
        setExample(eg);
      });
  };

  const clear = () => {
    setCheckedWord('');
    setDefinition('');
    setExample('');
    setNewWord('');
  };

  const HandleSpeak = () => {
    console.log(items, {checkedWord})
    Tts.getInitStatus().then(() => {
    Tts.speak('hello welcome');
    Tts.setDefaultLanguage('en-IE');
    Tts.setDefaultVoice('com.apple.ttsbundle.Moira-compact');
    Tts.setDefaultRate(0.6);
    Tts.setDefaultRate(0.6, true);
    Tts.setDefaultPitch(1.5);

    }, (err) => {
        if (err.code === 'no_ engine') {
          Tts.requestInstallEngine();
        }
      }
    );
  }
  

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../src/assets/img/bg2.jpg')}
        resizeMode="cover"
        style={{flex: 1}}>
        <View style={{flex: 0.2, flexDirection: 'row', position: 'absolute'}}>
          <Image
            source={require('../../src/assets/img/dictionary.png')}
            style={styles.imageDesign}
          />
          <View style={{marginTop: 40}}>
            {/* <Image
              source={require('../../src/assets/img/font.png')}
              style={styles.logoDesign}
            /> */}<Text style={styles.dic}>Dictionary</Text>
          </View>
        </View>

        <View style={{flex: 1, marginTop: 80}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TextInput
              style={styles.inputBox}
              placeholder="search a word"
              placeholderTextColor={'white'}
              textAlign="center"
              clearButtonMode="always"
              onChangeText={searchWord}
              onChange={e=>setCheckedWord(e.target.value)}
              value={newWord ? newWord : ''}></TextInput>
              

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '60%',
                marginTop: 20,
                marginBottom: 20,
              }}>

              <TouchableOpacity
                style={styles.buttonDesign}
                onPress={() => {
                  getInfo();
                }}>
                <Text style={styles.buttonText}>Find</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonDesign}
                onPress={() => {
                  clear();
                }}>
                <Text style={styles.buttonText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.playTouch} onPress={()=> HandleSpeak()}> 
              <Image
              source={require('../../src/assets/img/listen-icon-23.png')}
              style={styles.logoDesign}
            />
              </TouchableOpacity>
            </View>

            <View>
              <Text style={styles.textDesign}>
                Entered Word :{checkedWord}{' '}
              </Text>
              <Text style={styles.textDesign}>Definition : {definition} </Text>
              <Text style={styles.textDesign}>Example : {example} </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: '100%',
    position: 'absolute',
    width: 400,
    marginTop: 0,
    backgroundColor: '#fff',
  },

  imageDesign: {
    width: '29%',
    height: '99%',
    marginLeft: 15,
    marginTop: 30,
  },
  inputBox: {
    width: '80%',
    height: 50,
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 70,
    fontSize: 20,
    borderRadius: 30,
  },
  buttonDesign: {
    backgroundColor: 'white',
    width: 80,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 5,
  },
  textDesign: {
    fontSize: 20,
    color: 'white',
    marginTop: 10,
    alignSelf: 'center',
  },
  dic: {
    color: 'white',
    fontSize: 50,
    fontWeight: '700',
  },
  logoDesign: {
    height: 40,
    width: 40,
  },
  mic: {
    width: 40,
    height: 40,
  }
});

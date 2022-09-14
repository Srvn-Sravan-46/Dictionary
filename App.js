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

export default function HomeScreen() {
  const [newWord, setNewWord] = useState('');
  const [checkedWord, setCheckedWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [example, setExample] = useState('');

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

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./src/assets/img/JHYTI.jpg')}
        resizeMode="cover"
        style={{flex: 1}}>
        <View style={{flex: 0.2, flexDirection: 'row'}}>
          <Image
            source={require('./src/assets/img/dictionary.png')}
            style={styles.imageDesign}
          />
          <View style={{marginTop: 50}}>
            <Image
              source={require('./src/assets/img/font.png')}
              style={styles.logoDesign}
            />
          </View>
        </View>

        <View style={{flex: 1}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TextInput
              style={styles.inputBox}
              placeholder="search a word"
              placeholderTextColor={'white'}
              textAlign="center"
              clearButtonMode="always"
              onChangeText={searchWord}
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
    flex: 1,
    backgroundColor: '#fff',
  },

  imageDesign: {
    width: '23%',
    height: '80%',
    marginLeft: 20,
    marginTop: 30,
  },
  inputBox: {
    width: '80%',
    height: 50,
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    marginTop: 60,
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
});

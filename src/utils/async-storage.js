import AsyncStorage from '@react-native-async-storage/async-storage';

const getAsyncStorageData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('userinfo');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('error reading async storage value');
  }
};

const setAsyncStorageData = async value => {
  console.log(JSON.stringify(value));
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('userinfo', jsonValue);
    console.log('saved');
  } catch (e) {
    console.log('error saving async storage value');
  }
};

export {getAsyncStorageData, setAsyncStorageData};
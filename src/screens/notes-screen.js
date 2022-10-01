import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
  Modal,
} from 'react-native';
import {horizontalScale, verticalScale} from '../utils/scale';
import AsyncStorage from '@react-native-async-storage/async-storage';
const COLORS = {primary: '#1f145c', white: '#fff'};

const Main = () => {
  const [todos, setTodos] = React.useState([]);
  const [textInput, setTextInput] = React.useState('');
  const [isRender, setisRender] = React.useState(false);
  const [isModalVisible, setisModalVisible] = React.useState(false);
  const [editItem, seteditItem] = React.useState();

  React.useEffect(() => {
    getTodosFromUserDevice();
  }, []);

  React.useEffect(() => {
    saveTodoToUserDevice(todos);
  }, [todos]);

  const addTodo = () => {
    if (textInput == '') {
      Alert.alert('Error', 'Please input todo');
    } else {
      const newTodo = {
        id: Math.random(),
        task: textInput,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setTextInput('');
    }
  };

  const saveTodoToUserDevice = async todos => {
    try {
      const stringifyTodos = JSON.stringify(todos);
      await AsyncStorage.setItem('todos', stringifyTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const getTodosFromUserDevice = async () => {
    try {
      const todos = await AsyncStorage.getItem('todos');
      if (todos != null) {
        setTodos(JSON.parse(todos));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const markTodoComplete = todoId => {
    const newTodosItem = todos.map(item => {
      if (item.id == todoId) {
        return {...item, completed: true};
      }
      return item;
    });

    setTodos(newTodosItem);
  };

  const deleteTodo = todoId => {
    const newTodosItem = todos.filter(item => item.id != todoId);
    setTodos(newTodosItem);
  };

  const clearAllTodos = () => {
    Alert.alert('Confirm', 'Clear tasks?', [
      {
        text: 'Yes',
        onPress: () => setTodos([]),
      },
      {
        text: 'No',
      },
    ]);
  };

  const onPressItem = (editItem) => {
    setisModalVisible(true);
    setTextInput(textInput)
    seteditItem(editItem)
  }

  const renderItem =({item, index}) => {
    return (
      <TouchableOpacity
      style={styles.item}
      onPress={() => onPressItem(item)}
      >
        <Text style={styles.text}>{item.text}</Text>
      </TouchableOpacity>
    )
  }

  const handleEditItem = (editItem) => {
     const newData = todos.map(item => {
       if (item.id == editItem) {
            item.text = textInput;
            return item;
       }
        return item;
     })
    setTodos(newData);
    setisRender(!isRender)
  }

  const onPressSaveEdit = () => {
     handleEditItem(editItem);
     setisModalVisible(false);
  }

  const ListItem = ({todo}) => {
    return (
      <View style={styles.listItem}>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
              color: COLORS.primary,
              textDecorationLine: todo?.completed ? 'line-through' : 'none',
            }}>
            {todo?.task}
          </Text>
          <TextInput
            value={textInput}
            placeholder="Add Description...."
            onChangeText={desctext => setTextInput(desctext)}
          />
        </View>
        {!todo?.completed && (
          <TouchableOpacity onPress={() => markTodoComplete(todo.id)}>
            <View style={styles.actionIcon}>
            <Image
              source={require('../assets/img/tick.png')}
              style={{
                width: horizontalScale(30),
                height: horizontalScale(30),
              }}
              />
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
          <View style={styles.actionIcon}>
          <Image
              source={require('../assets/img/cross.png')}
              style={{
                width: horizontalScale(20),
                height: horizontalScale(20),
              }}
              />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPressItem(todo.id)}>
          <View style={styles.actionIcon}>
          <Image
              source={require('../assets/img/edit.png')}
              style={{
                width: horizontalScale(20),
                height: horizontalScale(20),
              }}
              />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <View style={styles.header}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: '#55BCF6',
          }}>
          Today's Task
        </Text>
        <TouchableOpacity onPress={clearAllTodos}>
          <Image
              source={require('../assets/img/trash1.png')}
              style={{
                width: horizontalScale(20),
                height: horizontalScale(20),
              }}
              />
        </TouchableOpacity>
      </View>
      <FlatList 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 20, paddingBottom: 100}}
        data={todos}
        
        renderItem={({item}) => <ListItem todo={item} />}
        extraData={isRender}
      />
      {/* <FlatList 
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem} 
      extraData={isRender}/> */}
      <Modal
        animationType='fade'
        visible={isModalVisible}
        onRequestClose={() => setisModalVisible(false)}
      >
       <View style={styles.modalView}>
        <Text style={styles.text}>Change Task</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setTextInput(text)}
          //defaultValue={textInput}
          editable={true}
          multiline={false}
          maxLength={20}
        />
        <Text style={styles.text}>Change Description</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setTextInput(text)}
          defaultValue={textInput}
          editable={true}
          multiline={true}
          maxLength={200}
        />
        <TouchableOpacity
          onPress={() => onPressSaveEdit()}
          style={styles.touchableSave}
        >
           <Text style={styles.text}>Save</Text>
        </TouchableOpacity>
       </View>
      </Modal>

      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            value={textInput}
            placeholder="Add Task...."
            onChangeText={text => setTextInput(text)}
          />
        </View>
        <TouchableOpacity onPress={addTodo}>
          <View style={styles.iconContainer}>
          <Image
              source={require('../assets/img/enter1.png')}
              style={{
                width: horizontalScale(30),
                height: horizontalScale(30),
              }}
              />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  inputContainer: {
    height: 50,
    paddingHorizontal: 20,
    elevation: 40,
    backgroundColor: COLORS.white,
    flex: 1,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: '#55BCF6',
    elevation: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listItem: {
    padding: 20,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
  },
  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    borderRadius: 3,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    marginVertical: 30,
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  textInput: {
    width: '90%',
    height: 70,
    borderColor: 'grey',
    borderWidth: 1,
    fontSize: 25,
  },
  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableSave: {
    backgroundColor: '#55BCF6',
    paddingHorizontal: 50,
    alignItems: 'center',
    marginTop: 20,
  },
});

export default Main;
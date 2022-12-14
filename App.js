import React, { useState } from 'react';
import { StyleSheet, View,FlatList,Alert, TouchableWithoutFeedback, Keyboard} from 'react-native';
import AddTodo from './components/addTodo';
import Header from './components/header';
import TodoItem from './components/todoitem';

export default function App() {
  const [todos, setTodos] = useState([
    {text: 'buy coffee', key: '1'},
    {text: 'create an app', key: '2'},
    {text: 'play on the switch', key: '3'},
  ]);

  const submitHandler = (text)=>{
    if(text.length > 3){
      setTodos(
        (prevTodos) =>{
          return [
            {text:text, key: Math.random().toString() },
            ...prevTodos
          ];
        }
      )
    }else{
      Alert.alert('OOPS!', 'Todos must be more than 3 Characters Long.',[
        {
          text: 'I Understood',
          onPress : ()=> console.log('Alert Closed')
        }
      ])
    }
  }

  const pressHandler = (key)=>{
    setTodos((prevTodos)=>(
      prevTodos.filter(todos=>todos.key != key)
      )
    )
  }

  return (
    <TouchableWithoutFeedback
      onPress = {
        ()=>{
        console.log('dismissed keyboard')
        Keyboard.dismiss();
       }
    }
    >
      <View style={styles.container}>
        <Header/>
        <View style={styles.content}>
        {/* to form */}
          <AddTodo submitHandler={submitHandler}/>
          <View style = {styles.list}>
            <FlatList
              data = {todos}
              renderItem = {({item})=>(
                <TodoItem item = {item} pressHandler = {pressHandler}/>
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container :{
    flex :1,
    backgroundColor : 'fff',
  },
  content :{
    flex:1,
    padding : 40,
  },
  list:{
    flex:1,
    margin: 20,
  }
});

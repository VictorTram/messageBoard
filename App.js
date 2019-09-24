import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, FlatList } from 'react-native';
import { Input, Card, Button, Icon} from 'native-base';
import * as firebase from 'firebase';
import {SECRET_firebaseConfig} from './config';

var config = SECRET_firebaseConfig;
firebase.initializeApp(config);

export default class App extends React.Component{

  state = {
    message: "",
    messageList: [],
  }
  
  sendMessage = (message) => {
    var messageListRef = firebase.database().ref("message_list");
    // Push message to database
    var newMessageRef = messageListRef.push();
    newMessageRef.set({
      text: message,
      time: Date.now(),

    });
    this.setState({message: ""});
  };

  updateList = (messageList) => {
    this.setState({messageList: messageList});
  };

  componentDidMount(){
    // Javascript Trick to use when your methods are too in-depth
    var self = this;

    var messageListRef = firebase.database().ref("message_list");


    messageListRef.on("value", (dataSnapshot) => {
      // Into a callback
      if(dataSnapshot.val){
        let messageList = Object.values(dataSnapshot.val);
        self.updateList(messageList.reverse());
      }
    })

  }

  render(){
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    margin: 2,
    backgroundColor: "#01CBC6"
  },
  header: {
    backgroundColor: "#2B2B52",
    alignItems: "center",
    height: 40,
    justifyContent: "center"
  },
  headerText: {
    paddingHorizontal: 10,
    color: "#FFF",
    fontSize: 20
  },
  listContainer: {
    flex: 1,
    padding: 5
  },
  listItem: {
    padding: 10
  },
  messageText: {
    fontSize: 20
  },
  timeText: {
    fontSize: 10
  },
  inputContainer: {
    flexDirection: "row",
    padding: 5,
    borderWidth: 5,
    borderRadius: 15,
    borderColor: "#2B2B52",
    color: "#fff"
  }
});

import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import database from '@react-native-firebase/database';

const App = () => {
  const [value, setValue] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    getData();
  });

  const getData = () => {
    database()
      .ref('/Data/value')
      .on('value', snapshot => {
        setValue(snapshot.val());
        console.log('User data: ', snapshot.val());
      });
  };

  const sendData = () => {
    database()
      .ref('/Data1/value')
      .set(text)
      .then(() => console.log('Data set.'));
  };

  return (
    <View style={{padding: 20}}>
      <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 12}}>
        {value}
      </Text>
      <TextInput
        onChangeText={x => {
          setText(x);
        }}
        style={{borderWidth: 1, borderRadius: 10}}></TextInput>

      <TouchableOpacity
        onPress={() => sendData()}
        style={{
          backgroundColor: 'gray',
          borderRadius: 10,
          padding: 16,
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>Kirim</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={{
          backgroundColor: 'gray',
          borderRadius: 10,
          padding: 16,
          alignItems: 'center',
          flex: 1,
        }}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>OFF</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default App;

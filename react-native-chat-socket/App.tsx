import { View, Text, FlatList, TextInput, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import socket from './src/services/socket';
import axios from 'axios';
import Constants from './src/utils/constants';

const App = () => {
  const [listMessages, setListMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const rs = await axios.get(Constants.URL + '/chat/all');
        setListMessages(rs.data || []);
      } catch (error) {
        console.log(JSON.stringify(error, null, 2));
      }
    };

    fetchAll();

    socket.emit('joinRoom', { userId: 'dd893335-f65a-4ad9-86d9-f73249ececfc' });
    console.log(`Joining room: 'dd893335-f65a-4ad9-86d9-f73249ececfc'`);

    socket.on('message', newMessage => {
      setListMessages(prevMessages => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const handleSendMessage = () => {
    try {
      if (input.trim()) {
        socket.emit('message', {
          senderId: 'dd893335-f65a-4ad9-86d9-f73249ececfc',
          receiverId: 'dd893335-f65a-4ad9-86d9-f73249ececfc',
          content: input,
          type: 'text',
        });
        setInput('');
      }
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 }}>
      <FlatList
        data={listMessages}
        renderItem={({ item }) => (
          <View style={{ flex: 1, flexDirection: 'row', padding: 2 }}>
            <Text
              style={{
                backgroundColor: '#cc778a',
                color: '#fff',
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 4,
              }}>
              {item.content}
            </Text>
          </View>
        )}
      />

      <View style={{ flexDirection: 'row' }}>
        <TextInput
          value={input}
          onChangeText={setInput}
          style={{
            flex: 1,
            height: 40,
            borderColor: '#ccc',
            borderWidth: 1,
            paddingHorizontal: 10,
            marginVertical: 10,
            borderRadius: 4,
          }}
        />

        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </View>
  );
};

export default App;

// SettingsScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import WebSocketService from '../services/WebSocketService';

const SettingsScreen = () => {
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(true);  // 페이지가 처음 로드될 때 로딩 상태
  const [error, setError] = useState('');

  useEffect(() => {
    // WebSocket 연결
    WebSocketService.connect();

    // 서버로부터 받은 메시지를 처리하는 리스너 추가
    const handleWebSocketEvent = (data) => {
      try {
        const parsedData = JSON.parse(data);
        setNames(parsedData.map((user) => user.name));  // 사용자 이름만 추출하여 상태 업데이트
        setLoading(false);
      } catch (e) {
        console.error('Error parsing WebSocket message:', e);
        setError('Error parsing response');
        setLoading(false);
      }
    };

    WebSocketService.addListener(handleWebSocketEvent);

    // WebSocket 연결 후 'get-users' 메시지 전송
    WebSocketService.ws.onopen = () => {
      WebSocketService.sendMessage('get-users');  // 페이지가 로드되면 자동으로 'get-users' 메시지 전송
    };

    // 컴포넌트가 언마운트되면 리스너 제거
    return () => {
      WebSocketService.removeListener(handleWebSocketEvent);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WebSocket Example</Text>
      
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={names}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.name}>{item}</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    marginVertical: 5,
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default SettingsScreen;

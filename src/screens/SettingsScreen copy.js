import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

const SettingsScreen = () => {
  const [names, setNames] = useState([]);  // 받은 name 데이터를 저장할 상태
  const [connected, setConnected] = useState(false);  // WebSocket 연결 상태
  const [ws, setWs] = useState(null);  // WebSocket 객체
  const [loading, setLoading] = useState(false);  // 로딩 상태
  const [error, setError] = useState('');  // 오류 메시지 상태

  useEffect(() => {
    // WebSocket 서버와 연결
    const socket = new WebSocket('ws://10.0.2.2:5000');  // 에뮬레이터에서 10.0.2.2 사용

    // WebSocket 연결이 열리면 호출되는 콜백
    socket.onopen = () => {
      console.log('Connected to WebSocket server');
      setConnected(true);
      setError('');  // 연결 성공 시 오류 메시지 초기화
    };

    // 서버로부터 메시지를 받았을 때 호출되는 콜백
    socket.onmessage = (e) => {
      let data = e.data;
      console.log('Received data from server:', data);  // 서버로부터 받은 원본 데이터를 콘솔에 출력    
      if (data instanceof ArrayBuffer) {
        const text = new TextDecoder().decode(data);
        console.log('Decoded ArrayBuffer to text:', text);
        data = text;
      }
    
      // 받은 데이터가 문자열일 경우 JSON으로 파싱
      try {
        console.log('Attempting to parse JSON:', data);  // JSON 파싱 전에 출력
        if (typeof data === 'string') {
          // JSON이 아닌 형식의 데이터가 들어있는지 점검
          if (data.trim() === '') {
            setError('Received empty string');
            setLoading(false);
            return;
          }
    
          // 여기에서 오류를 잡기 위한 추가적인 점검을 할 수 있습니다.
          // 예: JSON의 시작과 끝이 올바른지 확인
          if (data.startsWith('[') && data.endsWith(']')) {
            const users = JSON.parse(data);
            const namesArray = users.map(user => user.name);
            setNames(namesArray);
            setLoading(false);
          } else {
            setError('Received data is not a valid JSON array');
            setLoading(false);
          }
        } else {
          setError('Received data is not a valid string');
          setLoading(false);
        }
      } catch (parseError) {
        console.error('JSON parse error:', parseError);  // JSON 파싱 오류를 더 자세히 출력
        setLoading(false);
        setError('Failed to parse server response');
      }
    };

    // WebSocket 연결 종료 시 호출되는 콜백
    socket.onclose = () => {
      console.log('Disconnected from WebSocket server');
      setConnected(false);
    };

    // WebSocket 오류 발생 시 호출되는 콜백
    socket.onerror = (e) => {
      console.error('WebSocket error:', e.message);
      setLoading(false);  // 로딩 완료
      setError('WebSocket error occurred');  // 오류 메시지 설정
    };

    // WebSocket 객체를 상태로 저장
    setWs(socket);

    // 컴포넌트가 언마운트되면 WebSocket 연결 종료
    return () => {
      socket.close();
    };
  }, []);  // 빈 배열을 넣어 컴포넌트가 처음 렌더링될 때만 실행되도록

  // 서버에 메시지를 보내는 함수
  const sendMessage = () => {
    if (ws && connected) {
      console.log('Sending message to server...');
      setLoading(true);  // 메시지를 보낼 때 로딩 시작

      // 'get-users' 문자열을 ArrayBuffer로 변환하여 보내기
      const message = 'get-users';  // 보낼 메시지
      const buffer = new TextEncoder().encode(message);  // 텍스트를 UTF-8 ArrayBuffer로 변환

      ws.send(buffer);  // ArrayBuffer 형식으로 메시지 전송
    } else {
      console.log('WebSocket is not connected.');
      setError('WebSocket is not connected');  // 연결되지 않은 경우 오류 메시지 표시
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WebSocket Example</Text>
      <Text>{connected ? 'Connected' : 'Disconnected'}</Text>

      {/* 오류 메시지가 있을 경우 표시 */}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* 로딩 중일 때 ActivityIndicator 표시 */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {/* 받은 name 목록을 FlatList로 표시 */}
          <FlatList
            data={names}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Text style={styles.name}>{item}</Text>}
          />
        </>
      )}

      <Button title="Get Users" onPress={sendMessage} disabled={!connected || loading} />
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

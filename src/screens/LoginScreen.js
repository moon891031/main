import React, { useState } from 'react';
import { View, Text, Image,TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // FontAwesome 아이콘 세트 사용
import { Checkbox } from 'react-native-paper';
import { Alert } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 표시 여부 상태
  const [checked, setChecked] = useState(false); 
  const handleCheck = () => {
    setChecked(!checked); // 체크 상태 토글
  };
const handleLogin = async() => {
        const requestBody = {
        username: id,
        password: password,       
      };
      console.log('handleLogin',requestBody);
       try {
    const response = await fetch('http://3.38.95.13:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
    const result = await response.json(); // 서버에서 보낸 JSON 응답
    if (response.ok) {
      Alert.alert('로그인 성공', '홈 화면으로 이동합니다.');
      console.log('login success',result);
      navigation.navigate('Home');
    } else {
      Alert.alert('로그인 실패', result.message || '다시 시도해주세요.');
    }
  } catch (error) {
    Alert.alert('Loing Error', '네트워크 오류가 발생했습니다.');
    console.error(error);
  }

  };
  const handleJoin = () => {
    
    navigation.navigate('Join'); // 로그인 후 Home 페이지로 이동
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState); // 비밀번호 표시 여부 토글
  };

  return (
   <View style={styles.container}>
       <Image style={styles.loginImage}
           source={require('../../assets/voda-logo.png')} // 경로 주의!
      />
      <TextInput
        style={styles.input}
        placeholder="ID"
        value={id}
        onChangeText={setId}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword} // showPassword 상태에 따라 비밀번호 감추기
        />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.toggleButton}>
          <Icon
            name={showPassword ? 'eye' : 'eye-slash'} // 'eye' 또는 'eye-slash' 아이콘 표시
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'} // 체크된 상태에 따라 변경
          color="#AEAEAE" // 체크박스 색상 (초록색)
          uncheckedColor="#AEAEAE" // 체크 해제 시 색상 (빨간색)
          onPress={handleCheck} // 체크박스 클릭 시 상태 변경

        />
        <Text style={styles.checkboxText}>로그인 정보 저장</Text>
      </View>
      
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
      <Text style={styles. underlinedText} >가입정보를 잊으셨나요?</Text>
      <Text style={styles. underlinedText} onPress={handleJoin}>회원가입</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loginImage: {
    alignItems: 'center',
    marginBottom: 50, 
  
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '70%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
    fontFamily: 'Pretendard-Regular', 
  },
  passwordContainer: {
    flexDirection: 'row',
    width: '70%',
    position: 'relative',
  },
  passwordInput: {
    flex: 1,
    fontFamily: 'Pretendard-Regular', 
  },
  toggleButton: {
    position: 'absolute',
    right: 5,
    padding:5,    
  },
  checkboxContainer: {
    width:'70%',
    flexDirection: 'row',
    alignItems:'center',
    alignSelf:'center', 
  },
  checkboxText: {
    marginLeft: 5,
    marginBottom:1,
    fontFamily: 'Pretendard-Regular', 
    color:'#AEAEAE',
  },
  loginButton: {
    width: '70%',
    paddingVertical: 12,
    backgroundColor: '#fada7a',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Pretendard-Bold', 
  },
  underlinedText: {
    marginTop: 20,
    fontSize: 12,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textDecorationStyle: 'double',
    textDecorationColor: '#4CAF50',
    fontFamily: 'Pretendard-Regular', 
  },
});

export default LoginScreen;

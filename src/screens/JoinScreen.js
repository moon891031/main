import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native';
import { Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome'; // FontAwesome 아이콘 세트 사용
import axios from 'axios';
const JoinScreen = ({ navigation }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [idError, setIdError] = useState(''); 
  const [confirmError, setConfirmError] = useState(''); 
  const [phone, setPhone] = useState({ first: '', second: '', third: '' });
  const [birth, setBirth] = useState('');  
  const [gender, setGender] = useState('null'); 
  const [adPush, setAdPush] = useState('null'); 
  const [smsPush, setSmsPush] = useState('null'); 
  const [appPush, setAppPush] = useState('null'); 
  
  const secondInputRef = useRef(null);
  const thirdInputRef = useRef(null);
  const [contacts, setContacts] = useState();
  const handleIdCheck = async () => {
    try {
      console.log("보낸아이디", id);
      const url = `http://3.38.95.13:3000/user/${id}/check-username`; 
      const response = await axios.get(url);
  
      const { isAvailable } = response.data;

      if (isAvailable) {
        Alert.alert('사용 가능한 아이디', '사용 가능한 아이디입니다.');
      } else {
        Alert.alert('중복 아이디', '이미 사용 중인 아이디입니다.');
      }
    } catch (error) {
        console.error('중복확인에러발생', error);
        Alert.alert('에러 발생', '서버와의 통신 중 오류가 발생했습니다.');
     
    }
  };

  const handleSignUp = async() => {
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    else{
      const requestBody = {
        username: id,
        password: password,
        fullName: name,
        phoneNumber: `${phone.first}${phone.second}${phone.third}`,
        birthDate: 1234,
        gender : 'F',
        
      };
      console.log('moon',requestBody);
       try {
    const response = await fetch('http://3.38.95.13:3000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    const result = await response.json(); // 서버에서 보낸 JSON 응답

    if (response.ok) {
      Alert.alert('회원가입 성공', '로그인 화면으로 이동합니다.');
      navigation.navigate('Login');
       } else {
      Alert.alert('회원가입 실패', result.message || '다시 시도해주세요.');
      }
        } catch (error) {
    Alert.alert('에러 발생', '네트워크 오류가 발생했습니다.');
    console.error(error);
       }

    }

  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState); // 비밀번호 표시 여부 토글
  };

  const handlePhoneChange = (value, part) => {
    const formattedPhone = { ...phone, [part]: value.replace(/\D/g, '').slice(0, part === 'first' ? 3 : 4) };
    setPhone(formattedPhone);

    // 자동으로 다음 칸으로 포커스 이동
    if (part === 'first' && value.length === 3) {
      secondInputRef.current.focus();
    } else if (part === 'second' && value.length === 4) {
      thirdInputRef.current.focus();
    }
  };

  const checkId = (inputId) => {
    if (inputId === 'abc') {
      setIdError('아이디가 이미 존재합니다.');
    } else {
      setIdError(''); // 오류 메시지 초기화
    }
  };
  const checkPassword = (inputPassword, inputConfirmPassword) => {
    if (inputPassword === inputConfirmPassword && inputConfirmPassword !== '') {
      setConfirmError('비밀번호가 일치합니다.');
    } else {
      setConfirmError('비밀번호가 일치하지 않습니다.');
    }
  };
  
  return (
   
    <View style={styles.container}>
       <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={{fontSize: 24, fontWeight:'bold', marginBottom:20}}>회원가입</Text>
      
      <Text style={styles.subtitle}>
        <Text style={{ color: 'black' }}>이름(실명)</Text>
        <Text style={{ color: 'red' }}>*</Text>
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input]} 
          value={name}
          onChangeText={setName}
        />
      </View>
   
      <Text style={styles.subtitle}>
        <Text style={{ color: 'black' }}>아이디(ID)</Text>
        <Text style={{ color: 'red' }}>*</Text>
      </Text>

      <View style={styles.idContainer}>
      <TextInput
        style={[styles.input, idError ? styles.inputError : null, styles.idInput]} // 아이디 입력칸 스타일 적용
        value={id}
        onChangeText={(text) => {
          setId(text);
          checkId(text);
        }}
      />
      {idError && <Text style={styles.errorText}>{idError}</Text>}
      <TouchableOpacity style={styles.idCheckButton} onPress={handleIdCheck}>
        <Text style={styles.buttonText}>중복확인</Text>
      </TouchableOpacity>
       </View>   

      <View style={styles.inputContainer}>
        <Text style={styles.infoText}>ID는 영문,숫자 조합만 가능</Text>
      </View>

      <Text style={styles.subtitle}>
        <Text style={{ color: 'black' }}>비밀번호</Text>
        <Text style={{ color: 'red' }}>*</Text>
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input]}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            checkPassword(text, confirmPassword); // 비밀번호 일치 여부 확인
          }}
          secureTextEntry={!showPassword} // 비밀번호 표시 여부
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.toggleButton}>
         <Icon
            name={showPassword ? 'eye' : 'eye-slash'} // 'eye' 또는 'eye-slash' 아이콘 표시
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.infoText}>8~16자, 영어 대문자,숫자,특수문자 조합 추천</Text>
      </View>
      <Text style={styles.subtitle}>
        <Text style={{ color: 'black' }}>비밀번호 확인</Text>
        <Text style={{ color: 'red' }}>*</Text>
      </Text>
      <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, 
          confirmError === '비밀번호가 일치합니다.' ? styles.inputSuccess : null, 
          confirmError === '비밀번호가 일치하지 않습니다.' ? styles.inputError : null
        ]} 
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
          checkPassword(password, text); // 비밀번호 일치 여부 확인
        }}
        secureTextEntry={!showPassword} // 비밀번호 확인도 같은 설정
        />
        {confirmError && (
      <Text style={[styles.errorText, confirmError === '비밀번호가 일치합니다.' ? styles.successText : null]}>
        {confirmError}
      </Text>
      )}
      </View>
      <Text style={styles.subtitle}>
        <Text style={{ color: 'black' }}>휴대폰 번호</Text>
        <Text style={{ color: 'red' }}>*</Text>
      </Text>
      <View style={styles.phoneContainer}>
          <TextInput
            style={styles.phoneInput}
            value={phone.first}
            onChangeText={(value) => handlePhoneChange(value, 'first')}
            maxLength={3}
            keyboardType="numeric"
         
          />
          <Text style={{alignSelf:'center',fontSize:20}}>-</Text>
          <TextInput
            style={styles.phoneInput}
            value={phone.second}
            onChangeText={(value) => handlePhoneChange(value, 'second')}
            maxLength={4}
            ref={secondInputRef} // ref 추가
            keyboardType="numeric"

          />
          <Text style={{alignSelf:'center',fontSize:20}}>-</Text>
          <TextInput
            style={styles.phoneInput}
            value={phone.third}
            onChangeText={(value) => handlePhoneChange(value, 'third')}
            maxLength={4}
            ref={thirdInputRef} // ref 추가
            keyboardType="numeric"

          />
        </View>
      <View style={styles.inputContainer}>
        <Text style={styles.infoText}>여러대의 휴대폰 사용시 가장 많이 사용하는 번호</Text>
      </View>
      <Text style={styles.subtitle}>
        <Text style={{ color: 'black' }}>생년월일(선택)</Text>
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input]} // 오류 메시지 있을 때 스타일 변경
          value={birth}
          onChangeText={setBirth}
          placeholder='20250225'
          keyboardType="numeric" // 숫자 키보드만 보이도록 설정
          maxLength={8} // YYYYMMDD 형식으로 8자리 제한
        />
      </View>
     
      <Text style={styles.subtitle}>성별 (선택)</Text>
      <View style={styles.checkboxContainer}>
        {/* 남성 선택 */}
        <TouchableOpacity
          style={[styles.checkbox, gender === 'male' && styles.selected]}
          onPress={() => setGender(gender === 'male' ? '' : 'male')} // 선택 해제 처리
        >
          <Icon name={gender === 'male' ? 'check-square' : 'square-o'} size={20} />
          <Text style={[styles.label,{marginBottom:5}]}>남성</Text>
        </TouchableOpacity>

        {/* 여성 선택 */}
        <TouchableOpacity
          style={[styles.checkbox,{marginLeft:10}, gender === 'female' && styles.selected]}
          onPress={() => setGender(gender === 'female' ? '' : 'female')} // 선택 해제 처리
        >
          <Icon name={gender === 'female' ? 'check-square' : 'square-o'} size={20} />
          <Text style={[styles.label,{marginBottom:5}]}>여성</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.subtitle,{marginBottom:0}]}>마케팅 정보 수신동의 (선택)</Text>
      <View style={styles.subtitle}>
        <Text style={[styles.text,{fontSize:10,marginBottom:5}]}>
          ．당사는 이벤트, 할인, 혜택 등의 광고성 정보를{"\n"}
            {"    "}문자(SMS/MMS), 푸시 알림 등의 방법으로 제공할 수 있습니다.{"\n"}
          ．동의 이후에도 언제든지 회원정보 변경에서 수신 거부가 가능합니다.
        </Text>
      </View>
      <View style={[styles.checkboxContainer]}>
        {/* 남성 선택 */}
        <TouchableOpacity
          style={[styles.checkbox, adPush === 'y' && styles.selected]}
          onPress={() => setAdPush(adPush === 'y' ? '' : 'y')} // 선택 해제 처리
        >
          <Icon name={adPush === 'y' ? 'check-square' : 'square-o'} size={10} />
          <Text style={[styles.label,{fontSize:10,marginBottom:3}]}>광고성 정보 수신에 동의합니다.</Text>
        </TouchableOpacity>

      </View>
     

      <View style={styles.checkboxContainer}>
        {/* 남성 선택 */}
        <TouchableOpacity
          style={[styles.checkbox, smsPush === 'y' && styles.selected]}
          onPress={() => setSmsPush(smsPush === 'y' ? '' : 'y')} // 선택 해제 처리
        >
          <Icon name={smsPush === 'y' ? 'check-square' : 'square-o'} size={10} />
          <Text style={[styles.label,{fontSize:10,marginBottom:2}]}>SMS</Text>
        </TouchableOpacity>

        {/* 여성 선택 */}
        <TouchableOpacity
          style={[styles.checkbox,{marginLeft:10}, appPush === 'y' && styles.selected]}
          onPress={() => setAppPush(appPush === 'y' ? '' : 'y')} // 선택 해제 처리
        >
          <Icon name={appPush === 'y' ? 'check-square' : 'square-o'} size={10} />
          <Text style={[styles.label,{fontSize:10,marginBottom:4}]}>앱 푸시</Text>
        </TouchableOpacity>
      </View>
     
     
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
  
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%', 
    height:'100%',
    padding:20, 
    alignItems:'center',
    
    
  },
  scrollContainer: {
    width: '80%',
 
    marginTop:20,
   
  },
  inputContainer: {
    flexDirection: 'row',
    width:'100%',
    justifyContent: 'flex-end', 
  },
  input: {
    width: '100%',
    borderWidth:1,
    borderRadius: 10,
    borderBottomColor: 'gray',
    paddingHorizontal: 10,
  },
  idContainer: {
    flexDirection: 'row',
  },
  idInput: {
    width:'80%',
  },
  idCheckButton: {
    paddingVertical: 10,
    flex:2,
    borderWidth:1,
    borderRadius: 10,
    borderBlockColor: 'gray',
    alignSelf:'center', 
  },

  inputError: {
    borderBottomColor: 'red', // 오류가 있을 때 테두리 색상 변경
  },
  inputSuccess: {
    borderColor: 'green',
    borderWidth: 1,
  },
  successText: {
    color: 'green',
  },
   
  errorText: {
    position: 'absolute',
    width:'80%',
    alignSelf:'center',
    textAlign:'right',
    color: 'red',
    fontSize: 12,
    paddingRight:5,
  },  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  subtitle:{
    marginTop:10,
    marginBottom:3,
    fontSize:13,
    fontWeight: 'bold',
  },
 
  toggleButton: {
    position: 'absolute',
    right:'5%',
    marginTop:'9',
  },
  phoneContainer: {
    width:'100%',
    flexDirection: 'row',
    justifyContent:'space-between', 
      
  },
  phoneInput: {
    width: '25%',
    textAlign:'center',
    borderWidth: 1,
    borderRadius: 10,
    borderBottomColor: 'gray',
  },
  infoText: {
    width: '80%',
    fontSize: 12,
    color: 'black',
    textAlign: 'right',
    marginTop:2,
  },
  
  checkboxContainer: {
    width:'80%',
    flexDirection: 'row',

  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  label: {
    fontSize: 16,
    marginLeft: 8,
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },

  marketingConatiner:{
    width:'80%',
    marginLeft:10,
    
  },
  marketingText:{
    fontSize:10,
  },
  signUpButton: {
    flexGrow:1,
    paddingVertical: 12,
    backgroundColor: '#fada7a', // 버튼 배경색
    borderRadius: 20, // 둥근 직사각형
    marginTop: 20,
    
  },
  buttonText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign:'center', 
  },
  
});

export default JoinScreen;

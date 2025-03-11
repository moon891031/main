import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // 2초 후에 Home 화면으로 이동
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timer); // 컴포넌트가 언마운트 될 때 타이머 클리어
  }, [navigation]);

  return (
    <View style={{backgroundColor: '#fff9d0',flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* 이미지 추가 */}
      <Image 
        source={require('../../assets/voda-logo.png')} // 경로 주의!
      />
      <Text>Loading...</Text>
    </View>
  );
};

export default SplashScreen;
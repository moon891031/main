import React from 'react';
import {Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ContactDetailScreen from './src/screens/ContactDetailScreen';
import ContactListScreen from './src/screens/ContactListScreen';
import JoinScreen from './src/screens/JoinScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import CallLogScreen from './src/screens/CallLogScreen';
import LayoutScreen from './src/screens/LayoutScreen';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 중앙 버튼 컴포넌트
const CustomButton = ({ onPress }) => (
  <TouchableOpacity style={styles.customButton} onPress={onPress}>
    <View style={styles.buttonContainer}>
    <Image source={require('./assets/icons/sync.png')} style={[styles.buttonIcon,{width:25,hegiht:25}]} />
      {/*<Ionicons name="add" size={40} color="white" />*/}
    </View>
  </TouchableOpacity>
);
const getTabIcon = (iconName) => {
  const icons = {
    home: require('./assets/icons/home.png'),
    contacts: require('./assets/icons/contacts.png'),
    call: require('./assets/icons/call.png'),
    settings: require('./assets/icons/settings.png'),
  };
  return icons[iconName];
};
// 탭 네비게이션
const TabNavigator = ({ navigation }) => {
  return (
    <>
      <Tab.Navigator
        initialRouteName="홈"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#fff9d0',
            height: 70,
            borderTopColor: '#ddd',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
            marginBottom: 15,
          },
          tabBarIconStyle:{
            marginTop:9,
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'black',
        }}
      >
        <Tab.Screen name="홈" component={HomeScreen} options={{headerShown: false,
            tabBarIcon: ({ color }) => (<Image source={getTabIcon('home')} style={styles.tabIcon} />
            ),
          }}
        />
        <Tab.Screen
          name="연락처" component={ContactListScreen} options={{headerShown: false,
            tabBarIcon: ({ color }) => (<Image source={getTabIcon('contacts')} style={styles.tabIcon} />
            ),
          }}
        />
        <Tab.Screen
          name="통화기록" component={CallLogScreen} options={{ headerShown: false,
            tabBarIcon: ({ color }) => (<Image source={getTabIcon('call')} style={styles.tabIcon} />
            ),
          }}
        />
        <Tab.Screen
          name="설정" component={SettingsScreen} options={{ headerShown: false,
            tabBarIcon: ({ color }) => (<Image source={getTabIcon('settings')} style={styles.tabIcon} />
            ),
          }}
        />
      </Tab.Navigator>
      {/* 중앙 추가 버튼 */}
      <View style={styles.centerButtonContainer}>
        <CustomButton onPress={() => navigation.navigate('Layout')} />
      </View>
    </>
  );
};

// 전체 네비게이션 구조
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ContactList" component={ContactListScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ContactDetail" component={ContactDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Join" component={JoinScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Layout" component={LayoutScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// 스타일
const styles = StyleSheet.create({
  centerButtonContainer: {
    position: 'absolute',
    bottom: 40, // 탭바 위로 떠 있는 위치 조정
    left: '50%',
    transform: [{ translateX: -35 }], // 버튼 중앙 정렬
  },
  customButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FADA7A',
    borderRadius: 50,
    width: 70,
    height: 70,
    shadowColor: '#000',
  /*shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 20,
    shadowRadius: 1,
    */ //ios 전용 
    elevation: 20,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    width: 40,   // 이미지 크기 조절
    height: 40,
    resizeMode: 'contain',  // 이미지가 잘리지 않도록 설정
  },
});

export default App;

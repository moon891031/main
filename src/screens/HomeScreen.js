import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';

const HomeScreen = () => {
  const [contacts, setContacts] = useState([]);  // 연락처 데이터 상태
  const [loading, setLoading] = useState(true);  // 로딩 상태
  const [error, setError] = useState(null);      // 에러 상태

  // Contacts 객체 확인
 
  if (!Contacts || typeof Contacts.getAll !== 'function') {
    console.error('🚨 react-native-contacts 라이브러리가 정상적으로 로드되지 않았습니다!');
  }

  // 권한 요청 함수
  const requestContactsPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: '연락처 접근 권한',
          message: '연락처 정보를 가져오기 위해 권한이 필요합니다.',
          buttonNeutral: '나중에',
          buttonNegative: '취소',
          buttonPositive: '허용',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('연락처 접근 권한이 허용되었습니다.');
        fetchContacts(); // 권한이 허용되면 연락처 가져오기
      } else {
        console.log('연락처 접근 권한이 거부되었습니다.');
        setError('연락처 접근 권한이 필요합니다.');  // 권한 거부 시 에러 메시지
      }
    } catch (err) {
      console.warn(err);
      setError('권한 요청 중 오류가 발생했습니다.');  // 권한 요청 중 오류가 발생한 경우
    }
  };

  // 연락처 가져오기 함수
  const fetchContacts = async () => {
    try {
      // 권한 확인 후 연락처 가져오기
      const permissionGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS
      );

      if (!permissionGranted) {
        await requestContactsPermission(); // 권한 요청
      } else {
        console.log('권한 상태:', permissionGranted);
        Contacts.getAll()
          .then(contacts => {
            console.log(contacts); // 연락처 데이터를 콘솔에 출력
            setContacts(contacts); // 상태에 연락처 데이터 설정
          })
          .catch(e => {
            console.log('moon',contacts)
            console.error('moon',e); // 오류 출력
            setError('연락처를 가져오는 데 실패했습니다2.');
          });
      }
    } catch (err) {
      console.error('Error fetching contacts:', err);
      setError('연락처를 가져오는 데 실패했습니다1.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();  // 컴포넌트 마운트 시 연락처 가져오기
  }, []);

  // 로딩 중일 때
  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  // 에러 발생 시
  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>연락처 리스트</Text>
      <FlatList
        data={contacts}  // 데이터를 contacts 상태로 변경
        keyExtractor={(item, index) => item.recordID.toString()}  // recordID를 key로 사용
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>이름: {item.givenName} {item.familyName}</Text>
            <Text style={styles.text}>전화번호: {item.phoneNumbers[0]?.number}</Text>
            {/* 전화번호가 없을 경우를 대비해 optional chaining을 사용 */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  item: { fontSize: 18, marginVertical: 10 },
  text: { color: 'gray', marginBottom: 5 },
  error: { color: 'red', fontSize: 16, marginBottom: 10 },
});

export default HomeScreen;

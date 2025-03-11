import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const HomeScreen = () => {
  const [contacts, setContacts] = useState([]);  // 연락처 데이터 상태
  const [loading, setLoading] = useState(true);  // 로딩 상태
  const [error, setError] = useState(null);      // 에러 상태

  const page = 1; // 예시 페이지 번호
  const pageSize = 10; // 예시 페이지 크기
  const contactCategoryId = 1; // 예시 연락처 카테고리 ID
  const searchText = ''; // 예시 검색어 (빈 문자열이면 전체)

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://3.38.95.13:3000/contact/list', {
        params: {
          page: page,               // 페이지 번호
          pageSize: pageSize,       // 페이지 크기
          contactCategoryId: contactCategoryId,  // 연락처 카테고리 ID
          searchText: searchText    // 검색어
        }
      });
      
      const contactList = response.data.contactList || [];  // contactList 배열을 가져옴
      setContacts(contactList); // 응답 데이터 저장
    } catch (err) {
      console.error('Error fetching contacts:', err);
      setError('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>연락처 리스트</Text>
      <FlatList
        data={contacts}  // 데이터를 contacts 상태로 변경
        keyExtractor={(item, index) => item.contactId.toString()}  // contactId를 key로 사용
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>이름: {item.contactName}</Text>
            <Text style={styles.text}>ID: {item.contactId}</Text>
            {/*<Text style={styles.text}>카테고리: {item.contactCategoryList.join(', ')}</Text> {/* 배열을 쉼표로 구분하여 표시 */} 
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

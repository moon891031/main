import React from 'react';
import { View, Text, FlatList, SectionList, StyleSheet } from 'react-native';

// 날짜 계산 함수 (오늘, 어제, 특정 날짜)
const getFormattedDate = (dateString) => {
  const date = new Date(dateString);

  // 유효하지 않은 날짜 값일 경우 'Invalid Date' 방지
  if (isNaN(date)) {
    return '잘못된 날짜';
  }

  const currentDate = new Date();
  const today = currentDate.toDateString();
  const yesterday = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000).toDateString(); // 어제 날짜 계산

  // 날짜 비교
  if (date.toDateString() === today) {
    return '오늘';
  } else if (date.toDateString() === yesterday) {
    return '어제';
  } else {
    // "YYYY-MM-DD" 형식으로 반환 (예: "2025-03-06")
    return date.toISOString().split('T')[0];
  }
};

// 통화 기록 데이터 예시
const callHistory = [
  { id: '1', name: 'John Doe', phone: '123-4567', date: '2025-03-07T14:00:00Z' },
  { id: '2', name: 'Jane Smith', phone: '987-6543', date: '2025-03-06T10:00:00Z' },
  { id: '3', name: 'Michael Johnson', phone: '555-5555', date: '2025-03-05T08:00:00Z' },
  { id: '4', name: 'moon', phone: '555-445', date: '2025-03-07T08:00:00Z' },
];

// 날짜 기준으로 내림차순 정렬
const sortedCallHistory = callHistory.sort((a, b) => new Date(b.date) - new Date(a.date));

// 날짜별로 그룹화하기
const groupedData = sortedCallHistory.reduce((acc, item) => {
  const formattedDate = getFormattedDate(item.date);
  if (!acc[formattedDate]) {
    acc[formattedDate] = [];
  }
  acc[formattedDate].push(item);
  return acc;
}, {});

// 그룹화된 데이터를 배열로 변환
const sectionData = Object.keys(groupedData).map((key) => ({
  title: key,
  data: groupedData[key],
}));

const CallLogScreen = () => {
  return (
    <SectionList
      sections={sectionData}  // 그룹화된 데이터를 사용
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text style={styles.contactPhone}>{item.phone}</Text>
          <Text style={styles.callDate}>{getFormattedDate(item.date)}</Text>
        </View>
      )}
      renderSectionHeader={({ section }) => (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactPhone: {
    fontSize: 14,
    color: '#888',
  },
  callDate: {
    fontSize: 12,
    color: '#777',
  },
  sectionHeader: {
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CallLogScreen;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ContactDetailScreen = ({ route }) => {
  const { contact } = route.params; // 전달된 contact 정보

  return (
    <View style={styles.container}>
      <Text style={styles.title}>연락처 상세 정보</Text>
      <Text style={styles.contactName}>{contact.name}</Text>
      <Text style={styles.contactPhone}>{contact.phone}</Text>
      {/* 여기에 더 많은 상세 정보를 추가할 수 있습니다 */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
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
  contactName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  contactPhone: {
    fontSize: 18,
    color: 'gray',
  },
});

export default ContactDetailScreen;
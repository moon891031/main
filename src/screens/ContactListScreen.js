import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Hangul from 'hangul-js';

// 샘플 연락처 데이터
const contacts = [
  { name: '홍길동', phone: '010-1234-5678' },
  { name: '김철수', phone: '010-2345-6789' },
  { name: '홍기도', phone: '010-1254-5678' },
  { name: '기철수', phone: '010-2365-6789' },
  { name: '박영희', phone: '010-3456-7890' },
  { name: '이민호', phone: '010-4567-8901' },
  { name: '최지우', phone: '010-5678-9012' },
];

const sortContactsByInitial = (contactList) => {
  return contactList.sort((a, b) => {
    const aChosung = Hangul.disassemble(a.name[0])[0];
    const bChosung = Hangul.disassemble(b.name[0])[0];
    return aChosung.localeCompare(bChosung);
  });
};

const ContactListScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(sortContactsByInitial(contacts));

  const handleContactPress = (contact) => {
    navigation.navigate('ContactDetail', { contact });
  };

  const handleSearch = (text) => {
    setSearch(text);
    const isChosungOnly = /^[ㄱ-ㅎ]+$/.test(text);

    if (text === '') {
      setFilteredContacts(sortContactsByInitial(contacts));
      return;
    }

    if (isChosungOnly) {
      const searchChosung = text;
      const filtered = contacts.filter((contact) => {
        const nameChosung = contact.name
          .split('')
          .map((char) => Hangul.isHangul(char) ? Hangul.disassemble(char)[0] : '')
          .filter((char) => Hangul.isConsonant(char))
          .join('');
        return nameChosung.includes(searchChosung);
      });
      setFilteredContacts(sortContactsByInitial(filtered));
    } else {
      const filtered = contacts.filter((contact) => contact.name.includes(text));
      setFilteredContacts(sortContactsByInitial(filtered));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>연락처</Text>
        
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="이름 검색 (초성 가능)..."
        value={search}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.phone}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleContactPress(item)}>
            <View style={styles.contactItem}>
              <Text style={styles.contactName}>{item.name}</Text>
              <Text style={styles.contactPhone}>{item.phone}</Text>
              <View style={styles.textContainer}>
                <Text style={styles.textBox}>그룹1</Text>
                <Text style={styles.textBox}>그룹2</Text>
                <Text style={styles.textBox}>그룹3</Text>
                <Text style={styles.textBox}>그룹4</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  contactItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactPhone: {
    fontSize: 14,
    color: 'gray',
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
  },
  textBox: {
    fontSize: 12,
    color: '#333',
    width: '22%',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 5,
  },
});

export default ContactListScreen;

import React, { useState } from 'react';
import { View, Text, Image,TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // FontAwesome 아이콘 세트 사용
import { Checkbox } from 'react-native-paper';
import { Alert } from 'react-native';

const LayoutScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
          <View style={styles.item}><Text>Item 1</Text></View>
          <View style={styles.item}><Text>Item 2</Text></View>
          <View style={styles.item}><Text>Item 3</Text></View>
          <View style={styles.item}><Text>Item 4</Text></View>
          <View style={styles.item}><Text>Item 5</Text></View>
          <View style={styles.item}><Text>Item 6</Text></View>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flexDirection:'column-reverse',      // 가로로 배치
          // 여러 줄로 나누어 배치
        justifyContent:'center',
        alignSelf:'center',
        height: '80%',               // 높이 설정
        backgroundColor: '#f0f0f0',
      },
      item: {
        width: 50,
        height: 50,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
      }
    });
export default LayoutScreen;

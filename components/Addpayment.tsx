import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface paymentProps {
  title: string;
  price: number;
  currency: string;
  offers: string[];
}

export default function Addpayment(props: paymentProps) {
  return (
    <View>
      
      <Text style={styles.title}>{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
title:{
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 5,
  backgroundColor: 'yellow',
  display: 'flex',
  justifyContent: 'center',
},

})
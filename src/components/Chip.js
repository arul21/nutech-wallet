import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {convertToIdr} from '../helpers';

const Chip = ({amount, onSelect}) => {
  return (
    <TouchableOpacity onPress={() => onSelect(amount)} style={styles.container}>
      <Text style={[styles.amount]}>Rp{convertToIdr(amount)}</Text>
    </TouchableOpacity>
  );
};

export default Chip;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    elevation: 20,
    shadowColor: '#52006A',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
  },
});

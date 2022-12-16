import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ScanQR = () => {
  return (
    <View style={styles.container}>
      <Text>Cooming soon</Text>
    </View>
  );
};

export default ScanQR;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

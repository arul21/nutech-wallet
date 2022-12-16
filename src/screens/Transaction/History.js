import React, {useCallback, useEffect} from 'react';
import {StyleSheet, FlatList, View, Text, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {TransactionItem} from '../../components';
import {getTransactionRequest} from '../../Store/actions';
import {noData} from '../../Assets/images';

const History = () => {
  const dispatch = useDispatch();
  const {data} = useSelector(state => state?.TransactionHistory);
  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = () => {
    try {
      dispatch(getTransactionRequest());
    } catch (error) {
      console.log(error);
    }
  };
  const renderItem = useCallback(
    ({item}) => <TransactionItem data={item} />,
    [],
  );

  const keyExtractor = useCallback(item => item?.transaction_id);

  const renderEmpty = () => (
    <View style={styles.empty}>
      <Image source={{uri: noData}} resizeMode="contain" style={styles.logo} />
      <Text>Belum ada riwayat transaksi</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      maxToRenderPerBatch={8}
      style={styles.container}
      ListEmptyComponent={renderEmpty}
    />
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
    flex: 1,
  },
  empty: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 70,
    height: 70,
    paddingVertical: 50,
    // paddingTop: 30,
  },
});

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';
import 'moment/locale/id';
moment.locale('id');

const TransactionItem = ({data}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={{textTransform: 'capitalize', fontSize: 18}}>
          {data?.transaction_type}
        </Text>
        <Text style={{fontSize: 12}}>
          {moment(data?.transaction_time).format('LL')}
        </Text>
      </View>
      <Text>Rp. {data?.amount}</Text>
    </View>
  );
};

export default TransactionItem;

TransactionItem.propTypes = {
  data: PropTypes.object,
};

TransactionItem.defaultProps = {
  data: {},
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    paddingBottom: 10,
    borderBottomColor: 'grey',
  },
});

import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import {Chip} from '../../components';
import {transferBalanceRequest} from '../../Store/actions';
import {convertToIdr} from '../../helpers';

const amounts = [
  {
    amount: 50000,
  },
  {
    amount: 100000,
  },
  {
    amount: 200000,
  },
];

const Transfer = ({navigation}) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [isMinimun, setIsMin] = useState(true);
  const [isMax, setMax] = useState(false);

  const {data, isLoading} = useSelector(state => state?.Balance);

  useEffect(() => {
    if (Number(amount) < 1000) {
      setIsMin(true);
    } else {
      setIsMin(false);
    }

    if (Number(amount) > data) {
      setMax(true);
    } else {
      setMax(false);
    }
  }, [amount]);

  const onChange = val => {
    setAmount(val);
  };

  const onSelect = val => {
    setAmount(val.toString());
  };

  const onTransfer = () => {
    try {
      dispatch(
        transferBalanceRequest(Number(amount), callBack => {
          const {status, data} = callBack;
          if (status === 200) {
            toast.show(`Sukses transfer Rp.${convertToIdr(amount)} 🥳`, {
              duration: 1000,
              animationType: 'zoom-in',
              type: 'success',
            });
            setAmount(0);
            setTimeout(() => {
              navigation.goBack();
            }, 2000);
          } else {
            toast.show(`${data?.message}`, {
              duration: 1000,
              animationType: 'zoom-in',
              type: 'danger',
            });
          }
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const confirmTransfer = () =>
    Alert.alert(
      'Konfirmasi Transfer',
      `Anda melakukan transfer sebesar Rp.${convertToIdr(amount)}`,
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {text: 'Transfer', onPress: () => onTransfer()},
      ],
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pilih Nominal Transfer</Text>
      <View style={styles.chipSection}>
        {amounts.map((item, i) => (
          <Chip key={i} amount={item?.amount} onSelect={onSelect} />
        ))}
      </View>
      <View style={{paddingTop: 30, paddingBottom: 5}}>
        <Text>Atau masukkan nominal transfer di sini</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        value={amount}
        placeholder="Nominal"
        keyboardType="number-pad"
      />
      {isMinimun && (
        <Text style={{fontSize: 12}}>Minimum transfer Rp.1000</Text>
      )}
      {isMax && (
        <Text style={{fontSize: 12, color: 'red'}}>Saldo anda tidak cukup</Text>
      )}
      <TouchableOpacity
        disabled={isMinimun || isMax}
        style={[
          styles.topup,
          {backgroundColor: !isMinimun && !isMax ? 'red' : 'gray'},
        ]}
        onPress={confirmTransfer}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
            Transfer
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Transfer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  chipSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  input: {
    height: 50,
    padding: 10,
    textAlign: 'left',
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'stretch',
    fontSize: 18,
  },
  topup: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
});

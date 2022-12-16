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
import {addBalanceRequest} from '../../Store/actions';
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

const Topup = ({navigation}) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('');
  const [isMinimun, setIsMin] = useState(true);
  const {isLoading} = useSelector(state => state?.Balance);

  useEffect(() => {
    if (Number(amount) < 1000) {
      setIsMin(true);
    } else {
      setIsMin(false);
    }
  }, [amount]);

  const onChange = val => {
    setAmount(val);
  };

  const onSelect = val => {
    setAmount(val.toString());
  };

  const onTopup = () => {
    try {
      dispatch(
        addBalanceRequest(Number(amount), callBack => {
          const {status, data} = callBack;
          if (status === 200) {
            toast.show(`Sukses topup Rp.${convertToIdr(amount)} 🥳`, {
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

  const confirmTopUp = () =>
    Alert.alert(
      'Konfirmasi Topup',
      `Anda melakukan topup sebesar Rp.${convertToIdr(amount)}`,
      [
        {
          text: 'Batal',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'TopUp', onPress: () => onTopup()},
      ],
    );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pilih Nominal Top Up</Text>
      <View style={styles.chipSection}>
        {amounts.map((item, i) => (
          <Chip key={i} amount={item?.amount} onSelect={onSelect} />
        ))}
      </View>
      <View style={{paddingTop: 30, paddingBottom: 5}}>
        <Text>Atau masukkan nominal top up di sini</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        value={amount}
        placeholder="Nominal"
        keyboardType="number-pad"
      />
      {isMinimun && <Text style={{fontSize: 12}}>Minimum topup Rp.1000</Text>}
      <TouchableOpacity
        disabled={isMinimun}
        style={[styles.topup, {backgroundColor: !isMinimun ? 'red' : 'gray'}]}
        onPress={confirmTopUp}>
        <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
              Top Up
            </Text>
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Topup;

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

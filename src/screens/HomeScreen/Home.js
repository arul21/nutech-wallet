import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import LinearGradient from 'react-native-linear-gradient';
import IconNew from 'react-native-vector-icons/AntDesign';
import {TransactionItem} from '../../components';
import Eye from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import {
  getBalanceRequest,
  getTransactionRequest,
  getProfileRequest,
} from '../../Store/actions';
import {convertToIdr} from '../../helpers';
import {noData} from '../../Assets/images';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const [hide, setHide] = useState(false);
  const {
    User,
    Balance,
    TransactionHistory: {data},
  } = useSelector(state => state);

  useEffect(() => {
    getBalance();
  }, []);

  const getBalance = () => {
    try {
      dispatch(getBalanceRequest());
      dispatch(getTransactionRequest());
      dispatch(getProfileRequest());
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = route => {
    navigation.navigate(route);
  };

  const showBalance = () => {
    setHide(!hide);
  };

  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 20}}>
        <View style={styles.headSection}>
          <Text style={{fontSize: 30}}>
            Hy, {User?.data?.first_name} {User?.data?.last_name}
          </Text>
          <TouchableOpacity
            style={styles.avatar}
            onPress={() => navigate('Profile')}>
            <Icon name="user" size={45} color="white" />
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={['red', 'white']}
          style={styles.balanceCard}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 4}}>
          <Text style={{fontSize: 18, color: 'white'}} onPress={showBalance}>
            Total Saldo{' '}
            <Eye
              name={!hide ? 'eye-with-line' : 'eye'}
              size={14}
              color="white"
            />
          </Text>
          <View style={{flexDirection: 'row'}}>
            {hide ? (
              <Text
                style={[styles.balanceText, {fontSize: 28}]}
                onPress={showBalance}>
                Tap untuk lihat
              </Text>
            ) : (
              <>
                <Text style={styles.balanceText}>Rp </Text>
                <Text
                  style={[styles.balanceText, {fontSize: 28}]}
                  onPress={showBalance}>
                  {convertToIdr(Balance?.data)}
                </Text>
              </>
            )}
          </View>
        </LinearGradient>
        <View style={styles.actionSection}>
          <TouchableOpacity
            style={[styles.icon, styles.elevation]}
            onPress={() => navigate('Topup')}>
            <IconNew name="pluscircleo" size={30} color="black" />
            <Text style={styles.menu}>Top Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.icon, styles.elevation]}
            onPress={() => navigate('Transfer')}>
            <IconNew name="swap" size={30} color="black" />
            <Text style={styles.menu}>Transfer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.icon, styles.elevation]}
            onPress={() => navigate('History')}>
            <IconNew name="switcher" size={30} color="black" />
            <Text style={styles.menu}>Riwayat</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.lastTransationSection}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 0.3,
            paddingHorizontal: 20,
            paddingVertical: 18,
            borderBottomColor: 'gray',
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            Transaksi Terakhir
          </Text>
          <Text
            style={{fontSize: 13, color: '#81C2FF'}}
            onPress={() => navigate('History')}>
            Lihat Semua
          </Text>
        </View>
        <View style={styles.itemTrx}>
          {data ? (
            data
              .slice(0, 3)
              .map(item => (
                <TransactionItem data={item} key={item?.transaction_id} />
              ))
          ) : (
            <View style={{alignItems: 'center'}}>
              <Image
                source={{uri: noData}}
                resizeMode="contain"
                style={styles.logo}
              />
              <Text>Belum ada riwayat transaksi</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  headSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: 'gray',
    borderRadius: 150,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  balanceCard: {
    marginTop: 30,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 35,
  },
  balanceText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  actionSection: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 40,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 85,
    height: 85,
    backgroundColor: 'white',
    borderRadius: 20,
    // paddingVertical: 5,
  },
  elevation: {
    elevation: 20,
    shadowColor: '#52006A',
  },
  lastTransationSection: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  itemTrx: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  menu: {
    marginTop: 5,
  },
  logo: {
    width: 70,
    height: 70,
    paddingVertical: 60,
    // paddingTop: 30,
  },
});

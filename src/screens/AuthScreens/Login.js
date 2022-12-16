import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {logo} from '../../Assets/images';
import {authLoginRequest, authRegisterRequest} from '../../Store/actions';
import {useToast} from 'react-native-toast-notifications';

// Todo Validation form
const Login = ({navigation}) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    // email: 'john@mail.com',
    // password: 'kodok',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });
  const [anim, setAnim] = useState(new Animated.Value(0));
  const [isRegister, setIsRegis] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailValidError, setEmailValidError] = useState('');

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 3000,
      duration: 3000,
      useNativeDriver: true,
    }).start();
    return () => {
      fadeIn(700, -120);
    };
  }, []);

  const onChange = (name, value) => {
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleValidEmail = val => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (val.length === 0) {
      setEmailValidError('Email wajib di isi');
    } else if (reg.test(val) === false) {
      setEmailValidError('Format email salah');
    } else if (reg.test(val) === true) {
      setEmailValidError('');
    }
  };

  const fadeIn = (delay, from = 0) => {
    return {
      opacity: anim.interpolate({
        inputRange: [delay, Math.min(delay + 500, 3000)],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      transform: [
        {
          translateY: anim.interpolate({
            inputRange: [delay, Math.min(delay + 500, 3000)],
            outputRange: [from, 0],
            extrapolate: 'clamp',
          }),
        },
      ],
    };
  };

  const onSubmit = type => {
    setLoading(true);
    const {email, password, first_name, last_name} = state;
    if (type === 'login') {
      try {
        dispatch(
          authLoginRequest({email, password}, callBack => {
            const {status, data} = callBack;
            if (status === 200) {
              toast.show('Login sukses 🥳', {
                duration: 1000,
                animationType: 'zoom-in',
                type: 'success',
              });
              setLoading(false);
            } else {
              toast.show(`${data?.message}`, {
                duration: 1000,
                animationType: 'zoom-in',
                type: 'danger',
              });
              setLoading(false);
            }
          }),
        );
      } catch (error) {
        setLoading(false);
        console.log('error', error);
      }
    } else {
      try {
        dispatch(
          authRegisterRequest(state, callBack => {
            const {status, data} = callBack;
            if (status === 200) {
              toast.show('Registrasi berhasil, silahkan login', {
                duration: 1000,
                animationType: 'zoom-in',
                type: 'success',
              });
              setLoading(false);
              setIsRegis(!isRegister);
              setState({});
            } else {
              toast.show(`${data?.message}`, {
                duration: 1000,
                animationType: 'zoom-in',
                type: 'danger',
              });
              setLoading(false);
            }
          }),
        );
      } catch (error) {
        setLoading(false);
        console.log('error', error);
      }
    }
  };

  const isDisabled = !isRegister
    ? state?.email === '' || state?.password === '' || emailValidError !== ''
    : state?.email === '' ||
      state?.password === '' ||
      emailValidError !== '' ||
      state.first_name === '' ||
      state.last_name === '';

  return (
    <ScrollView
      style={{
        flex: 1,
      }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
      }}>
      <View style={styles.container}>
        <Image source={{uri: logo}} resizeMode="contain" style={styles.logo} />
        <Text style={styles.headerText}>
          {isRegister
            ? `Segera rasakan kemudahan bertransaksi hanya dengan mendaftar`
            : 'Welcome back to Nutech Wallet'}
        </Text>
        <Animated.View style={[styles.middle, fadeIn(700, -120)]}>
          {isRegister && (
            <>
              <TextInput
                style={styles.input}
                onChangeText={val => onChange('first_name', val)}
                value={state?.first_name}
                placeholder="Nama Depan"
              />
              <TextInput
                style={styles.input}
                onChangeText={val => onChange('last_name', val)}
                value={state?.last_name}
                placeholder="Nama Belakang"
              />
            </>
          )}
          <TextInput
            style={styles.input}
            onChangeText={val => {
              onChange('email', val);
              handleValidEmail(val);
            }}
            value={state?.email}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {emailValidError ? (
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 10, color: 'red'}}>
                {emailValidError}
              </Text>
            </View>
          ) : null}
          <TextInput
            style={styles.input}
            onChangeText={val => onChange('password', val)}
            value={state?.password}
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
          />
          <TouchableOpacity
            disabled={loading || isDisabled}
            style={[
              styles.loginButton,
              {backgroundColor: loading || isDisabled ? 'gray' : 'red'},
            ]}
            onPress={() => onSubmit(isRegister ? 'register' : 'login')}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
                {' '}
                {!isRegister ? ' Masuk' : ' Daftar'}
              </Text>
            )}
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 14, color: '#BDBDBD'}}>{`${
              !isRegister ? 'Belum Punya Akun?' : 'Sudah Punya Akun?'
            }`}</Text>
            <Text
              style={{fontSize: 14, color: '#81C2FF'}}
              onPress={() => {
                setIsRegis(!isRegister);
                setState({});
              }}>
              {isRegister ? ' Masuk' : ' Daftar'}
            </Text>
          </View>
        </Animated.View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    // justifyContent: 'space-around',
  },
  logo: {
    width: 200,
    height: 100,
    paddingVertical: 100,
  },
  input: {
    height: 50,
    marginTop: 12,
    padding: 10,
    textAlign: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 15,
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: 'red',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 15,
  },
  middle: {
    flex: 2,
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    paddingHorizontal: 20,
  },
  headerText: {
    paddingHorizontal: 20,
    fontSize: 18,
    textAlign: 'center',
    // marginTop: 10,
    fontWeight: 'bold',
  },
  inner: {
    padding: 24,
    flex: 1,
    // justifyContent: 'space-around',
  },
});

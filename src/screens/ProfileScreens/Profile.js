import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import {useToast} from 'react-native-toast-notifications';
import {useDispatch, useSelector} from 'react-redux';
import {
  getProfileRequest,
  updateProfileRequest,
  authLogout,
} from '../../Store/actions';

const Profile = ({navigation}) => {
  const dispatch = useDispatch();
  const [isUpdate, setUpdate] = useState(false);
  const toast = useToast();

  const {
    User: {data},
  } = useSelector(state => state);
  const [state, setState] = useState(data);
  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    try {
      dispatch(getProfileRequest());
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = route => {
    navigation.navigate(route);
  };

  const onChange = (name, value) => {
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const logout = () => {
    try {
      dispatch(authLogout());
    } catch (error) {
      console.log(error);
    }
  };

  const onSaveUpdate = () => {
    const {first_name, last_name} = state;
    try {
      dispatch(
        updateProfileRequest({first_name, last_name}, callBack => {
          const {status, data} = callBack;
          if (status === 200) {
            toast.show('Sukses update 🥳', {
              duration: 1000,
              animationType: 'zoom-in',
              type: 'success',
            });
            setUpdate(false);
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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.avatar}
        onPress={() => navigate('Profile')}>
        <Icon name="user" size={100} color="white" />
      </TouchableOpacity>
      {isUpdate ? (
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

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={[styles.button]} onPress={onSaveUpdate}>
              <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
                Simpan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setUpdate(false)}
              style={[
                styles.button,
                {backgroundColor: 'grey', marginLeft: 30},
              ]}>
              <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
                Batal
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 22}}>
            Hy, {state?.first_name} {state?.last_name}{' '}
          </Text>
          <Text style={{fontSize: 18}}>{state?.email}</Text>
          <View style={{marginTop: 40}}>
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => setUpdate(true)}>
              <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={logout}
              style={[styles.button, {backgroundColor: 'grey'}]}>
              <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>
                Keluar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  input: {
    height: 50,
    marginBottom: 12,
    padding: 10,
    textAlign: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 15,
    alignSelf: 'stretch',
  },
  avatar: {
    backgroundColor: 'gray',
    borderRadius: 150,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    marginBottom: 50,
  },
  button: {
    marginTop: 20,
    backgroundColor: 'red',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 30,
  },
});

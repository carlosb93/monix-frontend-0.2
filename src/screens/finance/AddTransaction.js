import React, {useState} from 'react';
import {Text, StyleSheet, TextInput} from 'react-native';
// import {Container, Button, Content, Form, Item, Input} from 'native-base';
import {ListItem, CheckBox} from 'react-native-elements';
// import {addTransaction} from '../store/actions/transactionAction';
// import {useDispatch} from 'react-redux';
// import { TextInput } from 'react-native-gesture-handler';

const AddTransaction = () => {
  // const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  const onSubmit = () => {
    if (!title || !price) {
      return alert('Please fill all fields');
    }

    const id = Math.floor(Math.random() * 100000000);

    const newTransaction = {
      id,
      title,
      price: +price,
    };

    dispatch(addTransaction({...newTransaction}));
  };

  return (
    <View>
      <View>
        
          <View style={{...styles.item}}>
            <TextInput
              placeholder="Expense Title"
              onChangeText={(title) => setTitle(title)}
            />
          </View>
          <View style={{...styles.item}}>
            <TextInput
              keyboardType="number-pad"
              placeholder="Expense Price"
              onChangeText={(price) => setPrice(price)}
              onSubmitEditing={onSubmit}
            />
          </View>
          <Button block onPress={onSubmit} style={{marginHorizontal: 20}}>
            <Text style={{color: '#fff', fontWeight: '700', fontSize: 16}}>
              Add Transaction
            </Text>
          </Button>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginVertical: 20,
  },
});

export default AddTransaction;

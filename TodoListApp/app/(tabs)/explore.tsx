import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};

const App = () => (
  <View style={styles.container}>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <Text style={styles.text}> Welcome to {"\n"} <Text>REACT NATIVE</Text>
      </Text>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 30,
    lineHeight: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'red',
  },
});

export default App;
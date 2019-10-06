import React, { useState, useEffect } from 'react';
import { Image, Text, TouchableOpacity, SafeAreaView, ScrollView, AsyncStorage, StyleSheet } from 'react-native';

import SpotList from '../components/SpotList'

import logo from '../assets/logo.png'

export default function List({ navigation }) {
  const [techs, setTechs] = useState([]);

  useEffect(()=>{
    AsyncStorage.getItem('techs').then(storageTechs=>{
      const techsArray = storageTechs
      .split(',')
      .map(tech=> tech.trim());
    setTechs(techsArray);
    })
  }, []);
  function deslogar(){
    AsyncStorage.removeItem('user')
    navigation.navigate('Login');
  }
  return(
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo}/>

      <ScrollView>
        {techs.map(tech=> <SpotList key={tech} tech={tech} />)}
      </ScrollView>
      <TouchableOpacity onPress={deslogar} style={styles.button}>
        <Text style={styles.buttonText}>Deslogar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 40,
  },

  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
});
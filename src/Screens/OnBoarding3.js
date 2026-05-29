// OnBoarding3.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { AntDesign, Feather } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from "../Colors.json";

export default function OnBoarding3({ navigation }) {
  const [nome, setNome] = useState('');

  async function salvarNome() {
    if (nome.trim() === '') {
      Alert.alert('Atenção', 'Digite seu nome.');
      return;
    }

    try {
      // salva em formato JSON
      const usuario = {
        nome: nome,
      };

      await AsyncStorage.setItem(
        '@usuario',
        JSON.stringify(usuario)
      );

      Alert.alert('Sucesso', 'Nome salvo com sucesso!');

      // navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>

      {/* TOPO */}
      <View style={styles.topArea}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign
                        name="arrow-left"
                        size={22}
                        color={Colors.colors.azulEscuro}
                    />
                </TouchableOpacity>
                <Text style={styles.introduction}>Introdução</Text>
            </View>

      {/* TITULO */}
      <View style={styles.titleArea}>
        <Text style={styles.title}>
            Como devemos
        </Text>

        <Text style={styles.subtitle}>
            chamar você?
        </Text>
      </View>

      {/* IMAGEM */}
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/3145/3145765.png',
        }}
        style={styles.image}
        resizeMode="contain"
      />

      {/* INPUT */}
      <View style={styles.inputArea}>
        <Text style={styles.label}>
          YOUR FIRST NAME
        </Text>

        <TextInput
          placeholder="e.g. Julian"
          placeholderTextColor="#B8B8B8"
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.helperText}>
          We use this to personalize your reading lists.
        </Text>
      </View>

      {/* BOTÃO */}
      <TouchableOpacity
        style={styles.button}
        onPress={salvarNome}
      >
        <Text style={styles.buttonText}>
          Start Exploring
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFFED',
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  topArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  back: {
    fontSize: 24,
    color: '#415470',
  },

  introduction: {
    fontSize: 11,
    letterSpacing: 2,
    color: '#415470',
  },

  titleArea: {
    marginTop: 40,
  },

  title: {
    fontSize: 45,
    color: '#222',
    fontFamily: 'serif',
  },

  subtitle: {
    fontSize: 48,
    color: '#B0BBD6',
    fontStyle: 'italic',
    fontFamily: 'serif',
    marginTop: -5,
  },

  image: {
    width: 180,
    height: 180,
    alignSelf: 'center',
    marginTop: 40,
  },

  inputArea: {
    marginTop: 40,
  },

  label: {
    fontSize: 11,
    letterSpacing: 2,
    color: '#415470',
    marginBottom: 10,
    fontWeight: '600',
  },

  input: {
    width: '100%',
    height: 58,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 18,
    fontSize: 18,
    color: '#415470',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  helperText: {
    marginTop: 12,
    color: '#8B8B8B',
    fontSize: 13,
    fontStyle: 'italic',
  },

  button: {
    width: '100%',
    height: 58,
    backgroundColor: '#2C2C2C',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    marginHorizontal: 20,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
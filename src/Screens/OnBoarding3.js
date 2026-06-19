

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
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../Colors.json";
import Card from "../../assets/OnBoarding/CardOnBoarding.jpg"

export default function OnBoarding3({ navigation }) {
  const [nome, setNome] = useState('');

  async function salvarNome() {
    if (nome.trim() === '') {
      Alert.alert('Atenção', 'Digite seu nome.');
      return;
    }

    try {
      const usuario = {
        nome: nome,
      };

      await AsyncStorage.setItem(
        '@usuario',
        JSON.stringify(usuario)
      );
      navigation.navigate('TelaInicial');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>

      {/* TOPO */}
      <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign
                        name="arrow-left"
                        size={22}
                        color={Colors.colors.azulEscuro}
                    />
                </TouchableOpacity>
                <Text style={styles.stepText}>Introdução</Text>
            </View>

      {/* TITULO */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Como devemos</Text>
        <Text style={[styles.title, styles.titleItalic]}>chamar você?</Text>
      </View>

      {/* IMAGEM */}
      <View style={styles.imageContainer}>
        <Image source={Card} style={styles.image} />
      </View>

      {/* INPUT */}
      <View style={styles.inputArea}>
        <Text style={styles.label}>
          INFORME SEU NOME
        </Text>

        <TextInput
          placeholder="Ex: Felipe"
          placeholderTextColor="#B8B8B8"
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.helperText}>
          Nós usamos isso para personalizar sua experiência.
        </Text>
      </View>

      {/* BOTÃO */}
      <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={salvarNome}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              Continuar
            </Text>
          </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colors.offWhite,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  stepText: {
    fontSize: 11,
    color: Colors.colors.azulMedio,
    fontWeight: "600",
    letterSpacing: 1.5,
  },
  titleContainer: {
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 15,
    },
    title: {
        fontSize: 28,
        color: Colors.colors.azulEscuro,
        fontWeight: "700",
        lineHeight: 34,
    },
    titleItalic: {
        fontStyle: "italic",
        fontWeight: "400",
        color: Colors.colors.azulMedio,
    },
     imageContainer: {
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 15,
        paddingTop: 5,
    },
    image: {
        width: 380,
        height: 240,
        borderRadius: 16,
        resizeMode: "cover",
    },
  inputArea: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  label: {
    fontSize: 11,
    letterSpacing: 1.5,
    color: Colors.colors.azulEscuro,
    marginBottom: 10,
    fontWeight: '700',
  },
  input: {
    width: '100%',
    height: 56,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 18,
    fontSize: 16,
    color: Colors.colors.azulEscuro,
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
  },
  helperText: {
    marginTop: 8,
    color: Colors.colors.azulMedio,
    fontSize: 13,
    fontStyle: 'italic',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    paddingHorizontal: 30,
  },
  button: {
    backgroundColor: Colors.colors.azulEscuro,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.colors.offWhite,
    fontSize: 17,
    fontWeight: "600",
  },
});

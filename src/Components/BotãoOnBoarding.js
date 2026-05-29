import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '../Colors.json';
import { AntDesign } from '@expo/vector-icons';

const Botao = ({ texto, onPress }) => {
    return (
        <TouchableOpacity style={styles.botao} onPress={onPress}>
            <Text style={styles.texto}>{texto}</Text>
            <AntDesign style={styles.icone} name="arrow-right" size={24} color={Colors.colors.offWhite} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    botao: {
        backgroundColor: Colors.colors.azulEscuro,
        zIndex: 1,
        position: "absolute",
        top: "90%",
        marginHorizontal: "15%",
        width: "70%",
        height: "5%",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    texto: {
        color: Colors.colors.offWhite,
        fontSize: 20,
        fontFamily: 'Inter_700Bold',
        textAlign: 'center',
    },
    icone: {
        position: 'absolute',
        right: 15,
    }
});

export default Botao;
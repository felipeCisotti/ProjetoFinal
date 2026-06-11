import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../Colors.json";
import { EvilIcons } from "@expo/vector-icons";
import CardIndicações from "../Components/CardIndicacoes";
import CardLivros from "../Components/CardLivros";

const TelaInicial = () => {
    const [nome, setNome] = useState("");
    const isFocused = useIsFocused();
    const [pesquisa, setPesquisa] = useState("");

    useEffect(() => {
        async function carregarUsuario() {
            try {
                const value = await AsyncStorage.getItem("@usuario");
                if (value !== null) {
                    const userObj = JSON.parse(value);
                    setNome(userObj.nome || "");
                }
            } catch (e) {
                console.log("Erro ao carregar usuário:", e);
            }
        }

        if (isFocused) {
            carregarUsuario();
        }
    }, [isFocused]);

    const obterDataFormatada = () => {
        const diasSemana = [
            "DOMINGO",
            "SEGUNDA",
            "TERÇA",
            "QUARTA",
            "QUINTA",
            "SEXTA",
            "SÁBADO",
        ];
        const meses = [
            "JAN.",
            "FEV.",
            "MAR.",
            "ABR.",
            "MAIO",
            "JUN.",
            "JUL.",
            "AGO.",
            "SET.",
            "OUT.",
            "NOV.",
            "DEZ.",
        ];

        const data = new Date();
        const diaSemana = diasSemana[data.getDay()];
        const dia = data.getDate();
        const mes = meses[data.getMonth()];

        return `${diaSemana}, ${dia} DE ${mes}`;
    };

    const obterSaudacao = () => {
        const hora = new Date().getHours();
        if (hora >= 5 && hora < 12) {
            return "Bom dia";
        } else if (hora >= 12 && hora < 18) {
            return "Boa tarde";
        } else {
            return "Boa noite";
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.dateText}>{obterDataFormatada()}</Text>
                    <Text style={styles.saudacao}>
                        {obterSaudacao()}, <Text style={styles.nome}>{nome}</Text>
                    </Text>
                </View>

                <View style={styles.inputBook}>
                    <EvilIcons name="search" style={styles.searchIcon} size={30} color={Colors.colors.azulEscuro} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Procure Livros, Autores e Generos..."
                        placeholderTextColor="#9CABB7"
                        value={pesquisa}
                        onChangeText={setPesquisa}
                    />
                </View>

                <View style={styles.indicacao}>
                    <CardIndicações />
                </View>

                <View style={styles.Secao2}>
                    <View style={styles.TituloSecao}>
                        <Text style={styles.SecaoTitle}>Para suas manhãs</Text>
                        <Text style={styles.SecaoTitleItalic}>Ver Todos </Text>
                    </View>
                    <View style={styles.Separacao}></View>

                    <View style={styles.containerLivros}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <CardLivros
                                key={livro.id}
                                id={livro.id}
                                titulo={livro.Titulo}
                                autor={livro.Autor}
                                capa={livro.Imagem}
                                navigar={navigarParaDetalhesLivro}
                            />
                        </ScrollView>
                        
                    </View>
                </View>

                

               

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.colors.offWhite,
    },
    scrollContent: {
        paddingBottom: 30,
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 20,
        marginBottom: 24,
    },
    dateText: {
        fontSize: 12,
        color: Colors.colors.azulMedio,
        fontWeight: "600",
        letterSpacing: 1.5,
        textTransform: "uppercase",
        marginBottom: 6,
    },
    saudacao: {
        fontSize: 32,
        color: Colors.colors.azulEscuro,
        fontFamily: "serif",
        lineHeight: 38,
    },
    nome: {
        fontStyle: "italic",
    },
    inputBook: {
    backgroundColor: "#fff",
    marginHorizontal: 24,
    height: 54,
    borderRadius: 27,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5E5",

    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,

    marginBottom: 28,
},
    searchInput: {
        flex: 1,
        paddingVertical: 10,
        paddingRight: 20,
        fontSize: 16,
        fontWeight: "400",
        color: Colors.colors.azulEscuro,
    },
    searchIcon: {
        marginRight: 8,
        marginLeft: 18,
    },
    indicacao: {
        marginHorizontal: 24,
    },
    Secao2: {
        marginTop: 10,
        marginHorizontal: 24,
        padding: 12,
    },
    TituloSecao:{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    SecaoTitle: {
        fontSize: 20,
        fontWeight: "500",
        color: Colors.colors.azulEscuro,
        fontFamily: "serif",
    },
    SecaoTitleItalic: {
        fontSize: 14,
        fontWeight: "500",
        color: Colors.colors.azulEscuro,
        fontFamily: "serif",
        fontStyle: "italic",
        textDecorationLine: "underline",
    },
    Separacao:{
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.colors.azulEscuro,
        width: '110%',
        alignSelf: 'center',
        marginHorizontal: 24,
    }
});

export default TelaInicial;


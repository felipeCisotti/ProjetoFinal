import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../Colors.json";
import { EvilIcons, MaterialIcons } from "@expo/vector-icons";
import CardIndicações from "../Components/CardIndicacoes";
import CardLivros from "../Components/CardLivros";
import LivrosData from "../LivrosCard.js";
import { useNavigation } from "@react-navigation/native";

const TelaInicial = () => {
    const [nome, setNome] = useState("");
    const isFocused = useIsFocused();
    const [pesquisa, setPesquisa] = useState("");
    const navigation = useNavigation();

    const livrosFiltrados = LivrosData.filter((livro) => {
        if (!pesquisa) return true;
        const texto = pesquisa.toLowerCase();
        return (
            (livro.Titulo && livro.Titulo.toLowerCase().includes(texto)) ||
            (livro.Autor && livro.Autor.toLowerCase().includes(texto))
        );
    });

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
        if (hora >= 5 && hora <= 12) {
            return "Bom dia";
        } else if (hora >= 12 && hora <= 18) {
            return "Boa tarde";
        } else {
            return "Boa noite";
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <View style={styles.headerTexto}>
                        <Text style={styles.dateText}>{obterDataFormatada()}</Text>
                        <Text style={styles.saudacao}>
                            {obterSaudacao()}, <Text style={styles.nome}>{nome}</Text>
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("TelaPerfil")}
                        style={styles.perfilIcone}
                        activeOpacity={0.7}
                    >
                        <MaterialIcons name="account-circle" size={42} color={Colors.colors.azulMedio} />
                    </TouchableOpacity>
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

                {!pesquisa && (
                    <View style={styles.indicacao}>
                        <CardIndicações />
                    </View>
                )}

                <View style={styles.Secao2}>
                    <View style={styles.TituloSecao}>
                        <Text style={styles.SecaoTitle}>
                            {pesquisa ? "Resultados da busca" : "Para suas manhãs"}
                        </Text>
                        {!pesquisa && (
                            <TouchableOpacity onPress={() => navigation.navigate("TodosOsLivros")}>
                                <Text style={styles.SecaoTitleItalic}>Ver Todos </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.Separacao}></View>

                    <View style={styles.containerLivros}>
                        {livrosFiltrados.length === 0 ? (
                            <View style={{ paddingHorizontal: 24, paddingVertical: 20, alignItems: "center" }}>
                                <EvilIcons name="search" size={48} color={Colors.colors.azulClaro} />
                                <Text style={{ fontFamily: "Inter_400Regular", color: Colors.colors.azulMedio, marginTop: 10 }}>
                                    Nenhum livro encontrado com "{pesquisa}".
                                </Text>
                            </View>
                        ) : (
                            <FlatList
                                data={livrosFiltrados}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 10 }}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.itemContainer}
                                    activeOpacity={0.85}
                                    onPress={() =>
                                        navigation.navigate("ResenhaLiteraria", { item })
                                    }
                                >
                                    <CardLivros item={item} />
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
                        )}
                    </View>
                </View>

                {/* Banner Pomodoro */}
                <View style={styles.pomodoroContainer}>
                    <View style={styles.pomodoroTextContainer}>
                        <Text style={styles.pomodoroTitle}>Foco na Leitura</Text>
                        <Text style={styles.pomodoroSubtitle}>
                            Experimente nosso Timer Pomodoro para melhorar sua concentração e ler mais.
                        </Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.pomodoroButton} 
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate("PomodoroTimer")}
                    >
                        <MaterialIcons name="timer" size={22} color={Colors.colors.offWhite} />
                        <Text style={styles.pomodoroButtonText}>Iniciar Pomodoro</Text>
                    </TouchableOpacity>
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        paddingTop: 20,
        marginBottom: 24,
    },
    headerTexto: {
        flex: 1,
    },
    perfilIcone: {
        marginLeft: 12,
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
        paddingVertical: 12,
    },
    TituloSecao: {
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
    Separacao: {
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.colors.azulEscuro,
    },
    containerLivros: {
        marginVertical: 10,
        marginHorizontal: -24,
    },
    pomodoroContainer: {
        backgroundColor: "#EBF1F6", // tom de azul clarinho
        marginHorizontal: 24,
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 16,
        padding: 24,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#D9E4EC",
    },
    pomodoroTextContainer: {
        marginBottom: 16,
        alignItems: "center",
    },
    pomodoroTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: Colors.colors.azulEscuro,
        fontFamily: "serif",
        marginBottom: 6,
    },
    pomodoroSubtitle: {
        fontSize: 14,
        color: Colors.colors.azulMedio,
        textAlign: "center",
        lineHeight: 20,
        paddingHorizontal: 10,
    },
    pomodoroButton: {
        backgroundColor: Colors.colors.azulEscuro,
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 30,
        gap: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 6,
    },
    pomodoroButtonText: {
        color: Colors.colors.offWhite,
        fontSize: 16,
        fontWeight: "600",
    },
});

export default TelaInicial;


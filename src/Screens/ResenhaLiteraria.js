import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { MaterialIcons, EvilIcons, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../Colors.json";

/* ─── Componente de estrelas estáticas ─── */
const Estrelas = ({ nota, tamanho = 22 }) => (
    <View style={styles.estrelasRow}>
        {[1, 2, 3, 4, 5].map((i) => (
            <EvilIcons
                key={i}
                name="star"
                size={tamanho}
                color={i <= nota ? "#F4A935" : "#D0D0D0"}
                style={{ marginRight: 1 }}
            />
        ))}
    </View>
);


/* ─── Componente de estrelas interativas (seleção) ─── */
const EstrelasInterativas = ({ nota, onChange, tamanho = 36 }) => (
    <View style={styles.estrelasRow}>
        {[1, 2, 3, 4, 5].map((i) => (
            <TouchableOpacity key={i} onPress={() => onChange(i)} activeOpacity={0.7}>
                <EvilIcons
                    name="star"
                    size={tamanho}
                    color={i <= nota ? "#F4A935" : "#D0D0D0"}
                    style={{ marginHorizontal: 4 }}
                />
            </TouchableOpacity>
        ))}
    </View>
);


const CardAvaliacao = ({ avaliacao, currentUser, onDelete }) => (
    <View style={styles.cardAvaliacao}>
        <View style={styles.avaliacaoHeader}>
            <View style={styles.avatarCircle}>
                <Text style={styles.avatarLetra}>{avaliacao.usuario.charAt(0).toUpperCase()}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.avaliacaoUsuario}>{avaliacao.usuario}</Text>
                <Text style={styles.avaliacaoData}>{avaliacao.data}</Text>
            </View>
            <Estrelas nota={avaliacao.nota} tamanho={18} />
            {avaliacao.usuario === currentUser && onDelete && (
                <TouchableOpacity onPress={() => onDelete(avaliacao.id)} style={{ marginLeft: 12 }}>
                    <Feather name="trash-2" size={18} color="#E74C3C" />
                </TouchableOpacity>
            )}
        </View>

        <View>
            <Text style={styles.avaliacaoComentario}>{avaliacao.comentario}</Text>
        </View>
    </View>
);

const AVALIACOES_FIXAS = [
    {
        id: "fixo_1",
        usuario: "Marina Távora",
        nota: 5,
        comentario: "Uma obra que me marcou profundamente. A narrativa é envolvente e os personagens são construídos com uma riqueza de detalhes impressionante. Leitura indispensável!",
        data: "08 Mar 2025",
    },
    {
        id: "fixo_2",
        usuario: "Rafael Duarte",
        nota: 4,
        comentario: "Excelente leitura! O autor conduz a história com maestria, equilibrando emoção e reflexão. Recomendo a todos que apreciam uma boa literatura.",
        data: "15 Jan 2025",
    },
];

const ResenhaLiteraria = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { item } = route.params;

    const storageKey = `@avaliacoes_${item.id}`;

    const [avaliacoes, setAvaliacoes] = useState([]);
    const [modalVisivel, setModalVisivel] = useState(false);
    const [novaEstrela, setNovaEstrela] = useState(0);
    const [novoComentario, setNovoComentario] = useState("");
    const [nomeUsuario, setNomeUsuario] = useState("Usuário");

    /* Carrega nome do usuário */
    useEffect(() => {
        AsyncStorage.getItem("@usuario").then((json) => {
            if (json) {
                const obj = JSON.parse(json);
                setNomeUsuario(obj.nome || "Usuário");
            }
        });
    }, []);

    /* Carrega avaliações do livro (recarrega ao focar) */
    useFocusEffect(
        useCallback(() => {
            async function carregar() {
                try {
                    const json = await AsyncStorage.getItem(storageKey);
                    if (json) setAvaliacoes(JSON.parse(json));
                } catch (e) {
                    console.log("Erro ao carregar avaliações:", e);
                }
            }
            carregar();
        }, [])
    );

    /* Formata a data atual */
    const dataAtual = () => {
        const meses = [
            "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
            "Jul", "Ago", "Set", "Out", "Nov", "Dez",
        ];
        const d = new Date();
        return `${String(d.getDate()).padStart(2, "0")} ${meses[d.getMonth()]} ${d.getFullYear()}`;
    };

    /* Salva nova avaliação */
    const salvarAvaliacao = async () => {
        if (novaEstrela === 0) {
            Alert.alert("Atenção", "Selecione pelo menos uma estrela.");
            return;
        }
        if (novoComentario.trim().length < 5) {
            Alert.alert("Atenção", "Escreva um comentário mais detalhado.");
            return;
        }

        const nova = {
            id: Date.now().toString(),
            usuario: nomeUsuario,
            nota: novaEstrela,
            comentario: novoComentario.trim(),
            data: dataAtual(),
        };

        const novaLista = [nova, ...avaliacoes];
        setAvaliacoes(novaLista);
        await AsyncStorage.setItem(storageKey, JSON.stringify(novaLista));

        setModalVisivel(false);
        setNovaEstrela(0);
        setNovoComentario("");
    };


    const excluirAvaliacao = (id) => {
        Alert.alert(
            "Excluir Avaliação",
            "Tem certeza que deseja excluir sua avaliação?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        const novaLista = avaliacoes.filter((a) => a.id !== id);
                        setAvaliacoes(novaLista);
                        await AsyncStorage.setItem(storageKey, JSON.stringify(novaLista));
                    },
                },
            ]
        );
    };

    const todasAvaliacoes = [...avaliacoes, ...AVALIACOES_FIXAS];
    const notaMedia =
        todasAvaliacoes.reduce((acc, a) => acc + a.nota, 0) / todasAvaliacoes.length;

    return (
        <SafeAreaView style={styles.container}>
            {/* ── Header ── */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={28} color={Colors.colors.azulEscuro} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Resenha Literária</Text>
                <View style={{ width: 36 }} />
            </View>

            {/* ── Conteúdo ── */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                {/* Capa */}
                <View style={styles.capaContainer}>
                    <View style={styles.sombra}>
                        <Image source={item.Imagem} style={styles.capa} resizeMode="cover" />
                    </View>
                </View>

                {/* Título e Autor */}
                <Text style={styles.titulo}>{item.Titulo}</Text>
                <Text style={styles.autor}>{item.Autor}</Text>

                {/* Nota geral */}
                <View style={styles.notaGeralContainer}>
                    <Text style={styles.notaNumero}>
                        {todasAvaliacoes.length > 0 ? notaMedia.toFixed(1) : "–"}
                    </Text>
                    <View>
                        <Estrelas nota={Math.round(notaMedia)} tamanho={24} />
                        <Text style={styles.totalAvaliacoes}>
                            {todasAvaliacoes.length}{" "}
                            {todasAvaliacoes.length === 1 ? "avaliação" : "avaliações"}
                        </Text>
                    </View>
                </View>

                <View style={styles.separador} />

                {/* Sinopse */}
                <View style={styles.secao}>
                    <Text style={styles.secaoTitulo}>Sinopse</Text>
                    <Text style={styles.descricao}>{item.Descricao}</Text>
                </View>

                <View style={styles.separador} />

                {/* Avaliações */}
                <View style={styles.secao}>
                    <Text style={styles.secaoTitulo}>Avaliações</Text>

                    {todasAvaliacoes.length === 0 ? (
                        <View style={styles.semAvaliacoes}>
                            <EvilIcons name="star" size={42} color={Colors.colors.azulClaro} />

                            <Text style={styles.semAvaliacoesTexto}>
                                Seja o primeiro a avaliar este livro!{"\n"}
                                Toque no lápis abaixo para escrever sua resenha.
                            </Text>
                        </View>
                    ) : (
                        todasAvaliacoes.map((av) => (
                            <CardAvaliacao
                                key={av.id}
                                avaliacao={av}
                                currentUser={nomeUsuario}
                                onDelete={av.id.startsWith("fixo") ? null : excluirAvaliacao}
                            />
                        ))
                    )}
                </View>
            </ScrollView>

            {/* ── Botão flutuante ── */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => setModalVisivel(true)}
                activeOpacity={0.85}
            >
                <Feather name="edit-2" size={22} color="#fff" />
            </TouchableOpacity>

            {/* ── Modal de nova avaliação ── */}
            <Modal
                visible={modalVisivel}
                animationType="slide"
                transparent
                onRequestClose={() => setModalVisivel(false)}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.modalOverlay}
                >
                    <View style={styles.modalContainer}>
                        {/* Header do modal */}
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitulo}>Sua Resenha</Text>
                            <TouchableOpacity onPress={() => setModalVisivel(false)}>
                                <MaterialIcons name="close" size={24} color={Colors.colors.azulEscuro} />
                            </TouchableOpacity>
                        </View>

                        {/* Livro */}
                        <Text style={styles.modalSubtitulo} numberOfLines={1}>
                            {item.Titulo}
                        </Text>

                        {/* Seleção de estrelas */}
                        <Text style={styles.modalLabel}>Sua nota</Text>
                        <View style={styles.estrelasContainer}>
                            <EstrelasInterativas
                                nota={novaEstrela}
                                onChange={setNovaEstrela}
                                tamanho={40}
                            />
                        </View>

                        {/* Campo de texto */}
                        <Text style={styles.modalLabel}>Comentário</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Escreva sua resenha sobre o livro..."
                            placeholderTextColor="#AAAAAA"
                            value={novoComentario}
                            onChangeText={setNovoComentario}
                            multiline
                            maxLength={400}
                            textAlignVertical="top"
                        />
                        <Text style={styles.charCount}>{novoComentario.length}/400</Text>

                        {/* Botão publicar */}
                        <TouchableOpacity
                            style={[styles.botaoPublicar, novaEstrela === 0 && styles.botaoDesabilitado]}
                            onPress={salvarAvaliacao}
                            activeOpacity={0.85}
                        >
                            <Feather name="send" size={16} color="#fff" />
                            <Text style={styles.botaoPublicarTexto}>Publicar Resenha</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.colors.offWhite,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        paddingTop: 10,
        marginBottom: 8,
    },
    backButton: { padding: 4, marginLeft: -4 },
    headerTitle: {
        fontSize: 20,
        color: Colors.colors.azulEscuro,
        fontFamily: "serif",
    },
    scroll: { paddingBottom: 100 },

    /* Capa */
    capaContainer: { alignItems: "center", marginTop: 20, marginBottom: 24 },
    sombra: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 12,
        borderRadius: 12,
    },
    capa: { width: 180, height: 260, borderRadius: 12 },

    /* Título e Autor */
    titulo: {
        fontFamily: "Inter_700Bold",
        fontSize: 24,
        color: Colors.colors.azulEscuro,
        textAlign: "center",
        paddingHorizontal: 28,
        marginBottom: 6,
        lineHeight: 30,
    },
    autor: {
        fontFamily: "Inter_400Regular",
        fontSize: 15,
        color: Colors.colors.azulMedio,
        textAlign: "center",
        marginBottom: 20,
        fontStyle: "italic",
    },

    /* Nota Geral */
    notaGeralContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        marginBottom: 20,
    },
    notaNumero: {
        fontFamily: "Inter_700Bold",
        fontSize: 48,
        color: Colors.colors.azulEscuro,
        lineHeight: 52,
    },
    estrelasRow: { flexDirection: "row", alignItems: "center" },
    totalAvaliacoes: {
        fontFamily: "Inter_400Regular",
        fontSize: 12,
        color: Colors.colors.azulMedio,
        marginTop: 4,
    },

    /* Separador */
    separador: {
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.colors.azulClaro,
        marginHorizontal: 24,
        marginBottom: 24,
    },

    /* Seções */
    secao: { paddingHorizontal: 24, marginBottom: 24 },
    secaoTitulo: {
        fontFamily: "serif",
        fontSize: 20,
        color: Colors.colors.azulEscuro,
        marginBottom: 12,
        fontWeight: "600",
    },
    descricao: {
        fontFamily: "Inter_400Regular",
        fontSize: 15,
        color: Colors.colors.azulMedio,
        lineHeight: 24,
        textAlign: "justify",
    },

    /* Sem avaliações */
    semAvaliacoes: {
        alignItems: "center",
        paddingVertical: 20,
        gap: 10,
    },
    semAvaliacoesTexto: {
        fontFamily: "Inter_400Regular",
        fontSize: 14,
        color: Colors.colors.azulMedio,
        textAlign: "center",
        lineHeight: 22,
    },

    /* Card de avaliação */
    cardAvaliacao: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 14,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 8,
        elevation: 3,
    },
    avaliacaoHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    avatarCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.colors.azulClaro,
        alignItems: "center",
        justifyContent: "center",
    },
    avatarLetra: {
        fontFamily: "Inter_700Bold",
        fontSize: 18,
        color: Colors.colors.azulEscuro,
    },
    avaliacaoUsuario: {
        fontFamily: "Inter_700Bold",
        fontSize: 14,
        color: Colors.colors.azulEscuro,
    },
    avaliacaoData: {
        fontFamily: "Inter_400Regular",
        fontSize: 11,
        color: Colors.colors.azulMedio,
        marginTop: 1,
    },
    avaliacaoComentario: {
        fontFamily: "Inter_400Regular",
        fontSize: 14,
        color: Colors.colors.azulMedio,
        lineHeight: 21,
        textAlign: "justify",
    },

    /* FAB – botão flutuante */
    fab: {
        position: "absolute",
        bottom: 32,
        right: 28,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: Colors.colors.azulEscuro,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
    },

    /* Modal */
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
        justifyContent: "flex-end",
    },
    modalContainer: {
        backgroundColor: Colors.colors.offWhite,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 40,
    },
    modalHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    modalTitulo: {
        fontFamily: "serif",
        fontSize: 22,
        color: Colors.colors.azulEscuro,
        fontWeight: "700",
    },
    modalSubtitulo: {
        fontFamily: "Inter_400Regular",
        fontSize: 13,
        color: Colors.colors.azulMedio,
        fontStyle: "italic",
        marginBottom: 20,
    },
    modalLabel: {
        fontFamily: "Inter_700Bold",
        fontSize: 12,
        color: Colors.colors.azulEscuro,
        letterSpacing: 1,
        textTransform: "uppercase",
        marginBottom: 10,
    },
    estrelasContainer: {
        alignItems: "center",
        marginBottom: 24,
    },
    textInput: {
        backgroundColor: "#fff",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E5E5E5",
        padding: 14,
        height: 130,
        fontFamily: "Inter_400Regular",
        fontSize: 14,
        color: Colors.colors.azulEscuro,
        marginBottom: 6,
    },
    charCount: {
        fontFamily: "Inter_400Regular",
        fontSize: 11,
        color: Colors.colors.azulMedio,
        textAlign: "right",
        marginBottom: 20,
    },
    botaoPublicar: {
        backgroundColor: Colors.colors.azulEscuro,
        borderRadius: 30,
        height: 52,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 6,
    },
    botaoDesabilitado: {
        opacity: 0.5,
    },
    botaoPublicarTexto: {
        color: Colors.colors.offWhite,
        fontFamily: "Inter_700Bold",
        fontSize: 16,
    },
});

export default ResenhaLiteraria;

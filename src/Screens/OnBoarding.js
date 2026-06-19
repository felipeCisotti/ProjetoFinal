import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
    Dimensions,
} from "react-native";
import Colors from "../Colors.json";
import Imagem from "../../assets/OnBoarding/OnBoardReader.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const OPTIONS = [
    {
        id: 1,
        title: "O Explorador de Fim de Semana",
        subtitle: "Casual, tranquilo e sempre curioso.",
    },
    {
        id: 2,
        title: "O Pensador Crítico",
        subtitle: "Analítico, focado em leituras profundas.",
    },
    {
        id: 3,
        title: "O Buscador de Alma",
        subtitle: "Introspectivo, atraído por significado.",
    },
];

export default function OnBoarding({ navigation }) {
    const [selected, setSelected] = useState(null);

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Top bar */}
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign
                        name="arrow-left"
                        size={22}
                        color={Colors.colors.azulEscuro}
                    />
                </TouchableOpacity>
                <Text style={styles.stepText}>PASSO 1 DE 2</Text>
            </View>

            {/* Title */}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Qual tipo de leitor</Text>
                <Text style={[styles.title, styles.titleItalic]}>você é?</Text>
            </View>

            {/* Image */}
            <View style={styles.imageContainer}>
                <Image source={Imagem} style={styles.image} />
            </View>

            {/* Scrollable options */}
            <ScrollView
                style={styles.scrollArea}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {OPTIONS.map((option) => {
                    const isSelected = selected === option.id;
                    return (
                        <TouchableOpacity
                            key={option.id}
                            style={[
                                styles.optionCard,
                                isSelected && styles.optionCardSelected,
                            ]}
                            onPress={() => setSelected(option.id)}
                            activeOpacity={0.7}
                        >
                            <View style={styles.optionTextContainer}>
                                <Text
                                    style={[
                                        styles.optionTitle,
                                        isSelected && styles.optionTitleSelected,
                                    ]}
                                >
                                    {option.title}
                                </Text>
                                <Text style={styles.optionSubtitle}>
                                    {option.subtitle}
                                </Text>
                            </View>
                            {isSelected && (
                                <Feather
                                    name="check-circle"
                                    size={22}
                                    color={Colors.colors.azulEscuro}
                                />
                            )}
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            {/* Continue button */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.continueButton,
                        !selected && styles.continueButtonDisabled,
                    ]}
                    onPress={() => {
                        if (selected) navigation.navigate("OnBoarding3");
                    }}
                    activeOpacity={selected ? 0.8 : 1}
                >
                    <Text style={styles.continueText}>Continuar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
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
        height: 230,
        borderRadius: 16,
        resizeMode: "cover",
    },
    scrollArea: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
    },
    optionCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        paddingVertical: 16,
        paddingHorizontal: 18,
        marginBottom: 10,
        borderWidth: 1.5,
        borderColor: "#E8E8E8",
    },
    optionCardSelected: {
        borderColor: Colors.colors.azulEscuro,
        backgroundColor: "#F5F7FA",
    },
    optionTextContainer: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333333",
        marginBottom: 2,
    },
    optionTitleSelected: {
        color: Colors.colors.azulEscuro,
        fontWeight: "700",
    },
    optionSubtitle: {
        fontSize: 13,
        color: "#999999",
    },
    buttonContainer: {
        paddingHorizontal: 30,
        paddingBottom: 30,
        paddingTop: 5,
    },
    continueButton: {
        backgroundColor: Colors.colors.azulEscuro,
        borderRadius: 14,
        paddingVertical: 16,
        alignItems: "center",
    },
    continueButtonDisabled: {
        opacity: 0.5,
    },
    continueText: {
        color: Colors.colors.offWhite,
        fontSize: 17,
        fontWeight: "600",
    },
});

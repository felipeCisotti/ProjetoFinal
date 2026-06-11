import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
} from "react-native";
import Colors from "../Colors.json";
import BooksImage from "../../assets/OnBoarding/OnBoardBooks.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const CIRCLE_SIZE = width * 0.55;

export default function OnBoarding2({ navigation }) {
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
                <Text style={styles.stepText}>PASSO 2 DE 2</Text>
            </View>

            {/* Content */}
            <View style={styles.content}>
                {/* Circular image */}
                <View style={styles.circleContainer}>
                    <View style={styles.circleOuter}>
                        <Image source={BooksImage} style={styles.circleImage} />
                    </View>
                </View>

                {/* Title */}
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Um Ritual</Text>
                    <Text style={[styles.title, styles.titleItalic]}>Matinal.</Text>
                </View>

                {/* Subtitle */}
                <Text style={styles.subtitle}>
                    Receba sua análise personalizada{"\n"}junto com seu primeiro café.
                </Text>
            </View>

            {/* Bottom buttons */}
            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    style={styles.enableButton}
                    onPress={() => navigation.navigate("OnBoarding3")}
                    activeOpacity={0.8}
                >
                    <Feather
                        name="bell"
                        size={18}
                        color={Colors.colors.offWhite}
                        style={styles.bellIcon}
                    />
                    <Text style={styles.enableText}>Ativar Notificações</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate("OnBoarding3")}
                    activeOpacity={0.6}
                >
                    <Text style={styles.notNowText}>Agora Não</Text>
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
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 30,
    },
    circleContainer: {
        alignItems: "center",
        marginBottom: 30,
    },
    circleOuter: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        borderWidth: 2,
        borderColor: "#E0DDD5",
        overflow: "hidden",
        backgroundColor: "#F0EDE5",
    },
    circleImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    titleContainer: {
        alignItems: "center",
        marginBottom: 15,
    },
    title: {
        fontSize: 32,
        color: Colors.colors.azulEscuro,
        fontWeight: "700",
        lineHeight: 40,
        textAlign: "center",
    },
    titleItalic: {
        fontStyle: "italic",
        fontWeight: "400",
        color: Colors.colors.azulMedio,
    },
    subtitle: {
        fontSize: 15,
        color: Colors.colors.azulMedio,
        textAlign: "center",
        lineHeight: 22,
    },
    bottomContainer: {
        paddingHorizontal: 30,
        paddingBottom: 25,
        alignItems: "center",
    },
    enableButton: {
        backgroundColor: Colors.colors.azulEscuro,
        borderRadius: 14,
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginBottom: 15,
    },
    bellIcon: {
        marginRight: 10,
    },
    enableText: {
        color: Colors.colors.offWhite,
        fontSize: 16,
        fontWeight: "600",
    },
    notNowText: {
        fontSize: 14,
        color: Colors.colors.azulMedio,
        fontWeight: "500",
    },
});
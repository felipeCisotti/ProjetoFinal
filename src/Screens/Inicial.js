import React, { useEffect } from "react";
import {
    View,
    Image,
    StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../Colors.json";

export default function Inicial({ navigation }) {
    useEffect(() => {
        let active = true;

        async function checarOnboarding() {
            try {
                const usuario = await AsyncStorage.getItem("@usuario");

                if (active) {
                    if (usuario !== null) {
                        navigation.replace("TelaInicial");
                    } else {
                        navigation.replace("OnBoarding");
                    }
                }
            } catch (error) {
                console.log("Erro ao checar onboarding:", error);
                if (active) {
                    navigation.replace("OnBoarding");
                }
            }
        }

        const timer = setTimeout(() => {
            checarOnboarding();
        }, 2000);

        return () => {
            active = false;
            clearTimeout(timer);
        };
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image source={require("../../assets/LogoPrincipal.png")} style={styles.logo} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.colors.azulEscuro,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 200,
        height: 200,
    },
});


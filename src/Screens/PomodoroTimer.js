import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Vibration,
    Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../Colors.json";

const MODES = [
    { label: "estudo", minutes: 25 },
    { label: "leitura", minutes: 25 },
    { label: "foco", minutes: 25 },
];



export default function PomodoroTimer({ navigation }) {
    const [modeIndex, setModeIndex] = useState(1);
    const [totalSeconds, setTotalSeconds] = useState(25 * 60);
    const [secondsLeft, setSecondsLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [rounds, setRounds] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const intervalRef = useRef(null);
    const pulseAnim = useRef(new Animated.Value(1)).current;


    useEffect(() => {
        if (isRunning) {
            const pulse = Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1.05,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                ])
            );
            pulse.start();
            return () => pulse.stop();
        } else {
            pulseAnim.setValue(1);
        }
    }, [isRunning]);


    useEffect(() => {
        if (isRunning && secondsLeft > 0) {
            intervalRef.current = setInterval(() => {
                setSecondsLeft((prev) => prev - 1);
                setTotalTime((prev) => prev + 1);
            }, 1000);
        } else if (secondsLeft === 0 && isRunning) {

            setIsRunning(false);
            setRounds((prev) => prev + 1);
            Vibration.vibrate(500);
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning, secondsLeft]);

    const formatTime = (secs) => {
        const m = Math.floor(secs / 60)
            .toString()
            .padStart(2, "0");
        const s = (secs % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    const formatTotalTime = (secs) => {
        const h = Math.floor(secs / 3600);
        const m = Math.floor((secs % 3600) / 60);
        if (h > 0) return `${h}h ${m}m`;
        return `${m}m`;
    };

    const adjustTime = (delta) => {
        if (isRunning) return;
        const newMinutes = Math.max(5, Math.min(90, totalSeconds / 60 + delta));
        const newSeconds = newMinutes * 60;
        setTotalSeconds(newSeconds);
        setSecondsLeft(newSeconds);
    };

    const handleStart = () => {
        if (secondsLeft === 0) {

            setSecondsLeft(totalSeconds);
        }
        setIsRunning(true);
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setSecondsLeft(totalSeconds);
    };

    const switchMode = (index) => {
        if (isRunning) return;
        setModeIndex(index);
        const mins = MODES[index].minutes;
        setTotalSeconds(mins * 60);
        setSecondsLeft(mins * 60);
    };

    const progress = 1 - secondsLeft / totalSeconds;

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={Colors.colors.azulEscuro} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Pomodoro</Text>
                <View style={{ width: 36 }} />
            </View>

            {/* Titulo */}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>foco na</Text>
                <Text style={styles.titleBold}>leitura</Text>
            </View>

            {/* Indicadores de modo */}
            <View style={styles.dotsContainer}>
                {MODES.map((_, i) => (
                    <TouchableOpacity key={i} onPress={() => switchMode(i)}>
                        <View
                            style={[
                                styles.dot,
                                i === modeIndex && styles.dotActive,
                            ]}
                        />
                    </TouchableOpacity>
                ))}
            </View>

            {/* Timer Display */}
            <View style={styles.timerSection}>
                <TouchableOpacity
                    onPress={() => adjustTime(-5)}
                    style={styles.adjustBtn}
                    disabled={isRunning}
                    activeOpacity={0.6}
                >
                    <Ionicons
                        name="remove-circle"
                        size={32}
                        color={isRunning ? Colors.colors.azulClaro : Colors.colors.azulEscuro}
                    />
                </TouchableOpacity>

                <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                    <Text style={styles.timerText}>{formatTime(secondsLeft)}</Text>
                </Animated.View>

                <TouchableOpacity
                    onPress={() => adjustTime(5)}
                    style={styles.adjustBtn}
                    disabled={isRunning}
                    activeOpacity={0.6}
                >
                    <Ionicons
                        name="add-circle"
                        size={32}
                        color={isRunning ? Colors.colors.azulClaro : Colors.colors.azulEscuro}
                    />
                </TouchableOpacity>
            </View>

            {/* Barra de Progresso */}
            <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
            </View>

            {/* Seletor de Modo */}
            <View style={styles.modeSelector}>
                {MODES.map((mode, i) => (
                    <TouchableOpacity key={i} onPress={() => switchMode(i)} activeOpacity={0.7}>
                        <View style={styles.modeItem}>
                            {i === modeIndex && <View style={styles.modeLine} />}
                            <Text
                                style={[
                                    styles.modeText,
                                    i === modeIndex && styles.modeTextActive,
                                ]}
                            >
                                {mode.label}
                            </Text>
                            {i === modeIndex && <View style={styles.modeLine} />}
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Botões Start / Pause / Reset */}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={[styles.startButton, isRunning && styles.pauseButton]}
                    onPress={isRunning ? handlePause : handleStart}
                    activeOpacity={0.85}
                >
                    <Text style={styles.startButtonText}>
                        {isRunning ? "pausar" : secondsLeft === 0 ? "reiniciar" : "começar"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleReset} activeOpacity={0.6} style={styles.resetBtn}>
                    <Text style={styles.resetText}>resetar</Text>
                </TouchableOpacity>
            </View>

            {/* Estatísticas */}
            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{rounds}/6</Text>
                    <Text style={styles.statLabel}>rodadas{"\n"}de hoje</Text>
                </View>

                <View style={styles.statDivider} />

                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{formatTotalTime(totalTime)}</Text>
                    <Text style={styles.statLabel}>tempo{"\n"}de hoje</Text>
                </View>
            </View>


        </SafeAreaView>
    );
}

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
    backBtn: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        color: Colors.colors.azulEscuro,
        fontFamily: "serif",
    },
    titleContainer: {
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 10,
    },
    title: {
        fontSize: 36,
        color: Colors.colors.azulMedio,
        fontFamily: "serif",
        fontStyle: "italic",
    },
    titleBold: {
        fontSize: 48,
        color: Colors.colors.azulEscuro,
        fontWeight: "900",
        fontFamily: "serif",
        marginTop: -8,
    },
    dotsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        marginTop: 10,
        marginBottom: 20,
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: Colors.colors.azulClaro,
    },
    dotActive: {
        backgroundColor: Colors.colors.azulEscuro,
        width: 14,
        height: 14,
        borderRadius: 7,
    },
    timerSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        paddingVertical: 10,
    },
    adjustBtn: {
        padding: 8,
    },
    timerText: {
        fontSize: 80,
        fontWeight: "900",
        color: Colors.colors.azulEscuro,
        letterSpacing: -2,
    },
    progressBarContainer: {
        height: 4,
        backgroundColor: Colors.colors.azulClaro,
        marginHorizontal: 50,
        borderRadius: 2,
        marginTop: 8,
        marginBottom: 16,
        overflow: "hidden",
    },
    progressBar: {
        height: "100%",
        backgroundColor: Colors.colors.azulEscuro,
        borderRadius: 2,
    },
    modeSelector: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 24,
        marginBottom: 30,
    },
    modeItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    modeLine: {
        width: 20,
        height: 1.5,
        backgroundColor: Colors.colors.azulEscuro,
    },
    modeText: {
        fontSize: 16,
        color: Colors.colors.azulClaro,
        fontFamily: "serif",
    },
    modeTextActive: {
        color: Colors.colors.azulEscuro,
        fontWeight: "700",
        fontSize: 18,
    },
    buttonsContainer: {
        alignItems: "center",
        gap: 12,
        paddingHorizontal: 40,
        marginBottom: 30,
    },
    startButton: {
        width: "100%",
        backgroundColor: Colors.colors.azulEscuro,
        borderRadius: 16,
        paddingVertical: 18,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 6,
    },
    pauseButton: {
        backgroundColor: Colors.colors.azulMedio,
    },
    startButtonText: {
        color: Colors.colors.offWhite,
        fontSize: 20,
        fontWeight: "700",
        letterSpacing: 1,
    },
    resetBtn: {
        paddingVertical: 6,
    },
    resetText: {
        fontSize: 15,
        color: Colors.colors.azulMedio,
        fontFamily: "serif",
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 40,
        gap: 30,
    },
    statItem: {
        alignItems: "center",
    },
    statValue: {
        fontSize: 24,
        fontWeight: "900",
        color: Colors.colors.azulEscuro,
        fontStyle: "italic",
    },
    statLabel: {
        fontSize: 12,
        color: Colors.colors.azulMedio,
        textAlign: "center",
        marginTop: 4,
        fontWeight: "600",
        lineHeight: 16,
    },
    statDivider: {
        width: 1,
        height: 50,
        backgroundColor: Colors.colors.azulClaro,
    },
});

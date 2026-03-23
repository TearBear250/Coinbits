import React from "react";
import { SafeAreaView, Text, StyleSheet, Pressable, StatusBar } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#101020" />
      <Text style={styles.title}>Coin Bits</Text>
      <Text style={styles.subtitle}>A secret Coin B language for kids</Text>

      <Link href="/learn" asChild>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          android_ripple={{ color: "rgba(255,255,255,0.06)" }}
          accessibilityRole="link"
          accessibilityLabel="Learn words — open the Learn screen"
          hitSlop={8}
        >
          <Text style={styles.buttonText}>Learn Words</Text>
        </Pressable>
      </Link>

      <Link href="/play" asChild>
        <Pressable
          style={({ pressed }) => [styles.button, styles.secondaryButton, pressed && styles.buttonPressed]}
          android_ripple={{ color: "rgba(255,255,255,0.06)" }}
          accessibilityRole="link"
          accessibilityLabel="Play game — open the Play screen"
          hitSlop={8}
        >
          <Text style={styles.buttonText}>Play Game</Text>
        </Pressable>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101020",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: { fontSize: 36, color: "#ffdf5d", fontWeight: "bold", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#eee", textAlign: "center", marginBottom: 32 },
  button: {
    backgroundColor: "#4caf50",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 32,
    marginTop: 12,
    width: "80%",
    alignItems: "center",
  },
  secondaryButton: { backgroundColor: "#2196f3" },
  buttonPressed: { opacity: 0.85, transform: [{ scale: 0.998 }] },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});

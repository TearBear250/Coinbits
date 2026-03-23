import React, { useCallback } from "react";
import { SafeAreaView, View, Text, FlatList, StyleSheet, StatusBar } from "react-native";
import { WORDS } from "../constants/words";

const ListItem = React.memo(function ListItem({ item }: { item: any }) {
  return (
    <View
      style={styles.card}
      accessible
      accessibilityRole="button"
      accessibilityLabel={`${item.english}. ${item.coinB}`}
    >
      <Text style={styles.emoji}>{item.emoji}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.english}>{item.english}</Text>
        <Text style={styles.coinB}>{item.coinB}</Text>
      </View>
    </View>
  );
});

export default function LearnScreen() {
  const renderItem = useCallback(({ item }) => <ListItem item={item} />, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#080814" />
      <FlatList
        data={WORDS}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ paddingVertical: 16 }}
        renderItem={renderItem}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => <Text style={styles.empty}>No words available</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#080814", paddingHorizontal: 16 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f2933",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  emoji: { fontSize: 32, marginRight: 16 },
  english: { fontSize: 20, color: "#fff", fontWeight: "700" },
  coinB: { fontSize: 16, color: "#ffdf5d", marginTop: 4 },
  empty: { color: "#9ca3af", textAlign: "center", marginTop: 24 },
});

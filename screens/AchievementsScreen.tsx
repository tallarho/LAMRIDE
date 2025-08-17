import React from "react";
import { View, Text, ScrollView, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AchievementsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const achievements = [
    { id: 1, emoji: "🚴‍♂️", title: "Первая поездка", description: "Совершите первую поездку" },
    { id: 2, emoji: "🏃‍♂️", title: "10 поездок", description: "Завершите 10 поездок" },
    { id: 3, emoji: "🌍", title: "100 км", description: "Проедьте суммарно 100 км" },
    { id: 4, emoji: "⏱️", title: "Марафонец", description: "Одна поездка дольше 2 часов" },
    { id: 5, emoji: "🔥", title: "Серия", description: "3 поездки подряд в разные дни" },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: isDark ? "#0D0D0D" : "#FBFDFF" }]}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#111827" }]}>
          🏆 Достижения
        </Text>

        {achievements.map((ach) => (
          <View key={ach.id} style={[styles.card, { backgroundColor: isDark ? "#121212" : "#fff" }]}>
            <Text style={styles.emoji}>{ach.emoji}</Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.achTitle, { color: isDark ? "#fff" : "#111827" }]}>{ach.title}</Text>
              <Text style={[styles.achDesc, { color: isDark ? "#BDBDBD" : "#6B7280" }]}>{ach.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  emoji: { fontSize: 32, marginRight: 14 },
  achTitle: { fontSize: 18, fontWeight: "600" },
  achDesc: { fontSize: 14, marginTop: 2 },
});

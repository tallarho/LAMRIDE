import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 28,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  levelText: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  pointsText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2563EB", // чуть темнее синего для акцента
    textAlign: "center",
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E7FF",
    marginVertical: 16,
  },
  achievementsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 14,
    letterSpacing: 0.3,
  },
  noAchievements: {
    fontSize: 15,
    color: "#6B7280",
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: 10,
  },
  achievementItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  achievementBullet: {
    fontSize: 24,
    color: "#2563EB",
    marginRight: 12,
    lineHeight: 24,
  },
  achievementText: {
    fontSize: 15,
    color: "#4B5563",
    flexShrink: 1, // чтобы текст переносился и не ломал верстку
  },
});

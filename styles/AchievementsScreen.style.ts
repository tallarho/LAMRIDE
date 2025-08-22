import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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

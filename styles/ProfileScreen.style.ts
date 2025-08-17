// ProfileScreen.style.ts

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 40,
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  avatarWrapper: {
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 75,
    padding: 5,
    marginBottom: 20,
    elevation: 3,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 6,
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  editLink: {
    fontSize: 16,
    color: "#007bff",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    marginBottom: 12,
    color: "#000",
  },
  primaryButton: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: "#ccc",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  secondaryButtonText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 16,
  },
  statsBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    marginBottom: 30,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 14,
    color: "#555",
  },
  logoutButton: {
    backgroundColor: "#e53935",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  ratingBox: {
  marginTop: 32,
  backgroundColor: "#ffffff",
  borderRadius: 16,
  padding: 20,
  shadowColor: "#000",
  shadowOpacity: 0.05,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 4 },
  elevation: 5,
  borderWidth: 1,
  borderColor: "#E5E7EB", // светло-серая рамка
},
levelText: {
  fontSize: 24,
  fontWeight: "700",
  color: "#1F2937", // темно-серый
  marginBottom: 8,
  textAlign: "center",
},
pointsText: {
  fontSize: 18,
  fontWeight: "600",
  color: "#3B82F6", // синий акцент
  marginBottom: 12,
  textAlign: "center",
},
achievementsTitle: {
  fontSize: 16,
  fontWeight: "700",
  color: "#374151", // темно-серый
  marginBottom: 8,
  borderBottomWidth: 1,
  borderBottomColor: "#E5E7EB",
  paddingBottom: 6,
},
achievementItem: {
  fontSize: 14,
  color: "#6B7280", // средний серый
  marginLeft: 12,
  marginBottom: 6,
},
});

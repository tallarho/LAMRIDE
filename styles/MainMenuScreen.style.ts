import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 18,
    textAlign: "center",
  },
  statsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 3,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statEmoji: {
    fontSize: 20,
    marginBottom: 6,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 13,
    marginTop: 4,
  },
  startButtonGradient: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 4,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: "800",
  },
  menuTitle: {
    width: "100%",
    alignSelf: "flex-start",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  menuList: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  menuCardWrapper: {
    width: "48%",
    marginBottom: 12,
  },
  menuItem: {
    minHeight: 112,
    borderRadius: 12,
    padding: 14,
    alignItems: "flex-start",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  menuEmoji: {
    fontSize: 22,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: "700",
  },
});

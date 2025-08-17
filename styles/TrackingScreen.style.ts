import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  bottomPanel: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "#ffffffee",
    padding: 16,
    borderRadius: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    alignItems: "center",
  },
  timerText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    color: "#1F2937",
  },
  speedText: {
    fontSize: 16,
    color: "#4B5563",
    marginBottom: 4,
  },
  finishNotice: {
    fontSize: 16,
    color: "#10B981",
    marginBottom: 8,
  },
  finishButton: {
    backgroundColor: "#10B981",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 12,
  },
  finishButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  forceFinishButton: {
    marginTop: 12,
    backgroundColor: "#EF4444",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  forceFinishButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
import { StyleSheet, Dimensions  } from "react-native";
const { width, height } = Dimensions.get("window");
export const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    width,
    height,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  logoContainer: {
    marginBottom: 16,
    alignItems: "center",
  },
  logo: {
    width: 140,
    height: 140,
  },
  card: {
    padding: 24,
    borderRadius: 18,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
  },
  inputWrapper: {
    marginBottom: 12,
  },
  inputIcon: {
    position: "absolute",
    top: 14,
    left: 12,
    zIndex: 1,
  },
  input: {
    paddingVertical: 12,
    paddingLeft: 40,
    paddingRight: 12,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
  },
  errorText: {
    marginTop: 4,
    fontSize: 13,
  },
  primaryButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginVertical: 20,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
  switchText: {
    fontSize: 14,
    textAlign: "center",
  },
   eyeIcon: {
    position: "absolute",
    right: 12,
    top: 14,
    zIndex: 1,
  },
});
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Image,
  useColorScheme,
  Dimensions,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { supabase } from "../supabaseClient";
import Logo from "../img/logo.jpg";
import { RootStackParamList } from "../types";
import { Mail, Lock, User } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Eye, EyeOff } from "lucide-react-native";
import { styles } from '../styles/RegistrationScreen.style'

type Props = NativeStackScreenProps<RootStackParamList, "Auth">;

export default function AuthScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; fullName?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const validate = () => {
    let valid = true;
    const newErrors: typeof errors = {};

    if (!email.trim()) {
      newErrors.email = "Email обязателен";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Некорректный email";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Пароль обязателен";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Минимум 6 символов";
      valid = false;
    }

    if (!isLogin && !fullName.trim()) {
      newErrors.fullName = "Имя обязательно";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleAuth = async () => {
    if (!validate()) return;
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        });
        if (error) throw error;

        Alert.alert("Регистрация успешна", "Проверьте почту для подтверждения.");
        setIsLogin(true);
      }
    } catch (error: any) {
      Alert.alert("Ошибка", error.message || "Что-то пошло не так");
    } finally {
      setLoading(false);
    }
  };

  const cardColor = "rgba(255, 255, 255, 0.7)";
  const inputBackground = "rgba(255,255,255,0.7)";
  const borderColor = "#e5e7eb";
  const textColor = "#111827";
  const placeholderColor = "#6b7280";
  const errorColor = "#EF4444";

  const renderInput = (
    icon: React.ReactNode,
    value: string,
    onChange: (text: string) => void,
    placeholder: string,
    error?: string,
    secureTextEntry = false,
    isPasswordField = false
  ) => (
    <View style={styles.inputWrapper}>
      <View style={[styles.inputIcon]}>{icon}</View>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: inputBackground,
            color: textColor,
            borderColor: error ? errorColor : borderColor,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        value={value}
        onChangeText={onChange}
        secureTextEntry={secureTextEntry && !showPassword}
        autoCapitalize="none"
        editable={!loading}
      />
      {isPasswordField && (
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword((prev) => !prev)}
          activeOpacity={0.7}
        >
          {showPassword ? (
            <EyeOff size={20} color={placeholderColor} />
          ) : (
            <Eye size={20} color={placeholderColor} />
          )}
        </TouchableOpacity>
      )}
      {error && <Text style={[styles.errorText, { color: errorColor }]}>{error}</Text>}
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={["#add3b2ff", "#776e6eff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientContainer}
      >
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.logoContainer}>
            <Image source={Logo} style={styles.logo} resizeMode="contain" />
          </View>

          <View style={[styles.card, { backgroundColor: cardColor }]}>
            <Text style={[styles.title, { color: "#3A1C71" }]}>
              {isLogin ? "Вход" : "Регистрация"}
            </Text>

            {!isLogin &&
              renderInput(
                <User size={20} color={placeholderColor} />,
                fullName,
                (text) => {
                  setFullName(text);
                  if (errors.fullName) setErrors((e) => ({ ...e, fullName: undefined }));
                },
                "Имя",
                errors.fullName
              )}

            {renderInput(
              <Mail size={20} color={placeholderColor} />,
              email,
              (text) => {
                setEmail(text);
                if (errors.email) setErrors((e) => ({ ...e, email: undefined }));
              },
              "Email",
              errors.email
            )}

          {renderInput(
            <Lock size={20} color={placeholderColor} />,
            password,
            (text) => {
              setPassword(text);
              if (errors.password) setErrors((e) => ({ ...e, password: undefined }));
            },
            "Пароль",
            errors.password,
            true,
            true
          )}

            <TouchableOpacity onPress={handleAuth} disabled={loading} activeOpacity={0.8}>
              <LinearGradient
                colors={["#787878ff", "#696969ff"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.primaryButton, loading && { opacity: 0.7 }]}
              >
                <Text style={styles.primaryButtonText}>
                  {loading ? "Подождите..." : isLogin ? "Войти" : "Зарегистрироваться"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => !loading && setIsLogin(!isLogin)}>
              <Text style={[styles.switchText, { color: "#3A1C71" }]}>
                {isLogin ? "Нет аккаунта? Зарегистрироваться" : "Уже есть аккаунт? Войти"}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}
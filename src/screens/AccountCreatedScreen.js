import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { useTheme } from "../context/theme";
const lottieForm = require("./../../assets/lotties/success_indicator.json");
export default function AccountCreatedScreen({ navigation }) {
  const { theme } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
      }}
    >
      <LottieView
        source={lottieForm}
        autoPlay
        loop={false}
        style={{ width: 150, height: 150 }}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={{
          padding: 20,
          borderRadius: 10,
          marginBottom: 30,
          backgroundColor: "#57698D",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: "700",
            fontSize: 16,
            color: "#fff",
          }}
        >
          Go to Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}

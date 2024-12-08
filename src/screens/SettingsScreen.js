import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
  Switch,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { useTheme } from "../context/theme";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "react-native-paper";
import { logout } from "../redux/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logoutUser } from "../redux/actions/authActions";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
export default function SettingsScreen() {
  const { theme, switchTheme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [hasCamPerm, sethasCamPerm] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            dispatch(logoutUser());
          },
        },
      ],
      { cancelable: true }
    );
  };
  useEffect(() => {
    const loadProfileImage = async () => {
      const storedImage = await AsyncStorage.getItem("profileImage");
      if (storedImage) {
        setProfileImage(storedImage);
      }
    };
    loadProfileImage();
  }, []);
  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      sethasCamPerm(cameraStatus.status === "granted");
    })();
  }, []);
  if (hasCamPerm === false) {
    return <Text>No access to camera</Text>;
  }

  // Pick image from camera or gallery
  const handleImagePicker = async (source) => {
    try {
      let result;
      if (source === "camera") {
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 0.8,
        });
      } else {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 0.8,
        });
      }

      if (!result.canceled && result.assets) {
        const uri = result.assets[0].uri;
        setProfileImage(uri);
        await AsyncStorage.setItem("profileImage", uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View
        style={[
          styles.profileContainer,
          {
            backgroundColor: theme.colors.surface,
            borderBottomColor: theme.colors.disabled,
            gap: 6,
          },
        ]}
      >
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Avatar.Text
            size={60}
            label={user.email?.charAt(0).toUpperCase() || "U"}
            color={theme.colors.onPrimary}
            style={{ backgroundColor: theme.colors.primary }}
          />
        )}
        <View style={styles.profileDetails}>
          <Text style={[styles.userName, { color: theme.colors.primary }]}>
            Email
          </Text>
          <Text style={[styles.userEmail, { color: theme.text().secondary }]}>
            {user.email || "user@example.com"}
          </Text>
        </View>
        <View style={styles.imageOptions}>
          <TouchableOpacity onPress={() => handleImagePicker("camera")}>
            <Ionicons
              name="camera-outline"
              size={24}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleImagePicker("gallery")}>
            <Ionicons
              name="image-outline"
              size={24}
              color={theme.colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        {/* Change Theme */}
        <TouchableOpacity
          style={styles.settingOption}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons
            name="color-palette-outline"
            size={20}
            color={theme.colors.primary}
            style={styles.settingIcon}
          />
          <Text style={[styles.optionText, { color: theme.text().primary }]}>
            Change Theme
          </Text>
        </TouchableOpacity>

        {/* Enable Notifications */}
        <View style={styles.settingOption}>
          <Ionicons
            name="notifications-outline"
            size={20}
            color={theme.colors.primary}
            style={styles.settingIcon}
          />
          <Text style={[styles.optionText, { color: theme.text().primary }]}>
            Enable Notifications
          </Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={(value) => setNotificationsEnabled(value)}
            trackColor={{
              false: theme.colors.disabled,
              true: theme.colors.primaryVariant,
            }}
            thumbColor={
              notificationsEnabled
                ? theme.colors.primary
                : theme.colors.onSurface
            }
          />
        </View>

        {/* Account Settings */}
        <TouchableOpacity style={styles.settingOption}>
          <Ionicons
            name="person-outline"
            size={20}
            color={theme.colors.primary}
            style={styles.settingIcon}
          />
          <Text style={[styles.optionText, { color: theme.text().primary }]}>
            Account Settings
          </Text>
        </TouchableOpacity>

        {/* Language */}
        <TouchableOpacity style={styles.settingOption}>
          <Ionicons
            name="language-outline"
            size={20}
            color={theme.colors.primary}
            style={styles.settingIcon}
          />
          <Text style={[styles.optionText, { color: theme.text().primary }]}>
            Language
          </Text>
        </TouchableOpacity>

        {/* Modal for Theme Selection */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View
              style={[
                styles.modalContent,
                { backgroundColor: theme.colors.surface },
              ]}
            >
              <Text style={[styles.title, { color: theme.text().primary }]}>
                Select a Theme
              </Text>

              {/* Light Theme */}
              <TouchableOpacity
                style={[
                  styles.themeButton,
                  { backgroundColor: theme.colors.primaryVariant },
                ]}
                onPress={() => {
                  switchTheme("light");
                  setModalVisible(false);
                }}
              >
                <Text
                  style={[styles.buttonText, { color: theme.colors.onPrimary }]}
                >
                  Light Theme
                </Text>
              </TouchableOpacity>

              {/* Dark Theme */}
              <TouchableOpacity
                style={[
                  styles.themeButton,
                  { backgroundColor: theme.colors.secondary },
                ]}
                onPress={() => {
                  switchTheme("dark");
                  setModalVisible(false);
                }}
              >
                <Text
                  style={[styles.buttonText, { color: theme.colors.onPrimary }]}
                >
                  Dark Theme
                </Text>
              </TouchableOpacity>

              {/* System Theme */}
              <TouchableOpacity
                style={[
                  styles.themeButton,
                  { backgroundColor: theme.colors.disabled },
                ]}
                onPress={() => {
                  switchTheme("system");
                  setModalVisible(false);
                }}
              >
                <Text
                  style={[styles.buttonText, { color: theme.colors.onSurface }]}
                >
                  System Theme
                </Text>
              </TouchableOpacity>

              {/* Close Modal */}
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text
                  style={[
                    styles.closeModalButtonText,
                    { color: theme.colors.error },
                  ]}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TouchableOpacity style={styles.settingOption} onPress={handleLogout}>
          <Ionicons
            name="log-out-outline"
            size={20}
            color={theme.colors.error}
            style={styles.settingIcon}
          />
          <Text style={[styles.optionText, { color: theme.colors.error }]}>
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 14,
    marginTop: 4,
  },
  settingOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
  },
  settingIcon: {
    marginRight: 10,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  themeButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 12,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  closeModalButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  closeModalButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
  },
  imageOptions: {
    flexDirection: "row",
    gap: 10,
  },
});

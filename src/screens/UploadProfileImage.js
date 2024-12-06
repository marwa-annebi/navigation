import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

export default function UploadProfileImage() {
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const selectImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
    });

    if (result.didCancel) {
      Alert.alert('Cancelled', 'You did not select any image.');
    } else if (result.errorCode) {
      Alert.alert('Error', 'An error occurred while selecting the image.');
    } else {
      setImageUri(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!imageUri) {
      Alert.alert('No Image', 'Please select an image to upload.');
      return;
    }

    const userId = auth().currentUser?.uid;
    if (!userId) {
      Alert.alert('Error', 'You must be logged in to upload a profile image.');
      return;
    }

    const fileName = `profile_images/${userId}.jpg`;
    const reference = storage().ref(fileName);

    setUploading(true);
    setProgress(0);

    const uploadTask = reference.putFile(imageUri);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress.toFixed(0));
      },
      (error) => {
        setUploading(false);
        Alert.alert('Upload Failed', error.message);
      },
      async () => {
        setUploading(false);
        const downloadUrl = await reference.getDownloadURL();
        Alert.alert('Success', 'Profile image uploaded successfully.');
        console.log('Image URL:', downloadUrl);
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Profile Image</Text>

      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      <TouchableOpacity style={styles.button} onPress={selectImage}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#007bff' }]}
        onPress={uploadImage}
        disabled={uploading}
      >
        {uploading ? (
          <>
            <ActivityIndicator color="#fff" />
            <Text style={styles.buttonText}> Uploading {progress}%</Text>
          </>
        ) : (
          <Text style={styles.buttonText}>Upload Image</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: '#28a745',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

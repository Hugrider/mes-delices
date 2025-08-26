import ThemedButton from "@/components/ThemedButton";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Alert, Image, StyleSheet, View } from "react-native";

type Props = {
  photoUri: string | null;
  onChange: (uri: string | null) => void;
};

export default function PhotoPicker({ photoUri, onChange }: Props) {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    if (!result.canceled) onChange(result.assets[0].uri);
  };

  const takePhoto = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission nécssaire",
        "Vous devez autoriser l'accès à la caméra pour prendre en photo vos recettes."
      );
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ quality: 0.5 });
    if (!result.canceled) onChange(result.assets[0].uri);
  };

  return (
    <View style={styles.container}>
      {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}
      <ThemedButton text="Prendre une photo" onPress={takePhoto} />
      <ThemedButton text="Choisir depuis la galerie" onPress={pickImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
});

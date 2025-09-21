import IconButton from "@/components/IconButton";
import ThemedButton from "@/components/ThemedButton";
import { useThemeColors } from "@/constants/Theme";
import { AntDesign } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Alert, Image, StyleSheet, View } from "react-native";

type Props = {
  photoUri: string | null;
  onChange: (uri: string | null) => void;
};

export default function PhotoPicker({ photoUri, onChange }: Props) {
  const colors = useThemeColors();

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

  if (photoUri) {
    return (
      <View style={styles.selectedImageContainer}>
        <Image source={{ uri: photoUri }} style={styles.image} />
        <View style={styles.absoluteRemoveButton}>
          <IconButton
            icon={<AntDesign name="close" size={18} color={colors.text} />}
            onPress={() => onChange(null)}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={[styles.buttonsContainer, { borderColor: colors.border }]}>
        <ThemedButton text="Prendre une photo" onPress={takePhoto} />
        <ThemedButton text="Choisir depuis la galerie" onPress={pickImage} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonsContainer: {
    padding: 10,
    borderWidth: 2,
    borderStyle: "dashed",
    width: "100%",
  },
  selectedImageContainer: {
    alignItems: "center",
  },
  absoluteRemoveButton: {
    position: "absolute",
    right: 75,
    top: -10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
});

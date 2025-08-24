import { ActionSheetIOS, Alert, Platform } from "react-native";

export const ConfirmPopupHandler = (
  message: string,
  iOSButtonDeleteMessage: string,
  androidTitle: string,
  onConfirm: () => void
) => {
  if (Platform.OS === "ios") {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: message,
        options: [iOSButtonDeleteMessage, "Annuler"],
        cancelButtonIndex: 1,
        tintColor: "red",
        cancelButtonTintColor: "blue",
      },
      async (btnIndex) => {
        if (btnIndex === 0) {
          onConfirm();
        }
      }
    );
  } else {
    Alert.alert(
      androidTitle,
      message,
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Supprimer",
          onPress: onConfirm,
          style: "destructive",
        },
      ],
      {
        cancelable: true,
      }
    );
  }
};

// components/SOSModal.tsx
import React from "react";
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface SOSModalProps {
  visible: boolean;
  onCancel: () => void;
  onSend: () => void;
}

const { width, height } = Dimensions.get("window");

const SOSModal: React.FC<SOSModalProps> = ({ visible, onCancel, onSend }) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      statusBarTranslucent={true}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Image
            source={require("../assets/images/click.png")}
            style={styles.sosImage}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sendButton} onPress={onSend}>
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SOSModal;

const styles = StyleSheet.create({
  modalBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContainer: {
    width: 250,
    backgroundColor: "#F4A8A8",
    borderRadius: 45,
    alignItems: "center",
    paddingTop: 40,
  },
  sosImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: "contain",
    borderRadius: 10,
  },
  buttonContainer: {
    width: "100%",
    paddingVertical: 25,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 45,
  },
  cancelButton: {
    width: "35%",
    backgroundColor: "white",
    borderColor: "red",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  sendButton: {
    width: "35%",
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
  },
  cancelText: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
  },
  sendText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

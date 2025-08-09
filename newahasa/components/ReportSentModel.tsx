import React from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ReportSentModalProps {
  visible: boolean;
  onClose: () => void;
}

const ReportSentModal: React.FC<ReportSentModalProps> = ({
  visible,
  onClose,
}) => {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Checkmark */}
          <Image
            source={require("../assets/images/check.jpg")} // Use a green check icon here
            style={styles.icon}
          />

          {/* Text */}
          <Text style={styles.message}>Report Sent Successfully</Text>

          {/* OK Button */}
          <TouchableOpacity style={styles.okButton} onPress={onClose}>
            <Text style={styles.okText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ReportSentModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: 280,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    position: "relative",
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 10,
    resizeMode: "contain",
  },
  message: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 25,
  },
  okButton: {
    backgroundColor: "#00BFFF", // Bright blue
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  okText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 15,
  },
});

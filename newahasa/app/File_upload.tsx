import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  ScrollView,
  Linking
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { WebView } from "react-native-webview";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";




const DocumentUploadScreen = () => {
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(false);

  const navigation = useNavigation();

  useFocusEffect(
  useCallback(() => {
    const initialize = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        console.log("Stored userId from AsyncStorage:", storedUserId);

        if (!storedUserId) {
          Alert.alert("Error", "User not logged in");
          return;
        }

        setUserId(storedUserId);
        fetchDocuments(storedUserId);
      } catch (error) {
        console.error("Error fetching userId from AsyncStorage", error);
        Alert.alert("Error", "Failed to load user");
      }
    };

    initialize();
  }, [])
);



  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (!result.canceled && result.assets.length > 0) {
        const asset = result.assets[0];
        const doc = {
          uri: asset.uri,
          name: asset.name,
          mimeType: asset.mimeType || "application/octet-stream",
        };
        setSelectedDoc(doc);
      } else {
        Alert.alert("Cancelled", "Document selection was cancelled.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick document.");
    }
  };

  const uploadDocument = async () => {
    if (!userId || !selectedDoc) {
      Alert.alert("Missing Info", "Log in and select a file.");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("document", {
        uri: selectedDoc.uri,
        name: selectedDoc.name,
        type: selectedDoc.mimeType,
      } as any);
      formData.append("userId", userId);

      const response = await axios.post(`http://192.168.43.135:5000/api/documents/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        Alert.alert("Success", "Document uploaded successfully!");
        setSelectedDoc(null);
        fetchDocuments(userId);
      } else {
        Alert.alert("Upload failed", "Server returned an error.");
      }
    } catch (err) {
      Alert.alert("Upload error", "Failed to upload document.");
    } finally {
      setUploading(false);
    }
  };

  const fetchDocuments = async (id: string) => {
    setLoadingDocs(true);
    try {
      const response = await axios.post(`http://192.168.43.135:5000/api/documents/fetch`, {
        userId: id,
      });

      if (response.status === 200) {
        setDocuments(response.data);
      } else {
        Alert.alert("Error", "Failed to load documents.");
      }
    } catch (err) {
      Alert.alert("Error", "Failed to fetch documents.");
    } finally {
      setLoadingDocs(false);
    }
  };

  const openDocument = (url: string) => {
  if (url) {
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "Cannot open document.");
    });
  }
};

  const renderItem = ({ item }: { item: any }) => {
    const isImage = item.name?.match(/\.(jpg|jpeg|png|gif|bmp|webp)$/i);
    const isPDF = item.name?.toLowerCase().endsWith(".pdf");


    return (
      <View style={styles.documentItem}>
        <Text style={styles.documentName}>{item.name}</Text>
        <TouchableOpacity onPress={() => openDocument(item.url)}>
          {isImage ? (
            <Image source={{ uri: item.url }} style={styles.previewImage} />
          ) : isPDF ? (
            <View style={{ height: 300, marginTop: 10 }}>
              <WebView
                source={{ uri: item.url }}
                style={{ flex: 1 }}
                originWhitelist={["*"]}
                useWebKit
              />
            </View>
          ) : (
            <Text style={styles.unknownFile}>File type not previewable</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container1}>
      <View style={styles.topcontainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Sub_Home")}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="#FFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Upload Your Documents</Text>
      </View>
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.title}>Upload a Document</Text> */}
      

      <TouchableOpacity style={styles.pickButton} onPress={pickDocument}>
        <Text style={styles.buttonText}>Pick Document</Text>
      </TouchableOpacity>

      {selectedDoc && (
        <View style={styles.docPreview}>
          <Text style={styles.docName}>Selected: {selectedDoc.name}</Text>

          <TouchableOpacity
            style={styles.uploadButton}
            onPress={uploadDocument}
            disabled={uploading}
          >
            {uploading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText1}>Upload</Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.listContainer}>
        <Text style={styles.sectionTitle}>Uploaded Documents</Text>
        {loadingDocs ? (
          <ActivityIndicator size="large" />
        ) : documents.length === 0 ? (
          <Text style={styles.noDocsText}>No documents uploaded yet.</Text>
        ) : (
          <FlatList
            data={documents}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            scrollEnabled={false}
          />
        )}
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default DocumentUploadScreen;

const styles = StyleSheet.create({
  container1: {
    position: "relative",
    flex: 1,
    //paddingTop: 40,
    backgroundColor: "#ffff",
    marginBottom: 45,
    paddingBottom: 55,
  },
  container: {
    paddingTop: 10,
    paddingHorizontal: 24,
    backgroundColor: "#ffff",
    paddingBottom: 80,
  },
  topcontainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#00bfff",
    marginBottom: 20,
    borderBottomLeftRadius:45,
  },
  backButton: {
    paddingRight: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 18, //22
    fontWeight: "bold",
    color:'#ffff'
    // marginBottom: 20,
    // textAlign: "center",
  },
  pickButton: {
    backgroundColor: "#ffff",
    borderColor:'#00bfff',
    borderWidth:1,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  uploadButton: {
    backgroundColor: "#28A745",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
    color:'#00BFFF'
  },
  buttonText: {
    color: "#00BFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  buttonText1: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
  docPreview: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
    marginBottom: 30,
  },
  docName: {
    fontSize: 16,
  },
  listContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  noDocsText: {
    fontStyle: "italic",
    color: "#666",
  },
  documentItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },
  documentName: {
    fontSize: 16,
    color: "#00BFFF",
    fontWeight: "500",
  },
  previewImage: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 5,
  },
  unknownFile: {
    color: "#888",
    marginTop: 10,
  },
});
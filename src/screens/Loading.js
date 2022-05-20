import React from "react";
import { ActivityIndicator, StyleSheet, View, Text } from "react-native";

const Loading = () => (
  <View style={styles.container}>
    <Text>Cargando...</Text>
    <ActivityIndicator size="large" color="#00ff00" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
});

export default Loading;
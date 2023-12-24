import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";

const History = ({ data, navigateToDetail }) => {
  return (
    <View style={styles.historyContainer}>
    <Text style={[styles.titleText, styles.textWhite]}>History</Text>
    <View style={styles.historyContainer.itemsContainer}>
      {data && data.map((item, i) => (
        <BlurView
          tint="light"
          intensity={40}
          style={styles.historyContainer.itemsContainer.item}
          key={i}
        >
        <TouchableOpacity onPress={() => navigateToDetail(item.title, item.coords.lat, item.coords.lon)}>
        <Text style={[styles.textWhite, { fontSize: 12 }]}>
          {item.title}
        </Text>
        <Text style={[styles.textWhite, { fontSize: 40 }]}>
          {Math.floor(item.temp)} °C
        </Text>
        </TouchableOpacity>
      </BlurView>
      ))}
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  textWhite: {
    color: "white",
  },
  historyContainer: {
    flex: 1,
    padding: 20,
    flexDirection: "column",
    itemsContainer: {
      marginTop: 10,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 20,
      item: {
        borderRadius: 15,
        overflow: "hidden",
        width: 140,
        minHeight: 140,
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
      },
    },
  },
})

export default History;
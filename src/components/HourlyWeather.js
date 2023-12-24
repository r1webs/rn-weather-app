import { FlatList, View, Text, StyleSheet, Image } from "react-native";
import { BlurView } from "expo-blur";
import utils from "../utils";

export default function HourlyWeather({ hourlyData }) {
  const { changeTimeFormat } = utils;

  const renderItem = ({ item }) => {
    return (
      <BlurView tint="light" intensity={30} style={styles.hourlyCard}>
        <Text style={styles.textWhite}>{changeTimeFormat(item.dt)}</Text>
        <Image
          source={{
            uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
          }}
          style={{ width: 40, height: 40 }}
        />
        <Text style={styles.textWhite}>{Math.floor(item.temp)} °C</Text>
      </BlurView>
    );
  };

  return (
    <View style={{ marginTop: 10 }}>
      {hourlyData && (
        <FlatList
          data={hourlyData}
          renderItem={renderItem}
          keyExtractor={(item) => item.dt}
          horizontal={true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textWhite: {
    color: "white",
  },
  hourlyCard: {
    width: 100,
    height: 100,
    marginLeft: 10,
    flex: 1,
    marginTop: 10,
    borderRadius: 15,
    overflow: "hidden",
    padding: 10,
    alignItems: "center",
  },
});

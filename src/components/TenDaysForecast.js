import { View, Text, StyleSheet, Image } from "react-native";
import utils from "../utils";

export default function TenDaysForecast({ dailyForecast }) {
  const { getDay } = utils;

  const RenderItem = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <Text style={styles.textWhite}>{getDay(item.dt)}</Text>
        <Text style={styles.textWhite}>{Math.floor(item.temp.day)} °C</Text>
        <Image
          source={{
            uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
          }}
          style={{ width: 40, height: 40 }}
        />
      </View>
    );
  };

  return (
    <View style={{ flex:1, marginTop: 10 }}>
      {
        dailyForecast.map((item, i) => (
          <RenderItem item={item} key={i} />
        )) 
      }
    </View>
  );
}

const styles = StyleSheet.create({
  textWhite: {
    color: "white",
    fontSize: 18
  },
  listItem: {
    borderBottomWidth: 1,
    borderColor: "#fff",
    flex: 1,
    flexDirection: "row",
    overflow: "hidden",
    paddingRight: 10,
    paddingVertical: 20,
    justifyContent: "space-between",
    alignItems: "center"
  },
});

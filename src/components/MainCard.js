import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { Feather } from "@expo/vector-icons";
import utils from "../utils";

export default function MainCard({
  temperature,
  weather,
  weatherIcon,
  sunrise,
  sunset,
  pressEvent,
}) {
  console.log("weatherIcon", weatherIcon);
  return (
    <BlurView tint="light" intensity={30} style={styles.detailCard}>
      <TouchableOpacity onPress={() => pressEvent()}>
        <View style={{ flex: 1, flexDirection: "row", height: 50 }}>
          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`,
            }}
            style={{ width: 100 }}
          />

          <Text
            style={{
              color: "white",
              marginLeft: 10,
              marginTop: 10,
              fontSize: 16,
              textTransform: "capitalize",
            }}
          >
            {weather}
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: "center", marginTop: 20, marginBottom: 30 }}>
          <Text style={[styles.textWhite, { color: "white", fontSize: 40 }]}>
            {Math.floor(temperature)} °C
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <Feather name="sunrise" size={25} color="white" />
          <View>
            <Text style={styles.textWhite}>Sunrise</Text>
            <Text style={styles.textWhite}>
              {utils.changeTimeFormat(sunrise)}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            marginTop: 15,
          }}
        >
          <Feather name="sunset" size={25} color="white" />
          <View>
            <Text style={styles.textWhite}>Sunset</Text>
            <Text style={styles.textWhite}>
              {utils.changeTimeFormat(sunset)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  textWhite: {
    color: "white",
  },
  titleText: {
    color: "white",
  },
  detailCard: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 15,
    overflow: "hidden",
    paddingHorizontal: 50,
    paddingVertical: 30,
  },
});

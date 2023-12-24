import { View, StyleSheet } from "react-native";
import HourlyWeather from "./HourlyWeather";
import MainCard from "./MainCard";

export default function TodayForecast({ currentWeather, hourlyWeather}) {
  const { temp, weather, sunrise, sunset } = currentWeather
  return (
    <View>
      <View style={styles.currentLocationCard}>
        <MainCard
          temperature={temp}
          weather={weather[0].main}
          weatherIcon={weather[0].icon}
          sunrise={sunrise}
          sunset={sunset}
          pressEvent={() => {}}
        />
      </View>
      <HourlyWeather hourlyData={hourlyWeather} />
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  dayText: {
    color: "white",
    fontSize: 12,
    marginBottom: 10,
  },
  currentLocationCard: {
    flex: 1,
    flexDirection: "column",
    minHeight: 250,
    marginTop: 10,
    padding: 20,
  },
});

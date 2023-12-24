import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import TodayForecast from "./components/TodayForecast";
import TenDaysForecast from "./components/TenDaysForecast";
import SlideView from "./components/SlideView";
import utils from "./utils";
import hourlyforecast from "../mocks/hourlyforecast";

export default function DetailPage({ navigation, route }) {
  const onBack = () => navigation.navigate("main");
  const [showTDForecast, setShowTDForecast] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [background, setBackground] = useState(
    require("../assets/sg_placeholder_img.jpeg")
  );

  const { lat, lon, locationName } = route.params;

  useEffect(() => {
    (async () => {
      const weatherDataResponse = await utils.fetchData(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric`
      );
      setWeatherData(weatherDataResponse);
      setBackground(utils.chooseBackground(weatherDataResponse.current.weather[0].main));
    })();
  }, []);

  return (
    <View style={{ flex: 1, height: Dimensions.get("window").height }}>
      {weatherData && (
        <ImageBackground
          style={styles.bgImageStyle}
          source={background}
          resizeMode="cover"
        >
          <ScrollView style={styles.scrollView}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity
                style={styles.backIcon}
                onPress={() => onBack()}
              >
                <Feather name="arrow-left" size={20} color="white" />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  width: 100,
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity onPress={() => setShowTDForecast(false)}>
                  <Text style={styles.textWhite}>Today</Text>
                  {!showTDForecast && <View style={styles.underline}></View>}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowTDForecast(true)}>
                  <Text style={styles.textWhite}>8 Days</Text>
                  {showTDForecast && <View style={styles.underline}></View>}
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.locationAndDate}>
              <Text style={styles.titleText}>{locationName}</Text>
              <Text style={styles.dayText}>
                {utils.getDay(hourlyforecast.current.dt)}
              </Text>
            </View>
            {!showTDForecast ? (
              <SlideView>
                <TodayForecast
                  currentWeather={weatherData.current}
                  hourlyWeather={weatherData.hourly}
                />
              </SlideView>
            ) : (
              <SlideView>
                <TenDaysForecast dailyForecast={weatherData.daily} />
              </SlideView>
            )}
          </ScrollView>
        </ImageBackground>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  backIcon: {
    width: 20,
    height: 20,
    flex: 1,
  },
  bgImageStyle: {
    backgroundColor: "#000",
    flex: 1,
    paddingTop: 50,
  },
  textWhite: {
    color: "white",
  },
  scrollView: {
    paddingHorizontal: 25,
  },
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
  locationAndDate: {
    marginTop: 20,
  },
  underline: {
    height: 2,
    backgroundColor: "#fff",
    flex: 1,
    marginTop: 4,
  },
});

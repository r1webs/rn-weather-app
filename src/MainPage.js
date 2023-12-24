import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Dimensions
} from "react-native";
import MainCard from "./components/MainCard";
import History from "./components/History";
import SearchCity from "./components/SearchCity";
import * as Location from "expo-location";
import utils from "./utils";

export default function MainPage({ navigation }) {
  const [data, setData] = useState();
  const [isResultShown, setIsResultShown] = useState();
  const [historyData, setHistoryData] = useState([]);
  const [background, setBackground] = useState(require("../assets/sg_placeholder_img.jpeg"));

  useEffect(() => {
    // Init GeoLocation
    (async () => {
      navigation.addListener("focus", getHistoryData);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Location permission not granted");
        return;
      }
      let newLocation = await Location.getCurrentPositionAsync({});

      const currentWeatherData = await utils.fetchData(
        `https://api.openweathermap.org/data/2.5/weather?lat=${newLocation.coords.latitude}&lon=${newLocation.coords.longitude}&units=metric`
      );
      setData(currentWeatherData);
      setBackground(utils.chooseBackground(currentWeatherData.weather[0].main));
    })();
  }, []);

  function getHistoryData() {
    utils.getData("history").then(async (val) => {
      if (val) {
        const updatedData = Promise.all(
          val.map(async (item) => {
            const weatherData = await utils.getWeatherData(
              item.coords.lat,
              item.coords.lon
            );
            return { ...item, temp: weatherData.current.temp };
          })
        );

        updatedData.then((val) => {
          console.log("updatedData", val);
          setHistoryData(val);
        });
      }
    });
  }
  function toggleMainView(searchResultCount) {
    setIsResultShown(!!searchResultCount);
  }

  function navigateToDetailScreen(title, lat, lon) {
    console.log(lat, lon);
    navigation.navigate("detail", {
      locationName: title,
      lat,
      lon,
    });
  }

  // Icons cloud, cloud-moon, cloud-moon-rain, cloud-rain, cloud-showers-heavy, cloud-sun, cloud-sun-rain, sunrise, sunset, sun
  return (
    <View style={{ flex: 1, height: Dimensions.get("window").height }}>
      {data && historyData && (
        <ImageBackground
          style={styles.bgImageStyle}
          source={background}
          resizeMode="cover"
          height={Dimensions.get("window").height}
        >
          <ScrollView nestedScrollEnabled={true} style={styles.scrollView}>
            <SearchCity
              onDataUpdate={toggleMainView}
              navigateToDetail={navigateToDetailScreen}
            />
            <View
              style={isResultShown ? { display: "none" } : { display: "flex" }}
            >
              <View style={styles.currentLocationCard}>
                <Text style={styles.titleText}>
                  {data.name}, {data.sys.country}
                </Text>
                <MainCard
                  temperature={data.main.temp}
                  weather={data.weather[0].description}
                  weatherIcon={data.weather[0].icon}
                  sunrise={data.sys.sunrise}
                  sunset={data.sys.sunset}
                  pressEvent={() =>
                    navigation.navigate("detail", {
                      lat: data.coord.lat,
                      lon: data.coord.lon,
                      locationName: `${data.name}, ${data.sys.country}`,
                    })
                  }
                />
              </View>
              <History
                data={historyData}
                navigateToDetail={navigateToDetailScreen}
              />
            </View>
          </ScrollView>
        </ImageBackground>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bgImageStyle: {
    flex: 1,
    paddingTop: 20
  },
  textWhite: {
    color: "white",
  },
  scrollView: {
    paddingHorizontal: 25,
  },
  titleText: {
    color: "white",
  },
  currentLocationCard: {
    flex: 1,
    flexDirection: "column",
    minHeight: 250,
    marginTop: 10,
    padding: 20,
  },
});

import AsyncStorage from '@react-native-async-storage/async-storage';

export default utils = {
  fetchData: async (url) => {
    // append appid to the url
    const appid = "<OPENWEATHER_API_ID>";
    url += `&appid=${appid}`;
    console.log('url', url)
    const response = await fetch(url);
    const data = await response.json();
    return data;
  },
  getDay: (timeStamp) => {
    const date = new Date(timeStamp * 1000);
    const dayInfo = date.toString().split(' ');
    
    return `${dayInfo[0]}, ${dayInfo[2]} ${dayInfo[1]}`;
  },
  changeTimeFormat: (timeStamp) => {
    let date = new Date(timeStamp * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
  
    // Check whether AM or PM
    let newformat = hours >= 12 ? 'PM' : 'AM';
  
    // Find current hour in AM-PM Format
    hours = hours % 12;
  
    // To display "0" as "12"
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + newformat;
  },
  setData: async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true
    } catch (e) {
      console.log('setdata', e)
      return false
    }
  },
  getData: async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.log('getData', e)
      return null
    }
  },
  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key)
      return true
    } catch(e) {
      console.log('removeItem', e)
      return false
    }
  },
  updateHistory: async function (cityInfo) {
    try {
      // Get stored data with getData
      const data = await this.getData('history')
      // Add cityInfo at first index (unshift)
      data.unshift(cityInfo)
      // If stored data length >=4 remove last one (pop)
      if (data.length > 4) {
        data.pop()
      }
      // Update store with setData
      await this.setData('history', data) 
      return true
    } catch (error) {
      console.log(error)
      return false
    }
  },
  getWeatherData: async function (lat, lon) {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric`;
    const data = await this.fetchData(url);
    console.log('getWeatherData', data)
    return data;
  },
  chooseBackground: (weather) => {
    switch (weather) {
      case "Clear":
        return require("../assets/Clear.jpeg");
      case "Clouds":
        return require("../assets/Clouds.jpeg");
      case "Rain":
        return require("../assets/Rain.jpeg");
      case "Snow":
        return require("../assets/Snow.jpeg");
      case "Drizzle":
        return require("../assets/Drizzle.jpeg");
      case "Thunderstorm":
        return require("../assets/Thunderstorm.jpeg");
      case "Atmosphere":
        return require("../assets/Atmosphere.jpeg");
      case "Haze":
        return require("../assets/Haze.jpeg");
      case "Mist":
        return require("../assets/Mist.jpeg");
      default:
        break;
    }
  }
}

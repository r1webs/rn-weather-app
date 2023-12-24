import { useState, useRef, useCallback } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  ActivityIndicator
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import utils from "../utils";

const SearchCity = ({ onDataUpdate, navigateToDetail }) => {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [suggestionsList, setSuggestionsList] = useState(null);

  const getSuggestions = useCallback(async (q) => {
    setSearchText(q);
    if (typeof q !== "string" || q.length < 3) {
      setSuggestionsList(null);
      onDataUpdate(0);
      return;
    }
    setLoading(true);
    const url = new URL("https://api.openweathermap.org/data/2.5/find");
    url.searchParams.append("q", q.toLowerCase());
    url.searchParams.append("appid", "f9d5db7b4df392753334336e4fe72f95");
    url.searchParams.append("units", "metric");
    const response = await fetch(url);
    const items = await response.json();
    let suggestions = [];
    if (items.list && items.list.length > 0) {
      suggestions = items.list.map((item) => ({
        id: item.id,
        title: item.name,
        country: item.sys.country,
        coords: item.coord
      }));
    }
    setSuggestionsList(suggestions);
    setLoading(false);
    onDataUpdate(suggestions.length);
  }, []);

  const onBack = () => {
    setSearchText('');
    setSuggestionsList(null);
    onDataUpdate(0);
  };

  const searchItemClick = (title, coords) => {
    utils.updateHistory({title, coords}).then((val) => {
      if (val) {
        navigateToDetail(title, coords.lat, coords.lon)
        onBack()
      }
    })
  }

  const Item = ({id, title, country, coords }) => (
    <TouchableOpacity onPress={() => searchItemClick(`${title}, ${country}`, coords, id)}>
      <View style={styles.item}>
        <Feather name="map-pin" size={14} color="grey" />
        <Text style={styles.title}>
          {title}, {country}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.searchContainer]}>
      <View style={styles.inputWrapper}>
        <TouchableOpacity style={styles.backIcon} onPress={() => onBack()}>
        {suggestionsList && suggestionsList.length > 0 && (<Feather name="arrow-left" size={20} color="white" />)}
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          onChangeText={getSuggestions}
          placeholder="Search City"
          placeholderTextColor="#fff"
          value={searchText}
        />
        { loading ? <ActivityIndicator color="#fff" style={{ marginRight: 10 }} /> : <Feather name="search" size={20} style={{ width: 20, height: 20, marginRight: 5 }} color="white" /> }
      </View>
      {suggestionsList && suggestionsList.length > 0 && (
        <>
          <Text style={{ color: "#fff", marginHorizontal: 10, marginTop: 20 }}>
            Select the city
          </Text>
          <BlurView tint="light" intensity={30} style={styles.detailCard}>
            <FlatList
              style={{ marginTop: 10 }}
              scrollEnabled={false}
              data={suggestionsList}
              renderItem={({ item }) => (
                <Item id={item.id} title={item.title} country={item.country} coords={item.coords} />
              )}
              keyExtractor={(item) => item.id}
            />
          </BlurView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    marginHorizontal: 20,
    marginTop: 40,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  inputWrapper: {
    height: 40,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 20,
    color: "#fff",
    paddingHorizontal: 5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    padding: 5,
    flex: 2,
    color: "#fff"
  },
  detailCard: {
    flex: 1,
    marginTop: 10,
    borderRadius: 15,
    overflow: "hidden",
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: 10
  },
  item: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 4,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    height: 40,
  },
  title: {
    color: "grey",
    marginLeft: 4,
  },
});

export default SearchCity;

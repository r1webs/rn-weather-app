import {
  StyleSheet,
  SafeAreaView,
  View
} from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import MainPage from "./src/MainPage";
import DetailPage from "./src/DetailPage";

const Stack = createNativeStackNavigator();

const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'black'
  },
};

export default function App() {
  return (
    <NavigationContainer theme={appTheme}>
      <View style={styles.container}>
        <StatusBar style="light" />
          <Stack.Navigator initialRouteName="main" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="main" component={MainPage} />
            <Stack.Screen name="detail" component={DetailPage} />
          </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  }
});

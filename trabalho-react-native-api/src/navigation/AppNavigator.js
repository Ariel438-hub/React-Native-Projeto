import { Pressable, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import GroupInfoScreen from "../screens/GroupInfoScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, logout } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={({ navigation }) => ({
                title: "Produtos",
                headerLeft: () => (
                  <Pressable onPress={logout} style={styles.headerButton}>
                    <Text style={styles.headerButtonText}>Sair</Text>
                  </Pressable>
                ),
                headerRight: () => (
                  <Pressable
                    onPress={() => navigation.navigate("GroupInfo")}
                    style={styles.headerButton}
                  >
                    <Text style={styles.headerButtonText}>Info</Text>
                  </Pressable>
                ),
              })}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetailScreen}
              options={{ title: "Detalhes do Produto" }}
            />
            <Stack.Screen
              name="GroupInfo"
              component={GroupInfoScreen}
              options={{ title: "Informações do Grupo" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    paddingHorizontal: 12,
  },
  headerButtonText: {
    color: "#1f3c88",
    fontWeight: "600",
  },
});

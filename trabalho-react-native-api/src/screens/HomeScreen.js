import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { api } from "../services/api";
import { formatPrice } from "../utils/formatPrice";

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await api.get("/products/categories");
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts(category);
  }, [category]);

  async function fetchProducts(selectedCategory) {
    setLoading(true);
    try {
      const url = selectedCategory
        ? `/products/category/${selectedCategory}`
        : "/products";
      const response = await api.get(url);
      setProducts(response.data.products);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar os produtos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        <Pressable
          style={[styles.filterChip, !category && styles.filterChipActive]}
          onPress={() => setCategory(null)}
        >
          <Text
            style={[
              styles.filterChipText,
              !category && styles.filterChipTextActive,
            ]}
          >
            Todos
          </Text>
        </Pressable>

        {categories.map((item) => (
          <Pressable
            key={item.slug}
            style={[
              styles.filterChip,
              category === item.slug && styles.filterChipActive,
            ]}
            onPress={() => setCategory(item.slug)}
          >
            <Text
              style={[
                styles.filterChipText,
                category === item.slug && styles.filterChipTextActive,
              ]}
            >
              {item.name}
            </Text>
          </Pressable>
        ))}
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#1f3c88" />
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() =>
                navigation.navigate("ProductDetail", { id: item.id })
              }
            >
              <Image source={{ uri: item.thumbnail }} style={styles.image} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.cardPrice}>{formatPrice(item.price)}</Text>
              </View>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    padding: 12,
  },
  filterChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1f3c88",
  },
  filterChipActive: {
    backgroundColor: "#1f3c88",
  },
  filterChipText: {
    color: "#1f3c88",
    fontSize: 12,
  },
  filterChipTextActive: {
    color: "#fff",
  },
  list: {
    padding: 12,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  cardPrice: {
    marginTop: 4,
    color: "#1f3c88",
    fontWeight: "700",
  },
  headerButton: {
    paddingHorizontal: 12,
  },
  headerButtonText: {
    color: "#1f3c88",
    fontWeight: "600",
  },
});

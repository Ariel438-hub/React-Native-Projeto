import { View, Text, FlatList, StyleSheet } from "react-native";


const MEMBERS = [
  { name: "Ariel David de Almeida Chaves", ra: "1136093" },
  { name: "Diego Meira", ra: "1109435" },
  { name: "Luis Eduardo", ra: "1134332" },
  { name: "Kael Fuchs Zatti", ra: "1137819" },
];

export default function GroupInfoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre o grupo</Text>
      <Text style={styles.paragraph}>
        Este aplicativo foi desenvolvido como trabalho da disciplina de
        Projeto, Design e Engenharia de Processos, consumindo a Fake Store
        API para listagem, filtro e detalhamento de produtos, com
        autenticação de usuário.
      </Text>

      <FlatList
        data={MEMBERS}
        keyExtractor={(item) => item.ra}
        renderItem={({ item }) => (
          <View style={styles.member}>
            <Text style={styles.memberName}>{item.name}</Text>
            <Text style={styles.memberRa}>{item.ra}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
    marginBottom: 20,
  },
  member: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  memberName: {
    fontSize: 16,
    fontWeight: "600",
  },
  memberRa: {
    fontSize: 13,
    color: "#666",
  },
});

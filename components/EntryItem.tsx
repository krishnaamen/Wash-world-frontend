import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { Category } from "../entities/category";

type EntryItemProps = {
  name: string;
  amount: number;
  date: string;
  categoryname: string;
  description: string;
};

export const EntryItem = (props: EntryItemProps) => {
  const { name, amount, date, description, categoryname } = props;

  return (
    <View style={styles.entryItemContainer}>
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.icons}>
          <Ionicons style={styles.icon} name="trash" size={22} color="red" />
          <FontAwesome style={styles.icon} name="edit" size={22} color="blue" />
        </View>
      </View>
      <Text style={styles.category}>{categoryname}</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.amount}>{amount} DKK</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  entryItemContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  name: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
  },
  icons: {
    flexDirection: "row",
    justifyContent:'space-between',
  },
  category: {
    color: "#555",
    fontSize: 16,
    marginBottom: 5,
  },
  date: {
    color: "#777",
    fontSize: 14,
    marginBottom: 5,
  },
  amount: {
    color: "#555",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    color: "#444",
    fontSize: 16,
  },
  icon:{
    display:'flex',
    padding:5,
    margin:5,
  }
});
import { StyleSheet, Text, View } from "react-native";

type CategoryProps = {
    name: string;

}



export const CategoryItem = (props: CategoryProps) => {
    const { name } = props;

    return (
        <View style={styles.datastyle}>
            <Text style={styles.datestyle}> {name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  
    datastyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 5
    },
    textStyle: {
        marginRight: 5,

    },
    datestyle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginRight: 5,
        borderColor:'red',
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        margin: 10
    },

    createButton: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 20,
        margin: 10
    }

})
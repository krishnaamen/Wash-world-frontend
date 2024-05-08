import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { AppDispatch, RootState } from "../store/store";
import { createCategory, fetchCategories } from "../store/categorySlice";
import { CategoryItem } from '../components/CategoryItem';
import { Category } from "../entities/category";
import { CreateCategoryDTO } from "../entities/CreateCategoryDTO";
import { useCreateCategory, useGetCategories } from "../query/category.hooks";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
const queryClient = new QueryClient()



export function Categories() {
    const [text, setText] = React.useState("");
    const { isPending, isError, data, error }  = useGetCategories() ;
    const categories = data;
    const mutation = useCreateCategory();
     /*
    const categories = useSelector(
        (state: RootState) => state.categories.categories
    );
    */


    const handleAddCategory = () => {
        mutation.mutate(new CreateCategoryDTO(text));
        setText("");

    }

    const dispatch = useDispatch<AppDispatch>();
    // useEffect(() => {
    //     dispatch(fetchCategories())
    // }, [])

    return (
        <QueryClientProvider client={queryClient}>
        <View>
            <TextInput style={styles.input} onChangeText={setText} value={text} />

            <TouchableOpacity
                style={styles.createButton}
                onPress={handleAddCategory}>

                <Text style={styles.buttonText}>Create Category</Text>

            </TouchableOpacity>

{/**<Button title="Create Category" onPress={() => dispatch(createCategory(new CreateCategoryDTO(text)))} /> */}
            
            <SafeAreaView>
                <FlatList
                    data={categories}
                    renderItem={({ item }) => <CategoryItem name={item.name} />}
                    keyExtractor={(item) => item.id.toString()}
                />
            </SafeAreaView>
        </View>

        </QueryClientProvider>
    )




}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    createButton:{
        display:'flex',
        borderRadius:20,
        backgroundColor:"#2c6979",
        margin:10
    },
    buttonText:{
        padding:20,
        marginLeft:'20%',
        color:'white',
        fontSize:30,
       
    }
});
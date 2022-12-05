import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, FlatList, Image } from 'react-native'


export default function Cart() {
    const navigation = useNavigation()
    const [products, setProducts] = useState([])

    const load = async () => {
        try {
            const response = await AsyncStorage.getItem("@App")
            if (response?.length > 0) {
                const obj = JSON.parse(response)
                setProducts(obj)



            }

        }
        catch (err) {
            alert(err)
        }
    }

    useEffect(() => {
        load()
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.titlePage}>
                <Image
                    source={require('../../static/cartBlack.png')}
                />
                <Text
                    style={{ fontWeight: 'bold', fontSize: 22, marginLeft: 5, }}
                >Carrinho de compras</Text>
            </View>
            <FlatList
                data={products}
                keyExtractor={product => product.id}
                renderItem={({ item }) =>
                    <View style={styles.cardProduct}>


                        <View style={styles.product}>
                            <Image
                                style={{ width: 120, height: 120, marginLeft: 10, marginTop: 10, }}
                                source={item.image}
                            />
                        </View>


                        <View style={styles.infoProduct}>
                            <View style={styles.titleProduct}>
                                <Text
                                    style={{ fontWeight: '400', fontSize: 18, }}
                                >{item.name}</Text>
                            </View>
                            <Text
                                style={{ fontSize: 12, marginTop: 5, }}
                            >Quantidade: {item.quantity}</Text>
                            <Text
                                style={{ fontWeight: 'bold', fontSize: 14, marginTop: 10, }}
                            >R$ {item.price}</Text>


                        </View>


                    </View>
                }

            />


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titlePage:{
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',

    },
    cardProduct: {
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 10,
        margin: 10,
        marginTop: 20,
        padding: 5,


    },

    infoProduct: {
        marginTop: 15,

    },
    titleProduct: {
        width: 195,
    },

});
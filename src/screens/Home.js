import { useNavigation } from '@react-navigation/core'
import { useEffect, useState } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function Home() {
    const products = [
        {
            name: 'Café Nescafé Solúvel Original 200g',
            image: require('../../static/Nescafe-product.png'),
            price: '7,59',
            id: 1,
            quantity: 1,
           
        },

        {
            name: 'Fio Dental Johnson e johnson Reach Essencial Menta 100m',
            image: require('../../static/fioDental.png'),
            price: '11,50',
            id: 2,
            quantity: 1,
          
        },

        {
            name: 'Bombom Sonho de Valsa 1kg',
            image: require('../../static/sonhoDeValsa.png'),
            price: '50,90',
            id: 3,
            quantity: 1,
         
        },
        {
            name: 'Desodorante Above Aerosol Neymar Jr',
            image: require('../../static/desodoranteAbove.png'),
            price: '8,00',
            id: 4,
            quantity: 1,
          
        },
        {
            name: 'Biscoito Toddy Wafer Chocolate 94g',
            image: require('../../static/biscoitoToddy.png'),
            price: '2,05',
            id: 5,
            quantity: 1,
        },


    ]
    const [productsCart, setProductsCart] = useState([])
    const navigation = useNavigation()

   

    const openCart = () => {
        navigation.navigate('Cart')
    }

    const save = async (item) => {

        try {
            const listOfProducts = [...productsCart]
          

            const index = productsCart.findIndex((product) => 
                product.id === item.id    
            )
            if(index !== -1){
                listOfProducts[index].quantity += 1 
            }
            else{
                listOfProducts.push(item)
            }
            
            setProductsCart(listOfProducts)
            await AsyncStorage.setItem("@App", JSON.stringify(listOfProducts))
        }
        catch (err) {
            alert(err)
        }
    }
    
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.cartShopping}>
                <Text
                    style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}
                >SuperMarket</Text>
                <TouchableOpacity onPress={openCart}>
                    <Image
                        source={require('../../static/cart.png')}
                    />
                </TouchableOpacity>
            </View>

            <FlatList
                data={products}
                keyExtractor={product => product.id}
                renderItem={({ item }) =>
                    <View style={styles.cardProduct}>


                        <View style={styles.product}>
                            <Image
                                style={{ width: 120, height: 120, marginLeft: 10, marginTop: 20, }}
                                source={item.image}
                            />
                        </View>


                        <View style={styles.infoProduct}>
                            <TouchableOpacity onPress={() => save(item)}>
                                <Image
                                    source={require('../../static/cartAddpng.png')}
                                    style={{ position: 'absolute', top: -30, right: 5 }}
                                />
                            </TouchableOpacity>
                            <View style={styles.titleProduct}>
                                <Text
                                    style={{ fontWeight: '400', fontSize: 18, }}
                                >{item.name}</Text>
                            </View>
                            <Text
                                style={{ fontWeight: 'bold', fontSize: 14, marginTop: 30, }}
                            >R$ {item.price}</Text>


                        </View>


                    </View>
                }

            />

        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: -15,
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
        marginTop: 35,

    },
    titleProduct: {
        width: 195,
    },

    cartShopping: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#42464D',
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        alignItems: 'center',
    }

});
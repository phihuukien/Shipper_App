import React, { useEffect, useState } from 'react';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import OrderCard from '../components/OrderCard';
import Separator from '../components/Separator ';
import { OrderService } from '../services';
import { ScrollView } from 'react-native';
import Colors from '../contants/Colors';
import Display from '../contants/Display';
import { Fonts, Images } from '../contants';
import { HubConnectionBuilder } from '@microsoft/signalr';
const OrderScreen = ({navigation}:any) => {
    const [ordersWaiting, setOrdersWaiting] = useState([]);
    useEffect(() => {
        const connection = new HubConnectionBuilder()
        .withUrl('http://192.168.1.23:7090/chatHub')
        .build();
        connection.on('ReceiveMessageFromWeb', (message) => {
            console.log(message)
            OrderService.getOrderWaiting().then((response: any) => {
                setOrdersWaiting(response.data);
            })
        });
        OrderService.getOrderWaiting().then((response: any) => {
            setOrdersWaiting(response.data);
        })
        connection.start()
        .then(() => {
            console.log('Connected to hub.');
        })
        .catch((error) => {
            console.log('Error connecting to hub:', error);
        });

    // Clean up the SignalR connection on component unmount
    return () => {
        connection.stop();
    };
    }, [])
    const updateOrder =()=>{
        OrderService.getOrderWaiting().then((response: any) => {
            setOrdersWaiting(response.data);
        })
    }

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={'#FFFFFF'}
                translucent
            />
            <Separator height={StatusBar.currentHeight} />
            {ordersWaiting?.length>0 ? (
                <>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.foodList}>
                        {ordersWaiting?.map((item: any) => (
                            <OrderCard 
                            {...item}
                            restaurant={item.restaurant[0]}
                            navigate={navigation}
                            updateOrder={updateOrder}
                            key={item.id}
                            />
                        ))}
                        </View>
                    </ScrollView>
                </>) : (
                <>
                    <View style={styles.emptyCartContainer}>
                        <Image
                            style={styles.emptyCartImage}
                            source={ require('../assets/images/empty_cart.png')}
                            resizeMode="contain"
                        />
                        <Text style={styles.emptyCartSubText}>
                        No orders
                        </Text>

                        <Separator height={Display.setHeight(15)} />
                    </View>
                </>
            )}
          
        </View>

    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    foodList: {
        marginHorizontal: 10,
    },
    emptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyCartSubText: {
        fontSize: 18,
        fontFamily: Fonts.POPPINS_BOLD,
        lineHeight: 12 * 1.4,
        color: Colors.INACTIVE_GREY,
        padding: 10,
    },
    emptyCartImage: {
        height: Display.setWidth(60),
        width: Display.setWidth(60),
    },


})


export default OrderScreen;
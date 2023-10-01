import React, { useEffect, useState } from 'react';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Separator from '../components/Separator ';
import { OrderService } from '../services';
import { ScrollView } from 'react-native';
import Colors from '../contants/Colors';
import Display from '../contants/Display';
import { Fonts, Images } from '../contants';
import { HubConnectionBuilder } from '@microsoft/signalr';
import OrderDeliveringCard from '../components/OrderDeliveringCard';
import {useSelector} from 'react-redux';
const DeliveringScreen = ({navigation}:any) => {
    const bookmarks = useSelector((state:any) => state?.orderState.orderDeliverring);
    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={'#FFFFFF'}
                translucent
            />
            <Separator height={StatusBar.currentHeight} />
            {bookmarks?.length>0 ? (
                <>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.foodList}>
                        {bookmarks?.map((item: any) => (
                            <OrderDeliveringCard 
                            {...item}
                            restaurant={item.restaurant[0]}
                            navigate={navigation}
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
           <Separator height={Display.setHeight(9)} />
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


export default DeliveringScreen;
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import StaticImageService from '../services/StaticImageService';
import Display from '../contants/Display';
import Colors from '../contants/Colors';
import { Fonts } from '../contants';
import moment from 'moment';
import { OrderService } from '../services';
import OrderAction from '../actions/OrderAction';

import {useDispatch} from 'react-redux';

const OrderCard = ({ id, phoneAddress, quantity, paymentMothod, orderCode, priceTotal, dateCreated, deliveryAddress, restaurant, navigate }: any) => {
  const dataFormat = moment(dateCreated).format('YYYY/MM/DD -- hh:mm:ss a');
  const dispatch = useDispatch<any>();
  const gettingOrder = (status: number, orderId: string) => {
    OrderService.gettingOrder(status, orderId).then((response: any) => {
      if (response.status) {
        dispatch(OrderAction.getOrderDeliverring());
        navigate.navigate('Delivering');
      }
    })

  }
  return (
    <View style={styles.container}>
      <View style={styles.textDate}>
        <Text>{orderCode} </Text>
        <Text style={{marginLeft:10,marginRight:10, color:Colors.DEFAULT_GREEN}}>||</Text>
        <Text >{dataFormat}</Text>

      </View>
      <View style={styles.subcontainer}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigate.navigate('OrderDetail', { orderId: id })} >
          <Image
            style={styles.image}
            source={{ uri: StaticImageService.getPoster(restaurant.images.poster) }}
          />
        </TouchableOpacity>
        <View style={styles.detailsContainer}>
          <TouchableOpacity activeOpacity={0.8} >
            <Text numberOfLines={1} style={styles.titleText}>
              <Text style={{ fontWeight: '900' }}>From: </Text>{restaurant.name}
            </Text>
            <Text numberOfLines={1} style={styles.titleText}>
              <Text style={{ fontWeight: '900' }}>To: </Text>{deliveryAddress}
            </Text>
            <Text numberOfLines={2} style={styles.descriptionText}>
              {paymentMothod === 1 ? "cash" : "visa"} | <Text style={{ fontWeight: '900' }}>Phone: </Text>{phoneAddress}
            </Text>
          </TouchableOpacity>
          <View style={styles.footerContainer}>
            <Text style={styles.priceText}>$ {priceTotal} ( {quantity} mon)</Text>
          </View>
        </View>
      </View>
      <View style={styles.statusFooter}>
        <View>
          <TouchableOpacity
            style={styles.gettingStartedButton}
            activeOpacity={0.8}
            onPress={() => gettingOrder(2, id)}
          >
            <Text style={styles.gettingStartedButtonText}>Getting orders</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );
};
const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 10,
    elevation: 3,
    backgroundColor: Colors.LIGHT_GREY,
  },
  textDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',


  },
  statusFooter: {
    width: '94%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 4
  },
  textFooter: {

  },
  subcontainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 10,
    elevation: 1,
    backgroundColor: Colors.LIGHT_GREY,
  },
  image: {
    height: 100,
    width: 100,
    margin: 6,
    borderRadius: 8,
  },
  detailsContainer: {
    marginHorizontal: 5,
  },
  titleText: {
    width: Display.setWidth(60),
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_BOLD,
    fontSize: 13,
    lineHeight: 13 * 1.4,
    marginBottom: 8,
  },
  descriptionText: {
    width: Display.setWidth(60),
    fontWeight: '900',
    lineHeight: 10 * 1.4,
    marginBottom: 8,
    color: Colors.DEFAULT_GREEN
  },
  priceText: {
    color: Colors.DEFAULT_YELLOW,
    fontFamily: Fonts.POPPINS_BOLD,
    fontSize: 14,
    lineHeight: 14 * 1.4,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  itemAddContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_GREY2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  itemCountText: {
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 14,
    lineHeight: 14 * 1.4,
    marginHorizontal: 8,
  },
  gettingStartedButton: {
    backgroundColor: Colors.DEFAULT_GREEN,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gettingStartedButtonText: {
    fontSize: 20,
    color: Colors.DEFAULT_WHITE,
    lineHeight: 20 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },

});

export default OrderCard;
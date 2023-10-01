import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import StaticImageService from '../services/StaticImageService';
import Display from '../contants/Display';
import Colors from '../contants/Colors';
import { Fonts } from '../contants';
import moment from 'moment';
import { OrderService } from '../services';

import { useSelector, useDispatch } from 'react-redux';
import OrderAction from '../actions/OrderAction';

const OrderDeliveringCard = ({ id, phoneAddress, quantity, updateOrder, deliveringStatus, paymentMothod, orderCode, priceTotal, dateCreated, deliveryAddress, restaurant, navigate }: any) => {
  const dataFormat = moment(dateCreated).format('YYYY/MM/DD -- hh:mm:ss a');
  const dispatch = useDispatch<any>();
  const changeStatusOrder = (status: number, orderId: string) => {
    OrderService.gettingOrder(status, orderId).then((response: any) => {
      if (response.status) {
        dispatch(OrderAction.getOrderDeliverring());
      }
    })

  }
  return (
    <View style={styles.container}>
      <View style={styles.textDate}>
        <Text>{orderCode} </Text>
        <Text style={{ marginLeft: 10, marginRight: 10, color: Colors.DEFAULT_GREEN }}>||</Text>
        <Text >{dataFormat}</Text>

      </View>
      <View style={styles.subcontainer}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigate.navigate("OrderDetailDeliverring", { orderId: id })}>
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
          {deliveringStatus == 2 ?
            <TouchableOpacity
              style={styles.gettingStartedButton}
              activeOpacity={0.8}
              onPress={() => changeStatusOrder(3, id)}>
              <Text style={styles.changeStatus}>
                Next Order processing
              </Text>
            </TouchableOpacity>
            : deliveringStatus == 3 ?
              <TouchableOpacity
                style={styles.gettingStartedButton}
                activeOpacity={0.8}
                onPress={() => changeStatusOrder(4, id)}>
                <Text style={styles.changeStatus}>
                  Next On Thy Way
                </Text>
              </TouchableOpacity>
              :
              <TouchableOpacity
                style={styles.gettingStartedButton}
                activeOpacity={0.8}
                onPress={() => changeStatusOrder(5, id)}>
                <Text style={styles.changeStatus}>
                  Deliverred
                </Text>
              </TouchableOpacity>
          }
          {/* {(() => {
            switch (deliveringStatus) {
              case 2:
                return <TouchableOpacity
                  style={styles.gettingStartedButton}
                  activeOpacity={0.8}
                  onPress={() => changeStatusOrder(3, id)}>
                  <Text style={styles.changeStatus}>
                    Next Order processing
                  </Text>
                </TouchableOpacity>
              case 3:
                return <TouchableOpacity
                  style={styles.gettingStartedButton}
                  activeOpacity={0.8}
                  onPress={() => changeStatusOrder(4, id)}>
                  <Text style={styles.changeStatus}>
                    Next On Thy Way 
                  </Text>
                </TouchableOpacity>

              case 4:
                return <TouchableOpacity
                  style={styles.gettingStartedButton}
                  activeOpacity={0.8}
                  onPress={() => changeStatusOrder(5, id)}>
                  <Text style={styles.changeStatus}>
                    Deliverred
                  </Text>
                </TouchableOpacity>

            }
          })()} */}

        </View>
        <View >
          <Text style={{ color: Colors.DARK_ONE }}>
            <Text style={styles.gettingStartedButtonText}>{(() => {
              switch (deliveringStatus) {
                case 2:
                  return "Confirmed"
                case 3:
                  return "Order processing"
                case 4:
                  return "On Thy Way"
              }
            })()}</Text>
          </Text>
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
    marginVertical: 4,
    justifyContent: 'space-between'
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
    borderRadius: 3,
  },
  changeStatus: {
    color: Colors.DEFAULT_WHITE,
  },
  gettingStartedButtonText: {
    fontSize: 20,
    color: Colors.DEFAULT_GREEN,
    lineHeight: 20 * 1.4,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },

});

export default OrderDeliveringCard;
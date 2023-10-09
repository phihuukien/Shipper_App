
import axios from "axios";
import { ApiContants } from "../contants";


  const getOrderWaiting = async () => {
    console.log(`OrderService | getOrderWaitings`);
    console.log(`${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.GETORDERWAITING}`)
    try {
      let response = await axios.get(
        `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.GETORDERWAITING}`,
      );
      if (response?.data.status) {
        return {
          status: true,
          message: response?.data?.Message,
          data: response?.data?.data,
        };
      } else {
        return {
          status: false,
          message: response?.data?.Message,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: `GET Order waiting failed exception`,
      };
    }
  };
  const gettingOrder = async (status:number, orderId:string) => {
    console.log(`OrderService | gettingOrder`);
    try {
      let response = await axios.get(
        `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.GETTINGORDER}`+status+"/" +orderId,
      );
      if (response?.data.status) {
        return {
          status: true,
          message: response?.data?.Message,
        };
      } else {
        return {
          status: false,
          message: response?.data?.Message,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: `getting Order  failed exception`,
      };
    }
  };
  const getOrderDelivering = async () => {
    console.log(`OrderService | getOrderDelivering`);
    console.log(`${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.GETORDERDELIVERING}`)
    try {
      let response = await axios.get(
        `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.GETORDERDELIVERING}`,
      );
      if (response?.data.status) {
        return {
          status: true,
          message: response?.data?.Message,
          data: response?.data?.data,
        };
      } else {
        return {
          status: true,
          message: response?.data?.Message,
          data:  response?.data?.data,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: `getting Order  failed exception`,
      };
    }
  };
  const getOrderDetail = async (orderId:string) => {
    console.log(`OrderService | getOrderDetail`);
    try {
      let response = await axios.get(
        `${ApiContants.BACKEND_API.BASE_API_URL}${ApiContants.BACKEND_API.GETORDERDETAIL}`+orderId
      );
      if (response?.data.status) {
        return {
          status: true,
          message: `order data fetched`,
          data: response?.data?.data,
          orderDetail:response?.data.dataOrderDetail,
        };
      } else {
        return {
          status: false,
          message: `order data not found`,
        };
      }
    } catch (error) {
      return {
        status: false,
        message: `order data not found`,
      };
    }
  };
  
export default {getOrderWaiting,gettingOrder,getOrderDelivering,getOrderDetail}; 
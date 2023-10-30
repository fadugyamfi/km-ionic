import { defineStore } from "pinia";
import AppStorage from "./AppStorage";
import { Order } from "../models/Order";
import { useToastStore } from "./ToastStore";
import axios from "axios";
import { handleAxiosRequestError } from "../utilities";
import { useUserStore } from "./UserStore";


const toastStore = useToastStore();

const storage = new AppStorage();

export const useOrderStore = defineStore('order', {

  state: () => {
    return {
      orders: [
        new Order({
          id: 1,
          businesses_id: 71,
          customer_id: 72,
          start_dt: '2023-10-25 10:00:00',
          created_at: '2023-10-25 10:00:00',
          due_date: '2023-11-01',
          order_status_id: 8,
          order_status: {
            id: 8,
            name: 'Cancelled'
          }
        })
      ] as Order[],
    }
  },

  actions: {
    async fetchPlacedOrders(options = {}) {
      const userStore = useUserStore();

      try {
        const params = {
          customer_id: userStore.activeBusiness?.id,
          limit: 50,
          ...options
        };
        const response = await axios.get('/v2/orders', { params });

        if (response.status === 200) {
          const ordersData = response.data.data;
          this.orders = ordersData.map((data: any) => new Order(data));
        }
      } catch (error) {
        handleAxiosRequestError(error);
      }
    },

    async fetchReceivedOrders(options = {}) {
      try {
        const userStore = useUserStore();

        const params = {
          businesses_id: userStore.activeBusiness?.id,
          limit: 50,
          ...options
        };

        const response = await axios.get('/v2/orders', { params });

        if (response.status === 200) {
          const ordersData = response.data.data;
          this.orders = ordersData.map((data: any) => new Order(data));
        }
      } catch (error) {
        handleAxiosRequestError(error);
      }
    },

    async deleteOrder(orderId: number) {
      try {
        const response = await axios.delete(`/v2/orders/${orderId}`); // Replace with your API endpoint
        if (response.status === 204) {
          this.orders = this.orders.filter((order) => order.id !== orderId);
          toastStore.showSuccess('Order deleted successfully.');
        }
      } catch (error) {
        handleAxiosRequestError(error);
        toastStore.showError('Failed to delete order.');
      }
    },

    async reorderOrder(orderId: number) {
      try {

        const orderToReorder = this.orders.find((order) => order.id === orderId);

        if (!orderToReorder) {
          toastStore.showError('Order not found for reorder.');
          return;
        }


        const newOrderData = {
          businesses_id: orderToReorder.businesses_id,
          customer_id: orderToReorder.customer_id,
        };

        const response = await axios.post('/v2/orders', newOrderData);
        if (response.status === 201) {
          const newOrderData = response.data.data;
          const newOrder = new Order(newOrderData);

          this.orders.push(newOrder);

          toastStore.showSuccess('Order reordered successfully.');
        }
      } catch (error) {
        handleAxiosRequestError(error);
        toastStore.showError('Failed to reorder order.');
      }
    },
  },
});

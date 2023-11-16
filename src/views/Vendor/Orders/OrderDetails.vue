<template>
  <IonPage>
    <section class="ion-padding">
      <IonHeader class="inner-header">
        <IonToolbar class="ion-align-items-center">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/vendor/orders"></IonBackButton>
          </IonButtons>
          <IonTitle size="small" class="fw-bold">
            {{ $t('shopper.orders.orderDetails')}} - #{{ order?.id }}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton v-if="false">
              <IonIcon slot="icon-only" :icon="chatbubbleOutline"></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </section>
    <ion-content>
      <section v-if="loading" class="d-flex ion-justify-content-center ion-padding">
        <IonSpinner name="crescent"></IonSpinner>
      </section>

      <section v-else>
        <OrderImages :order="(order as Order)" />
        <ReceivedOrderItems :order="(order as Order)" />

        <section class="ion-padding-horizontal update-button-section">
          <KolaYellowButton v-if="order?.isPendingApproval()" @click="confirmApproval()">
            <IonSpinner v-if="orderStore.approving" name="crescent"></IonSpinner>
            <IonText>{{ 'Accept Order' }}</IonText>
          </KolaYellowButton>

          <KolaWhiteButton class="ion-margin-top" v-if="order?.isPendingApproval()" @click="confirmCancellation()">
            <IonSpinner v-if="orderStore.cancelling" name="crescent"></IonSpinner>
            <IonText>{{ 'Cancel Order' }}</IonText>
          </KolaWhiteButton>
        </section>

        <OrderStatusHistoryView :order="(order as Order)" />
      </section>

      <ConfirmModal
        :isOpen="showConfirm"
        :description="confirmDescription"
        @confirm="doConfirm()"
        @dismiss="showConfirm = false"
      ></ConfirmModal>
    </ion-content>
  </IonPage>
</template>

<script lang="ts">
import { Order, OrderStatus } from '@/models/Order';
import { IonIcon, IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonButton, IonSpinner, IonText } from '@ionic/vue';
import { IonSelect, IonSelectOption, IonAvatar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import { defineComponent } from 'vue';
import OrdersCard from '@/components/modules/order/OrdersCard.vue';
import UpdateButon from '@/components/modules/order/UpdateButon.vue';
import { mapStores } from 'pinia';
import { useOrderStore } from '@/stores/OrderStore';
import { handleAxiosRequestError } from '@/utilities';
import { chatbubbleOutline } from 'ionicons/icons';
import OrderImages from '@/components/modules/order/OrderImages.vue';
import KolaYellowButton from '@/components/KolaYellowButton.vue';
import OrderStatusHistoryView from '@/components/modules/order/OrderStatusHistoryView.vue';
import KolaWhiteButton from '../../../components/KolaWhiteButton.vue';
import { useUserStore } from '../../../stores/UserStore';
import { useToastStore } from '../../../stores/ToastStore';
import ReceivedOrderItems from '../../../components/modules/order/ReceivedOrderItems.vue';
import ConfirmModal from '../../../components/modals/ConfirmModal.vue';

export default defineComponent({
  components: {
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle, IonPage, IonSelect, IonSelectOption, IonAvatar,
    IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonIcon,
    IonContent,
    OrdersCard,
    UpdateButon,
    IonButton,
    OrderImages,
    IonSpinner,
    KolaYellowButton,
    OrderStatusHistoryView,
    KolaWhiteButton,
    IonText,
    ReceivedOrderItems,
    ConfirmModal
},

  name: 'OrderDetails',

  data() {
    return {
      loading: false,
      approving: false,
      cancelling: false,
      showConfirm: false,
      confirmAction: '',
      confirmDescription: '',
      chatbubbleOutline,
      order: null as Order | null,
    }
  },

  async mounted() {
    await this.loadOrder();
  },

  computed: {
    ...mapStores( useOrderStore, useUserStore, useToastStore ),
  },

  methods: {
    async loadOrder() {
      this.loading = true;
      const order_id = +this.$route.params.id;

      // retrieve the currently loaded order info from the history if available
      this.order = this.orderStore.orders.find((o) => o.id == order_id) as Order;

      // fetch full order info from backend to overwrite the basic data
      try {
        this.order = await this.orderStore.fetchOrder(order_id);
      } catch(error) {
        handleAxiosRequestError(error);
      } finally {
        this.loading = false;
      }
    },

    confirmApproval() {
      this.confirmAction = 'approve';
      this.confirmDescription = 'Are you sure you want approve this order?'
      this.showConfirm = true;
    },

    confirmCancellation() {
      this.confirmAction = 'cancel',
      this.confirmDescription = 'Are you sure you want cancel this order?'
      this.showConfirm = true;
    },

    doConfirm() {
      this.showConfirm = false;

      if( this.confirmAction == 'approve' ) {
        this.approveOrder();
        return;
      }

      this.cancelOrder();
    },

    async approveOrder() {
      try {
        const response = await this.orderStore.approveOrder(this.order as Order);

        this.toastStore.showSuccess( this.$t('vendor.orders.orderHasBeenApproved'), '', 'bottom', 'vendorTabs')
      } catch(error) {
        handleAxiosRequestError(error);
        this.toastStore.showError( this.$t('vendor.orders.anErrorOccured'), '', 'bottom', 'vendorTabs')
      }
    },

    async cancelOrder() {
      try {
        const response = await this.orderStore.cancelOrder(this.order as Order);

        this.toastStore.showSuccess( this.$t('vendor.orders.orderHasBeenCanceled'), '', 'bottom', 'vendorTabs');
        this.$router.back();
      } catch(error) {
        handleAxiosRequestError(error);
        this.toastStore.showError( this.$t('vendor.orders.anErrorOccured'), '', 'bottom', 'vendorTabs')
      }
    }
  }


});
</script>

<style scoped>
.order-card {
  height: 85px;
  padding: 12px 16px;
  background: var(--card-background);
  box-shadow: var(--card-box-shadow);
  border-radius: 8px;
}

.update-button-section {
  margin-top: 2em;
  margin-bottom: 3em;
}
</style>

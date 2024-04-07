<template>
  <IonHeader class="ion-no-border">
    <ion-toolbar>
      <IonTitle>
        <IonText class="welcome">Welcome {{ userStore.activeBusiness?.name }} 👋</IonText>
      </IonTitle>

      <IonButtons slot="end">
        <FavoritesButton></FavoritesButton>
        <CartStatusButton></CartStatusButton>
        <NotificationButton></NotificationButton>
      </IonButtons>
    </ion-toolbar>
    <IonToolbar v-if="showSearch" style="background-color: transparent;">
      <IonSearchbar
            placeholder="Search..."
            class="search-input"
            v-model="productStore.searchTerm"
            @keyup.enter="onSearch($event)"
            @ion-change="onSearch($event)"
        ></IonSearchbar>
    </IonToolbar>
  </IonHeader>
</template>

<script lang="ts">
import { IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonText, IonSearchbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import { mapStores } from 'pinia';
import { useUserStore } from '@/stores/UserStore';
import NotificationButton from '@/components/notifications/NotificationButton.vue';
import FavoritesButton from '@/components/modules/favorites/FavoritesButton.vue';
import { useProductStore } from '@/stores/ProductStore';
import CartStatusButton from '../modules/products/CartStatusButton.vue';

export default defineComponent({

  props: {
    showSearch: {
      default: false,
      type: Boolean
    }
  },

  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonText,
    NotificationButton,
    FavoritesButton,
    IonSearchbar,
    CartStatusButton
},

  computed: {
    ...mapStores(useUserStore, useProductStore)
  },

  methods: {
    onSearch(event: any) {
      this.productStore.setSearchTerm(event.target.value);

      if( this.userStore.isInGuestMode() ) {
        this.$router.push('/guest/search-results')
      } else {
        this.$router.push('/shopper/search-results')
      }
    }
  }
})
</script>

<style lang="scss">
.welcome {
  font-size: 0.75em;
  font-weight: 500;
}
</style>

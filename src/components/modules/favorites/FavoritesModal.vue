<template>
  <section class="ion-padding">
    <ion-header class="inner-header">
      <ion-toolbar>
        <ion-buttons slot="start">
          <IonButton @click="cancel()">
            <IonIcon :icon="close"></IonIcon>
          </IonButton>
        </ion-buttons>
        <ion-title size="small"><b>{{ $t("modules.favorites.title") }}</b></ion-title>
        <ion-buttons slot="end">
          <ion-button @click="refresh()">
            <IonIcon :icon="refreshOutline"></IonIcon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding-top" :fullscreen="true">

      <div class="ion-padding ion-text-center" v-if="favoritesStore.fetching">
        <IonSpinner name="crescent"></IonSpinner>
      </div>

      <main v-else>
        <!-- <NoContent v-if="notificationsStore.notifications.length == 0"></EmptyNotifications> -->

        <section>
          <IonSegment value="personal" mode="ios" v-model="viewing">
            <IonSegmentButton value="brands">
              <IonLabel>{{ $t("modules.favorites.brands") }}</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="products">
              <ion-label>{{ $t("modules.favorites.products") }}</ion-label>
            </IonSegmentButton>
            <IonSegmentButton value="businesses">
              <ion-label>{{ $t("modules.favorites.businesses") }}</ion-label>
            </IonSegmentButton>
          </IonSegment>


          <IonList lines="none">
            <template v-if="viewing == 'products'">
              <FavoritedItem
                v-for="favorite in favoritesStore.getFavoriteProducts()"
                :favorite="favorite"
                :key="(favorite.id as number)"
                :router-link="`/shopper/products/${favorite.favoritable_id}`"
                :button="true"
                @click="cancel()"
              >
              </FavoritedItem>
            </template>

            <template v-if="viewing == 'brands'">
              <FavoritedItem
                v-for="favorite in favoritesStore.getFavoriteBrands()"
                :favorite="favorite"
                :key="(favorite.id as number)"
                :router-link="`/shopper/home/brands/${favorite.favoritable_id}`"
                :button="true"
                @click="cancel()"
              >
              </FavoritedItem>
            </template>

            <template v-if="viewing == 'businesses'">
              <FavoritedItem
                v-for="favorite in favoritesStore.getFavoriteBusinesses()"
                :favorite="favorite"
                :key="(favorite.id as number)"
                :router-link="`/shopper/home/businesses/${favorite.favoritable_id}`"
                :button="true"
                @click="cancel()"
              >
              </FavoritedItem>
            </template>
          </IonList>
        </section>
      </main>


    </ion-content>
  </section>
</template>

<script lang="ts">
import {
  IonButtons,
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonLabel,
  modalController,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonList,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { arrowBack, close, refreshOutline } from 'ionicons/icons'
import { OverlayEventDetail } from '@ionic/core/components';
import { mapStores } from 'pinia';
import { useFavoritesStore } from '@/stores/FavoritesStore';
import FavoritedItem from '@/components/modules/favorites/FavoritedItem.vue';

export default defineComponent({

  components: {
    IonButtons,
    IonButton,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonLabel,
    IonIcon,
    IonSegment,
    IonSegmentButton,
    IonSpinner,
    FavoritedItem,
    IonList,
  },

  data() {
    return {
      viewing: 'products',
      name: null,
      close,
      refreshOutline
    }
  },

  computed: {
    ...mapStores(useFavoritesStore)
  },

  methods: {
    refresh() {
      this.favoritesStore.fetchFavorites();
    },

    cancel() {
      modalController.dismiss(null, 'cancel');
    },

    onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
      if (ev.detail.role === 'confirm') {

      }
    }
  },

  mounted() {
    this.favoritesStore.fetchFavorites();
  }
})

</script>

<style scoped lang="scss">
ion-segment {
  ion-segment-button {
    padding-top: 0.4em;
    padding-bottom: 0.4em;
  }
}
</style>

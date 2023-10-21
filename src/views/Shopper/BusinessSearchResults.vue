<template>
  <IonPage>
    <IonHeader class="ion-no-border">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton :icon="close"></IonBackButton>
        </IonButtons>
        <IonTitle size="small">Search Results</IonTitle>
      </IonToolbar>

      <IonToolbar>
        <IonSearchbar
          class="search-input"
          placeholder="Search..."
          :debounce="2000"
          @ion-change="onSearch"
          @ion-input="onSearch"
        ></IonSearchbar>
      </IonToolbar>
    </IonHeader>

    <IonContent>
      <section v-if="!businesses">
        <IonSkeletonText :animated="true"></IonSkeletonText>
        <IonSkeletonText :animated="true"></IonSkeletonText>
      </section>

      <IonGrid v-if="businesses">
        <IonRow>
          <IonCol size="6" v-for="business in businesses" :key="business.id">
            <BusinessCard :business="business"></BusinessCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import { IonBackButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonSearchbar, IonSkeletonText, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import { close } from 'ionicons/icons';
import Business from '@/models/Business';
import { mapStores } from 'pinia';
import { useBusinessStore } from '@/stores/BusinessStore';
import BusinessCard from '@/components/cards/BusinessCard.vue';

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonSearchbar,
    IonSkeletonText,
    BusinessCard,
    IonGrid,
    IonRow,
    IonCol,
  },

  data() {
    return {
      close,
      businesses: null as Business[] | null,
    };
  },

  computed: {
    ...mapStores(useBusinessStore),
  },

  methods: {
    async fetchSearchedBusinesses() {
      try {
        this.businesses = await this.businessStore.fetchSearchedBusinesses();
      } catch (error) {
        console.log(error);
      }
    },

    onSearch(event: any) {
      this.businessStore.searchTerm = event.target?.value;
      this.businesses = null;
      this.fetchSearchedBusinesses();
    },

    viewBusiness(business: Business) {
      this.$router.push(`/shopper/businesses/${business.id}`);
    },
  },

  mounted() {
    this.fetchSearchedBusinesses();
  },
});
</script>

<style scoped lang="scss">
main {
  border-radius: 10px;
  background-color: white;
  margin-top: 15px;
  border: solid #f9f9f9 1px;
  padding: 10px;

  .title-section {
    font-size: 0.8em;
    font-weight: bold;

    .price {
      text-align: right;
      min-width: 80px;
    }
  }
}

ion-grid {
  --ion-grid-padding: 2px;

  ion-col {
    padding-left: 1px;
    padding-right: 1px;
  }
}
</style>

<template>
  <section class="business-list d-flex">
    <section v-if="leftColumnItems.length > 0" class="d-flex flex-column ion-align-items-stretch">
      <BusinessCard
        class="ion-margin-bottom"
        v-for="(business, index) of leftColumnItems"
        :key="business.id"
        :business="business"
        :tall="index % 2 === 0"
        @click="onBusinessSelected(business)"
        :data-index="index"
      ></BusinessCard>
    </section>

    <section v-if="rightColumnItems.length > 0" class="d-flex flex-column ion-align-items-stretch">
      <BusinessCard
        class="ion-margin-bottom"
        v-for="(business, index) of rightColumnItems"
        :key="business.id"
        :business="business"
        :tall="index % 2 !== 0"
        @click="onBusinessSelected(business)"
        :data-index="index"
      ></BusinessCard>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Business from '@/models/Business';
import BusinessCard from './BusinessCard.vue';
import { IonSpinner } from '@ionic/vue';
import { mapStores } from 'pinia';
import { useBusinessStore } from '../../../stores/BusinessStore';
export default defineComponent({
  props: {
    businesses: {
      default: [],
      type: Array as PropType<Array<Business>>,
    },
  },

  data() {
    return {
      leftColumnItems: [] as Array<Business>,
      rightColumnItems: [] as Array<Business>,
    };
  },

  components: { BusinessCard, IonSpinner },

  computed: {
    ...mapStores( useBusinessStore )
  },

  methods: {
    fillColumns() {
      this.leftColumnItems = this.businesses.filter((business, index) => index % 2 === 0);
      this.rightColumnItems = this.businesses.filter((business, index) => index % 2 !== 0);
    },

    onBusinessSelected(business: Business) {
      this.businessStore.selectToView(business);
      setTimeout(() => {
        this.$router.push(`/shopper/home/businesses/${business.id}`);
      }, 100);
    },
  },

  watch: {
    businesses: function(newBusinesses, oldBusiness) {
      if( newBusinesses ) {
        this.fillColumns();
      }
    }
  }
});
</script>

<style lang="scss">
.business-list {
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding-left: 10px;
  padding-right: 10px;

  .flex-column {
    width: 48%;
  }
}
</style>

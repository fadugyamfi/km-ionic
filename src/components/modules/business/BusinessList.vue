<template>
  <section class="business-list d-flex">
    <IonSpinner name="crescent" v-if="leftColumnItems.length == 0"></IonSpinner>

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
import { IonSearchbar } from '@ionic/vue'
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

  methods: {
    fillColumns() {
      this.leftColumnItems = this.businesses.filter((business, index) => index % 2 === 0);
      this.rightColumnItems = this.businesses.filter((business, index) => index % 2 !== 0);
      console.log(this.leftColumnItems, this.rightColumnItems)
    },

    onBusinessSelected(business: Business) {
      this.$router.push(`/shopper/home/businesses/${business.id}`);
    },
  },

  watch: {
    businesses: function(newBusiness, oldBusiness) {
      if( newBusiness ) {
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

<template>
  <ion-page>
    <IonHeader class="ion-padding ion-no-border">
      <ion-header class="inner-header">
        <ion-toolbar class="ion-align-items-center">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/shopper/profile"></ion-back-button>
          </ion-buttons>

          <IonTitle size="small" class="fw-bold">{{
            $t("profile.accountActivity.accountActivitys")
          }}</IonTitle>
        </ion-toolbar>
      </ion-header>

      <IonToolbar>
        <IonSegment
          value="today"
          mode="ios"
          @ionChange="onSegmentChanged($event)"
        >
          <IonSegmentButton value="today">
            <IonLabel>
              {{ $t("general.today") }}
            </IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="month">
            <IonLabel>
              {{ $t("general.month") }}
            </IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="year">
            <IonLabel>
              {{ $t("general.year") }}
            </IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonToolbar>
    </IonHeader>
    <ion-content :fullscreen="true" class="ion-padding-horizontal">
      <div class="ion-padding ion-text-center" v-show="fetching">
        <IonSpinner name="crescent"></IonSpinner>
      </div>
      <!-- <section>
        <div v-show="selectedOption === 'today'">
          <IonText>{{ $t("general.today") }} </IonText>
        </div>
        <div v-show="selectedOption === 'month'">
          <IonText>{{ $t("general.month") }}</IonText>
        </div>
        <div v-show="selectedOption === 'year'">
          <IonText>{{ $t("general.year") }}</IonText>
        </div>
      </section> -->

      <section v-show="!fetching">
        <NoResults v-if="accountActivities.length === 0"></NoResults>
        <AccountActivityList
          v-for="activity in accountActivities"
          :key="activity.id"
          :activity="activity"
        />
      </section>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonSegmentButton,
  IonSegment,
  IonLabel,
  IonButtons,
  IonBackButton,
  IonBadge,
  IonTitle,
  IonButton,
  IonIcon,
  IonSpinner,
  IonText,
} from "@ionic/vue";

import { useUserStore } from "@/stores/UserStore";
import { defineComponent } from "vue";
import { useOrderStore } from "@/stores/OrderStore";
import AccountActivityList from "@/components/modules/accountActivity/AccountActivityList.vue";
import NoResults from "@/components/layout/NoResults.vue";
import {
  search,
  arrowBack,
  ellipsisHorizontal,
  filter,
  optionsOutline,
  add,
} from "ionicons/icons";
import { mapStores } from "pinia";
import filters from "@/utilities/Filters";
import { formatMySQLDateTime, handleAxiosRequestError } from "@/utilities";

export default defineComponent({
  data() {
    return {
      search,
      arrowBack,
      ellipsisHorizontal,
      filter,
      optionsOutline,
      selectedOption: "today",
      add,
      fetching: false,
      filters,
      searchFilters: {
        start_dt: "",
        end_dt: "",
      },
      accountActivities: [] as any,
    };
  },
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    IonSegmentButton,
    IonSegment,
    IonLabel,
    IonButtons,
    IonBackButton,
    IonBadge,
    IonTitle,
    IonButton,
    IonIcon,
    IonSpinner,
    AccountActivityList,
    IonText,
    NoResults,
  },
  computed: {
    ...mapStores(useOrderStore, useUserStore),
  },
  methods: {

    async fetchUserAccountActivities() {
      try{
        this.fetching = true;
        this.accountActivities = await this.userStore.getUserAccountActivities( this.searchFilters);
      }catch(error){
        handleAxiosRequestError(error)
      }finally {
        this.fetching = false;
      }
     
    },

    onSegmentChanged(event: CustomEvent) {
      let start_dt = new Date();
      let end_dt = new Date();
      this.selectedOption = event.detail.value;
      const option = event.detail.value;

      switch (option) {
        case "month":
          start_dt.setMonth(start_dt.getMonth() - 1);
          break;

        case "today":
          start_dt.setDate(start_dt.getDate() - 1);
          break;

        case "year":
          start_dt.setFullYear(start_dt.getFullYear() - 1);
          break;
      }

      this.searchFilters.start_dt = formatMySQLDateTime(start_dt.toISOString());
      this.searchFilters.end_dt = formatMySQLDateTime(end_dt.toISOString());

      this.fetchUserAccountActivities();
    },
  },
  mounted() {
    this.onSegmentChanged(new CustomEvent("load", { detail: { value: "today" } })
      
    );
  },
});
</script>

<style scoped>
.ion-content {
  --align-items: center;
  --padding-top: 10px;
  --padding-bottom: 10px;
  --padding-left: 10px;
  --padding-right: 10px;
  --text-align: justify;
  --white-space: normal;
  --border-radius: 10px;
}

.ion-segment-button {
  --padding-top: 10px;
  --padding-bottom: 10px;
  --padding-left: 10px;
  --padding-right: 10px;
}
ion-item {
  padding: 0px 0px 0;
}


</style>

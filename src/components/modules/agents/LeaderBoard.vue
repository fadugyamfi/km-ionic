<template>
  <section>
    <div class="ion-padding ion-text-center" v-show="fetching">
      <IonSpinner name="crescent"></IonSpinner>
    </div>
  </section>
  <section
    v-if="!fetching"
    class="d-flex ion-justify-content-around ion-margin-bottom top-three"
    style="position: relative; margin-top: 50px"
  >
    <div class="not-winner">
      <Image class="star" src="/images/star.svg"></Image>
      <ProfileAvatar
        :image="topThree[2]?.photo"
        :username="topThree[2]?.name"
      />
      <section class="details">
        <h6>{{ topThree[2]?.name }}</h6>
        <IonText>{{
          Filters.currency(topThree[2]?.total_sales_value || 0)
        }}</IonText>
      </section>
    </div>
    <div class="winner">
      <Image class="star" src="/images/star-1.svg"></Image>
      <ProfileAvatar
        :image="topThree[0]?.photo"
        :username="topThree[0]?.name"
        size="l"
      />
      <section class="details">
        <h6>{{ topThree[0]?.name }}</h6>
        <IonText>{{
          Filters.currency(topThree[0]?.total_sales_value || 0)
        }}</IonText>
      </section>
    </div>
    <div class="not-winner">
      <Image class="star" src="/images/star-2.svg"></Image>
      <ProfileAvatar
        :image="topThree[1]?.photo"
        :username="topThree[1]?.name"
      />
      <section class="details">
        <h6>{{ topThree[1]?.name }}</h6>
        <IonText>
          {{ Filters.currency(topThree[1]?.total_sales_value || 0) }}</IonText
        >
      </section>
    </div>
  </section>
  <section class="ion-padding-horizontal">
    <IonSegment
      value="pastmonth"
      mode="ios"
      @ionChange="onSegmentChanged($event)"
    >
      <IonSegmentButton value="thisweek">
        <IonLabel>{{ $t("general.thisWeek") }}</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="pastmonth">
        <section>
          <IonLabel>{{ $t("general.thisMonth") }}</IonLabel>
        </section>
      </IonSegmentButton>
      <IonSegmentButton value="alltime">
        <IonLabel>
          {{ $t("general.allTime") }}
        </IonLabel>
      </IonSegmentButton>
    </IonSegment>
  </section>
  <section>
    <div class="ion-padding ion-text-center" v-show="fetching">
      <IonSpinner name="crescent"></IonSpinner>
    </div>
  </section>
  <section v-if="!fetching">
    <LeadersList :topPerfomingAgents="remaining" />
  </section>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import ProfileAvatar from "@/components/ProfileAvatar.vue";
import Image from "@/components/Image.vue";
import { formatMySQLDateTime, handleAxiosRequestError } from "@/utilities";
import LeadersList from "@/components/modules/agents/LeadersList.vue";
import {
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonText,
} from "@ionic/vue";
import User from "@/models/User";
import TopPerformingAgent from "@/models/TopPerformingAgent";
import { mapStores } from "pinia";
import { useAgentsStore } from "@/stores/AgentsStore";
import { useUserStore } from "@/stores/UserStore";
import Business from "@/models/Business";
import Filters from "@/utilities/Filters";

export default defineComponent({
  components: {
    ProfileAvatar,
    Image,
    IonLabel,
    IonSegment,
    IonSegmentButton,
    LeadersList,
    IonSpinner,
    IonText,
  },
  data() {
    return {
      searchFilters: {
        start_dt: "",
        end_dt: "",
      },
      thisMonth: true,
      fetching: false,
      topPerformingAgents: [] as TopPerformingAgent[],
      topThree: [] as TopPerformingAgent[],
      remaining: [] as TopPerformingAgent[],
      Filters,
    };
  },
  computed: {
    ...mapStores(useAgentsStore, useUserStore),
  },
  methods: {
    onSegmentChanged(event: CustomEvent) {
      let start_dt = new Date();
      let end_dt = new Date();
      const option = event.detail.value;

      switch (option) {
        case "pastmonth":
          start_dt.setMonth(start_dt.getMonth() - 1);
          this.thisMonth = true;
          break;

        case "alltime":
          start_dt.setFullYear(start_dt.getFullYear() - 1);
          this.thisMonth = false;
          break;

        case "thisweek":
          start_dt.setDate(start_dt.getDate() - 7);
          this.thisMonth = false;
          break;
      }

      this.searchFilters.start_dt = formatMySQLDateTime(start_dt.toISOString());
      this.searchFilters.end_dt = formatMySQLDateTime(end_dt.toISOString());

      this.fetchTopPerformingAgents();
    },
    async fetchTopPerformingAgents() {
      this.fetching = true;
      this.topPerformingAgents =
        await this.agentsStore.fetchTopPerformingAgents(
          this.userStore.activeBusiness as Business,
          10,
          this.searchFilters
        );
      this.topThree = [...this.topPerformingAgents].splice(0, 3);
      this.remaining = this.topPerformingAgents.slice(3);
      this.fetching = false;
    },
  },
  mounted() {
    this.onSegmentChanged(
      new CustomEvent("load", { detail: { value: "pastmonth" } })
    );
    this.fetchTopPerformingAgents();
  },
});
</script>
<style lang="scss" scoped>
.star {
  width: 40px;
}
.details {
  display: flex;
  flex-direction: column;
  align-items: center;
  h6 {
    margin: 0px;
    font-size: 12px;
  }
  ion-text {
    font-size: 12px;
    color: #036;
  }
}
.winner {
  position: absolute;
  top: -50px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.not-winner {
  display: flex;
  flex-direction: column;
  align-items: center;

  &:nth-child(1) {
    margin: 0 auto 0 0;
  }
  &:last-child {
    margin: 0 0 0 auto;
  }
}
ion-segment {
  ion-segment-button {
    padding-top: 0.4em;
    padding-bottom: 0.4em;
  }
}
.top-three {
  margin: 0 30px 24px 30px;
}
</style>

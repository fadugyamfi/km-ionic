<template>
  <section
    class="d-flex ion-justify-content-around ion-margin-bottom top-three"
    style="position: relative; margin-top: 50px"
  >
    <div class="not-winner" v-if="topThree[2]">
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
    <div class="winner" v-if="topThree[0]">
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
    <div class="not-winner" v-if="topThree[1]">
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
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import ProfileAvatar from "@/components/ProfileAvatar.vue";
import Image from "@/components/Image.vue";
import { formatMySQLDateTime, handleAxiosRequestError } from "@/utilities";
import {
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonText,
} from "@ionic/vue";
import User from "@/models/User";
import TopPerformingAgent from "@/models/TopPerformingAgent";
import Filters from "@/utilities/Filters";

export default defineComponent({
  components: {
    ProfileAvatar,
    Image,
    IonLabel,
    IonSegment,
    IonSegmentButton,
    IonSpinner,
    IonText,
  },
  props: {
    topThree: {
      type: Array as PropType<TopPerformingAgent[]>,
      required: true,
    },
  },
  data() {
    return {
      Filters,
    };
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
  height: 140px;
}
</style>

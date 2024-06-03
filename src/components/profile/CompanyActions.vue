<template>
  <section style="width: 100%" class="font-medium">
    <IonItem lines="none" class="profile-item ion-margin-top">
      <ProfileAvatar
        slot="start"
        :image="userStore.activeBusiness?.logo"
        :username="userStore.activeBusiness?.name"
        customSize="32px"
      ></ProfileAvatar>
      <IonLabel>{{ userStore.activeBusiness?.name }}</IonLabel>
      <IonSpinner v-if="fetching" slot="end" name="crescent"></IonSpinner>
    </IonItem>

    <IonList lines="none">
      <IonItem
        v-if="userStore.user?.isOwner()"
        :detail="true"
        :button="true"
        class="profile-item"
        router-link="/profile/company/edit-profile"
      >
        <IonAvatar slot="start">
          <img src="/images/ic_user.svg" class="action-img" />
        </IonAvatar>
        <IonLabel>Company Profile</IonLabel>
      </IonItem>

      <IonItem
        :detail="true"
        :button="true"
        class="profile-item"
        router-link="/profile/company/customers"
      >
        <IonAvatar slot="start">
          <IonIcon :icon="peopleOutline" style="font-size: 21px"></IonIcon>
        </IonAvatar>
        <IonLabel>Customers</IonLabel>
      </IonItem>

      <IonItem
        v-if="userStore.user?.isOwner()"
        :detail="true"
        :button="true"
        class="profile-item"
        router-link="/profile/company/stocks"
      >
        <IonAvatar slot="start">
          <IonIcon :icon="bagOutline" style="font-size: 21px"></IonIcon>
        </IonAvatar>
        <IonLabel>Stock</IonLabel>
      </IonItem>
      <IonItem
        v-if="!userStore.user?.isOwner()"
        :detail="true"
        :button="true"
        class="profile-item"
        router-link="/profile/company/agent/stocks"
      >
        <IonAvatar slot="start">
          <IonIcon :icon="bagOutline" style="font-size: 21px"></IonIcon>
        </IonAvatar>
        <IonLabel>My Stock</IonLabel>
      </IonItem>

      <IonItem
        v-if="userStore.user?.isOwner()"
        :detail="true"
        :button="true"
        class="profile-item"
        router-link="/profile/company/team"
      >
        <IonAvatar slot="start">
          <img src="/images/ic_user.svg" class="action-img" />
        </IonAvatar>
        <IonLabel>Team</IonLabel>
      </IonItem>

      <IonItem
        v-if="userStore.user?.isOwner()"
        :detail="true"
        class="profile-item"
        router-link="/profile/company/add-business"
      >
        <IonAvatar slot="start">
          <IonIcon :icon="briefcaseOutline" style="font-size: 21px"></IonIcon>
        </IonAvatar>
        <IonLabel>Add Business</IonLabel>
      </IonItem>
      <IonItem
        v-if="userStore.user?.isOwner() && !hasAppliedToSell"
        :detail="true"
        class="profile-item"
        router-link="/profile/company/summary"
      >
        <IonAvatar slot="start">
          <IonIcon :icon="bagOutline" style="font-size: 21px"></IonIcon>
        </IonAvatar>
        <IonLabel>Become a Seller</IonLabel>
      </IonItem>
      <IonItem
        v-if="userStore.user?.isOwner()"
        :detail="true"
        class="profile-item"
        router-link="/profile/company/sale-agents"
      >
        <IonAvatar slot="start">
          <IonIcon :icon="personAddOutline" style="font-size: 21px"></IonIcon>
        </IonAvatar>
        <IonLabel>Agents</IonLabel>
      </IonItem>

      <IonItem
        :detail="true"
        :button="true"
        class="profile-item"
        @click="onAddSale()"
      >
        <IonAvatar slot="start">
          <IonIcon :icon="addCircleOutline" style="font-size: 21px"></IonIcon>
        </IonAvatar>
        <IonLabel>Add Sale</IonLabel>
      </IonItem>

      <IonItem
        :detail="true"
        :button="true"
        class="profile-item"
        :disabled="false"
        @click="showFilterSheet = true"
      >
        <IonAvatar slot="start">
          <IonIcon
            :icon="swapHorizontalOutline"
            style="font-size: 21px"
          ></IonIcon>
        </IonAvatar>
        <IonLabel
          >Switch
          {{ userStore.user?.isOwner() ? "Business" : "Teams" }}</IonLabel
        >
      </IonItem>
    </IonList>

    <section class="shopper-home-section" v-if="canToggleModes">
      <ModeToggleCard
        style="margin-left: 0px; margin-right: 0px"
      ></ModeToggleCard>
    </section>

    <GeneralActions></GeneralActions>

    <SwitchBusinessSheet
      :isOpen="showFilterSheet"
      @didDismiss="showFilterSheet = false"
    >
    </SwitchBusinessSheet>
  </section>
</template>

<script lang="ts">
import {
  IonIcon,
  IonLabel,
  IonItem,
  IonAvatar,
  IonList,
  IonSpinner,
} from "@ionic/vue";
import { computed, defineComponent } from "vue";
import { useUserStore } from "@/stores/UserStore";
import { mapStores } from "pinia";
import {
  search,
  createOutline,
  repeatOutline,
  briefcaseOutline,
  bagOutline,
  swapHorizontalOutline,
  addCircleOutline,
  personAddOutline,
  peopleOutline,
} from "ionicons/icons";
import ProfileAvatar from "../ProfileAvatar.vue";
import SwitchBusinessSheet from "@/components/modules/SwitchBusinessSheet.vue";
import ModeToggleCard from "../cards/ModeToggleCard.vue";
import GeneralActions from "./GeneralActions.vue";

export default defineComponent({
  components: {
    IonList,
    IonAvatar,
    IonItem,
    IonLabel,
    IonIcon,
    ProfileAvatar,
    SwitchBusinessSheet,
    ModeToggleCard,
    GeneralActions,
    IonSpinner,
  },

  computed: {
    ...mapStores(useUserStore),

    canToggleModes() {
      return (
        !this.userStore.user?.isSalesAssociate() &&
        !this.userStore.user?.isSalesManager()
      );
    },

    hasAppliedToSell() {
      return (
        this.userStore.activeBusiness?.attributes?.applied_to?.length > 0 ||
        this.userStore?.activeBusiness?.approved_vendor != 0
      );
    },

    stockPath() {
      return this.userStore.user?.isOwner()
        ? "/profile/company/stocks"
        : "/profile/company/agent/stocks";
    },
  },

  data() {
    return {
      createOutline,
      repeatOutline,
      peopleOutline,
      addCircleOutline,
      swapHorizontalOutline,
      bagOutline,
      personAddOutline,
      briefcaseOutline,
      search,
      showFilterSheet: false,
      fetching: false,
    };
  },

  methods: {
    onAddSale() {
      if (this.userStore.appMode == "shopping") {
        this.userStore.toggleAppMode();
      }

      this.$router.replace("/vendor/sales/add-sale/select-agent");
    },
  },

  async mounted() {
    if (!this.userStore.activeBusiness) {
      this.fetching = true;
      // await this.userStore.refreshUserBusinesses();
      await this.userStore.fetchUserInfo();
      this.fetching = false;
    }
  },
});
</script>

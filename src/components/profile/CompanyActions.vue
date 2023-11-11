<template>
  <section>
    <IonItem lines="none" class="profile-item ion-margin-top">
      <ProfileAvatar slot="start" :image="userStore.activeBusiness?.logo" :username="userStore.activeBusiness?.name" customSize="32px"></ProfileAvatar>
      <IonLabel>{{ userStore.activeBusiness?.name }}</IonLabel>
      <IonIcon slot="end" :icon="createOutline"></IonIcon>
    </IonItem>

    <IonList lines="none">
      <IonItem :detail="true" class="profile-item">
        <IonAvatar slot="start">
          <img src="/images/ic_location.svg" class="action-img" />
        </IonAvatar>
        <IonLabel>Company Profile</IonLabel>
      </IonItem>

      <IonItem
        :detail="true"
        class="profile-item"
        router-link="/profile/company/customers"
      >
        <IonAvatar slot="start">
          <img src="/images/ic_password.svg" class="action-img" />
        </IonAvatar>
        <IonLabel>Customers</IonLabel>
      </IonItem>

      <IonItem
        :detail="true"
        class="profile-item"
        router-link="/profile/company/stocks"
      >
        <IonAvatar slot="start">
          <img src="/images/ic_notification.svg" class="action-img" />
        </IonAvatar>
        <IonLabel>Stock</IonLabel>
      </IonItem>

      <IonItem :detail="true" class="profile-item">
        <IonAvatar slot="start">
          <img src="/images/ic_user.svg" class="action-img" />
        </IonAvatar>
        <IonLabel>Team</IonLabel>
      </IonItem>

      <IonItem :detail="true" class="profile-item">
        <IonAvatar slot="start">
          <img src="/images/ic_help_support.svg" class="action-img" />
        </IonAvatar>
        <IonLabel>Agents</IonLabel>
      </IonItem>

      <IonItem :detail="true" class="profile-item">
        <IonAvatar slot="start">
          <img src="/images/ic_help_support.svg" class="action-img" />
        </IonAvatar>
        <IonLabel>Add Sale</IonLabel>
      </IonItem>

      <IonItem :detail="true" class="profile-item">
        <IonAvatar slot="start">
          <img src="/images/ic_help_support.svg" class="action-img" />
        </IonAvatar>
        <IonLabel>Switch Business</IonLabel>
      </IonItem>
    </IonList>
  </section>
</template>

<script lang="ts">
import { IonIcon, IonLabel, IonItem, IonAvatar, IonList } from "@ionic/vue";
import { computed, defineComponent } from "vue";
import { useUserStore } from "@/stores/UserStore";
import { mapStores } from "pinia";
import { search, createOutline } from "ionicons/icons";
import ProfileAvatar from "../ProfileAvatar.vue";

export default defineComponent({
  components: { IonList, IonAvatar, IonItem, IonLabel, IonIcon, ProfileAvatar },

  computed: {
    ...mapStores(useUserStore),
  },

  data() {
    return {
      createOutline,
      search,
    };
  },
});
</script>

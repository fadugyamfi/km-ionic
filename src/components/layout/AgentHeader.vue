<template>
  <IonHeader class="ion-no-border">
    <ion-toolbar>
      <IonTitle>
        <IonText class="welcome">
          {{ $t("general.welcome") }} {{ userStore.user?.name }} 👋
        </IonText>
      </IonTitle>

      <IonButtons slot="end">
        <IonButton @click="$emit('openFilterSheet')">
          <IonIcon :icon="optionsOutline"></IonIcon>
        </IonButton>
        <NotificationButton></NotificationButton>
      </IonButtons>
    </ion-toolbar>
    <IonToolbar v-if="showSearch" style="background-color: transparent">
      <IonSearchbar
        placeholder="Search..."
        class="search-input"
        @keyup.enter="onSearch($event)"
        @ion-change="onSearch($event)"
      ></IonSearchbar>
    </IonToolbar>
  </IonHeader>
</template>

<script lang="ts">
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonText,
  IonSearchbar,
} from "@ionic/vue";
import { optionsOutline } from "ionicons/icons";
import { defineComponent } from "vue";
import { mapStores } from "pinia";
import { useUserStore } from "@/stores/UserStore";
import NotificationButton from "@/components/notifications/NotificationButton.vue";
import { useProductStore } from "../../stores/ProductStore";

export default defineComponent({
  props: {
    showSearch: {
      default: false,
      type: Boolean,
    },
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
    IonSearchbar,
  },

  computed: {
    ...mapStores(useUserStore),
  },

  data() {
    return {
      optionsOutline,
    };
  },

  methods: {
    onSearch(event: any) {
      const productStore = useProductStore();
      productStore.searchTerm = event.target.value;
      this.$router.push("/shopper/search-results");
    },
  },
});
</script>

<style lang="scss">
.welcome {
  font-size: 0.8em;
  font-weight: 500;
}
</style>

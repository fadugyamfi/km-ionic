<template>
  <IonButton
    @click="inviteCustomer()"
    expand="block"
    class="invite-customer ion-margin-bottom"
  >
    {{ $t("vendor.home.inviteCustomers") }}
  </IonButton>
</template>
<script lang="ts">
import { IonButton } from "@ionic/vue";
import { Share } from "@capacitor/share";
import { defineComponent } from "vue";
import { useUserStore } from "@/stores/UserStore";
import { mapStores } from "pinia";
import { isPlatform } from "@ionic/vue";
export default defineComponent({
  data() {
    return {};
  },

  components: {
    IonButton,
  },

  computed: {
    ...mapStores(useUserStore),
    downloadUrl() {
      if (isPlatform("ios")) {
        return "https://m.kola.market/";
      } else if (isPlatform("android")) {
        return "https://play.google.com/store/apps/details?id=com.kola.market.androidApp&pli=1";
      } else {
        return "https://m.kola.market/";
      }
    },
  },
  methods: {
    async inviteCustomer() {
      const response = await Share.share({
        title: `${this.userStore.activeBusiness?.name} on Kola Market`,
        text: `Hi, this is ${this.userStore.activeBusiness?.name} on Kola Market. Follow this link to place your orders with us and enjoy express delivery.`,
        url: this.downloadUrl,
      });
    },
  },
});
</script>
<style scoped>
.invite-customer {
  --background: #66f48e;
  --padding-top: 16px;
  --padding-bottom: 16px;
  --color: #101828;
  --border-radius: 0.8em;
  --box-shadow: none;
  text-transform: none;
  font-weight: 600;
  font-size: 0.85em;
}
</style>

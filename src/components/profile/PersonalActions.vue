<template>
  <section style="width: 100%;" class="font-medium">
    <IonItem lines="none" class="profile-item ion-margin-top" router-link="/profile/personal/edit-profile" :button="true">
      <ProfileAvatar slot="start" :image="userStore.user?.photo" :username="userStore.user?.name" customSize="32px">
      </ProfileAvatar>

      <IonLabel>{{ userStore.user?.name }}</IonLabel>
      <IonIcon slot="end" :icon="createOutline"></IonIcon>
    </IonItem>

    <IonList lines="none">
      <IonItem :detail="true" :button="true" class="profile-item" :disabled="false" router-link="/profile/address">
        <IonAvatar slot="start">
          <img src="/images/ic_location.svg" class="action-img" />
        </IonAvatar>
        <IonLabel>Address</IonLabel>
      </IonItem>

      <IonItem :detail="true" :button="true" class="profile-item" router-link="/profile/personal/reset-pin">
        <IonAvatar slot="start">
          <img src="/images/ic_password.svg" class="action-img" />
        </IonAvatar>
        <IonLabel>Reset Pin</IonLabel>
      </IonItem>

      <IonItem :detail="true" :button="true" class="profile-item" @click="showNotifications()">
        <IonAvatar slot="start">
          <img src="/images/ic_notification.svg" class="action-img" />
        </IonAvatar>
        <IonLabel>Notifications</IonLabel>
      </IonItem>

      <IonItem :detail="true" :button="true" class="profile-item" :disabled="false"
               router-link="/profile/account-activity">
        <IonAvatar slot="start">
          <img src="/images/ic_user.svg" class="action-img" />
        </IonAvatar>
        <IonLabel>Account Activity</IonLabel>
      </IonItem>

      <IonItem :detail="true" :button="true" class="profile-item" :disabled="false"
               @click="showFavorites()">
        <IonAvatar slot="start">
          <IonIcon :icon="heartOutline" style="font-size: 21px"></IonIcon>
        </IonAvatar>
        <IonLabel>Your Favorites</IonLabel>
      </IonItem>

      <!-- <IonItem
        :detail="true"
        :button="true"
        class="profile-item"
        @click="openWhatsAppChat()"
      >
        <IonAvatar slot="start">
          <img src="/images/ic_help_support.svg" class="action-img" />
        </IonAvatar>
        <IonLabel>Help & Support</IonLabel>
      </IonItem>

      <hr />

      <IonItem
        :detail="true"
        :button="true"
        class="profile-item"
        @click="openSettings()"
      >
        <IonAvatar slot="start">
          <IonIcon :icon="settingsOutline" style="font-size: 21px"></IonIcon>
        </IonAvatar>
        <IonLabel>Settings</IonLabel>
      </IonItem>


      <IonItem
        :detail="true"
        :button="true"
        class="profile-item"
        @click="logout()"
      >
        <IonAvatar slot="start">
          <IonIcon :icon="powerOutline" style="font-size: 21px"></IonIcon>
        </IonAvatar>
        <IonLabel>Log Out</IonLabel>
      </IonItem>

      <IonItem
        :detail="true"
        :button="true"
        class="profile-item" style="margin-top: 2em;"
        @click="deleteAccount()"
      >
        <IonAvatar slot="start">
          <IonIcon
            color="danger"
            :icon="trashOutline"
            style="font-size: 21px"
          ></IonIcon>
        </IonAvatar>
        <IonLabel color="danger">Delete Account</IonLabel>
      </IonItem> -->
    </IonList>

    <section class="shopper-home-section" v-if="canToggleModes">
      <ModeToggleCard style="margin-left: 0px; margin-right: 0px;"></ModeToggleCard>
    </section>

    <GeneralActions></GeneralActions>

    <!-- <DeleteModal
      title="Delete Account"
      description="You can't undo this action"
      :isOpen="showConfirmDeleteModal"
      @dismiss="showConfirmDeleteModal = false"
      @confirm="onConfirmDelete()"
    ></DeleteModal> -->
  </section>
</template>

<script lang="ts">
import {
  IonIcon,
  IonLabel,
  IonItem,
  IonAvatar,
  IonList,
  modalController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useUserStore } from "@/stores/UserStore";
import { mapStores } from "pinia";
import {
  search,
  createOutline,
  powerOutline,
  settingsOutline,
  trashOutline,
  heartOutline,
} from "ionicons/icons";
import { useRouter } from "vue-router";
import { useToastStore } from "../../stores/ToastStore";
import { handleAxiosRequestError } from "../../utilities";
import { AxiosError } from "axios";
import ProfileAvatar from "@/components/ProfileAvatar.vue";
import NotificationsModal from "@/components/notifications/NotificationsModal.vue";
import SettingsModal from "@/components/modules/settings/SettingsModal.vue";
import DeleteModal from "../modals/DeleteModal.vue";
import ModeToggleCard from "../cards/ModeToggleCard.vue";
import GeneralActions from "./GeneralActions.vue";
import FavoritesModal from "@/components/modules/favorites/FavoritesModal.vue";

export default defineComponent({
  components: {
    IonList,
    IonAvatar,
    IonItem,
    IonLabel,
    IonIcon,
    ProfileAvatar,
    DeleteModal,
    ModeToggleCard,
    GeneralActions
  },

  computed: {
    ...mapStores(useUserStore),

    canToggleModes() {
      return !this.userStore.activeRole?.isSalesAssociate() && !this.userStore.activeRole?.isSalesManager();
    }
  },

  data() {
    const router = useRouter();

    return {
      createOutline,
      powerOutline,
      search,
      router,
      settingsOutline,
      trashOutline,
      heartOutline,
      showConfirmDeleteModal: false,
    };
  },

  methods: {
    logout() {
      const toastStore = useToastStore();
      toastStore.blockUI("Logging Out...");

      this.userStore
        .logout()
        .then(() => {
          this.router.replace("/guest");
        })
        .catch((error: AxiosError) => {
          handleAxiosRequestError(error);

          // account not authenticated
          if (error.response?.status == 403 || error.code == "ERR_NETWORK") {
            this.userStore.clearSessionInfo();
            this.router.replace("/guest");
          }
        })
        .finally(() => toastStore.unblockUI());
    },
    deleteAccount() {
      this.showConfirmDeleteModal = true;
    },
    async onConfirmDelete() {
      const toastStore = useToastStore();
      try {
        this.showConfirmDeleteModal = false;
        toastStore.blockUI("Deleting Account...");
        const response = await this.userStore.deleteUser();
        if (response) {
          this.$router.push("/guest/home");
        }
      } catch (error) {
        handleAxiosRequestError(error);
      } finally {
        toastStore.unblockUI();
      }
    },

    async showNotifications() {
      const modal = await modalController.create({
        component: NotificationsModal,
      });

      modal.present();

      const { data, role } = await modal.onWillDismiss();

      if (role === "confirm") {
        // message.value = `Hello, ${data}!`;
      }
    },

    async showFavorites() {
      const modal = await modalController.create({
        component: FavoritesModal,
      });

      modal.present();

      const { data, role } = await modal.onWillDismiss();

      if (role === "confirm") {
        // message.value = `Hello, ${data}!`;
      }
    },


    async openSettings() {
      const modal = await modalController.create({
        component: SettingsModal,
      });

      modal.present();

      const { data, role } = await modal.onWillDismiss();

      if (role === "confirm") {
        // message.value = `Hello, ${data}!`;
      }
    },
    openWhatsAppChat() {
      window.open("https://wa.me/233270404501", "_system", "location=yes");
    },
  },
});
</script>

<style scoped lang="scss">
hr {
  border-top: solid 1px #f1f1f1;
}
</style>

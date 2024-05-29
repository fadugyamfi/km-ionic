<template>
  <ion-page>
    <section class="ion-padding">
      <AddressHeader />
    </section>
    <IonContent class="ion-padding-horizontal">
      <IonButton
        fill="clear"
        style="text-transform: none"
        class="ion-text-start add-new-item"
        router-link="/profile/address/add-address"
      >
        <IonIcon :icon="addCircleOutline"></IonIcon>
        Add new address
      </IonButton>
      <section
        v-if="fetching"
        class="ion-text-center d-flex ion-justify-content-center ion-padding"
      >
        <IonSpinner name="crescent"></IonSpinner>
      </section>
      <section v-else>
        <IonItem
          v-for="address in businessLocations"
          :key="address.id"
          lines="none"
          class="profile-item d-flex flex-column ion-align-items-start"
        >
          <IonLabel>
            <h6>{{ address?.business?.name }}</h6>
            <p>{{ address?.address }}</p>
            <p>{{ address?.city }}</p>
          </IonLabel>
          <!-- :router-link="`/profile/address/business/${address?.business_id}/location/${address?.id}/edit-address`" -->
          <IonButton
            :id="`popover-button-${address.id}`"
            fill="clear"
            color="dark"
          >
            <ion-icon color="medium" :icon="ellipsisHorizontal"></ion-icon>
          </IonButton>
          <IonPopover
            :trigger="`popover-button-${address.id}`"
            :dismiss-on-select="true"
          >
            <IonContent :scroll-y="false">
              <IonList>
                <IonItem
                  :router-link="`/profile/address/business/${address?.business_id}/location/${address?.id}/edit-address`"
                  lines="full"
                  :button="true"
                  :detail="false"
                >
                  <IonIcon :icon="createOutline"></IonIcon>
                  Update Address
                </IonItem>
                <IonItem
                  lines="none"
                  :button="true"
                  :detail="false"
                  @click="removeAddress(address)"
                >
                  <IonIcon :icon="trashOutline"></IonIcon>
                  Remove Address
                </IonItem>
              </IonList>
            </IonContent>
          </IonPopover>
        </IonItem>
      </section>
      <DeleteModal
        :isOpen="showConfirmRemoveModal"
        @dismiss="showConfirmRemoveModal = false"
        title="Are you sure you want to remove this address?"
        description="This action cannot be undone"
        @confirm="onConfirmDelete()"
      />
    </IonContent>
  </ion-page>
</template>

<script lang="ts">
import {
  IonIcon,
  IonLabel,
  IonItem,
  IonAvatar,
  IonList,
  IonText,
  IonPage,
  IonButton,
  IonContent,
  IonSpinner,
  IonPopover,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useUserStore } from "@/stores/UserStore";
import { mapStores } from "pinia";
import {
  search,
  createOutline,
  powerOutline,
  settingsOutline,
  addCircleOutline,
  ellipsisHorizontal,
  trashOutline,
} from "ionicons/icons";
import ProfileAvatar from "@/components/ProfileAvatar.vue";
import AddressHeader from "@/components/header/AddressHeader.vue";
import { useBusinessStore } from "@/stores/BusinessStore";
import Address from "@/models/Address";
import { handleAxiosRequestError } from "@/utilities";
import { useToastStore } from "@/stores/ToastStore";
import DeleteModal from "@/components/modals/DeleteModal.vue";

export default defineComponent({
  components: {
    IonList,
    IonAvatar,
    IonItem,
    IonLabel,
    IonIcon,
    ProfileAvatar,
    IonText,
    IonButton,
    IonPage,
    AddressHeader,
    IonContent,
    IonSpinner,
    IonPopover,
    DeleteModal,
  },

  computed: {
    ...mapStores(useUserStore, useBusinessStore, useToastStore),

    businessLocations(): Address[] | null {
      return this.businessStore.businessLocations;
    },
  },

  data() {
    return {
      createOutline,
      powerOutline,
      search,
      settingsOutline,
      ellipsisHorizontal,
      addCircleOutline,
      trashOutline,
      fetching: false,
      showConfirmRemoveModal: false,
      selectedAddress: null as Address | null,
    };
  },

  methods: {
    async getBusinessLocations() {
      try {
        this.fetching = true;
        await this.businessStore.getBusinessLocations(
          Number(this.userStore.activeBusiness?.id)
        );
      } catch (error) {
        handleAxiosRequestError(error);
      } finally {
        this.fetching = false;
      }
    },
    removeAddress(address: Address) {
      this.selectedAddress = address;
      this.showConfirmRemoveModal = true;
    },
    async onConfirmDelete() {
      try {
        this.showConfirmRemoveModal = false;
        await this.businessStore.removeBusinessLocation(
          this.selectedAddress as Address,
          Number(this.userStore.activeBusiness?.id)
        );
      } catch (error) {}
    },
  },
  mounted() {
    this.getBusinessLocations();
  },
});
</script>

<style lang="scss" scoped>
ion-badge.badge {
  --background: rgba(245, 170, 41, 0.38);
  --color: #344054;
  margin-left: 8px;
}

ion-item {
  box-shadow: 0px 4px 12px 0px #696f821a;

  ion-label {
    p {
      font-size: 12px;
    }
  }

  ion-popover {
    --width: 220px;
  }

  ion-icon {
    margin-right: 10px;
  }
}
.add-new-item {
  --color: #666eed;

  ion-icon {
    color: #667085;
    margin-right: 5px;
    font-size: 20px;
  }
}
</style>

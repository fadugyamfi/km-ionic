<template>
  <IonModal ref="modal" :initial-breakpoint="0.5" :breakpoints="[0, 0.5, 1]">
    <IonContent class="ion-padding">
      <header class="fw-semibold ion-padding ion-text-center">
        Switch {{ isOwner ? "Business" : "Teams" }}
      </header>
      <main class="ion-padding-vertical">
        <ion-list>
          <ion-item v-for="business in userBusinesses" :key="business.id">
            <ion-toggle
              @ion-change="onToggle($event, business)"
              :checked="activeBusiness?.id == business.id"
              :disabled="!business.name"
              mode="ios"
            >
              <IonLabel>
                {{ business.name || "No business" }}

                <div>
                  <IonText class="font-medium" color="medium">
                    {{ business?.location }}
                  </IonText>
                </div>
              </IonLabel>
            </ion-toggle>
          </ion-item>
        </ion-list>
      </main>
    </IonContent>
  </IonModal>
</template>

<script lang="ts">
import {
  IonContent,
  IonToggle,
  IonModal,
  IonRow,
  IonSelect,
  IonList,
  IonItem,
  IonIcon,
  IonSelectOption,
  IonLabel,
  IonText,
} from "@ionic/vue";
import { defineComponent, PropType } from "vue";
import { chevronDownOutline, chevronUpOutline } from "ionicons/icons";
import { useUserStore } from "@/stores/UserStore";
import { mapStores } from "pinia";
import Business from "@/models/Business";
import { useToastStore } from "@/stores/ToastStore";

export default defineComponent({
  components: {
    IonModal,
    IonContent,
    IonRow,
    IonSelect,
    IonSelectOption,
    IonList,
    IonItem,
    IonIcon,
    IonToggle,
    IonLabel,
    IonText,
  },

  data() {
    return {
      chevronDownOutline,
      chevronUpOutline,
      showQuantitySelector: true,
      checked: true,
    };
  },

  emits: ["update"],
  computed: {
    ...mapStores(useUserStore, useToastStore),
    userBusinesses() {
      return this.userStore.userBusinesses;
    },
    activeBusiness() {
      return this.userStore.activeBusiness;
    },
    isOwner() {
      return this.userStore.activeRole?.isOwner();
    },
  },

  methods: {
    async onToggle(e: any, business: Business) {
      try {
        this.checked = e.detail.checked;
        const isPreviousSalesAssociate =
          this.userStore.activeRole?.isSalesAssociate();
        await this.userStore.setActiveBusiness(business);

        if (!isPreviousSalesAssociate) {
          if (!this.userStore.activeRole?.isSalesAssociate()) {
            return;
          } else {
            this.$router.replace("/agent/home");
          }
        }
        if (isPreviousSalesAssociate) {
          if (this.userStore.activeRole?.isSalesAssociate()) {
            return;
          } else {
            this.$router.replace("/vendor/home");
          }
        }
        if (this.checked) {
          this.$el.dismiss();
          this.toastStore.showSuccess(
            `${
              this.isOwner ? "Teams" : "Company account"
            } switched successfully`,
            "",
            "bottom"
          );
        }
      } catch (error) {
        this.toastStore.showError(
          `Failed to switch ${
            this.isOwner ? "Teams" : "company account"
          }. Please try again`,
          "",
          "bottom",
          "footer"
        );
      }
    },
  },
});
</script>

<style lang="scss" scoped>
header {
  border-bottom: solid #efefef 1px;
}

ion-modal {
  --border-radius: 2em;
}

ion-input {
  --padding-start: 0.4em;
  --padding-end: 0.4em;
}
ion-item {
  --color: #74787c;
  margin-bottom: 5px;
}

ion-toggle {
  --track-background-checked: #f5aa29;
  --handle-background-checked: #fff;
}
</style>

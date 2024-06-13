<template>
  <section class="ion-padding">
    <ion-header class="inner-header">
      <ion-toolbar>
        <ion-buttons slot="start">
          <IonButton @click="cancel()">
            <IonIcon :icon="close"></IonIcon>
          </IonButton>
        </ion-buttons>
        <ion-title size="small"><b>Add New Role</b></ion-title>
      </ion-toolbar>
    </ion-header>
  </section>
  <ion-content class="ion-padding" :fullscreen="false">
    <div class="ion-padding ion-text-center" v-if="fetching">
      <IonSpinner name="crescent"></IonSpinner>
    </div>

    <main v-else>
      <form>
        <IonInput
          class="kola-input ion-margin-bottom"
          :class="{ 'ion-invalid ion-touched': form.errors.name }"
          label="Name"
          labelPlacement="stacked"
          fill="solid"
          v-model="form.fields.name"
          name="name"
          @ion-input="form.validate($event)"
          required
        ></IonInput>
        <section style="margin-top: 24px">
          <section class="role-section">
            <header>
              <h6>{{ $t("profile.team.permissions") }}</h6>
            </header>
          </section>
        </section>
        <ion-accordion-group :multiple="true" ref="accordionGroup">
          <ion-accordion
            :toggle-icon="chevronDown"
            :value="`group-${index}`"
            v-for="(group, index) in groupedAllPermissions"
          >
            <ion-item slot="header" color="light">
              <ion-label class="header">{{ group.group_name }}</ion-label>
            </ion-item>
            <div slot="content">
              <IonItem
                class="content-item"
                :lines="index == group.permissions.length - 1 && 'none'"
                v-for="(permission, index) in group.permissions"
              >
                <IonCheckbox
                  :aria-label="permission.name"
                  justify="space-between"
                  mode="ios"
                  :value="permission.id"
                  @ionChange="selectPermission"
                >
                  <IonLabel>
                    <p class="ion-no-margin">{{ permission.name }}</p>
                  </IonLabel>
                  <IonText>{{ permission.description }}</IonText>
                </IonCheckbox>
              </IonItem>
            </div>
          </ion-accordion>
        </ion-accordion-group>
      </form>
    </main>
  </ion-content>
  <IonFooter class="ion-no-border ion-padding" v-if="!fetching">
    <KolaYellowButton @click="save" :disabled="saving || !canSave">
      {{ !saving ? $t("general.save") : "" }}
      <IonSpinner class="spinner" name="crescent" v-if="saving"></IonSpinner>
    </KolaYellowButton>
    <KolaWhiteButton @click="cancel">{{
      $t("general.cancel")
    }}</KolaWhiteButton>
  </IonFooter>
</template>

<script lang="ts">
import {
  IonButtons,
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonLabel,
  modalController,
  IonIcon,
  IonSpinner,
  useBackButton,
  IonInput,
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonCheckbox,
  IonText,
  IonFooter,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { chevronDown, close } from "ionicons/icons";
import { OverlayEventDetail } from "@ionic/core/components";
import { useRoleAndPermissionStore } from "@/stores/RoleAndPermissionStore";
import { mapStores } from "pinia";
import { useForm } from "@/composables/form";
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import KolaWhiteButton from "@/components/KolaWhiteButton.vue";
import { useUserStore } from "@/stores/UserStore";
import { useToastStore } from "@/stores/ToastStore";

export default defineComponent({
  components: {
    IonButtons,
    IonButton,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonLabel,
    IonIcon,
    IonSpinner,
    IonInput,
    IonAccordionGroup,
    IonAccordion,
    IonItem,
    IonCheckbox,
    IonText,
    KolaYellowButton,
    KolaWhiteButton,
    IonFooter,
  },

  data() {
    return {
      close,
      fetching: false,
      saving: false,
      chevronDown,
      groupedAllPermissions: [],
      form: useForm({
        name: "",
        permissions: [],
      }),
    };
  },

  computed: {
    ...mapStores(useRoleAndPermissionStore, useUserStore, useToastStore),
    canSave() {
      return (
        this.form.fields.name.length > 0 &&
        this.form.fields.permissions.length > 0
      );
    },
  },

  methods: {
    async save() {
      try {
        this.saving = true;
        const res = await this.roleAndPermissionStore.createRole({
          ...this.form.fields,
          business_id: this.userStore.activeBusiness?.id,
        });
        await this.toastStore.showSuccess("Role added successfully");
        this.cancel()
      } catch (error) {
      } finally {
        this.saving = false;
      }
    },
    cancel() {
      modalController.dismiss(null, "cancel");
    },

    onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
      if (ev.detail.role === "confirm") {
      }
    },
    selectPermission(e) {
      const permissionId = e.target.value;
      const index = this.form.fields.permissions.indexOf(permissionId);
      if (index > -1) {
        this.form.fields.permissions.splice(index, 1);
        return;
      }

      this.form.fields.permissions.push(permissionId);
    },
    async fetchRolePermissions() {
      try {
        this.fetching = true;
        const res = await this.roleAndPermissionStore.fetchAllPermissions({
          grouped: true,
        });
        this.groupedAllPermissions = res;
      } catch (error) {
      } finally {
        this.fetching = false;
      }
    },
    toggleAccordion() {
      const nativeEl = this.$refs.accordionGroup.$el;
      let toggledValues = [];
      for (let index = 0; index < this.groupedAllPermissions?.length; index++) {
        toggledValues.push(`group-${index}`);
        nativeEl.value = toggledValues;
      }
    },
  },
  // const accordionGroup = ref(null);

  async mounted() {
    await this.fetchRolePermissions();
    this.toggleAccordion();

    document.addEventListener(
      "ionBackButton",
      (ev) => {
        ev.stopPropagation();
        this.cancel();
      },
      { once: true }
    );

    useBackButton(10, () => {
      this.cancel();
    });
  },
});
</script>

<style scoped lang="scss">
.role-section {
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-bottom: 10px;

    h6 {
      font-weight: 500;
      font-size: 1em;
      margin: 0px;
    }

    a {
      padding: 3px 10px;
    }
  }
}
ion-accordion-group {
  ion-accordion {
    &::v-deep(ion-icon) {
      font-size: 18px;
      color: #787486;
    }
    ion-item {
      box-shadow: 0px 2px 12px #68686f14;
      margin-bottom: 5px;
      --inner-padding-end: 14px;

      ion-label {
        font-size: 14px !important;
        &::first-letter {
          text-transform: capitalize;
        }
      }

      &::part(native) {
        color: #000;
        border-radius: 8px;
        border-width: 1px;
        border-color: #f4f4f4;
        background: #fff;
      }
    }
    &::part(content) {
      border: 1px solid #f4f4f4;
      border-top: 0px;
      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;
      margin-bottom: 8px;
    }
    &.accordion-expanded,
    &.accordion-expanding,
    &.accordion-collapsing {
      ion-item {
        margin-bottom: 0px;

        &::part(native) {
          border-bottom-right-radius: 0px;
          border-bottom-left-radius: 0px;
        }
        ion-label {
          &.header {
            font-weight: 500;
          }
        }

        &.content-item {
          box-shadow: none;
          --padding-end: calc(
            var(--padding-start) + var(--ion-safe-area-left, 0px)
          );
          --inner-padding-top: 16px;
          --inner-padding-bottom: 16px;
          --inner-padding-end: 0px;
          &::part(native) {
            color: #000 !important;
            border: none;
            background: none;
            border-radius: 0px;
            padding-left: 25px;
          }
          ion-checkbox {
            ion-label {
              p {
                color: #000 !important;
              }
            }
            ion-text {
              font-size: 12px;
              color: #787486;
            }
            &::part(label) {
              width: 260px;
              white-space: wrap !important;
            }
          }
        }
      }
    }
  }
}
</style>

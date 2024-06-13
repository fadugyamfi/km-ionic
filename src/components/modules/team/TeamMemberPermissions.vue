<template>
  <section style="margin-top: 24px">
    <section class="role-section">
      <header>
        <h6>{{ $t("profile.team.permissions") }}</h6>
      </header>
    </section>
  </section>
  <ion-accordion-group :multiple="true">
    <ion-accordion
      :toggle-icon="chevronDown"
      :value="`group-${index}`"
      v-for="(group, index) in groupedPermissions"
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
            checked
            disabled
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
</template>
<script setup lang="ts">
import {
  IonText,
  IonItem,
  IonButton,
  IonIcon,
  IonLabel,
  IonAccordion,
  IonAccordionGroup,
  IonCheckbox,
} from "@ionic/vue";
import { closeCircleOutline, chevronDown } from "ionicons/icons";

const props = defineProps({
  groupedPermissions: {
    type: Array,
    default: () => [],
  },
});
</script>
<style lang="scss" scoped>
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
      box-shadow: 0px 2px 20px #68686f14;
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
            &.checkbox-disabled {
              opacity: 1;
            }
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

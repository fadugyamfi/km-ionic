<template>
  <section style="margin-top: 24px">
    <section class="role-section">
      <header>
        <h6>{{$t('profile.team.permissions')}}</h6>
      </header>
    </section>
  </section>
  <ion-accordion-group :multiple="true">
    <ion-accordion :toggle-icon="chevronDown" value="first">
      <ion-item slot="header" color="light">
        <ion-label>Inventory permissions</ion-label>
      </ion-item>
      <div slot="content">
        <IonItem lines="none" class="content-item">
          <IonCheckbox
            aria-label="Manage inventory"
            justify="space-between"
            mode="ios"
            value="1"
          >
            <IonLabel>
              <p class="ion-no-margin">{{ "Manage inventory" }}</p>
            </IonLabel>
          </IonCheckbox>
        </IonItem>
      </div>
    </ion-accordion>
    <ion-accordion value="second">
      <ion-item slot="header" color="light">
        <ion-label>Team management permissions</ion-label>
      </ion-item>
      <div slot="content">
        <IonItem class="content-item">
          <IonCheckbox
            aria-label="Manage inventory"
            justify="space-between"
            mode="ios"
            value="1"
          >
            <IonLabel>
              <p class="ion-no-margin">{{ "Manage employees" }}</p>
            </IonLabel>
            <IonText>Add, edit or delete sales agent for the business</IonText>
          </IonCheckbox>
        </IonItem>
        <IonItem lines="none" class="content-item">
          <IonCheckbox
            aria-label="Manage inventory"
            justify="space-between"
            mode="ios"
            value="1"
          >
            <IonLabel>
              <p class="ion-no-margin">{{ "Manage sales manager account" }}</p>
            </IonLabel>
            <IonText
              >Add, edit or delete sales managers for the business</IonText
            >
          </IonCheckbox>
        </IonItem>
      </div>
    </ion-accordion>
    <ion-accordion value="third">
      <ion-item slot="header" color="light">
        <ion-label>Credit sales permissions</ion-label>
      </ion-item>
      <div  slot="content">
        <IonItem class="content-item">
          <IonCheckbox
            aria-label="Manage inventory"
            justify="space-between"
            mode="ios"
            value="1"
          >
            <IonLabel>
              <p class="ion-no-margin">{{ "Manage employees" }}</p>
            </IonLabel>
            <IonText>Add, edit or delete sales agent for the business</IonText>
          </IonCheckbox>
        </IonItem>
        <IonItem lines="none" class="content-item">
          <IonCheckbox
            aria-label="Manage inventory"
            justify="space-between"
            mode="ios"
            value="1"
          >
            <IonLabel>
              <p class="ion-no-margin">{{ "Manage sales manager account" }}</p>
            </IonLabel>
            <IonText
              >Add, edit or delete sales managers for the business</IonText
            >
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
    ion-item {
      box-shadow: 0px 2px 12px #68686f14;
      margin-bottom: 5px;
      --inner-padding-end: 14px;

      ion-label {
        font-size: 14px !important;
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
              width: 220px;
              white-space: wrap !important;
            }
          }
        }
      }
    }
  }
}
</style>

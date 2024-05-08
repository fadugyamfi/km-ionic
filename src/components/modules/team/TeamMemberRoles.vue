<template>
  <section style="margin-top: 24px">
    <section class="role-section">
      <header>
        <h6>Role</h6>
        <IonText color="tertiary"> Assign New Role </IonText>
      </header>
    </section>
    <IonItem lines="none">
      <IonLabel slot="start"> Sales agent </IonLabel>
      <IonButton fill="clear" slot="end" color="dark">
        <IonIcon :icon="closeCircleOutline"></IonIcon>
      </IonButton>
    </IonItem>
    <IonItem lines="none">
      <IonLabel slot="start">Business analyst</IonLabel>
      <IonButton fill="clear" slot="end" color="dark">
        <IonIcon :icon="closeCircleOutline"></IonIcon>
      </IonButton>
    </IonItem>
  </section>
</template>
<script setup lang="ts">
import { IonText, IonItem, IonButton, IonIcon, IonLabel } from "@ionic/vue";
import { closeCircleOutline } from "ionicons/icons";
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
ion-item {
  border-radius: 8px;
  box-shadow: 0px 2px 12px #68686f14;
  margin-bottom: 5px;
  &::part(native) {
    color: #000;
    border-radius: 8px;
    border-width: 1px;
    border-color: #f4f4f4;
  }
  ion-label {
    font-size: 14px !important;
  }
  ion-button {
    ion-icon {
        color: #9E9E9E;
        font-size: 20px;
    }
  }
}
</style>

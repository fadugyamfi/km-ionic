<template>
  <IonCard>
    <IonItem v-for="order in  orders " :key="order.id">
      <IonAvatar slot="start">
        <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
      </IonAvatar>
      <IonLabel>
        <h2>{{ order.id }}</h2>
      </IonLabel>
      <IonIcon :icon="chevronDownOutline" slot="end"></IonIcon>
    </IonItem>
  </IonCard>
</template>

<script setup lang="ts">
import { IonAvatar, IonCard, IonIcon, IonItem, IonLabel } from '@ionic/vue';
import { chevronDownOutline } from 'ionicons/icons';
import { Ref, ref } from 'vue';
import { Order } from '../../../models/Order';

const orders: Ref<Order[]> = ref([])
</script>

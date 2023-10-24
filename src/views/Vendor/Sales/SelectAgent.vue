<template>
  <IonPage class="ion-padding">
    <IonHeader class="inner-header">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/vendor/sales">
            <IonIcon :icon="close"></IonIcon>
          </IonBackButton>
        </IonButtons>
        <IonTitle size="small"><b>Select Agent</b></IonTitle>
        <IonButtons slot="end">
          <ion-button @click="refresh()">
            <IonIcon :icon="search"></IonIcon>
          </ion-button>
        </IonButtons>
      </IonToolbar>
    </IonHeader>

    <IonContent :fullscreen="true" class="ion-padding-vertical">
      <IonList lines="none">
        <IonListHeader>
          <IonLabel class="fw-bold">{{ $t("Select sales agent") }}</IonLabel>
        </IonListHeader>

        <IonItem v-for="agent in agents" :key="agent.id">
          <IonAvatar slot="start">
            <img src="/images/no-image.png" />
          </IonAvatar>
          <IonLabel>
            <p class="ion-no-margin">{{ agent.name }}</p>
            <IonText color="medium" class="font-medium">
              {{ agent.role?.name || $t('Sale Agent') }}
            </IonText>
          </IonLabel>
          <IonCheckbox slot="end" mode="ios"></IonCheckbox>
        </IonItem>
      </IonList>
    </IonContent>

    <IonFooter>
      <KolaYellowButton>
        {{ $t('general.continue') }}
      </KolaYellowButton>
    </IonFooter>
  </IonPage>
</template>

<script lang="ts">
import { IonPage, IonContent, IonButton, IonToolbar, IonIcon, IonTitle, IonButtons, IonHeader, IonBackButton, IonList, IonItem, IonListHeader, IonLabel, IonAvatar, IonCheckbox, IonText, IonFooter } from '@ionic/vue';
import { close, refreshOutline, search } from 'ionicons/icons';
import { defineComponent } from 'vue';
import User from '@/models/User';
import axios from 'axios';
import { useUserStore } from '@/stores/UserStore';
import { handleAxiosRequestError } from '@/utilities';
import KolaYellowButton from '@/components/KolaYellowButton.vue';

export default defineComponent({

  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonBackButton,
    IonIcon,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonListHeader,
    IonLabel,
    IonAvatar,
    IonCheckbox,
    IonText,
    IonFooter,
    KolaYellowButton
},

  data() {
    return {
      search, close,
      agents: [] as User[]
    }
  },

  methods: {
    fetchSaleAgents() {
      const userStore = useUserStore();

      const params = {
        businesses_id: userStore.activeBusiness?.id
      }

      axios.get('/v2/sale-agents', { params })
        .then(response => {
          this.agents = response.data.data.map((el: object) => new User(el));
        })
        .catch(error => handleAxiosRequestError(error))
    },

    refresh() {}
  },

  mounted() {
    this.fetchSaleAgents();
  }
})
</script>

<style scoped>
ion-list-header {
  padding-left: 0px;
  font-size: 0.9em;
}

ion-checkbox {
  --size: 16px;
  --checkbox-background-checked: #21D187;
  --border-color-checked: #21D187;
}

ion-item {
  border: solid 1px #F4F4F4;
  border-radius: 12px;
  margin-bottom: 0.5em;
}

ion-item ion-label {
  line-height: 1em;
}

ion-item ion-label p {
  font-weight: bold;
  color: #111;
}
</style>

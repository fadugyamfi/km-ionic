<ion-card>
    <IonItem v-for="order in filteredOrders" :key="order>
      <IonAvatar slot="start">
        <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
      </IonAvatar>
      <IonLabel>
        <h2>{{ order.id }}</h2>
      </IonLabel>
      <IonIcon :icon="chevron-down-outline" slot="end"></IonIcon>
    </IonItem>
  </ion-card>
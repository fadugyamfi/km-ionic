<template>
    <IonGrid>
        <IonRow>
            <IonCol>
                <IonSkeletonText class="skeleton-card" :animated="true"></IonSkeletonText>
            </IonCol>
            <IonCol>
                <IonSkeletonText class="skeleton-card" :animated="true"></IonSkeletonText>
            </IonCol>
        </IonRow>
    </IonGrid>
</template>

<script setup lang="ts">
import { IonCol, IonGrid, IonRow, IonSkeletonText } from '@ionic/vue';


</script>

<style scoped>
.skeleton-card {
    width: 100%;
    height: 200px;
    border-radius: 10px;
}
</style>

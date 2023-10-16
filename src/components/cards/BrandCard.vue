<template>
    <section class="brand-card">
        <ion-card @click="viewBrand">
            <FavoriteButton
                class="favorite-button"
                :brand="brand"
                color="dark"
            >
            </FavoriteButton>

            <Image :alt="brand.name" :src="brand.logo" />

            <IonCardHeader>
                <IonCardTitle class="ion-text-center">{{ brand.name }}</IonCardTitle>
            </IonCardHeader>
        </ion-card>
    </section>
</template>

<script lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon } from '@ionic/vue';
import { defineComponent } from 'vue';
import { locationOutline } from 'ionicons/icons';
import Brand from '@/models/Brand';
import Image from '@/components/Image.vue';
import FavoriteButton from '@/components/modules/brands/FavoriteButton.vue';

export default defineComponent({
    props: {
        brand: {
            required: true,
            type: Brand
        },
    },
    data() {
        return {
            locationOutline
        };
    },
   methods:  {
    viewBrand() {
        this.$router.push(`/shopper/home/brands/${this.brand.id}`);
        },


   },
    components: { IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonIcon, Image, FavoriteButton }
});
  
</script>

<style scoped lang="scss">
.brand-card {

    ion-card {
        width: 100%;
        margin: 5px auto;
        position: relative;

        ion-img {
            width: 100%;
            height: 90px;
            object-fit: contain;
            padding: 5px;
        }

        ion-card-header {
            text-align: left;
            padding: 10px;

            ion-card-title {
                font-size: 0.9em;
                font-weight: bold;
                margin-bottom: 0px;
                text-wrap: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            ion-card-subtitle {
                font-size: 0.8em;
                padding: 0px;
                margin: 0px;
                color: #BDBDBD;
                text-wrap: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }

        ion-card-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.8em;

            .distance {
                color: #666EED;
            }
        }
    }

    .favorite-button {
        --padding-start: 2px;
        --padding-end: 2px;
        --padding-top: 2px;
        --padding-bottom: 2px;
        position: absolute;
        top: 0px;
        right: 5px;
        min-height: 24px;
        font-size: 12px;
        border-radius: 50%;
        background: white;
        border: solid 1px #f1f1f1;
    }
}
</style>

<template>
    <section class="banner">
        <img
            :src="userStore.activeBusiness?.logo || defaultBanner"
            @error="onLoadError($event)"
        />

        <aside>
            <ProfileAvatar
                :image="userStore.activeBusiness?.logo"
                :username="userStore.activeBusiness?.name"
                custom-size="90px"
                font-size="48px"
            ></ProfileAvatar>
            <!-- <IonAvatar size="">
                <span class="initials">RV</span>
            </IonAvatar> -->
        </aside>
    </section>
</template>

<script lang="ts">
import { IonAvatar } from '@ionic/vue';
import { defineComponent } from 'vue';
import { mapStores } from 'pinia';
import { useBusinessStore } from '@/stores/BusinessStore';
import { useUserStore } from '@/stores/UserStore';
import ProfileAvatar from '../../../components/ProfileAvatar.vue';

export default defineComponent({

    data() {
        return {
            defaultBanner: '/images/vendor/banner.png'
        }
    },

    components: { IonAvatar, ProfileAvatar },

    computed: {
        ...mapStores( useBusinessStore, useUserStore )
    },

    methods: {
        onLoadError(event: Event) {
            (event.target as HTMLImageElement).src = this.defaultBanner;
        }
    },

    mounted() {
        this.businessStore.loadCachedBusinesses();
    }
})
</script>

<style scoped lang="scss">
.banner {
    position: relative;
    margin-bottom: 40px;

    img {
        max-width: 100%;
        width: 100%;
    }

    aside {
        position: absolute;
        bottom: -15%;
        left: 5%;

        ion-avatar {
            border-radius: 50%;
            background-color: #f5f5f5;
            border: solid 1px #ccc;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 90px;
            height: 90px;

            .initials {
                font-size: 48px;
            }
        }
    }
}
</style>

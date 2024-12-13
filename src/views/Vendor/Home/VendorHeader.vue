<template>
    <section class="banner">
        <Image
            :src="userStore.activeBusiness?.cover_image || defaultBanner"
            w="400"
            @error="onLoadError($event)"
        />

        <aside>
            <ProfileAvatar
                :image="companyLogo"
                :username="userStore.activeBusiness?.name"
                custom-size="90px"
                font-size="48px"
            ></ProfileAvatar>
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
import Image from '../../../components/Image.vue';

export default defineComponent({

    data() {
        return {
            defaultBanner: '/images/vendor/banner.png'
        }
    },

    components: { IonAvatar, ProfileAvatar, Image },

    computed: {
        ...mapStores( useBusinessStore, useUserStore ),

        coverImage() {
            if( this.userStore.activeBusiness?.cover_image ) {
                return `${this.userStore.activeBusiness?.cover_image}?w=400`
            }

            return this.defaultBanner;
        },

        companyLogo() {
            if( this.userStore.activeBusiness?.logo ) {
                return `${this.userStore.activeBusiness?.logo}?w=150`;
            }

            return undefined;
        }
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
        max-height: 200px;
        object-fit: cover;
        object-position: center;
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

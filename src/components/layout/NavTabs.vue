<template>
    <IonTabs>
        <IonRouterOutlet></IonRouterOutlet>

        <ShopperTabBar v-if="userStore.appMode == 'shopping'"></ShopperTabBar>
        <VendorTabBar v-else></VendorTabBar>
    </IonTabs>
</template>

<script lang="ts">
import { IonRouterOutlet, IonTabs } from '@ionic/vue';
import { mapStores } from 'pinia';
import { defineComponent } from 'vue';
import { useUserStore } from '../../stores/UserStore';
import VendorTabBar from './VendorTabBar.vue';
import ShopperTabBar from './ShopperTabBar.vue';


export default defineComponent({
    data() {
        return {};
    },

    components: { IonTabs, IonRouterOutlet, VendorTabBar, ShopperTabBar },

    computed: {
        ...mapStores( useUserStore )
    }
})
</script>

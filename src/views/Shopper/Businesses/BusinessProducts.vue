<script setup lang="ts">
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonSpinner, IonGrid, IonCol, IonRow } from '@ionic/vue';
import NotificationButton from '@/components/notifications/NotificationButton.vue';
import Business from '@/models/Business';
import Product from '@/models/Product';
import { ref, onMounted } from 'vue';
import { useBusinessStore } from '@/stores/BusinessStore';
import { useRoute } from 'vue-router';
import ProductCard from '@/components/cards/ProductCard.vue';

const businessStore = useBusinessStore();
const route = useRoute();
const business = ref<Business|null>();
const products = ref<Product[]>([]);
const fetching = ref(false);

const businessId = route.params.id;

onMounted(async () => {
  fetching.value = true;
  business.value = await businessStore.getBusiness(+route.params.id);
  products.value = await businessStore.getBusinessProducts(business.value); // Use business.value here
  fetching.value = false;
});
</script>

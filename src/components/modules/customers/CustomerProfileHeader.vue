<template>
  <section class="banner">
    <img :src="defaultBanner" @error="onLoadError($event)" />

    <aside>
      <ProfileAvatar font-size="40px" custom-size="90px" :image="customer?.logo" :username="customer?.name"></ProfileAvatar>
    </aside>
  </section>
</template>

<script lang="ts">
import { IonAvatar } from "@ionic/vue";
import { defineComponent } from "vue";
import ProfileAvatar from "../../ProfileAvatar.vue";

export default defineComponent({
  props: {
    customer: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      defaultBanner: "/images/vendor/banner.png",
    };
  },

  components: { IonAvatar, ProfileAvatar },

  methods: {
    onLoadError(event: Event) {
      (event.target as HTMLImageElement).src = this.defaultBanner;
    },
  },
});
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

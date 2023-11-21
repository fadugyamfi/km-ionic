<template>
  <section class="d-flex ion-justify-content-center">
    <ProfileAvatar
      font-size="40px"
      custom-size="90px"
      :image="user?.photo"
      :username="user?.name"
    ></ProfileAvatar>
  </section>
</template>

<script lang="ts">
import { IonAvatar, IonButton } from "@ionic/vue";
import { defineComponent, PropType } from "vue";
import ProfileAvatar from "../../ProfileAvatar.vue";
import User from "@/models/User";

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<User | null>,
      default: () => ({}),
    },
  },

  data() {
    return {
      defaultBanner: "/images/vendor/banner.png",
    };
  },

  components: { IonAvatar, ProfileAvatar, IonButton },

  methods: {
    onLoadError(event: Event) {
      (event.target as HTMLImageElement).src = this.defaultBanner;
    },
    changePhoto() {
      this.$router.push("/profile/company/change-photo");
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
    bottom: -25%;
    left: 5%;
    align-items: center;

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
    ion-button {
      margin-top: 30px;
      --color: #666eed;
      font-weight: 600;
    }
  }
}
</style>

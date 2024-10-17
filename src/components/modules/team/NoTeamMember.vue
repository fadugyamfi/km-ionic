<template>
  <div class="ion-text-center ion-padding-horizontal" style="margin-top: 80px">
    <div class="ion-text-center ion-margin-bottom" style="margin-top: 2em">
      <img src="/images/vendor/sale-confirmation-smiley.svg" style="width: 150px; height: 150px" />
    </div>
    <div class="ion-text-center ion-margin-bottom">
      <h5 class="ion-margin-bottom">
        <b> {{ $t("profile.team.buildYourTeam") }}</b>
      </h5>
      <p class="ion-margin-top" style="font-size: 0.88em; color: #74787c">
        {{ $t("profile.team.noTeamDescription") }}
      </p>
    </div>
    <KolaYellowButton @click="addMember">
      {{ $t("profile.team.addMember") }}</KolaYellowButton
    >
  </div>
</template>

<script setup lang="ts">
import KolaYellowButton from "@/components/KolaYellowButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const addMember = () => {
  router.push("/profile/company/team/add-member");
};
</script>

<style scoped></style>

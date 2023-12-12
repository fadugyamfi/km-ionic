<template>
    <section class="order-status-pill">
      <p>{{ orderStatus.name }}</p>
    </section>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    props: {
      orderStatus: {
        required: true,
        type: Object,
      },
    },
  });
  </script>
  
  <style lang="scss">
  .order-status-pill {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 80px;
    padding: 10px;
  
    p {
      margin-top: 5px;
      font-size: 0.6em;
      line-height: 1em;
      text-wrap: wrap;
      text-overflow: ellipsis;
    }
  }
  </style>
  
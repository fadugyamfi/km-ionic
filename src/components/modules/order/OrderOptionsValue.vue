<template>
    <ion-popover>
      <ion-list>
        <ion-item @click="handleOptionClick('reorder')">
          ReOrder
          <ion-icon name="arrow-forward-outline" slot="end"></ion-icon>
        </ion-item>
        <ion-item @click="handleOptionClick('message')">
          Message Supplier
          <ion-icon name="arrow-forward-outline" slot="end"></ion-icon>
        </ion-item>
        <ion-item @click="handleOptionClick('editorder')">
          Edit Order
          <ion-icon name="arrow-forward-outline" slot="end"></ion-icon>
        </ion-item>
        <ion-item @click="handleOptionClick('delete')">
          Delete
          <ion-icon name="arrow-forward-outline" slot="end"></ion-icon>
        </ion-item>
      </ion-list>
    </ion-popover>
  </template>
  
  <script lang="ts">
  import { defineProps, ref } from 'vue';
  
  const handleOptionClick = (option) => {
    // Handle the option click, e.g., by emitting an event or calling a method
    // You can pass the selected option to the parent component
  };
  
  </script>
  
<template>
  <ion-card class="main-container">
    <ion-card-content>
      <a href="#" class="checkout-link">Proceed to checkout</a>
    </ion-card-content>
  </ion-card>
</template>

<style scoped>
.main-container {
  border-radius: 12px;
  background-color: var(--ion-color-warning, #f5aa29);
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  text-align: center;
}

.checkout-link {
  color: var(--ion-color-dark, #101828);
  white-space: nowrap;
  margin: 15px 0;
  font-weight: 500;
  font-size: 12px;
  font-family: Poppins, sans-serif;
}

@media (max-width: 991px) {
  .checkout-link {
    white-space: normal;
  }
}

.checkout-link:hover {
  text-decoration: underline;
}
</style>

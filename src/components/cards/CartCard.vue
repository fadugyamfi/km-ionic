<template>
  <ion-card class="banner">
    <ion-row class="banner-content">
      <ion-col size="12" size-md="6">
        <ion-card class="cart-item">
          <ion-card-content>
            <ion-row class="item-info">
              <ion-col>
                <h2 class="product-name">Cart</h2>
              </ion-col>
              <ion-col class="quantity-badge">
                <ion-badge color="warning">2</ion-badge>
              </ion-col>
            </ion-row>
          </ion-card-content>
        </ion-card>
      </ion-col>
      <ion-col size="12" size-md="6">
        <ion-card class="saved-label">
          <ion-card-content>
            <h2>Saved</h2>
          </ion-card-content>
        </ion-card>
      </ion-col>
    </ion-row>
  </ion-card>
</template>

<script>
export default {
  name: "BannerComponent",
};
</script>

<style scoped lang="scss">
.banner {
  width: 358px;
  height: 46px;
  padding: 4px;
  background: rgba(167, 167, 167, 0.20);
  border-radius: 8px;
  border: 1px #F2F4F7 solid;
  .banner-content {
    justify-content: center;
    align-items: center;
    gap: 8px;
    display: inline-flex;
    .cart-item,
    .saved-label {
      flex: 1 1 0;
      height: 38px;
      padding-left: 12px;
      padding-right: 12px;
      padding-top: 8px;
      padding-bottom: 8px;
      background: white;
      box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.06);
      border-radius: 6px;
      overflow: hidden;
      justify-content: center;
      align-items: center;
      gap: 8px;
      display: flex;
      .item-info {
        .product-name {
          color: #344054;
          font-size: 14px;
          font-family: Poppins;
          font-weight: 500;
          line-height: 20px;
          word-wrap: break-word;
        }
        .quantity-badge {
          ion-badge {
            padding-left: 8px;
            padding-right: 8px;
            padding-top: 2px;
            padding-bottom: 2px;
            background: rgba(245, 170, 41, 0.38);
            border-radius: 16px;
            justify-content: center;
            align-items: center;
          }
        }
      }
      .saved-label {
        color: #667085;
        font-size: 14px;
        font-family: Poppins;
        font-weight: 500;
        line-height: 20px;
        word-wrap: break-word;
      }
    }
  }
}
</style>

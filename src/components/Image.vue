<template>
  <IonImg
    :src="url"
    @ion-error="onLoadError($event)"
    @ion-img-did-load="onLoaded($event)"
    :class="{ cover: objectFit == 'cover', contain: objectFit == 'contain' }"
  />
</template>

<script lang="ts">
import { IonImg, IonSkeletonText } from "@ionic/vue";
import { defineComponent, PropType } from "vue";
import { Filesystem, Directory } from "@capacitor/filesystem";
import AppStorage from "@/stores/AppStorage";
import axios from "axios";

const storage = new AppStorage();

export default defineComponent({
  components: { IonImg, IonSkeletonText },

  props: {
    src: {
      type: String as PropType<string | undefined>,
    },

    path: {
      type: String as PropType<string | undefined>,
    },
    objectFit: {
      type: String as PropType<string | undefined>,
      default: "cover",
    },

    noImgSrc: {
      default: "/images/no-image.png",
      type: String as PropType<string>,
    },

    w: {
      type: String as PropType<string | undefined>,
    },

    h: {
      type: String as PropType<string | undefined>,
    },
  },

  data() {
    return {
      loaded: false,
      imageData: null as string | null,
    };
  },

  emits: ["loaded"],

  computed: {
    url() {
      let path = this.src || this.noImgSrc;

      const urlParams = new URLSearchParams();

      if (this.w) {
        urlParams.append("w", this.w as string);
      }

      if (this.h) {
        urlParams.append("h", this.h as string);
      }

      return path + (this.w ? "?" + urlParams.toString() : "");
    },
  },

  methods: {
    onLoadError(event: Event) {
      (event.target as HTMLImageElement).src = this.noImgSrc;
    },

    async onLoaded(event: CustomEvent) {
      this.loaded = true;
      this.$emit("loaded");
    },

    async convertBlobToBase64(blob: Blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(blob);
      });
    },

    async loadImage() {
      if (!this.src) {
        return;
      }

      if (this.src.includes(";base64")) {
        this.imageData = this.src;
        return;
      }

      const url = this.src;

      const imageName =
        url.split("/").pop() ||
        crypto?.randomUUID() ||
        "img-" + new Date().getTime();
      const imageType = imageName?.split(".").pop();

      const cachedImage = await storage.get(`image:${url}`);

      if (cachedImage) {
        const file = await Filesystem.readFile({
          path: cachedImage.filepath,
          directory: Directory.Cache,
        });

        if (file) {
          this.imageData = `data:image/${imageType || "jpeg"};base64,${
            file.data
          }`;
          return;
        }
      }

      if (this.path) {
        try {
          const response = await this.fetchImageViaProxy(
            this.path,
            url,
            imageName
          );

          this.imageData = `data:image/${imageType || "jpeg"};base64,${
            response.base64Data
          }`;

          storage.set(
            `image:${url}`,
            { filepath: response.filepath, webviewPath: response.webviewPath },
            1,
            "year"
          );
        } catch (error) {
          console.log(error);
          this.imageData = this.src;
        }
      } else {
        // try {
        //     const response = await this.saveImage(url, imageName);

        //     this.imageData = `data:image/${imageType || 'jpeg'};base64,${response.base64Data}`;

        //     storage.set(`image:${url}`, { filepath: response.filepath, webviewPath: response.webviewPath }, 1, 'year');
        // } catch(error) {
        //     console.log(error);
        //     this.imageData = this.src;
        // }
        this.imageData = this.src;
      }
    },

    async fetchImageViaProxy(path: string, url: string, fileName: string) {
      // Fetch the photo, read as a blob, then convert to base64 format
      const rand = Math.random();
      const params = { path };
      const response = await axios.get(`/image/proxy`, {
        params,
        responseType: "blob",
      });

      const blob = await response.data;

      // const base64Data = await this.fetchImageData(url);
      const base64Data = (await this.convertBlobToBase64(blob)) as string;

      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64Data as string,
        directory: Directory.Cache,
      });

      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: url,
        base64Data,
      };
    },

    async saveImage(url: string, fileName: string) {
      // Fetch the photo, read as a blob, then convert to base64 format
      const rand = Math.random();
      const response = await fetch(url + `?v=${rand}`);

      const blob = await response.blob();

      // const base64Data = await this.fetchImageData(url);
      const base64Data = (await this.convertBlobToBase64(blob)) as string;

      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64Data as string,
        directory: Directory.Cache,
      });

      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: url,
        base64Data,
      };
    },

    convertImageToBase64(image: HTMLImageElement) {
      const canvas = document.createElement("canvas") as HTMLCanvasElement;
      const ctx = canvas.getContext("2d");

      canvas.height = image.naturalHeight;
      canvas.width = image.naturalWidth;
      ctx?.drawImage(image, 0, 0);

      return canvas.toDataURL();
    },
  },

  mounted() {
    // this.imageData = this.src as string;
    // fetch and cache image behind the scenes
    // if( this.path && this.src && isPlatform("pwa") ) {
    //     this.loadImage();
    // }
  },
});
</script>

<style scoped lang="scss">
ion-img {
  height: 100%;
  object-position: center;

  &.cover {
    object-fit: cover;
  }
  &.contain {
    object-fit: contain;
  }
}
</style>

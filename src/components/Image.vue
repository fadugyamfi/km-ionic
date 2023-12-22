<template>
    <IonImg
        :src="imageData || noImgSrc"
        @ion-error="onLoadError($event)"
        @ion-img-did-load="onLoaded($event)"
    />
</template>

<script lang="ts">
import { IonImg, IonSkeletonText } from '@ionic/vue';
import { defineComponent, PropType } from 'vue';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import AppStorage from '@/stores/AppStorage';
import axios from 'axios';

const storage = new AppStorage();

export default defineComponent({

    components: { IonImg, IonSkeletonText },

    props: {
        src: {
            type: String as PropType<string | undefined>
        },

        noImgSrc: {
            default: '/images/no-image.png',
            type: String as PropType<string>
        }
    },

    data() {
        return {
            loaded: false,
            imageData: null as string|null
        }
    },

    emits: ['loaded'],

    methods: {
        onLoadError(event: Event) {
            (event.target as HTMLImageElement).src = this.noImgSrc;
        },

        async onLoaded(event: CustomEvent) {
            this.loaded = true;
            this.$emit('loaded');
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
            if( !this.src ) {
                return;
            }

            if( this.src.includes(';base64') ) {
                this.imageData = this.src;
                return;
            }

            const url = this.src;

            const imageName = url.split('/').pop() || crypto?.randomUUID() || 'img-' + (new Date()).getTime();
            const imageType = imageName?.split('.').pop();

            const cachedImage = await storage.get(`image:${url}`);

            if( cachedImage ) {
                const file = await Filesystem.readFile({
                    path: cachedImage.filepath,
                    directory: Directory.Cache,
                });

                if( file ) {
                    this.imageData = `data:image/${imageType || 'jpeg'};base64,${file.data}`;
                    return;
                }
            }


            try {
                const response = await this.saveImage(url, imageName);

                this.imageData = `${response.base64Data}`; // `data:image/${imageType || 'jpeg'};base64,${response.base64Data}`;

                storage.set(`image:${url}`, { filepath: response.filepath, webviewPath: response.webviewPath }, 1, 'year');
            } catch(error) {
                console.log(error);
                this.imageData = this.src;
            }
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
                base64Data
            };
        },

        convertImageToBase64(image: HTMLImageElement) {
            const canvas = document.createElement('canvas') as HTMLCanvasElement;
            const ctx = canvas.getContext('2d');

            canvas.height = image.naturalHeight;
            canvas.width = image.naturalWidth;
            ctx?.drawImage(image, 0, 0);

            return canvas.toDataURL();
        }
    },

    mounted() {
        // this.imageData = this.src as string;
        this.loadImage();
        // setTimeout(() => {
        // }, 200);
    }
});
</script>

<style scoped>
ion-img {
    object-fit: cover;
    object-position: center;
}
</style>

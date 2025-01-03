import { ref, onMounted, watch, Ref } from "vue";
import {
  Camera,
  CameraResultType,
  CameraSource,
  GalleryPhoto,
  Photo,
} from "@capacitor/camera";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Preferences } from "@capacitor/preferences";
import { isPlatform } from "@ionic/vue";
import { Capacitor } from "@capacitor/core";
import { v4 as uuidv4 } from "uuid";

export interface UserPhoto {
  uuid: string | number;
  filepath: string;
  webviewPath?: string;
  base64Data?: string;
}

export const usePhotoGallery = () => {
  const photos: Ref<UserPhoto[]> = ref([]);

  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    const fileName = Date.now() + ".jpeg";
    const savedFileImage = {
      uuid: uuidv4(),
      filepath: fileName,
      webviewPath: photo.webPath,
      base64Data: await getPhotoAsBase64(photo),
    };

    photos.value = [savedFileImage, ...photos.value];
  };

  const pickImages = async () => {
    const pickedPhotos = await Camera.pickImages({
      height: 1024,
      width: 2048,
    });

    photos.value = await Promise.all(
      pickedPhotos.photos.map(async (photo) => {
        return {
          uuid: uuidv4(),
          filepath: photo.path,
          webviewPath: photo.webPath,
          base64Data: await getPhotoAsBase64(photo),
        } as UserPhoto;
      })
    );
  };

  const convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  const getPhotoAsBase64 = async (
    photo: Photo | GalleryPhoto
  ): Promise<string> => {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    const base64Data = (await convertBlobToBase64(blob)) as string;

    return base64Data;
  };

  const savePicture = async (
    photo: Photo,
    fileName: string
  ): Promise<UserPhoto> => {
    let base64Data: string | Blob;

    // "hybrid" will detect mobile - iOS or Android
    if (isPlatform("hybrid")) {
      const file = await Filesystem.readFile({
        path: photo.path!,
      });
      base64Data = file.data;
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      base64Data = await getPhotoAsBase64(photo);
    }

    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    if (isPlatform("hybrid")) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        uuid: uuidv4(),
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    } else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        uuid: uuidv4(),
        filepath: fileName,
        webviewPath: photo.webPath,
      };
    }
  };

  return {
    photos,
    takePhoto,
    getPhotoAsBase64,
    savePicture,
    pickImages,
  };
};

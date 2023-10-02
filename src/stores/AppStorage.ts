import { Storage } from '@ionic/storage';

const storage = new Storage();

export default class AppStorage {

    keys: string[] = [];

    constructor() {
      this.initStorage();
    }

    async initStorage() {
      await storage.create();
    }

    /**
     * Stores an item in the local or session storage and returns itself
     * for chaining
     *
     * @param key Key of Item to Store
     * @param value Item to store. Can be of any type
     * @param duration Duration of storage
     * @param unit Unit of storage duration, e.g. days, months, hours, minutes
     */
    async set(key: string, value: any, duration = 1, unit = 'days') {
      const later = new Date();

      if( unit == 'days' ) later.setDate( later.getDate() + duration );
      if( unit == 'hours' ) later.setHours( later.getHours() + duration );
      if( unit == 'minutes' ) later.setMinutes( later.getMinutes() + duration );
      if( unit == 'months' ) later.setMonth( later.getMonth() + duration );

      const data = {
        created: Date.now(),
        data: value,
        expires: later.getTime()
      };

      await storage.set(key, JSON.stringify(data));
      this.storeKey(key);

      return this;
    }

    /**
     * Returns an item from the current storage engine or null if not found
     *
     * @param key Key of item to return
     */
    async get(key: string) {
      let result = null;

      this.storeKey(key);

      try {
        const data = await storage.get(key);
        result = JSON.parse(data);

        if (result && this.isResultExpired(result)) {
          await storage.remove(key);
          return null;
        }
      } catch (e) {
        return null;
      }

      return result && result.data;
    }

    /**
     * Removes an item from the current storage engine
     *
     * @param key Key of item to remove
     */
    async remove(key: string) {
      if ((await this.has(key))) {
        await storage.remove(key);
      }
    }

    /**
     * Returns true if item is present in the current storage engine
     *
     * @param key Key of item to check
     */
    async has(key: string) {
      const data = await this.get(key);
      return data != null;
    }

    async isValid(key: string) {
      if (await this.has(key)) {
        try {
          const data = await storage.get(key);
          const result = JSON.parse(data);
          return this.isResultExpired(result) === false;
        } catch (e) { }
      }

      return false;
    }

    /**
     * Removes all data from storage except the items specified
     *
     * @param exceptions Array of keys to exclude
     */
    clearAll(exceptions: string[] = []) {
      this.keys
        .filter(key => exceptions.indexOf(key) === -1)
        .forEach(async (key) => await this.remove(key));
    }

    /**
     * Returns true if result object is expired
     *
     * @param result
     */
    isResultExpired(result: any) {
      return result?.expires < Date.now();
    }

    /**
     * Store an internal cache of items in localstorage
     *
     * @param key Identifier of item stored
     */
    storeKey(key: string) {
      if (this.keys.indexOf(key) === -1) {
        this.keys.push(key);
      }
    }
  }

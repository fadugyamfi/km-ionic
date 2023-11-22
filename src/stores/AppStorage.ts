import { Storage } from '@ionic/storage';

export default class AppStorage {
    deleteOrder(orderId: string | number | undefined) {
        throw new Error("Method not implemented.");
    }

    private _storage: Storage | null = null;
    private keys: string[] = [];

    constructor() {
      this.init();
    }

    async init() {
      const storage = new Storage();
      this._storage = await storage.create();
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

      if( unit.indexOf('day') > -1 ) later.setDate( later.getDate() + duration );
      if( unit.indexOf('hour') > -1 ) later.setHours( later.getHours() + duration );
      if( unit.indexOf('minute') > -1 ) later.setMinutes( later.getMinutes() + duration );
      if( unit.indexOf('month') > -1 ) later.setMonth( later.getMonth() + duration );
      if( unit.indexOf('year') > -1 ) later.setFullYear( later.getFullYear() + duration );

      const data = {
        created: Date.now(),
        data: value,
        expires: later.getTime()
      };

      await this._storage?.set(key, JSON.stringify(data));
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
        const data = await this._storage?.get(key);
        result = JSON.parse(data);

        if (result && this.isResultExpired(result)) {
          await this._storage?.remove(key);
          return null;
        }
      } catch (e) {
        console.log(e);
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
        await this._storage?.remove(key);
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
          const data = await this._storage?.get(key);
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
    async clearAll(exceptions: string[] = []) {
      const keys = await this._storage?.keys();

      keys?.filter(key => exceptions.indexOf(key) === -1)
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

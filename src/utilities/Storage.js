export default class Storage {

    keys = [];
    engine = localStorage;

    constructor() { }

    /**
     * Changes the storage engine to localStorage
     */
    local() {
      this.engine = localStorage;
      return this;
    }

    /**
     * Changes the storage engine to sessionStorage
     */
    session() {
      this.engine = sessionStorage;
      return this;
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
    set(key, value, duration = 1, unit = 'days') {
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

      this.engine.setItem(key, JSON.stringify(data));
      this.storeKey(key);

      return this;
    }

    /**
     * Returns an item from the current storage engine or null if not found
     *
     * @param key Key of item to return
     */
     get(key) {
      let result = null;

      this.storeKey(key);

      try {
        result = JSON.parse(this.engine.getItem(key));

        if (result && this.isResultExpired(result)) {
          this.engine.removeItem(key);
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
    remove(key) {
      if (this.has(key)) {
        this.engine.removeItem(key);
      }
    }

    /**
     * Returns true if item is present in the current storage engine
     *
     * @param key Key of item to check
     */
    has(key) {
      return this.get(key) != null;
    }

    isValid(key) {
      if (this.has(key)) {
        try {
          const result = JSON.parse(this.engine.getItem(key));
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
    clearAll(exceptions = []) {
      this.keys
        .filter(key => exceptions.indexOf(key) === -1)
        .forEach(key => this.remove(key));
    }

    /**
     * Returns true if result object is expired
     *
     * @param result
     */
    isResultExpired(result) {
      return result?.expires < Date.now();
    }

    /**
     * Store an internal cache of items in localstorage
     *
     * @param key Identifier of item stored
     */
    storeKey(key) {
      if (this.keys.indexOf(key) === -1) {
        this.keys.push(key);
      }
    }
  }

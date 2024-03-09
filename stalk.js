export class Stalk {
  #value = null;
  #changeCallbacks = []; //public callbacks
  #_changeCallbacks = []; //private callbacks

  /**
   * Creates a Stalk instance with an optional initial value.
   * @param {*} initialValue - The initial value for the Stalk instance.
   */
  constructor(initialValue) {
    this.#value = initialValue || null;
    this.#changeCallbacks = [];
    this.#_changeCallbacks = [];
  }

  /**
   * Gets the current value of the Stalk instance.
   * @returns {*} - The current value.
   */
  get get() {
    return this.#value;
  }

  /**
   * Sets a new value for the Stalk instance and invokes public registered callbacks.
   * @param {*} newValue - The new value to be set.
   */
  set set(newValue) {
    const oldValue = this.#value;
    const updatedValue = newValue;

    this.#value = newValue;

    this.#changeCallbacks.forEach((callback) => {
      callback(updatedValue, oldValue);
    });
  }

  /**
   * Sets a new value for the Stalk instance invoking registered pirvate callbacks.
   * @param {*} newValue - The new value to be set.
   */
  set _set(newValue) {
    const oldValue = this.#value;
    const updatedValue = newValue;

    this.#value = newValue;

    this.#_changeCallbacks.forEach((callback) => {
      callback(updatedValue, oldValue);
    });
  }

  /**
   * Registers a public callback function to be invoked whenever the value changes.
   * @param {function} callback - The callback function to be registered.
   */
  set onChange(callback) {
    this.#changeCallbacks.push(callback);
  }

  /**
   * Registers a private callback function to be invoked whenever the value changes.
   * @param {function} callback - The callback function to be registered.
   */
  set _onChange(callback) {
    this.#_changeCallbacks.push(callback);
  }
}



export class SyncStalk extends Stalk {
  /**
   * Creates a SyncStalk instance with an optional initial value.
   * @param {*} initialValue - The initial value for the SyncStalk instance.
   */
  constructor(initialValue) {
    super(initialValue);
    this.id = this.generateUniqueID();
  }

  /**
   * Generates a unique ID for the SyncStalk instance.
   * @returns {string} - The unique ID generated.
   */
  generateUniqueID() {
    return (
      Math.round(Math.random() * 1e12).toString(36) + Date.now().toString(36)
    );
  }

  /**
   * Updates the data privately/locally.
   * @param {*} data - The new data to be set.
   */
  updateDataPrivate(data) {
    this._set = data;
  }

  /**
   * Registers a private callback function to be invoked whenever the value changes.
   * @param {function} updateViewCallback - The callback function to be registered.
   */
  updateViewPrivate(updateViewCallback) {
    this._onChange = (value) => {
      updateViewCallback(value);
    };
  }

  /**
   * Receives data from an external source and updates the data privately.
   * @param {*} data - The data received from an external source.
   */
  receiveData(data) {
    this.updateDataPrivate(data);
  }

  /**
   * Updates the data publicly.
   * @param {*} data - The new data to be set.
   */
  updateDataPublic(data) {
    this.set = data;
  }

  /**
   * Registers a public callback function to be invoked whenever the value changes.
   * @param {function} updateViewCallback - The callback function to be registered.
   */
  updateViewPublic(updateViewCallback) {
    this.onChange = (value) => {
      updateViewCallback(value);
    };
  }

  /**
   * Sends data to a network by registering a public callback.
   * @param {function} sendDataToNetwork - The function to send data to the network.
   */
  sendData(sendDataToNetwork) {
    this.onChange = sendDataToNetwork;
  }

  /**
   * Updates the view with both public and private callbacks.
   * If a private callback is not provided, it uses the public callback.
   * @param {function} publicCallback - The public callback function.
   * @param {function} [privateCallback] - The private callback function (optional).
   */
  updateView(publicCallback, privateCallback) {
    if (!privateCallback) {
      privateCallback = publicCallback;
    }

    this.updateDataPublic(publicCallback);
    this.updateDataPrivate(privateCallback);
  }
}

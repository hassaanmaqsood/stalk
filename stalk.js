export class Stalk {
  #value = null;
  #changeCallbacks = [];

  /**
   * Creates a Stalk instance with an optional initial value.
   * @param {*} initialValue - The initial value for the Stalk instance.
   */
  constructor(initialValue) {
    this.#value = initialValue || null;
    this.#changeCallbacks = [];
  }

  /**
   * Gets the current value of the Stalk instance.
   * @returns {*} - The current value.
   */
  get value() {
    return this.#value;
  }

  /**
   * Sets a new value for the Stalk instance and invokes registered callbacks.
   * @param {*} newValue - The new value to be set.
   */
  set value(newValue) {
    const oldValue = this.#value;
    const updatedValue = newValue;

    this.#value = newValue;

    this.#changeCallbacks.forEach((callback) => {
      callback(updatedValue, oldValue);
    });
  }

  /**
   * Registers a callback function to be invoked whenever the value changes.
   * @param {function} callback - The callback function to be registered.
   */
  set onChange(callback) {
    this.#changeCallbacks.push(callback);
  }
}

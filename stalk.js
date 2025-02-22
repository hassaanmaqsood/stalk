export function Observable(item = {}) {
	// Initialize value and listeners
	item.listeners = {};
	item.value = {};

	// Helper function to normalize paths
	const normalizePath = (path) => path.split("/").filter(Boolean).join("/");

	// Add a listener for a specific type
	item.addListener = (listener, path = "/", listenerType = "default") => {

		if (typeof listener !== "function") {
			throw new Error("Listener must be a function");
		}

		path = normalizePath(path);

		item.listeners[path] ??= {};
		item.listeners[path][listenerType] ??= [];

		item.listeners[path][listenerType].push(listener);
		return item;
	};

	// Remove a listener for a specific type
	item.removeListener = (listener, path = "/", listenerType = "default") => {
		path = normalizePath(path);

		const listeners = item.listeners?.[path]?.[listenerType];
		if (listeners) {
			item.listeners[path][listenerType] = listeners.filter(l => l !== listener);
			if (!item.listeners[path][listenerType].length) delete item.listeners[path][listenerType];
			if (!Object.keys(item.listeners[path]).length) delete item.listeners[path];
		}

		return item;
	};

	// Get the current value
	item.getValue = (path = "/") => getDataByPath(normalizePath(path), item.value);

	// Set a new value and notify relevant listeners
	item.setValue = (newValue, path = "/", listenerTypes = ["default"]) => {
		path = normalizePath(path);
		const oldValue = Object.create(item.value);

		// Normalize `listenerTypes` to an array
		const typesToNotify = Array.isArray(listenerTypes)
			? listenerTypes
			: [listenerTypes];

		path.split('/').reverse().forEach( ( key, index, array ) => {

			const dataPath = array.slice(index, array.length).reverse().join('/');

			if(index == 0) {
				setDataByPath(dataPath, item.value, newValue);
			} 

			// notify
			const initialData = getDataByPath(dataPath, oldValue);
			const finalData = getDataByPath(dataPath, item.value);
			typesToNotify.forEach((listenerType) => {
				item.listeners?.[dataPath]?.[listenerType]?.forEach(callback => {
					callback(finalData, initialData, path);
				});
			});

		})

		return item;
	};

	return item;
}


function getDataByPath(path = "/", item = {}) {
	return path.split("/").filter(Boolean).reduce((acc, key) => acc?.[key], item);
}


function setDataByPath(path = "/", obj = {}, value) {
    const keys = path.split("/").filter(Boolean);
    let ref = obj;

    for (let i = 0; i < keys.length - 1; i++) {
		ref = ref[keys[i]] ??= {};
	}
    keys.length ? ref[keys.at(-1)] = value : Object.assign(obj, value);

    return obj;
}

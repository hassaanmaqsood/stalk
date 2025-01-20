export function enableStalking(target = {}) {
  // Initialize the stalkers and the target's secrets
  target.stalkers = { default: [] };
  target.secrets = {};

  // Add a stalker for a specific type of secret
  target.addStalker = (stalker, secretType = "default") => {
    if (typeof stalker !== "function") {
      throw new Error("Stalker must be a function");
    }

    if (!target.stalkers[secretType]) {
      target.stalkers[secretType] = [];
    }
    target.stalkers[secretType].push(stalker);
    return target;
  };

  // Remove a stalker for a specific type of secret
  target.removeStalker = (stalker, secretType = "default") => {
    if (!target.stalkers[secretType]) return target;

    target.stalkers[secretType] = target.stalkers[secretType].filter(
      (knownStalker) => knownStalker !== stalker
    );
    return target;
  };

  // Get the current secrets
  target.getSecrets = () => target.secrets;

  // Update secrets and notify relevant stalkers
  target.shareSecrets = (newSecrets, secretTypes = ["default"]) => {
    const oldSecrets = target.secrets;
    target.secrets = newSecrets;

    // Normalize `secretTypes` to an array
    const typesToNotify = Array.isArray(secretTypes)
      ? secretTypes
      : [secretTypes];

    // Notify stalkers for each type
    typesToNotify.forEach((secretType) => {
      const stalkers = target.stalkers[secretType];
      if (Array.isArray(stalkers)) {
        stalkers.forEach((stalker) => stalker(newSecrets, oldSecrets));
      }
    });

    return target;
  };

  return target;
}

export function disableStalking(target) {
  if (!target || typeof target !== "object") {
    throw new Error("Invalid target provided to disableStalking");
  }

  // Remove all stalkers and reset secrets
  if (target.stalkers) {
    target.stalkers = {};
  }

  if (target.secrets !== undefined) {
    target.secrets = null; // Reset secrets
  }

  // Remove stalking-related methods
  delete target.addStalker;
  delete target.removeStalker;
  delete target.getSecrets;
  delete target.shareSecrets;

  return target;
}

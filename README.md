# Stalk: Because Tracking Changes is Just Too Mainstream  

You didn’t just come here for some plain old tracking utility, did you? No, you came here for **Stalk**, a lifestyle where observing changes to objects isn’t just practical—it’s borderline obsessive. Let’s dive into the procedural art of stalking your data, the fun way.  

---

## Why Stalk When You Can *Stalk*?  

Forget basic tracking. This is next-level stalking. Instead of merely keeping tabs, we’re introducing callbacks, secret types, and a whole load of overly involved metaphors. Ready?  

---

## Usage  

### Initialization: Turn Your Object Into a Victim  
To begin stalking, you must first enable stalking on your target. Because nothing screams "commitment issues" like a bit of object spying:  

```javascript
let victim = enableStalking();
```  

---

### Adding Stalkers: For Every Type of Secret  
You’ve got secrets to protect, and stalkers love secrets. Register a stalker (callback) to keep an eye on any juicy changes:  

```javascript
victim.addStalker((newSecrets, oldSecrets) => {
  console.log("Caught you changing!", newSecrets, oldSecrets);
});
```  

Want to specialize your stalking? Easy:  

```javascript
victim.addStalker((newSecrets, oldSecrets) => {
  console.log("Someone shared personal secrets:", newSecrets, oldSecrets);
}, "personal");
```  

---

### Removing Stalkers: When You Need Some Space  
Tired of that overly clingy stalker? Remove them by reference:  

```javascript
victim.removeStalker(yourStalkerCallback, "personal");
```  

---

### Sharing Secrets: Gossip, but Make It Programmable  
Let’s spill the tea (secrets) and notify the relevant stalkers:  

```javascript
victim.shareSecrets({ hobby: "gardening" });
victim.shareSecrets({ phone: "123-456-7890" }, "personal");
```  

---

### Checking Secrets: Snooping Without Changing Anything  
Want to see what’s hiding in the shadows? Use `getSecrets` to sneak a peek:  

```javascript
console.log("Current secrets:", victim.getSecrets());
```  

---

### Disabling Stalking: Going Off the Grid  
Had enough drama? Call it quits and clean up your object:  

```javascript
disableStalking(victim);
```  

---

## Example: How to Stalk Like a Pro  

```javascript
// Turn an object into a victim
let victim = enableStalking();

// Add some stalkers
victim.addStalker((newSecrets, oldSecrets) => {
  console.log("Spotted a change!", newSecrets, oldSecrets);
});
victim.addStalker((newSecrets, oldSecrets) => {
  console.log("A personal secret was spilled:", newSecrets, oldSecrets);
}, "personal");

// Share some secrets
victim.shareSecrets({ favoriteColor: "blue" });
victim.shareSecrets({ password: "hunter2" }, "personal");

// Remove a stalker
victim.removeStalker(yourStalkerCallback, "personal");

// Disable stalking entirely
disableStalking(victim);
```  

---

## Use Cases: Why Stalk?  

1. **Real-Time Data Updates**: Keep your app reactive and nosey at the same time.  
2. **Event-Driven Programming**: Trigger callbacks whenever your secrets are exposed.  
3. **Debugging Bliss**: Log changes and impress your coworkers with overly complex stalker chains.  

---

## The Pun Is the Point  
Remember: Stalk isn’t just a tool; it’s a way of life. Embrace the thrill of watching over your data like an overzealous neighbor with binoculars.  

Because **tracking is boring, but stalking is fun**.  

--- 

Enjoy your newfound obsession responsibly!

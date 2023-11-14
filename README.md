# Stalk: Because Tracking Changes is Just Too Mainstream

So you've stumbled upon the marvel that is Stalk. It's not just an observable variable; it's a lifestyle choice, really. Because, you know, tracking changes to variables is so mainstream. Let's make it obscurely cooler with Stalk.

## Usage

### Initialization: The Hipster's Way

Create a new `Stalk` instance, and feel the rush of being different:

```javascript
const myStalk = new Stalk(initialValue);
```

### Getting the Value: Old School, Yet Necessary

Retrieve the current value with an air of indifference:

```javascript
const currentValue = myStalk.value;
```

### Setting the Value: Because Conformity is Boring

Set a new value like a rebel:

```javascript
myStalk.value = newValue;
```

### Listening for Changes: Because Who Needs Peace and Quiet?

Register a callback to be the life of the party whenever the value changes:

```javascript
myStalk.onChange = (newValue, oldValue) => {
  console.log(`Oh, look! The value changed from ${oldValue} to ${newValue}. Shocking.`);
};
```

## Example: Because Examples are Soooo Original

```javascript
const temperatureStalk = new Stalk(25);

// Registering a callback for changes
temperatureStalk.onChange = (newTemperature, oldTemperature) => {
  console.log(`Temperature changed from ${oldTemperature}°C to ${newTemperature}°C. Groundbreaking.`);
};

// Updating the temperature value
temperatureStalk.value = 30;
```

Feel free to Stalk.

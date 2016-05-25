function Animal(age, name, sound, region) {
  this.age = age;
  this.name = name;
  this.sound = sound;
  this.region = region;
}
Animal.prototype.say = function () {
  return console.log(this.name + " says: " + this.sound);
};

function Cat() {
  Animal.apply(this, arguments);
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

var kitty = new Cat(14, "Kitty ^^", "meow", "Europe");
kitty.say();

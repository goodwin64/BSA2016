function Animal(age, name, sound, region) {
	this.age = age;
	this.name = name;
	this.sound = sound;
	this.region = region;
	this.maxAge = 100; // for setters in future

	this.say = function() {
		return this.sound;
	}

	this.goAway = function() {
		// todo: add object deletion
	}
}

function Dog(animal) {
	this.age = animal.age;
	this.name = animal.name;
	this.region = animal.region;
	this.prototype = animal;
	this.maxAge = 10;

	if (animal.sound == "woof") {
		this.sound = animal.sound;
	};
}

function Cat(animal) {
	this.age = animal.age;
	this.name = animal.name;
	this.region = animal.region;
	this.prototype = animal;
	this.maxAge = 15;

	if (animal.sound == "meow") {
		this.sound = animal.sound;
	};
}

function Woodpecker(animal) {
	this.age = animal.age;
	this.name = animal.name;
	this.region = animal.region;
	this.prototype = animal;
	this.maxAge = 6;

	if (animal.sound == "knock-knock") {
		this.sound = animal.sound;
	};
}

var a = new Animal(8, "Sparkley", "woof", "US");

var c = new Cat(a);
var d = new Dog(a);
var w = new Woodpecker(a);

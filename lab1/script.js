function Animal(age, name, sound, region) {
	var age = age;
	var name = name;
	var sound = sound;
	var region = region;
	var maxAge = 100;

	this.getAge = function() {
		return age;
	}
	this.setAge = function(ageValue) {
		if (typeof ageValue == "number" && ageValue >= 0 && ageValue <= maxAge) {
			age = ageValue;
		}
	}

	this.getName = function() {
		return name;
	}
	this.setName = function(nameValue) {
		if (typeof name == "string") {
			name = nameValue;
		}
	}

	this.getRegion = function() {
		return region;
	}
	this.setRegion = function(regionValue) {
		if (typeof region == "string") {
			region = regionValue;
		}
	}

	this.getSound = function() {
		return sound;
	}
	this.setSound = function(soundValue) {
		if (typeof sound == "string") {
			sound = soundValue;
		}
	}

	this.getMaxAge = function() {
		return maxAge;
	}
	this.setMaxAge = function(maxAgeValue) {
		if (typeof maxAgeValue == "number" && maxAgeValue >= 0) {
			maxAge = maxAgeValue;
		}
	}

	this.say = function(){
        console.log(this.sound);
    }

	this.goAway = function() {
		if (this.getAge() > this.getMaxAge()) {
			console.log("It's time to die... " + this.getName() + "'s age is " + this.getAge() + " years.");
		} else {
			console.log("It's early to die! " + this.getName() + "'s age is " + this.getAge() + " years.");
		}
	}
}

function Dog(animal) {
	var age = animal.getAge();
	var name = animal.getName();
	var region = animal.getRegion();
	this.prototype = animal;
	var maxAge = 10;

	if (animal.sound == "woof") {
		this.sound = animal.sound;
	};
}

function Cat(animal) {
	var age = animal.getAge();
	var name = animal.getName();
	var region = animal.getRegion();
	this.prototype = animal;
	this.maxAge = 15;

	if (animal.sound == "meow") {
		this.sound = animal.sound;
	};
}

function Woodpecker(animal) {
	var age = animal.getAge();
	var name = animal.getName();
	var region = animal.getRegion();
	this.prototype = animal;
	this.maxAge = 6;

	if (animal.sound == "knock-knock") {
		this.sound = animal.sound;
	};
}

var getType = function(object) {
        if (object.hasOwnProperty("getSound")) {
            switch (object.getSound()) {
            	case "woof": return "Dog";
            	case "meow": return "Cat";
            	case "knock-knock": return "Woodpecker";
            	default: return "Other type";
            }
        }
        return "unknown";
    };

var a1 = new Animal(8, "Sparkley", "woof", "US");
var a2 = new Animal(14, "Kitty ^^", "meow", "Europe");
var a3 = new Animal(22, "FireFox", "what does the fox say?", "Africa");

var c = new Cat(a1);
var d = new Dog(a2);
var w = new Woodpecker(a3);

console.log(getType(a1));
// console.log(getType(c)); // todo: fix
// console.log(d.say());// todo: fix

console.log(a1.goAway());
// console.log(w.goAway()); // todo: fix

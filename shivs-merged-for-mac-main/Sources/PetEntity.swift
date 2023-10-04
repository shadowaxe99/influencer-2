import Foundation

class PetEntity {
    // Properties
    var name: String
    var species: String
    var age: Int
    var health: Int
    
    // Initializer
    init(name: String, species: String, age: Int, health: Int) {
        self.name = name
        self.species = species
        self.age = age
        self.health = health
    }
    
    // Methods
    func feed() {
        // Logic for feeding the pet
    }
    
    func play() {
        // Logic for playing with the pet
    }
    
    func sleep() {
        // Logic for putting the pet to sleep
    }
}
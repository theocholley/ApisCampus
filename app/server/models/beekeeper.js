"use strict";

module.exports = class Beekeeper {
//Nom, Prénom, Ville, Rayon, mdp, no telephone.



    constructor(id, name, surname, city, ray, passcode, phone) {
        this._id = id;
        this._name = name;
        this._surname = surname;
        this._city = city;
        this._ray = ray;
        this._passcode = passcode;
        this._phone = phone;
        this._swarms = [];
    }


    getId() {
        return this._id;
    }

    getName() {
        return this._name;
    }

    getSurname() {
        return this._surname;
    }

    getCity() {
        return this._city;
    }

    getRay() {
        return this._ray;
    }

    getPasscode() {
        return this._passcode;
    }

    getPhone() {
        return this._phone;
    }


    getSwarms() {
        return this._swarms;
    }

    addSwarms(swarm){
        this._swarms.push(swarm);
    }
}
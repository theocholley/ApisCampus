"use strict";

module.exports = class Beekeeper {

//Nom, Prénom, Ville, Rayon, mdp, no telephone.



    constructor(id, name, surname, latCentre,longCentre, ray, passcode, phone, mail) {
        this._id = id;
        this._name = name;
        this._surname = surname;
        this._ray = ray;
        this._passcode = passcode;
        this._phone = phone;
        this._swarms = [];
        this._latCentre = latCentre;
        this._longCentre = longCentre;
        this._mail = mail;
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


    getLatCentre() {
        return this._latCentre;
    }

    getLongCentre() {
        return this._longCentre;
    }

    getMail() {
        return this._mail;
    }
}
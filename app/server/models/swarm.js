"use strict";

module.exports = class Swarm {

    constructor(id, longitude, latitude, date, hour, feature, height, description) {
        this._id = id;
        this._longitude = longitude;
        this._latitude = latitude;
        this._date = date;
        this._hour = hour;
        this._feature = feature;
        this._height = height;
        this._description = description;
    }


    getId() {
        return this._id;
    }

    getLongitude() {
        return this._longitude;
    }

    getLatitude() {
        return this._latitude;
    }

    getDate() {
        return this._date;
    }

    getHour() {
        return this._hour;
    }

    getFeature() {
        return this._feature;
    }

    getHeight() {
        return this._height;
    }

    getDescription() {
        return this._description;
    }
}

const name = "animal";
const human = {
    active: "Run",
    legs: "2",
};

exports.name = "human";

exports.getActive = function () {
    return human.active;
};

exports.setActive = function (active) {
    if (active == "Run" || active == "Walk") {
        human.active = active;
    }

};


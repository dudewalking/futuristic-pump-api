const PumpModel = require('../model/pumpModel');
const includes = require('lodash').includes;

module.exports = {
    checkPumpState: (controllers) => {
        return PumpModel.findAllWrongStates()
            .then(wrongStates => {
                let currentStateArr = [];
                controllers.forEach(controller => {
                    currentStateArr.splice(controller.id - 1, 0, +controller.switch)
                })
                let currentState = currentStateArr.join("");

                return includes(wrongStates, currentState) ? "unsafe" : "safe"
            });
    },

    getWrongStates: () => PumpModel.findAllWrongStates(),

    addPump: (pump) => PumpModel.addOne(pump)
};

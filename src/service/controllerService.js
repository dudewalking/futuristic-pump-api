const ControllerModel = require('../model/controllerModel');

module.exports = {
    getAllControllers: () => ControllerModel.findAll(),

    getControllerById: id => ControllerModel.findOneById(id),

    deleteControllerById: id => ControllerModel.deleteOneById(id),

    addController: controller => ControllerModel.addOne(controller)
};

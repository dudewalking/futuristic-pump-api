const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const controllerSchema = new Schema({
    id: Number,
    name: String,
    switch: { type: Boolean, default: false },
    state: { type: String, default: 'safe' }
});

const ControllerModel = mongoose.model('controller', controllerSchema);

class Controller extends ControllerModel {
    static findAll() {
        return this.find({}).then(controllers => controllers);
    }

    static findOneById(id) {
        return this.findOne({ _id: id }).then(controller => controller);
    }

    static deleteOneById(id) {
        return this.findOneAndRemove({ _id: id }).then(controller => controller);
    }

    static addOne(controller) {
        const newController = {
            id: controller.id,
            name: controller.name,
            switch: controller.switch,
            state: controller.state,
        };
        return this.create(newController).then(createdController => createdController);
    }
}

module.exports = Controller;

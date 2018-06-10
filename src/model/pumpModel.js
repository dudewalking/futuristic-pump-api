const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const pumpSchema = new Schema({
    wrongStates: [String]
});

const PumpModel = mongoose.model('pump', pumpSchema);

class Pump extends PumpModel {

    static findAllWrongStates() {
        return this.findOne({}).then(pump => pump.wrongStates);
    }

    static findOneById(id) {
        return this.findOne({ _id: id }).then(pump => pump);
    }

    static addOne(pump) {
        const newPump = {
            wrongStates: pump.wrongStates,
        };
        return this.create(newPump).then(createdPump => createdPump);
    }
}

module.exports = Pump;

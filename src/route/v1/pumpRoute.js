const express = require("express"),
    pumpService = require('../../service/pumpService'),
    { INTERNAL_ERROR } = require("../../helpers/consts"),
    router = express.Router();



router.route("/")

    .get((req, res, next) => {
        pumpService.getWrongStates()
            .then(result => res.json(result))
            .catch(err => next({ code: INTERNAL_ERROR, body: err.message }))
    })

    .post((req, res, next) => {
        const pump = req.body;

        console.log(req.body, 'adlawhdo');
        pumpService.addPump(pump)
            .then(result => res.json(result))
            .catch(err => next({ code: INTERNAL_ERROR, body: err.message }))
    });


router.route("/state")

    .post((req, res, next) => {
        const controllers = req.body;

        pumpService.checkPumpState(controllers)
            .then(result => res.json(result))
            .catch(err => next({ code: INTERNAL_ERROR, body: err.message }))
    });

module.exports = router;
const express = require("express"),
    controllerService = require('../../service/controllerService'),
    { INTERNAL_ERROR } = require("../../helpers/consts"),
    router = express.Router();


router.route("/")

    .get((req, res, next) => {
        controllerService.getAllControllers()
            .then(controllers => res.json(controllers))
            .catch(err => {
                next({ code: INTERNAL_ERROR, body: err.message })
            });
    })

    .post((req, res, next) => {
        const controller = {
            id: req.body.id,
            name: req.body.name,
            switch: req.body.switch,
            state: req.body.state,
        };

        controllerService.addController(controller)
            .then(result => res.json(result))
            .catch(err => next({ code: INTERNAL_ERROR, body: err.message }))
    });

module.exports = router;
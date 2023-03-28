const json = require("../endpoints.json");

exports.otherController = async (req, res, next) => {
    res.status(200).send(json);
};

exports.endspoints = async (req, res, next) => {
    res.status(200).send(json);
};

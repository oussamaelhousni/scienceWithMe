const factory = require("./factory");
const Namespace = require("./../models/namespaceModel");

exports.getNamespace = factory.getOne(Namespace);
exports.getAllNamespaces = factory.getAll(Namespace);
exports.createNamespace = factory.createOne(Namespace);
exports.deleteAllNamespaces = factory.deleteAll(Namespace);

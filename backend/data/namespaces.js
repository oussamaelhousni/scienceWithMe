const Namespace = require("./../utils/Namespace");

const namespaces = [];

namespaces.push(new Namespace("math"));
namespaces.push(new Namespace("physic"));
namespaces.push(new Namespace("biology"));

module.exports = namespaces;

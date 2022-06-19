module.exports = class Namespace {
  constructor(name, rooms = []) {
    this.name = name;
    this.rooms = rooms;
  }
  addRoom() {
    // talking with data base
    this.rooms.push(room);
  }
};

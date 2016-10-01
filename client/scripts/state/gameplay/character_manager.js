module.exports = function () {
  let CharacterManager = function () {
    this.engagedCharacters = {};
  };

  CharacterManager.prototype.addCharacter = function (id, character) {
    this.engagedCharacters[id] = character;
  };
  CharacterManager.prototype.removeCharacter = function (id) {
    delete this.engagedCharacters[id];
  };
  CharacterManager.prototype.getCharacterById = function (id) {
    return this.engagedCharacters[id] ? this.engagedCharacters[id] : null;
  }
  CharacterManager.prototype.flushAllCharacters = function () {
    this.engagedCharacters = {};
  };
  CharacterManager.prototype.refreshCharacter = function (id, character) {
    if (this.engagedCharacters.hasOwnProperty(id)){
      this.engagedCharacters[id] = character;
    }
  };

  // lambdaCallback params: id, character
  CharacterManager.prototype.forEachCharacter = function (lambdaCallback) {
    for (var id in this.engagedCharacters) {
       if (this.engagedCharacters.hasOwnProperty(id)) {
          lambdaCallback(id, this.engagedCharacters[id]);
       }
    }
  };

  return new CharacterManager();
};
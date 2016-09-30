var Sequelize = require('sequelize')
var Promise = require('bluebird')
var _ = require('lodash')

module.exports = function(db) {
  var that = this
  var CharacterModel = db.define("Character", {
    data:     { type: Sequelize.STRING,  required: true }
  },{
    classMethods: {
      associate: function() {

      },
      createCharacter: function(characterData) {
        var data = {
          data: characterData
        }
        return CharacterModel.create(data)
        .then(function(character) {
          var result = false
          if(character != null) result = character
          return result
        })
      },
      updateCharacter: function(characterId, data) {
        return CharacterModel.update(data, {where:{id:characterId}})
      },
      getCharacter: function(characterId) {
        return CharacterModel.findOne({where:{id:characterId}})
        .then(function(character) {
          var result = false
          if(character != null) result = character
          return result
        })
      }
    }
  })

  return CharacterModel
}

/**
 * Sample Call
 *
    character_model.createCharacter('asd')
    .then(function(response){
      return character_model.getCharacter(response.get('id'))
    })
    .then(function(response){
      console.log(response)
    })
 *
 */
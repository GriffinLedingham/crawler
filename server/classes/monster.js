function Monster(params) {
  Character.call(this, params)
}

Monster.prototype = _.create(Character.prototype, {
  'constructor': Monster
});

module.exports = Monster;
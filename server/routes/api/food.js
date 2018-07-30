const FoodItem = require('../../models/FoodItem');

module.exports = (app) => {
  app.get('/food/list', (req, res, next) => {
    FoodItem.find()
      .exec()
      .then((food) => res.json(food))
      .catch((err) => next(err));
  });

  app.post('/food/add_static_test', function (req, res, next) {
    const food = new FoodItem({
            name: 'green apple', 
            quantity:3,
            unit: 'apples',
            price_per_unit:0.5,
            date_warn:  Date(2018,07,30),
            date_expire:  Date(2018,07,31),
            }); //TODO: Param

    food.save()
      .then(() => res.json(food))
      .catch((err) => next(err));
  });

};

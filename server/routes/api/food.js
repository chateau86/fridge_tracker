const FoodItem = require('../../models/FoodItem');

module.exports = (app) => {
  app.get('/food/list', (req, res, next) => {
    console.log("get list");
    FoodItem.find()
      .exec()
      .then((food) => res.json(food))
      .catch((err) => next(err));
  });

  app.get('/food/add_static_test', function (req, res, next) {
    console.log("add_static_test");
    let food = FoodItem({
            name: 'green apple', 
            quantity: 3,
            unit: 'apples',
            price_per_unit:1,
            date_warn:  Date(2018,07,30),
            date_expire:  Date(2018,07,31)
            });

    food.save()
      .then(() => res.json(food))
      .catch((err) => next(err));
  });
  
  app.get('/food/remove/:id', function (req, res, next) {
    FoodItem.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then((food) => res.json())
      .catch((err) => next(err));
  });

};

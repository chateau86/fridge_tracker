const FoodItem = require('../../models/FoodItem');

module.exports = (app) => {
    app.get('/food', (req, res, next) => {
        console.log("get list");
        FoodItem.find()
            .exec()
            .then((food) => res.json(food))
            .catch((err) => next(err));
    });
    
    app.get('/food/:id', (req, res, next) => {
        FoodItem.findOne({ _id: req.params.id })
            .exec()
            .then((food) => res.json(food))
            .catch((err) => next(err));
    });
    app.post('/food/add_static_test', function (req, res, next) {
        console.log("add_static_test");
        let food = FoodItem({
                        name: 'green apple', 
                        quantity: 3,
                        unit: 'count',
                        price_per_unit:1,
                        date_warn:   new Date("2017-07-30"),
                        date_expire: new Date("2017-07-31")
                        });

        food.save()
            .then(() => res.json(food))
            .catch((err) => next(err));
    });
    
    app.post('/food/add', function (req, res, next) {
        console.log("add");
        console.log(req.query)
        var name = req.query.hasOwnProperty('name')?req.query.name :'green apple';
        var qty = (req.query.hasOwnProperty('qty')&&!isNaN(req.query.qty))?parseFloat(req.query.qty) :1;
        //TODO
        
        let food = FoodItem({
                        name: name, 
                        quantity: 3,
                        unit: 'count',
                        price_per_unit:1,
                        date_warn:   new Date("2017-07-30"),
                        date_expire: new Date("2017-07-31")
                        });

        food.save()
            .then(() => res.json(food))
            .catch((err) => next(err));
    });
    
    
    app.delete('/food/:id', function (req, res, next) {
        FoodItem.findOneAndRemove({ _id: req.params.id })
            .exec()
            .then((food) => res.json())
            .catch((err) => next(err));
    });

};

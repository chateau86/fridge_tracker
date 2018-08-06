const FoodItem = require('../../models/FoodItem');
console.log("food.js ran");

var schedule = require('node-schedule');
 
var j = schedule.scheduleJob('42 * * * * *', function(){
  console.log('node-schedule test');
});

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
    
    app.post('/food/add', function (req, res, next) {
        console.log("add");
        console.log(req.query)
        var name = req.query.hasOwnProperty('name')?req.query.name :'green apple';
        var qty = (req.query.hasOwnProperty('qty')&&!isNaN(req.query.qty))?parseFloat(req.query.qty) :1;
        var unit = req.query.hasOwnProperty('unit')?req.query.unit :'count';
        var ppu = (req.query.hasOwnProperty('ppu')&&!isNaN(req.query.ppu))?parseFloat(req.query.ppu) :1;
        var warn = req.query.hasOwnProperty('warn')?new Date(req.query.warn):new Date("2017-07-30");
        var exp =  req.query.hasOwnProperty('exp')?new Date(req.query.exp):new Date("2017-07-31");
        
        let food = FoodItem({
                        name: name, 
                        quantity: qty,
                        unit: unit,
                        price_per_unit: ppu,
                        date_warn:   warn,
                        date_expire: exp
                        });

        food.save()
            .then(() => res.json(food))
            .catch((err) => next(err));
    });
    
    app.post('/food/:id', function (req, res, next) {
        FoodItem.findById(req.params.id, (err, itm)=>{
            if(req.query.hasOwnProperty('name')){
                itm.name = req.query.name;
            }
            if(req.query.hasOwnProperty('unit')){
                itm.unit = req.query.unit;
            }
            if(req.query.hasOwnProperty('qty')&&!isNaN(req.query.qty)){
                itm.quantity = parseFloat(req.query.qty);
            }
            if(req.query.hasOwnProperty('ppu')&&!isNaN(req.query.ppu)){
                itm.price_per_unit = parseFloat(req.query.ppu);
            }
            if(req.query.hasOwnProperty('warn')){
                itm.date_warn = new Date(req.query.warn);
            }
            if(req.query.hasOwnProperty('exp')){
                itm.date_expire = new Date(req.query.exp);
            }
            itm.save()
            .then(() => res.json(itm))
            .catch((err) => next(err));
        });
    });
    
    app.delete('/food/:id', function (req, res, next) {
        FoodItem.findOneAndRemove({ _id: req.params.id })
            .exec()
            .then((food) => res.json())
            .catch((err) => next(err));
    });

};

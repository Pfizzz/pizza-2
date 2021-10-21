const { Pizza } = require('../models');

// this file handles Pizza model updates

const pizzaController = {
    // the functions will go in here as methods
    // get all pizzas
    getAllPizza(req, res) {
        Pizza.find({})
            // populates comments
            .populate({
                path: 'comments',
                // The minus sign - in front of the field indicates that we don't want it to be returned. 
                select: '-__v'
            })
            .select('-__v')
            // newest pizza returns first
            .sort({ _id: -1 })
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.dir.log(err);
                res.status(400).json(err);
            });
    },

    // get one pizza by id
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
        .populate({
            path: 'comments',
            // The minus sign - in front of the field indicates that we don't want it to be returned. 
            select: '-__v'
        })
        .select('-__v')
        .then(dbPizzaData => {
            // if no pizza is found, send 404
            if (!dbPizzaData) {
                res.status(404).json({ message: 'No pizza found with this id!' });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // create pizza
    createPizza({ body }, res) {
        Pizza.create(body)
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.status(400).json(err));
    },

    // update pizza by id
    updatePizza({ params, body }, res) {
        //With Mongoose, the "where" clause is used first, then the updated data, then options for how the data should be returned.
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete pizza
    deletePizza({ params}, res) {
        Pizza.findOneAndDelete({ _id: params.id })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = pizzaController;
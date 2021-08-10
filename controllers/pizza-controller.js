const { Pizza } = require('../models');

const pizzaController = {
    //the functions will go in here as methods

    //get all pizzas
    getAllPizza(request, response) {
        Pizza.find({})
        .then(dbPizzaData => response.json(dbPizzaData))
        .catch(err => {
            console.log('error in pizza controller', err);
            response.status(400).json(err)
        });
    },

    //get 1 pizza by id
    getPizzaById({ params }, response) {
        Pizza.findOne({ _id: params.id }) 
        .then(dbPizzaData => {
            //if no pizza is found, send 404
            if(!dbPizzaData) {
                response.status(404).json({ message: 'No pizza was found with this Id!'});
                return;
            }
            response.json(dbPizzaData);
        })
        .catch(err => {
            console.log('error in find one method of pizza controller', err);
            response.status(400).json(err);
        });
    },

    //create Pizza
    createPizza({ body }, response) {
        Pizza.create(body)
        .then(dbPizzaData => response.json(dbPizzaData))
        .catch(err => response.status(400).json(err));
    },

    //update pizza by id
    updatePizza({ params, body }, response) {
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbPizzaData => {
            if(!dbPizzaData) {
                response.status(404).json({ message: 'No pizza found with this id!' });
                return;
            }
            response.json(dbPizzaData);
        })
        .catch(err => response.status(400).json(err))
    },

    //delete a pizza
    deletePizza({ params }, response) {
        Pizza.findOneAndDelete({ _id: params.id })
        .then(dbPizzaData => {
            if(!dbPizzaData) {
                response.status(404).json({ message: 'No Pizza found with this Id!' });
                return;
            }
            response.json(dbPizzaData);
        })
        .catch(err => response.status(400).json(err))
    }
};

module.exports = pizzaController;
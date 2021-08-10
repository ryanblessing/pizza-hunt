const { response } = require('express');
const { Comment, Pizza } = require('../models');

const commentController = {
    //add comment section
    addComment({ params, body }, response) {
        console.log(body);
        Comment.create(body)
            .then(({ _id }) => {
                return Pizza.findOneAndUpdate(
                    { _id: params.pizzaId },
                    { $push: { comments: _id } },
                    { new: true }
                );
            })
            .then(dbPizzaData => {
                if(!dbPizzaData) {
                    response.status(404).json({ message: 'No pizza found with this ID!' });
                    return;
                }
                response.json(dbPizzaData);
            })
            .catch(err => response.json('you have a error in comment controller', err))
    },
    //removing comment
    removeComment({ params },response) {
        Comment.findOneAndDelete({ _id: params.commentId })
        .then(deleteComment => {
            if (!deleteComment) {
                return response.status(404).json({ message: 'No comment with this id!' })
            }
            return Pizza.findByIdAndUpdate(
                { _id: params.pizzaId },
                { $pull: { comments: params.commentId } },
                { new: true }
            );
        })
        .then(dbPizzaData => {
            if(!dbPizzaData) {
                response.status(404).json({ message: 'No pizza found with this Id!' });
                return;
            }
            response.json(dbPizzaData)
        })
        .catch(err => response.json('error in remove comment section', err))
    }
}


module.exports = commentController;
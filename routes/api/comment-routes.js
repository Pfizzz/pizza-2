const router = require('express').Router();

// this file sets up the comment routes

const {
    addComment,
    removeComment
} = require('../../controllers/comment-controller');

// /api/comments/<pizzaId>
router
    .route('/:pizzaId')
    .post(addComment);

// /api/comments/<pizzaId>/<commentId>

router
    .route('/:pizzaId/:commentId')
    //after deleting a particular comment, you need to know exactly which pizza that comment originated from.
    .delete(removeComment);

//Lastly, export the routes to /routes/api/index.js. We'll give these routes the prefix of /comments, as shown in the following code:


module.exports = router;
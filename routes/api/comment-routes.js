const router = require('express').Router();
// this file sets up the comment routes

// import comment methods from comments controller
const {
    addComment,
    removeComment,
    addReply,
    removeReply
} = require('../../controllers/comment-controller');



// /api/comments/<pizzaId>
router
    .route('/:pizzaId')
    .post(addComment);

// /api/comments/<pizzaId>/<commentId>

router
    .route('/:pizzaId/:commentId')
    // this is a put route because we are updating the existing comment resource
    .put(addReply)
    //after deleting a particular comment, you need to know exactly which pizza that comment originated from.
    .delete(removeComment);

// new route for deleting a reply, we need id of individual reply, not just its parent
router
    .route('/:pizzaId/:commentId/:replyId')
    .delete(removeReply);
//Lastly, export the routes to /routes/api/index.js. We'll give these routes the prefix of /comments, as shown in the following code:


module.exports = router;
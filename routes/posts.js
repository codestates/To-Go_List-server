const express = require('express');
const router = express.Router();

const { postsController } = require('../controller');

router.post('/new', postsController.createNew.post);
router.get('/', postsController.requestAll.get);
router.patch('/edit', postsController.editPost.patch);
router.post('/remove', postsController.removePost.post);

module.exports = router;
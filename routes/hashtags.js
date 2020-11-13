const express = require('express');
const router = express.Router();

const { hashTagsController } = require('../controller');

router.post('/new', hashTagsController.createNewTag.post);
router.get('/', hashTagsController.requestAllTags.get);
router.post('/search', hashTagsController.searchTag.post);
router.post('/remove', hashTagsController.removeTag.post);

module.exports = router;
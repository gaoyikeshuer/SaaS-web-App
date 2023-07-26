const express = require('express')
const router = express.Router()

const {summarize, paragraph} = require('../controllers/openai');

router.route('/summary').post(summarize)
router.route('/paragraph').post(paragraph)


module.exports = router
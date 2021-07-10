import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as tweetController from '../controller/tweet.js';

const router = express.Router();

const validateTweet = [
    body('text')
        .ltrim()
        .isLength({ min: 2 })
        .withMessage('text should be at least 3 characters'),
    validate,
];

router.get('/', [tweetController.getTweets]);
router.get('/:id', tweetController.getTweet);
router.post('/', validateTweet, tweetController.createTweet);
router.put('/:id', validateTweet, tweetController.updateTweet);
router.delete('/:id', tweetController.deleteTweet);

export default router;

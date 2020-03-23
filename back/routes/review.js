const express = require('express');
const router = express.Router();
const db = require('../models');
const { isLoggedIn } = require('./middleware');

router.post('/upload', isLoggedIn, async (req, res, next) => { //로그인한 사용자만 접근 가능하게 만들기
    //DB 저장
    try{
        const newReview = await db.Review.create({
            category : req.body.category,
            date : req.body.date,
            title : req.body.title,
            rating : req.body.rating,
            content : req.body.content,
            UserId : req.user.id,
        });
        res.json(newReview);
    } catch(e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;
const router = require('express').Router();
//adding models and sequelize
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const { route } = require('./api');

//send response using render to use a template engine

// router.get('/', (req, res) => {
//     res.render('homepage', {
        
//         id: 1,
//         post_comment: 'https://handlebarsjs.com/guide/',
//         title: 'Handlebars Docs',
//         created_at: new Date(),
//         comments: [{}, {}],
//         user: {
//             username: 'test_user'
//         }
        
//     });
// });

router.get('/', (req, res) => {
    console.log(req.session)
    Post.findAll({
      attributes: [
        'id',
        'post_content',
        'title',
        'created_at'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        // pass a single post object into the homepage template
        //console.log(dbPostData[0]);
        //serialize the object down to only the properties you need .get({ plain: true}))
        const posts = dbPostData.map(post => post.get({plain: true})); 
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;
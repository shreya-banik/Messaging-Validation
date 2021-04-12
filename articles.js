const express= require('express');
const router= express.Router();

//Bring the article models
let Article = require('../models/article');



//Add Route
router.get('/add', function(req, res){
  res.render('add_articles',{
    title:'Add Articles'
  });
});

// Add Submit POST Route
router.post('/add', function(req, res){
  req.checkBody('title','Title is required').notEmpty();
  req.checkBody('author','Author is required').notEmpty();
  req.checkBody('body','Body is required').notEmpty();
  //console.log('Form is Submitted!!');
  //console.log(req.body.f_name);
  //get Errors
let errors=req.validationErrors();

if(errors){
  res.render('add_article',{
    title: 'Add articles',
    errors: errors
  });
}else{
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save(function(err){
      if(err){
        console.log(err);
      } else {
        req.flash('success','Article updated')
        res.redirect('/');
      }
    });
  }
});

// Load Edit Form
router.get('/edit/:id', function(req,res){
  Article.findById(req.params.id, function(err, article){
    res.render('edit_article',{
      title:'Edit Article',
      article:article
    });
  });
});


// Update Submit POST Route
route.post('/edit/:id', function(req, res){
  let article = {};
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  let query = {_id:req.params.id}

  Article.update(query, article, function(err){
    if(err){
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

//delete articles

app.delete('/:id', function(req, res){
  let query = {_id:req.params.id}

  Article.remove(query, function(err){
    if(err){
      console.log(err);
    }
    res.send('Success');
  });
});

//Get Single Article
router.get('/:id', function(req,res){
  Article.findById(req.params.id, function(err, article){
    res.render('article',{
      article:article
    });
  });
});


module.exports= router;

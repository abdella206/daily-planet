const express = require('express');
const layouts = require('express-ejs-layouts');
const fs = require('fs');
const app = express();
const PORT = 8000;

const methodOverride = require('method-override');




app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(layouts);
app.use(express.static(__dirname + 'static'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

 


app.get('/', function(req, res){
    res.send("we should add some nice landing page stuff here");


});



///   - index route
app.get('/articles', function(req, res){
var articles = fs.readFileSync('./articles.json');
var articleData = JSON.parse(articles);
console.log(articleData);
res.render('articles/index', {articleData});
})


// GET /articles/new - serve up our new article form
app.get('/articles/new',function(req, res){
    res.render('articles/new')
 })

 // Get /article/edit - serve up our edit article form
app.get('/articles/:id/edit', function (req, res) {
    var article = fs.readFileSync('./articles.json');
    let articleData = JSON.parse(article);
    let id = parseInt(req.params.id);
    res.render('articles/edit', {article: articleData[id], id});
});
 
// GET /article/:id - show route - gets One dino

app.get('/articles/:id', function(req, res){
var article = fs.readFileSync('./articles.json');
var articleData = JSON.parse(article);
var id = parseInt(req.params.id);
res.render('articles/show', {article: articleData[id], id});
})








//////////////////////////////////////////////////// post
app.post('/articles', function(req, res){
var article = fs.readFileSync('./articles.json');
// convert to arry
var articleData = JSON.parse(article);
// push our new data into the arry
var newArticle = {
    title: req.body.articleType,
    body: req.body.articleName
}
    articleData.push(newArticle);
    fs.writeFileSync('./articles.json', JSON.stringify(articleData));

    res.redirect('/articles')
});








//////////////////// Delete

app.delete('/articles/:id',function(req, res){
    // Read the data from the file
    var article = fs.readFileSync('./articles.json');
    // Parse the data into an object
    var articleData = JSON.parse(article);
    // Splice out the item at the specified index
    var id = parseInt(req.params.id);
    articleData.splice(id, 1);
    // stringify he object
    var articleString = JSON.stringify(articleData);
    // write the object back to file
fs.writeFileSync('./articles.json', articleString);
    res.redirect('/articles')

})


//////////// PUT

app.put('/articles/:id', function(req, res){
    let article = fs.readFileSync('./articles.json');
    let articleData = JSON.parse(article);
    var id = parseInt(req.params.id);
    articleData[id].name = req.body.articleType;
    articleData[id].type= req.body.articleName;
    fs.writeFileSync('./articles.json', JSON.stringify(articleData));
    res.redirect('/articles/'+ id);

})
















app.listen( PORT || 8000);


console.log(PORT + 'we are listening');
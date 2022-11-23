const express = require('express');
const app = express();
const { response, request } = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Anime = require('./models/schema.js');

let PORT = 3000;
if(process.env.PORT){
	PORT = process.env.PORT
}

/////////////////
// Middleware
/////////////////
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));// standard - this is just how you get url encoded data into JSON
app.use(methodOverride('_method'));


// show template for new item
app.get('/anime/new', (request, response) => {
    response.render('new.ejs', {
    })
})

//where the new hero gets sent to - post address
app.post('/anime', (request, response) => {
    console.log(request.body);
    Anime.create(request.body, (error, inputObject) => {
        response.redirect('/anime')
    })
})


//extra route for landing page
app.get('/', (request, response) => {
    Anime.find({}, (error, allAnimeData) => {
        response.render('index.ejs', {
            anime: allAnimeData,
        })
    })
})

//this will show the index page with all anime
app.get('/anime', (request, response) => {
    Anime.find({}, (error, allAnimeData) => {
        response.render('index.ejs', {
            anime: allAnimeData,
        })
    })
})



app.delete('/anime/:id', (request, response) => {
    Anime.findByIdAndRemove(request.params.id, (error, data) => {
        response.redirect('/anime')
    })
})



app.put('/anime/:id', (request, response) => {
    Anime.findByIdAndUpdate(request.params.id, request.body, (error, updatedItem) => {
        response.redirect('/anime')
    })
})


//show template to udpate an existing anime
app.get('/anime/:id/edit', (request, response) => {
    Anime.findById(request.params.id, (error, foundItem) => {
        response.render(
            'edit.ejs',
            {
                anime: foundItem
            }
        )
    })
})


/////////////////
// SEARCH ROUTE
/////////////////

//this will show the index page with all anime
app.get('/anime/search/:field/:value', (request, response) => {
    let key = request.params.field 

    Anime.find({ [request.params.field]: request.params.value }, (error, allHeroData) => {
        response.render('search.ejs', {
           anime: allAnimeData,
        })
    })
})

/////////////////
// Show ROUTE
/////////////////
//show just one anime item
app.get('/anime/:id', (request, response) => {
    Anime.findById(request.params.id, (error, foundAnime) => {
        response.render('show.ejs', {
            anime: foundAnime
        });
    });
});

// DB and server connections

mongoose.connect('mongodb+srv://Angelv18:Togoonie1@cluster0.h5q3tl3.mongodb.net/crud_anime?retryWrites=true&w=majority', ()=>{
	console.log('connected to mongo');
})

app.listen(PORT, ()=>{
	console.log('listening');
})

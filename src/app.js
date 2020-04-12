const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geoCode = require('./utils/geoCode.js');
const forecast = require('./utils/forecast.js');

const app = express();

//Define paths for express config
const directaryName = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')

//setup handelbars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(directaryName))

app.get('',(req,res)=>{
   res.render('index',{
       title : 'Weather ',
       name : 'bullsnation'
   })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About ',
        name : 'bullsnation'
    })
 })

 app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'help!',
        name : 'bullsnation',
        message : 'helping'
    })
 })


app.get('/weather',(req,res)=>{
   if (!req.query.address) {
      return res.send({
           error:'you have to provide address'
       })
   }

           geoCode(req.query.address,(error,{latitude,longitude,place_name}={})=>{
               if (error) {
                   return res.send({error});
                   }
                       forecast(latitude,longitude,(error,forecast)=>{
                           if (error) {
                               return res.send({error});
                               }
                               res.send({
                                location: place_name,
                                forecast :forecast,
                                address: req.query.address
                            });
                       })
           })
})

app.get('/products',(req,res)=>{
    if (!req.query.search) {
        return res.send({
            error:'you have to provide search'
        })
    }
   
      res.send({
          products:[]
      })
})

app.get('/help/*',(req,res)=>{
    res.render('404error',{
        title : 404,
        name : 'bullsnation',
        message : 'Help article not found!'
    })
})

app.get('*',(req,res)=>{
    res.render('404error',{
        title : 404,
        name : 'bullsnation',
        message : 'Page not found!'
    })
})

app.listen(3000,()=>{
    console.log("port 3000");
})
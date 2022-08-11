const path=require('path')
const express=require('express')
const app=express()
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast= require('./utils/forecast')
publicDirectoryFolder=path.join(__dirname,'../public')
console.log(publicDirectoryFolder)
viewsPath=path.join(__dirname,'../src/views/template'
)

partialspath=path.join(__dirname,'../src/views/template/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialspath)

// Setup static directory to serve
app.use(express.static(publicDirectoryFolder))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name:  'Omar Khaled'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name:  'Omar Khaled'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Omar Khaled'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/products',(req,res)=>{
if(!req.query.address){
    return res.send(
    {
        error:'error '
    }
    )

}

    geocode(req.query.address, (error, {latitude,longitude,location}) => {
        if(error)
        {
            return res.send(error)
        }
       
    forecast(latitude,longitude, (error, forecast_data) => {
        if(error){
           return res.send(error)
        }
        res.send({
            forecast:forecast_data,
            location,
            address:req.query.address
        })
    })
})
    
    })




app.listen(2500,()=>{

    console.log('Servering up at port 2500')
})
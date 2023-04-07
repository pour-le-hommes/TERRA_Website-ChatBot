const express = require('express')
const router = express.Router()
router.use(express.urlencoded({ extended : true }));
const Massaschema = require('../model/massa.js')

router.get('/', (req,res) =>{
    console.log('Users')
    res.send('aenfkse')
})

router.get('/new', (req,res) =>{
    res.send('aenfkgrgse')
})

router.get('/create',(req,res) =>{
    res.render('create', {title: 'Create new user'})
})

router.post('/create',(req,res) =>{
    const massa = new Massaschema(req.body);
    massa.save().then(console.log('New massa saved')).then((result) =>{
        res.redirect('/')
    }).catch((err) =>{
        console.log(err);
    })
})

router.get('/:UserID', (req,res) =>{
    req.params.UserID
    res.send(`User with ID ${req.params.UserID}`)
})

module.exports= router
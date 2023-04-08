const express = require('express');
const Massa = require('../model/massa.js');
const router = express.Router()
const mongoose = require('mongoose')

router.get('/', (req,res) =>{
    console.log('Users')
    res.render('users',{title:"All Users"})
})

router.get('/new', (req,res) =>{
    res.send('aenfkgrgse')
})

router.get('/create',(req,res) =>{
    res.render('create', {title: 'Create new user'})
})

router.get('/all-massa',(req,res) =>{
    Massa.find({nim:12317}).then((result) =>{
        res.send(result)
        console.log('Showing Result',result)
    }).catch((err)=>{
        console.log('Error in finding all massa ',err)
    })
})

router.post('/create',(req,res) =>{
    const massa = new Massaschema(req.body);
    massa.save().then(console.log('New massa saved')).then((result) =>{
        res.redirect('/')
    }).catch((err) =>{
        console.log("Something's wrong, i can feel it ",err);
    })
})

// router.get('/:nim', (req,res) =>{
//     req.params.nim
//     res.send(`User with ID ${req.params.nim}`)
// })

module.exports= router
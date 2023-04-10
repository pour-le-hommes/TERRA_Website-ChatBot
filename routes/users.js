const express = require('express');
const Massa = require('../model/register.js');
const router = express.Router()
const mongoose = require('mongoose')

router.get('/', (req,res) =>{
    console.log('Users')
    res.render('users',{title:"All Users"})
})

router.get('/new', (req,res) =>{
    res.send('aenfkgrgse')
})

router.get('/all-massa',(req,res) =>{
    res.render('all-massa-list')
})

router.get('/:nim', (req,res) =>{
    Massa.find({nim:req.params.nim}).then((result) =>{
        console.log(result[0].nim)
        console.log(result[0].nim.trim()==='12317066')
        if(!result[0]){
            res.send(`User with ID ${req.params.nim} not found. Register at the home page`)
        }
        else if(result[0].nim==='12317066'){
            res.redirect('/about-me')
        }
        else{
            console.log(result[0].role)
            res.send(`User with ID ${req.params.nim}, Welcome ${result[0].nama}`)
        }
    })
})

module.exports= router
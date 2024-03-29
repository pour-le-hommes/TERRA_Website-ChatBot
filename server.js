const express = require('express')
const app = express()
const mongoose = require('mongoose')
const UserRouter = require('./routes/users')
const Massaschema = require('./model/register.js')
const Massa = require('./model/register.js');
app.use(express.urlencoded({ extended : true }));
app.use('/public', express.static('public'))
const bodyParser = require('body-parser');
const lineschema = require('./model/line')
const Line = require('./model/line')

// const { Client } = require('@line/bot-sdk')
// const webhook = require('./webhook/webhook.js')

// app.use(bodyParser.json());

// const CHANNEL_ACCESS_TOKEN = process.env.CHANNEL_ACCESS_TOKEN;
// const CHANNEL_SECRET = process.env.CHANNEL_SECRET;

// const client = new Client({
//   channelAccessToken: CHANNEL_ACCESS_TOKEN,
//   channelSecret: CHANNEL_SECRET,
// });

// Connect To Mongodb
const url = 'mongodb+srv://testing:testing@cluster0.ytucosn.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(url)
    .then((result) => app.listen(3000))
    .then(console.log('connected to Mongodb'))
    .catch((err) => console.log(err))

// Create View Engine
console.log('View Engine')
app.set('view engine', 'ejs')

// Create Home Page
app.get('/',(req,res) =>{
    console.log('Home Page')
    res.render('homepage')
})

app.get('/register',(req,res) =>{
    console.log('Register Page')
    res.render('register')
})

app.get('/about-me',(req,res) =>{
    console.log('About Me')
    res.render('aboutpage',{text:'suppp'})
})

app.get('/mtzen', (req,res) =>{
    res.render('mtzen')
})

app.listen(process.env.PORT||3000)

// Users Pages
app.use('/users', UserRouter)

// Verify
app.post('/verify', (req,res) =>{
  const massa = new Massaschema(req.body);
  if (massa.Role==='Pengurus'&& massa.Password!=='Saya berjanji akan membangun himpunan ini menjadi lebih baik'){
    console.log(massa.Nama,' wrong password')
    console.log(massa)
    res.redirect('/register')
  }else{
  Massa.find({nim:massa.nim}).then((result) =>{
    if(!result[0]){
        massa.save().then(console.log(`${massa.Nama} is successfully added!`)).then((result) =>{
            res.redirect('/')})
    }else{
        console.log(`Register failed, ${massa.Nim} is already used`)
        console.log(massa)
        res.redirect('/register');
    }
  }).catch((err)=>{
      console.log('Error in finding all massa ',err)
  })}
})

app.post('/webhook', (req, res) => {
    const promises = []
    const events = req.body.events;

    for (let i = 0; i < events.length; i++) {
        const event = events[i];
        const text = event.message.text
        const lineid = event.source.userId
        if(text === '!register'){
            console.log('Testing registry')
            Line.find({Lineid:lineid}).then((result) =>{
                console.log(result)
                if(!result[0]){
                    console.log('Registering user')
                    const line = new lineschema({
                        Lineid:lineid,
                        Nama:'User',
                        Jadwal:{},
                        Tugas:{}
                    })
                    line.save().then(()=>{
                        console.log(`${line.Nama.toLowerCase()} is successfully added!`)
                        const message = {
                            type : 'text',
                            text : `Registry Successful, welcome ${line.Nama}`,
                        };
                        promises.push(client.replyMessage(event.replyToken, message))
                        Promise.all(promises).then(() => res.status(200).end());
                    }).catch((err)=>{
                        console.error('Error in Registering ',err)
                    })
                }
                else{
                    console.log('Already registered user')
                    const message = {
                        type:'text',
                        text: `Woy ${result[0].Nama.toLowerCase()} dah registered lu anjing`
                    }
                    promises.push(client.replyMessage(event.replyToken, message))
                    Promise.all(promises).then(() => res.status(200).end());
                }
                
            }).catch((err)=>{
                console.log('Error in matching the database ',err)
            })
        }else{
            message = webhook(event,lineid)
            console.log('message in server ',message)
            promises.push(client.replyMessage(event.replyToken, message))
            Promise.all(promises).then(() => res.status(200).end());
        }
    }
    });

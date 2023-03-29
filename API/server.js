const express = require('express');
const cors = require('cors')
const knex = require ('knex')(require('./knexfile.js')['development']);
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')


const app = express();
const port = 8080;

app.use(express.json());
app.use(cors(
  {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }
))
app.use(cookieSession(
  {
    name: 'user_session',
    httpOnly:true,
    sameSite: 'strict',
    keys: ['hush,thisisasecret'],
    maxAge: 6 * 60 * 60 * 1000 // hours * minutes * seconds * milliseconds
                              // cookie expires in 6 hours
  }
))

/* GET ******************************************************/
app.get('/table/:table', function(req, res){
  if(req.session && req.session.user){
    let limit = req.query.limit;

    let base = knex.select('*').from(req.params.table);

    if(limit) {
      base = base.limit(limit);
    }

    base.then(data => res.status(200).json(data))
      .catch(err => res.status(404).json(err))
  }
  else{
    res.status(401).json({message: 'YOU SHALL NOT PASS'})
  }
})

app.get('/launches-join', function(req, res){
  if(req.session && req.session.user){
    const columns = [
      'payloads.id AS payload_id',
      'site_id',
      'lv_id',
      'launch_id',
      'launch_vehicle.name AS launch_vehicle',
      'lsp',
      'orbit',
      'date_time',
      'status',
      'launch_site.name AS site_name',
      'launch_site.lat AS site_lat',
      'launch_site.lon AS site_lon',
      'customer AS payload_customer',
      'mission AS payload_mission',
      'description AS payload_description',
      'classification AS payload_classification',
      'launch_vehicle.img'
    ];
    let limit = req.query.limit;
    let orderBy = req.query.order;

    let base = knex('payloads')
      .join('launches', 'launches.id', '=', 'payloads.launch_id')
      .join('launch_vehicle', 'launch_vehicle.id', '=', 'launches.lv_id')
      .join('launch_site', 'launch_site.id', '=', 'launches.site_id')
      .select(columns);

    if(limit && orderBy) {
      base = base.limit(limit).orderBy(orderBy, orderBy);
    } else if(limit) {
      base = base.limit(limit);
    } else if(orderBy) {
      base = base.orderBy(orderBy, orderBy);;
    }

    base.then(data => res.status(200).json(data))
      .catch(err => res.status(404).json(err))
  }
  else{
    res.status(401).json({message: 'YOU SHALL NOT PASS'})
  }
})

/* POST ******************************************************/
app.post('/launches', function(req, res){
  let launchData = req.body;

  knex.insert(launchData)
    .into("launches")
    .then(data => res.status(200).send("Insert into launches was successful!"))
    .catch(err => res.status(404).json(err))
})

app.post('/payloads', function(req, res){
  let payloadData = req.body;

  knex.insert(payloadData)
    .into("payloads")
    .then(data => res.status(200).send("Insert into payloads was successful!"))
    .catch(err => res.status(404).json(err))
})

app.post('/login', function(req, res){
  let user = req.body; // {email: test@abc, password: test123}
  console.log('email:\n', user.email)
  console.log('password:\n', user.password)

  let matched = false
  knex.select('*').from('users')
    .then(users_table => {
      for(users of users_table){
        if(user.email==users.email && user.password==users.password){
          req.session.user = {
            id: users.id,
            email: users.email
          }
          matched = true
          res.status(200).send({message: 'Logged in successfully',
                                user: `${users.name}`})
          break
        }
      }
      if(!matched){
        res.status(401).send({message: 'Invalid email or password'})
      }
    })
})

/* PUT ******************************************************/
app.put('/launches/:id', function(req, res){
  let launchID = req.params.id;

  knex("launches").where("id", launchID)
    .update({
      site_id: req.body.site_id,
      lv_id: req.body.lv_id,
      lsp: req.body.lsp,
      orbit: req.body.orbit,
      date_time: req.body.date_time,
      status: req.body.status
    })
    .then(data => res.status(200).send("Update launches was successful!"))
    .catch(err => res.status(404).json(err))
})

app.put('/payloads/:id', function(req, res){
  let payloadID = req.params.id;

  knex("payloads").where("id", payloadID)
    .update({
      launch_id: req.body.launch_id,
      customer: req.body.customer,
      mission: req.body.mission,
      description: req.body.description,
      classification: req.body.classification
    })
    .then(data => res.status(200).send("Update payload was successful!"))
    .catch(err => res.status(404).json(err))
})

/* DELETE ******************************************************/
app.delete('/launches/:id', function(req, res){
  let launchID = req.params.id;

  knex("launches").where("id", launchID)
    .del()
    .then(data => res.status(200).send("Delete launch was successful!"))
    .catch(err => res.status(404).json(err))
})

app.delete('/payloads/:id', function(req, res){
  let payloadID = req.params.id;

  knex("payloads").where("id", payloadID)
    .del()
    .then(data => res.status(200).send(`Deleted payload ${payloadID} was successful!`))
    .catch(err => res.status(404).json(err))
})

/* OTHER ******************************************************/
app.all('/*', (req, res) => {
  res.status(405).send('Method not authorized');
})

app.listen(port, () => {console.log(`The server is running on ${port}`)});

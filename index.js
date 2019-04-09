// dependencies
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const uuid = require('uuid/v4');
const Session = require('./Session');
const _ = require('lodash');
const Canvas = require('./Canvas');
const ColorGenerator = require('./ColorGenerator');

//for or parsing information sent with requests
const bodyParser = require('body-parser');

// allow cross-origin resource resource sharing
const cors = require('cors');

// global variables
const colorGen = new ColorGenerator();

// used to keep track of unique users {userID: userData}
const sessions = {};

let canvas = new Canvas(10, 10);

// app.use() is for adding middleware to Express
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/create_user', (req, res) => {
  // const key = uuid();
  const color = colorGen.nextColor();
  // sessions[key] = new Session(req.body.name, color);
  res.json({ success: true, color: color });
});

io.on('connection', socket => {
  //When a connection was created.
  console.log('emitting canvas', canvas);
  socket.emit('canvas', canvas);

  socket.on('canvas', (_canvas) => {
    console.log('received canvas', _canvas);
    canvas.matrix = _canvas.matrix;
    console.log('emitting canvas', canvas);
    io.emit('canvas', canvas);
  });

  socket.on('pixel', ({r, c, value}) => {
    console.log('received pixel', {r, c, value});
    canvas.matrix[r][c] = value;
    io.emit('pixel', {r, c, value});
  })
});

const cursorPositions = (sessions) => _.map(sessions, (session) => {
  return {
    x: session.mouseX,
    y: session.mouseY,
    name: session.name,
    key: session.getName
  };
});

http.listen(8080, () => {
  //When the server is initialized.
});
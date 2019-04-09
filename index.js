// dependencies
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const uuid = require('uuid/v4');
const Session = require('./Session');
const _ = require('lodash');
const Canvas = require('./Canvas');

//for or parsing information sent with requests
const bodyParser = require('body-parser');

// allow cross-origin resource resource sharing
const cors = require('cors');

// global variables

// used to keep track of unique users {userID: userData}
const sessions = {};

let canvas = new Canvas(10, 10);

// app.use() is for adding middleware to Express
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/create_user', (req, res) => {
  const key = uuid();
  sessions[key] = new Session(req.body.name);
  res.json({ success: true });
});

io.on('connection', socket => {
  //When a connection was created.
  socket.emit('canvas', canvas);

  socket.on('canvas', (_canvas) => {
    canvas.matrix = _canvas.matrix;
    io.emit('canvas', canvas);
  });
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
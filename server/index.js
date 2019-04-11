// dependencies
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const uuid = require('uuid/v4');
const path = require('path');
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
const SIZE = 40;

// used to keep track of unique users {userID: userData}
const sessions = {};

let canvas = new Canvas(SIZE, SIZE);

// app.use() is for adding middleware to Express
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

io.on('connection', socket => {
  const sessionKey = uuid();
  const color = colorGen.nextColor();
  const session = new Session(sessionKey, color)
  sessions[sessionKey] = session;
  // send session key, designated color, current canvas state, and all other pointer positions
  socket.emit('init', { sessionKey, color, canvas, pointers: pointers(sessionKey) });

  //When a connection was created.
  socket.emit('canvas', canvas);

  socket.on('canvas', (_canvas) => {
    canvas.matrix = _canvas.matrix;
    io.emit('canvas', canvas);
  });

  socket.on('pixel', ({ r, c, value }) => {
    canvas.matrix[r][c] = value;
    io.emit('pixel', { r, c, value });
  });

  socket.on('pointer', ({ sessionKey, xPercent, yPercent }) => {
    const { color } = session;
    session.pointerX = xPercent;
    session.pointerY = yPercent;
    socket.broadcast.emit('pointer', { sessionKey, color, xPercent, yPercent });
  });

  socket.on('clear', () => {
    canvas.clear();
    io.emit('canvas', canvas);
  });

  socket.on('disconnect', (reason) => {
    console.log('disconnect:', reason);
    delete sessions[sessionKey];
    socket.broadcast.emit('userDisconnected', { sessionKey });
  });

  console.log('new user with: ', { sessionKey, color });
  console.log('total connections: ', Object.keys(sessions).length);
});

const port = process.env.PORT || 8080;
http.listen(port, () => {
  //When the server is initialized.
  console.log('Server started on port ' + port + '...');
});

const pointers = (currentSession) => {
  const otherSessions = _.omit(sessions, currentSession);
  return _.reduce(otherSessions, (acc, curr, key) => {
    const xPercent = curr.pointerX;
    const yPercent = curr.pointerY;
    const color = curr.color;
    return { ...acc, [key]: { xPercent, yPercent, color } }
  }, {})
}
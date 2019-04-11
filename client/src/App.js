import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';
import _ from 'lodash';
import PixelCanvas from './PixelCanvas';

// const {whyDidYouUpdate} = require('why-did-you-update');
  // whyDidYouUpdate(React);

// constants
// const serverUrl = 'https://draw-colab.herokuapp.com/';
// const serverUrl = 'http://localhost:8080';
// const serverUrl = 'http://10.0.0.6:8080';

const serverUrl = process.env.NODE_ENV === 'production' ? 'https://draw-collab.herokuapp.com/' : 'http://localhost:8080';


class App extends Component {
  constructor() {
    super();

    this.state = {
      matrix: null,
      pointerFriends: {},
      loaded: false
    }
  }

  componentDidMount() {
    this.setUpSocket();
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextState.matrix, this.state.matrix) ||
      !_.isEqual(nextState.pointerFriends, this.state.pointerFriends);
  }

  setUpSocket = async () => {
    this.socket = io.connect(serverUrl);

    this.socket.on('init', ({ sessionKey, color, canvas, pointers }) => {
      this.sessionKey = sessionKey;
      this.color = color;
      this.setState({matrix: canvas.matrix, pointerFriends: pointers});
    });

    this.socket.on('canvas', (canvas) => {
      this.setState({ matrix: canvas.matrix });
    });

    this.socket.on('pixel', ({ r, c, value }) => {
      this.setState(state => {
        let newMatrix = _.cloneDeep(state.matrix);
        newMatrix[r][c] = value;
        return { matrix: newMatrix };
      });
    });

    this.socket.on('pointer', ({ sessionKey, color, xPercent, yPercent }) => {
      this.setState(state => {
        const newPointerFriends = {
          ...state.pointerFriends,
          [sessionKey]: {
            xPercent,
            yPercent,
            color
          }
        };
        return { pointerFriends: newPointerFriends };
      })
    });

    this.socket.on('userDisconnected', ({sessionKey}) => {
      this.setState(state => {
        return {pointerFriends: _.omit(state.pointerFriends, sessionKey)};
      });
    })

    this.state.loaded = true;
  }

  handlePixelChange = (r, c, value) => {
    this.socket.emit('pixel', { r, c, value });
    // this.setState({matrix: canvas.matrix});
  }

  handlePointerMove = (xPercent, yPercent) => {
    const { sessionKey } = this; 
    this.socket.emit('pointer', { sessionKey, xPercent, yPercent });
  }

  clearCanvas = () => {
    this.socket.emit('clear');
  }

  render() {
    if (this.state.loaded) {
      return (
        <main className="App">
          <PixelCanvas matrix={this.state.matrix}
            color={this.color}
            onChange={this.handlePixelChange}
            onPointerMove={this.handlePointerMove}
            pointerFriends={this.state.pointerFriends} />
            <button onClick={this.clearCanvas}>Clear</button>
        </main>
      );
    } else {
      return (
        <p>loading...</p>
      );
    }

  }
}

export default App;
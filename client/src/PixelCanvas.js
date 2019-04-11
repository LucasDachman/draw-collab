import React  from 'react';
import _ from 'lodash';

export default class PixelCanvas extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.color !== this.props.color ||
      !_.isEqual(nextProps.matrix, this.props.matrix) ||
      !_.isEqual(nextProps.pointerFriends, this.props.pointerFriends);
  }

  handlePixelClick = (row, col) => {
    const val = this.props.matrix[row][col] === '' ? this.props.color : '';
    this.props.onChange(row, col, val);
  }

  handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPercent = Math.round((e.clientX - rect.left) / rect.width * 100); //x position within the element.
    const yPercent = Math.round((e.clientY - rect.top) / rect.height * 100);  //y position within the element.

    this.props.onPointerMove(xPercent, yPercent);
  }

  render() {
    const matrix = this.props.matrix || [];
    const pointers = this.props.pointerFriends;
    return <section className="pixel-canvas" onPointerMove={this.handlePointerMove}>
      <div className='canvas-rows' >
        {matrix.map((row, rowIdx) => {
          return <div className='canvas-row' key={rowIdx}>
            {row.map((cell, colIdx) =>
              <Pixel color={cell}
                onClick={() => this.handlePixelClick(rowIdx, colIdx)}
                key={cell + colIdx} />
            )}
          </div>
        })}
      </div>
      <div className='pointer-friends'>
        {_.map(pointers, (pointer, key) => {
          const style = {
            left: pointer.xPercent + '%',
            top: pointer.yPercent + '%',
            backgroundColor: pointer.color
          };
          return <div className='pointer-friend' style={style} key={key}></div>
        })}
      </div>
    </section>
  }
}

class Pixel extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.color !== this.props.color;
  }
  render() {
    const {color, onClick} = this.props;
    return (
      <div className={`pixel ${color}`}
        onClick={onClick} />
    );
  }
}
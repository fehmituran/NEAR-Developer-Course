import React from 'react';

export class Rules extends React.Component {
  constructor(props) {
    super(props)
    this.toogleRules = this.toogleRules.bind(this)
    this.state = {
      show: true,
    }
  }

  toogleRules() {
    this.setState({
      show: this.state.show ? false : true,
    })
  }

  render() {
    const link = 'https://en.wikipedia.org/wiki/Mastermind_(board_game)';
    const rulesTitle = this.state.show ? 'Show Rules' : 'Hide Rules';
    const style = {
      display: this.state.show ? 'none' : 'block',
    }

    return (
      <div className='rules'>
        <h3 onClick={this.toogleRules}> {rulesTitle} </h3>
        <p style={style}> Try to guess the pattern, in both order and
        color, within ten turns. After submitting a row,
        a small green squared is show for each circle
        in a correct position and color. A yellow square
        indicates the existence of a correct color in an
        incorrect position. <br />
        More info on <a href={link}>Wikipedia</a>.
        </p>
      </div>
    )
  }
}
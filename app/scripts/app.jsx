let _ = require('lodash');
let React = require('react');
let ReactDOM = require('react-dom');

/**
 * StressPatternApp component
 */
let StressPatternApp = React.createClass({
  getInitialState: function() {
    return {stressPattern: '1,w0w2w0w1,s0s2s0s1\n2,w1w3w0w1,s1s0s2s0'};
  },

  handleChange: function(e) {
    this.setState({stressPattern: e.target.value});
  },

  render: function() {
    return (
      <div>
        <h3>Stress Patterns Visualizer©</h3>
        <StressList data={this.state.stressPattern} />
        <p>Put your patterns here and enjoy:</p>
        <textarea className={'inputStressPattern'} onChange={this.handleChange} defaultValue={this.state.stressPattern}></textarea>
      </div>
    );
  }
});

/**
 * StressList component
 */
let StressList = React.createClass({
  pairingPattern: function(pattern) {
    let lines = pattern.split('\n');

    return _.map(lines, function(l) {
      let split = l.split(',');
      let stress = split[2].match(/.{1,2}/g);
      let wove = split[1].match(/.{1,2}/g);

      return _.zip(wove, stress);
    });
  },

  render: function() {
    let paired = this.pairingPattern(this.props.data);

    return (
      <div>
        {_.map(paired, function(pa, k) {
          return (
            <div key={k}className={'groupedStress'}>
              {_.map(pa, function(p, i) {
                return <Stress key={i} wove={p[0]} level={p[1]} />;
              })}
            </div>
          )
        })}
      </div>
    );
  }
});

/**
 * Stress component
 */
let Stress = React.createClass({
  getInitialState: function() {
    return {text: this.props.wove};
  },

  showLevel: function() {
    this.setState({text: this.props.level});
  },

  showWove: function() {
    this.setState({text: this.props.wove});
  },

  render: function() {
    return (
      <div onMouseEnter={this.showLevel} onMouseLeave={this.showWove} className={'stress' + ' ' + 'level-' + this.props.level}>
        <p>{this.state.text}</p>
      </div>
    );
  }
});

ReactDOM.render(<StressPatternApp />, document.getElementById('app'));

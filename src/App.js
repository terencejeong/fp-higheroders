import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const starWarsChars = [
  { name:'Luke', side:'light' },
  { name:'Darth Vader', side:'dark' },
  { name:'Obi-wan Kenobi', side:'light'},
  { name:'Palpatine', side:'dark'},
];

const compose = (...hocs) => BaseComponent => {
  return hocs.reduceRight((acc, hoc) => {
    return hoc(acc)
  }, BaseComponent)
};

// Cleaner syntax less verbose.
const withTransformProps = mapperFunc =>
  BaseComponent => baseProps => {
    const transformedProps = mapperFunc(baseProps)
    console.log('baseProps', baseProps)
    console.log('transformed props', transformedProps)
    return <BaseComponent {...transformedProps} />
  }

const withSimpleState = defaultState => BaseComponent => {
  return class WithSimpleState extends Component {
    state = {
      value: defaultState
    };
    updateState = (value) => {
      this.setState({ value })
    }
    render() {
      return (
        <BaseComponent
          {...this.props}
          stateValue={this.state.value}
          stateHandler={this.updateState}
        />
      )
    }
  }
};
const renderDisplayList = ({ list, stateHandler, otherSide }) => {
  return (
    <div>
      <button onClick={() => stateHandler(otherSide)}>Switch</button>
      {list.map(char =>
        <div key={char.name}>
          <div>Character: {char.name}</div>
          <div>Side: {char.side}</div>
        </div>
      )}
    </div>
  )
};
// const FilteredList = withSimpleState('dark')(
//   withTransformProps(({ list, stateValue, stateHandler }) => {
//     const otherSide = stateValue === 'dark' ? 'light' : 'dark'
//     return {
//       stateHandler,
//       otherSide,
//       list: list.filter(char => char.side === stateValue)
//     }
//   })(renderDisplayList)
// );

const enhance = compose(
  withSimpleState('dark'),
  withTransformProps(({ list, stateValue, stateHandler}) => {
    const otherSide = stateValue === 'dark' ? 'light' : 'dark'
    return {
      stateHandler,
      otherSide,
      list: list.filter(char => char.side === stateValue)
    }
  })
);

const FilteredList = enhance(renderDisplayList);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Higher Order</h1>
        </header>
        <FilteredList list={starWarsChars}/>
      </div>
    );
  }
}

export default App;

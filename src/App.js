import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const starWarsChars = [
  { name:'Luke', side:'light' },
  { name:'Darth Vader', side:'dark' },
  { name:'Obi-wan Kenobi', side:'light'},
  { name:'Palpatine', side:'dark'},
];

// functional component no state
// const withTransformProps = transformFunc => {
//   const ConfiguredComponent = BaseComponent => {
//     return baseProps => {
//       console.log(baseProps)
//       const transformedProps = transformFunc(baseProps);
//       console.log(transformedProps)
//       return <BaseComponent {...transformedProps} />
//     }
//   };
//   return ConfiguredComponent
// };

// Cleaner syntax less verbose. 
const withTransformProps = mapperFunc =>
  BaseComponent => baseProps => {
    const transformedProps = mapperFunc(baseProps)
    return <BaseComponent {...transformedProps} />
  }

const renderFunctionalDisplayList = ({ list }) =>
  <div>
    {list.map(char =>
      <div key={char.name}>
        <div>Character: {char.name}</div>
        <div>Side: {char.side}</div>
      </div>
    )}
  </div>

const FunctionalfilteredList = withTransformProps(({ list, side }) => ({ list: list.filter(FilteredListchar => FilteredListchar.side === side) }))(renderFunctionalDisplayList)

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
const renderDisplayList = ({ list, stateValue, stateHandler })=> {
  const filteredList = list.filter(char => char.side === stateValue)
  const otherSide = stateValue === 'dark' ? 'light' : 'dark'
  return (
    <div>
      <button onClick={() => stateHandler(otherSide)}>Switch</button>
      {filteredList.map(char =>
        <div key={char.name}>
          <div>Character: {char.name}</div>
          <div>Side: {char.side}</div>
        </div>
      )}
    </div>
  )
};
const FilteredList = withSimpleState('dark')(renderDisplayList);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Higher Order</h1>
        </header>
       <FilteredList list={starWarsChars} />
        <FunctionalfilteredList side="dark" list={starWarsChars}  />
      </div>
    );
  }
}

export default App;

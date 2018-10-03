import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSelectTo = this.handleSelectTo.bind(this);
  }
  handleChange(e) {
    const searchValue = e.target.value;
    this.props.onChange(searchValue);
    this.convertCurrency();
}
  handleSelect(e) {
    const selectedCountry = e.target.value;
    this.props.onSelect(selectedCountry);   //when theres a change, want to pass it to index.js to update state
    this.convertCurrency();
  }
  handleSelectTo(e) {
    const selectedC = e.target.value;
    this.props.onSelectTo(selectedC);
    this.convertCurrency();
  }
  addCountries() {
    let names = this.props.countries;
    const inputCountries = [<option value=''>-Select-</option>]; //initialise dropdown with no value so first selected will be nothing
    for (const shortName in names) {
      inputCountries.push(<option value={shortName}>{names[shortName]}</option>);
    } //Shows the long name for readability but has the value of the short one because the rates api only uses the short version for reference.
    return inputCountries;
  }
  convertCurrency() {
    let from = this.props.from; //created variables here for easier referencing
    let to = this.props.to;
    let rates = this.props.rates;
    //API subscription fixes base to EUR
    if ((from.length < 2) || (to.length < 2)) {
        console.log("finish entering"); //initial unselected value length is 0 and most countries are 3 so just checks if ready to start calculating
    } else {
        let fromRate = rates[from];
        let toRate = rates[to]; //finding rates of both in relation to EUR. 1 EUR = fromrate and 1 EUR = toRate. fromrate is equivalent to toRate
        toRate /= fromRate;   //to standardise fromRate to 1, we must divide it by itself, then divide toRate by the same. Only need to show toRate.
        toRate *= this.props.value; //toRate before was equivalent to 1 fromRate. Multiply by value entered to get correct amount
        return toRate;
    }
}
  render() {
    return (
      <div className="App">
        <h1 id="title"><span className="fas fa-euro-sign"></span>Currency Converter</h1>
      <div className="Content">
        <input id="value" onChange={this.handleChange} value={this.props.value}/>
        <select className="countrySel" onChange={this.handleSelect}>{this.addCountries()}</select>
        <p>To</p>
        <select className="countrySel" onChange={this.handleSelectTo}>{this.addCountries()}</select>
        <br></br>
        <input id="total" value={this.convertCurrency()}/>
      </div>
      </div>
    ); 
  }  
}

export default App;

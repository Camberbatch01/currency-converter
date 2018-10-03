import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

class Converter extends React.Component {
    constructor() {
        super();
        this.state = {
            value: 0,
            countries: [],
            rates: [],
            from: '',
            to: ''
        }
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleFromChange = this.handleFromChange.bind(this);
        this.handleToChange = this.handleToChange.bind(this);
    }
    handleValueChange(newValue) {
        this.setState({value: newValue});
    }
    handleFromChange(newPlace) {
        this.setState({from: newPlace}); //when country changed, update state so i can find the rate for it later
    }
    handleToChange(newPlace) {
        this.setState({to: newPlace});
    }
    componentDidMount() {
        Promise.all([   //used extra call to get the full names of the countries. Thought it'd be easier to know who is who.
            fetch(`http://data.fixer.io/api/symbols?access_key=55e3866f780636ef4f97ebd99d68f9a4`),
            fetch(`http://data.fixer.io/api/latest?access_key=55e3866f780636ef4f97ebd99d68f9a4`)    //subscription limited. Could only get rates w/res to base EUR
        ]).then(([res1,res2]) => Promise.all([res1.json(), res2.json()]))
        .then(([info1, info2]) => {
            this.setState({countries: info1.symbols});
            this.setState({rates: info2.rates});
        })
        }
    render() {
        return (
                <App rates={this.state.rates} to={this.state.to} from={this.state.from} countries={this.state.countries} value={this.state.value} onSelect={this.handleFromChange} onSelectTo={this.handleToChange} onChange={this.handleValueChange}/>    
        );
    }
}

ReactDOM.render(<Converter />, document.getElementById('root'));
registerServiceWorker();

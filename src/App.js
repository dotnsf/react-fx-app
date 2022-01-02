//import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor( props ){
    super( props );
    this.state = {
      datetime: null,
      rate: null,
      message: null
    };

    setInterval( () => {
      fetch( 'https://dotnsf-fx.herokuapp.com/' ).then( res => res.json() ).then( data => {
        console.log( data );
        if( data && data.status ){
          this.setState({
            datetime: data.datetime,
            rate: data.rate,
            message: ''
          });
        }else{
          this.setState({
            datetime: null,
            rate: null,
            message: data.messsage
          });
        }
      }).catch( e => {
        this.setState({
          datetime: null,
          rate: null,
          message: e
        });
      });
    }, 10000 );
  };

  render(){
    return (
    <div className="App">
      <header className="App-header">
        <p>{this.state.datetime}</p>
        <div>
          <ul>
          {this.state.rate != null ? Object.keys( this.state.rate ).map( ( key, i ) => (
            <li>{key} : {this.state.rate[key]}</li>
          )) :
            <li>{this.state.message}</li>
          }
          </ul>
        </div>
      </header>
    </div>
    );
  };
}

export default App;

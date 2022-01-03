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
      fetch( 'https://dotnsf-fx.herokuapp.com/', { mode: 'cors' } ).then( res => res.json() ).then( data => {
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
        <h1 className="bg-primary text-white display-4">{this.state.datetime}</h1>
        <div className="container">
          {this.state.rate != null ? Object.keys( this.state.rate ).map( ( key, i ) => (
            <div className="card bg-primary text-white mt-4">
              <div className="card-header">
                {key}
              </div>
              <div className="card-body">
                {this.state.rate[key]}
              </div>
            </div>
          )) :
            <div className="card bg-danger text-white mt-4">
              <div className="card-body">
                {this.state.message}
              </div>
            </div>
          }
        </div>
      </header>
    </div>
    );
  };
}

export default App;

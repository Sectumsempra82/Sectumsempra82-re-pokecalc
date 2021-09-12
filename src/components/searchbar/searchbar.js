import React, { Fragment } from 'react';
import './searchbar.css';
import Hints from '../hints/hints';

class Searchbar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          value: '',
          focusSearch: 'OFF',
          Searched: 'False'
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleHint = this.handleHint.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.setPokemon = props.setPokemon.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
        if(event.target.value !== this.state.value){
          this.setState({Searched: 'False'})
        }
      }
    
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        this.setState({Searched: 'True'});
        this.setPokemon(this.state.value);
        event.preventDefault();
      }

      handleHint(hint) {
        this.setState({value: hint, Searched: 'True'}, () => {
          this.setPokemon(this.state.value);
        })
        
      }

      handleFocus(status){
        this.setState({focusSearch: status})
      }


    
      render() {


        return (
          <form onSubmit={this.handleSubmit} className="Searchbar">
            <div>
            <label>
              Name: &nbsp; &nbsp;
             
              
            </label>

            <input 
                placeholder="Type a pokemon name to search, type in at least 3 chars to show hints"
                type="text" 
                value={this.state.value} 
                onChange={this.handleChange}
                onFocus={(e) => {
                  
                  if (!e.currentTarget.contains(e.relatedTarget)) {
                    // Not triggered when swapping focus between children
                    this.handleFocus('ON');
                  }
                }}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) {
                    // Not triggered when swapping focus between children
                    this.handleFocus('OFF');
                  }
                }}

              />
                <input type="submit" value="Submit" />

                </div>
            {(this.state.value !== '' && this.state.value.length > 2 && this.state.Searched === 'False') ? <Hints value={this.state.value} setSearch={this.handleHint}></Hints> : <Fragment></Fragment>}
            <span>&nbsp;</span>
            
          </form>
        );
      }
}

export default Searchbar;
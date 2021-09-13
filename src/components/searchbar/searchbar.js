import React, { Fragment, useRef } from 'react';
import './searchbar.css';
import Hints from '../hints/hints';



export default function Searchbar(props) {
    const[value, setValue] = useState('');
    const[focusSearch, setFocusSearch] = useState('OFF');
    const[searched, setSearched] = useState(false);
    const inputVal = useRef(null)

    const handleSubmit = (event) => {
        setValue(inputVal.current.value);
        setSearched(true);
        event.preventDefault();
    }

    const handleHint = (hint) => {
        setValue(hint);
        props.setPokemon(hint);
    }
    

    return (
        <form onSubmit={handleSubmit} className="Searchbar">
          <div>
          <label>
            Name: &nbsp; &nbsp;
           
            
          </label>

          <input 
              placeholder="Type a pokemon name to search, type in at least 3 chars to show hints"
              type="text" 
              value={value} 
              onChange={() => setValue(inputVal.current.value)}
              ref={inputVal}
              onFocus={(e) => {
                
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  // Not triggered when swapping focus between children
                  setFocusSearch('ON');
                }
              }}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  // Not triggered when swapping focus between children
                  setFocusSearch('OFF');
                }
              }}

            />
              <input type="submit" value="Submit" />

              </div>
          {(value !== '' && value.length > 2 && !searched ) ? <Hints value={value} setSearch={handleHint}></Hints> : <Fragment></Fragment>}
          <span>&nbsp;</span>
          
        </form>
      );

}


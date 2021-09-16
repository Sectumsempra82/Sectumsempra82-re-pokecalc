import React, {useRef,useState } from 'react';
import useHints from '../hints/hints';
import {useCombobox} from 'downshift'



export default function Searchbar(props) {
    const[value, setValue] = useState('');
  
    const inputVal = useRef(null)
    const hints = useHints(value)


    const {
      isOpen,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      getInputProps,
      getComboboxProps,
      highlightedIndex,
      getItemProps,
    } = useCombobox({
      items: hints,
      onInputValueChange: ({inputValue}) => {
        inputValue = inputValue.toLowerCase();
        setValue({inputValue});
      },
      onSelectedItemChange : ({selectedItem}) => {
        props.setPokemon(selectedItem);
      }
    })

    const handleSubmit = (event) => {
        props.setPokemon(inputVal.current.value);
        event.preventDefault();
    }


    return (
        <form onSubmit={handleSubmit} className="Searchbar">
          <div>
          <label>
            Name: &nbsp; &nbsp;
              <>
                <label {...getLabelProps()}>Choose an element:</label>
                <div {...getComboboxProps()}>
                  <input {...getInputProps({ref: inputVal})} />
                  <button
                    type="button"
                    {...getToggleButtonProps()}
                    aria-label={'toggle menu'}
                  >
                    &#8595;
                  </button>
                </div>
                <ul {...getMenuProps({hints})} >
                {isOpen &&
                  hints.map((item, index) => (
                    <li
                      style={
                        highlightedIndex === index ? {backgroundColor: '#bde4ff'} : {}
                      }
                      key={`${item}${index}`}
                      {...getItemProps({item, index})}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            
          </label>

          
              <input type="submit" value="Submit" />

              </div>
         
          <span>&nbsp;</span>
          
        </form>
      );

}


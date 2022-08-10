import {
    FormControlLabel,
    Radio as MUIRadio,
    FormLabel,
    
} from '@mui/material';
import * as React from 'react';
import {useState} from 'react'

const Radio = ({value, label, handleSelect}) => {
    const [currentlySelectedRadio, setCurrentlySelectedRadio] = useState();

    const radioHandler =(e) => {
        handleSelect(e.target.value)
    }

    return (
        <> 
            <FormControlLabel
                className={'radio'}
                control={<MUIRadio />}
                label={label}
                value={value}
                onChange={radioHandler} 
            /> 
        </>
    )
}
export default Radio;
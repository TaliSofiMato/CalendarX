import {
    FormControlLabel,
    Radio as MUIRadio,
    FormLabel,
    
} from '@mui/material';
import * as React from 'react';
import {useState} from 'react'

const Radio = ({value, label}) => {
    const [selectedRadio, setSelectedRadio] = useState();

    const radioHandler =(e) => {
        setSelectedRadio(e.target.value)
    }

    return (
        <> 
                <FormControlLabel
                    className={'radio'}
                    control={<MUIRadio />}
                    label={label}
                    value={value}
                    onChange={radioHandler} /> 
        </>
    )
}
export default Radio;
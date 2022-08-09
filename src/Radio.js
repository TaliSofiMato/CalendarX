import {
    FormControlLabel,
    Radio as MUIRadio,
    FormLabel,
    
} from '@mui/material';


const Radio = ({value, label}) => {
    return (
        <> 
                <FormControlLabel
                    control={<MUIRadio />}
                    label={label}
                    value={value} /> 
        </>

    )
}
export default Radio;
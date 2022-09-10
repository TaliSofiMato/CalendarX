import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import {
    FormLabel,
    FormControlLabel,
    FormGroup,
} from '@mui/material'
import './NewEventDropDown.css'
import { useState } from 'react';
import  {Amplify} from 'aws-amplify';


export default function BasicMenu(props) {
    const [eventType, setEventype] = useState('')
    const [eventDays, setEventDays] = useState('')
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const postEventType = async (e) => {
        let response
        try {
            response = await fetch(`https://ux2mlsj4y2.execute-api.us-east-1.amazonaws.com/event-types`, { 
                headers: {
                    Authorization : `Bearer ${Amplify.Auth.user.signInUserSession.accessToken.jwtToken}`
                },
                method: 'post', 
                body: JSON.stringify(e) 
            })
            props.updateEventTypes(response)
        } catch (e) {
            console.log(e.response.status)
            response = e.response
        }
    }

    const saveEventType = (e) => {
        postEventType({
            title: eventType,
            dayIndexes: eventDays
        })
        setAnchorEl(null);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleTextField = (e) => {
        setEventype(e.target.value)
    };
    const handleCheckbox = (e) => {
        let dayIndexMap = {
            'Su': 0,
            'M': 1,
            'T': 2,
            'W': 3,
            'Th': 4,
            'F': 5,
            'S': 6
        }
        if (e.target.checked) {
            let newEventDays = [...eventDays, dayIndexMap[e.target.name]]
            setEventDays(newEventDays)
        } else {
            let newEventDays = eventDays.filter((day) => {
                return e.target.name !== day
            })
            setEventDays(newEventDays)
        }
    };

    const days = [
        { name: "Su" },
        { name: "M" },
        { name: "T" },
        { name: "W" },
        { name: "Th" },
        { name: "F" },
        { name: "S" }
    ]

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                New Event
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem>
                    <TextField id="filled-basic" onChange={handleTextField} label="Event Type" variant="filled" />
                </MenuItem>
                <MenuItem>
                    <FormLabel component="legend">Select Days</FormLabel>
                    <FormGroup>
                        {days.map((d, index) => {
                            return (
                                <FormControlLabel
                                    key={index}
                                    control={
                                        <input
                                            type="checkbox"
                                            name={d.name}
                                            onChange={handleCheckbox}
                                        />
                                    }
                                    label={d.name}
                                />
                            )
                        })}
                    </FormGroup>
                </MenuItem>
                <MenuItem onClick={saveEventType} >Save</MenuItem>
            </Menu>
        </div>
    );
} 
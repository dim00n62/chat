import cn from 'classnames';

import AndroidIcon from '@mui/icons-material/Android';
import PersonIcon from '@mui/icons-material/Person';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import TextField from '@mui/material/TextField';
import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';
import IconButton from '@mui/material/IconButton';

import { Messages } from '../../types';
import classes from './styles.module.css';

type ChatProps = {
    messages: Messages;
    onSend(test: string): void;
};

export default function Chat({ messages, onSend }: ChatProps) {
    const [inputValue, setInputValue] = useState('');
    
    const onChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
    }, []);

    const handleChange = useCallback(() => {
        onSend(inputValue);
        setInputValue('');
    }, [inputValue, onSend, setInputValue]);

    const onKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
        if (e.code === 'Enter') {
            handleChange();
        }
    }, [handleChange]);

    return (<main className={classes.chat}>
        <ul className={classes.messages}>
            {messages.map((m) => (
                <li key={m.id} className={cn(classes.message, [classes[m.type]])}>
                    <div className={classes.userIcon}>{m.type === 'bot' ? <AndroidIcon /> : <PersonIcon />}</div>
                    {m.text}
                </li>)
            )}
        </ul>
        <div className={classes.input}>
            <TextField
                value={inputValue}
                onChange={onChange}
                placeholder='Your message'
                variant='outlined'
                onKeyDown={onKeyDown}
                classes={{
                    root: classes.textField
                }}
                InputProps={{
                    endAdornment: <IconButton onClick={handleChange}><SendRoundedIcon /></IconButton>
                }}
            />
        </div>
    </main>);
}
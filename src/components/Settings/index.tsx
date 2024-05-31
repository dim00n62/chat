import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import CloseIcon from '@mui/icons-material/Close';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useCallback, useState } from 'react';
import { IconButton, Tooltip, Typography } from '@mui/material';
import Slider from '@mui/material/Slider';

import InfoIcon from '@mui/icons-material/Info';

import settings from '../../settingsConfig';

import classes from './styles.module.css';

type Props = {
    onChange(params: Record<string, number>): void;
    onClose(): void;
};

export default function Settings({ onChange, onClose }: Props) {
    const [value, setValue] = useState('parameters');
    const [selectValue, setSelectValue] = useState('system_prompt');

    const onChangeTab = useCallback((event: React.SyntheticEvent, value: 'fragments' | 'parameters') => {
        setValue(value);
    }, [setValue]);

    const onSelectChange = useCallback((event: SelectChangeEvent<string>) => {
        setSelectValue(event.target.value);
    }, [setValue]);

    const onParamChange = useCallback((id: string) => (event, value: number) => {
        onChange({ [id]: value });
    }, [setValue]);

    return (<aside className={classes.settings}>
        <div className={classes.header}>
            <IconButton onClick={onClose}>
                <CloseIcon/>
            </IconButton>
        </div>
        <div className={classes.tabs}>
            <TabContext value={value}>
                <Tabs value={value} onChange={onChangeTab} aria-label="tabs">
                    <Tab label='Фрагменты' value='fragments' />
                    <Tab label='Параметры' value='parameters' />
                </Tabs>
                <TabPanel value='parameters'>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectValue}
                        label='Label'
                        onChange={onSelectChange}
                    >
                        <MenuItem value='system_prompt'>Системный промпт</MenuItem>
                        <MenuItem value='smth'>Что-то еще</MenuItem>
                    </Select>
                    <br/>
                    <br/>
                    <br/>
                    {settings.parameters.map((param) => (
                        <div key={param.id} className={classes.param}>
                            <div className={classes.paramTitle}>
                                <Typography gutterBottom>{param.title}</Typography>
                                <Tooltip title={param.tooltip}>
                                    <InfoIcon />
                                </Tooltip>
                            </div>
                            <Slider
                                marks={[{value: param.min, label: param.min}, {value: param.max, label: param.max}]}
                                defaultValue={param.default}
                                max={param.max}
                                min={param.min}
                                step={param.step}
                                valueLabelDisplay='on'
                                onChange={onParamChange(param.id)}
                            />
                        </div>
                    ))}
                </TabPanel>
                <TabPanel value='fragments'>any</TabPanel>
            </TabContext>
        </div>
    </aside>);
}
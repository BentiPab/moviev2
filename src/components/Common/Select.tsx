import { MenuItem, Select as MuiSelect, SelectProps } from '@mui/material'
import { FC } from 'react';

type Props = SelectProps & {
    options: { value: string | number, label: string }[]
}

const Select: FC<Props> = ({ options, ...props }) => {
    return (
        <MuiSelect {...props}>
            {options.map(({ value, label }) =>
                <MenuItem value={value}>{label}</MenuItem>
            )}
        </MuiSelect>);
}

export default Select;
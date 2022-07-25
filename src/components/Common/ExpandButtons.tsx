import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';

type Props = {
    show: boolean
}

const ExpandButtons: React.FC<Props> = ({ show }) => {
    return show ? <ExpandLessIcon /> : <ExpandMoreIcon />
}

export default ExpandButtons
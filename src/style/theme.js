import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

export const useMode = () => {
    
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true });
    const [mode, setMode] = React.useState(prefersDarkMode ? 'dark' : 'light');
    const colorMode = () => ({
            toggleColorMode: () => {
                setMode((mode) => (mode === 'light' ? 'dark' : 'light'));
            },
        })
        
    
    
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === 'dark'
                        ? {
                            // palette values for dark mode
    
                        }
                        : {
                            // palette values for light mode
                            background: {
                                paper: '#2290fd8a',
                            },
                        }),
                },
            }),
        [mode],
    );

    return([theme, colorMode])
}


export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`.${tableCellClasses.head}`]: {
        backgroundColor: `${theme.palette.mode === 'dark' ? theme.palette.common.black : theme.palette.primary.main}`,
        color: `${theme.palette.mode === 'dark' ? theme.palette.primary.main : 'inherit'}`,
    },
    [`.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));






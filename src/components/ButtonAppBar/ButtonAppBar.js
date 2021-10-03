import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {ColorModeContext} from '../../style/theme';
import { useTheme } from '@mui/material/styles';


export default function ButtonAppBar() {

  const colorMode = React.useContext(ColorModeContext);
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ color: `${theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black }`}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pokecalc
          </Typography>
          <Button onClick={(e) => { colorMode.toggleColorMode() }} color="inherit" > CHANGE MODE </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

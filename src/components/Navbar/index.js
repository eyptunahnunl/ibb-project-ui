import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Sigin from '../../pages/Auth/Signin';
import ibbLogo from '../../../src/image/ibbLogo.png'
import { useAuth } from '../../context/AuthContext';
import './styles.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
export default function MyNavbar() {
  const classes = useStyles();
  const { loggedIn } = useAuth();

  console.log(loggedIn)

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color='primary'>
        <Toolbar>
          <img src={ibbLogo} id="Logo" />
          <Typography className={classes.title}>
            <Button color="inherit" href="/">HOME</Button>
          </Typography>
          {
            !loggedIn &&
            <>
              <Button color="inherit" href="/signin">Login</Button>
              <Button color="inherit" href="/signup">Register</Button>
            </>
          }
          {
            loggedIn &&
            <>
              <Button color="inherit" href="/Home">Profile</Button>
            </>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

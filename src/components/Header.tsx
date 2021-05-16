import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Weather from '../Features/Weather/Weather';

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
});


function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    window.addEventListener("resize", handleResize);
    handleResize();
   
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

export default () => {
  const classes = useStyles();
  const size = useWindowSize();

  const name = "Mark Mulligan's";
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.grow}>
          {size.width > 750 ? `${name} EOG React Visualization Assessment` : 'Mark Mulligan'}
        </Typography>
        <Weather />
      </Toolbar>
    </AppBar>
  );
};

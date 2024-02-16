import React from 'react';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: '10px',
  },
  media: {
    height: 140,
  },
});
const Portals = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image="https://via.placeholder.com/150"
            title="Image Title"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Card 1
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Description for card 1.
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image="https://via.placeholder.com/150"
            title="Image Title"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Card 2
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Description for card 2.
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image="https://via.placeholder.com/150"
            title="Image Title"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Card 3
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Description for card 3.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Portals;

import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const Instructions = () => {
  return (
    <div className="col-sm-6 col-12 mb-4">
      <Card>
      <CardContent>
        <Typography variant="body2" component="p">
          Use the multiselect on the right to select the current mertic data you would like to view.  
          You can stop viewing the data by clicking on the item in the menu list when the list is open. 
          The charat displays the last 30 minutes of data and is updated with the current data receieved since the application loaded. 
          This application is fully responsive and the chart is scrollable on small screens.  
        </Typography>
      </CardContent>
    </Card>
    </div>
  );
}

export default Instructions;
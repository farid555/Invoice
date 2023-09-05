import React from 'react';
import { Container, Grid, Stack, Typography } from '@mui/material';
import DocSVG from '../../../../images/add_bill.svg';

export const DocumentSVG = () => {
  return (
    <Container component="main" maxWidth="lg">
      <Grid>
        <Grid item>
          <Stack alignItems="center" justofyContent="center" sx={{ mt: 2 }}>
            <Typography variant="h5" sx={{ marginBotton: '10px' }}>
              Sadly, You have no Documents Yet. To create on click...
            </Typography>
            <img src={DocSVG} alt="customer logo" className="customer-svg" />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DocumentSVG;

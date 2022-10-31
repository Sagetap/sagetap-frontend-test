import { Box, Grid, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import { ArtItem } from './components/ArtItem';
import { ArtworkForm } from './components/ArtworkForm';
import { Notifications } from './components/Notifications';
import { Artwork } from './constants/artworks';
import { State } from './store/index.types';

const App:FC = () => {

  const { artworks } = useSelector((state: State) => state.artworks);
  const { notifications } = useSelector((state: State) => state.notifcations);
  return (
    <Box className='app'  border='1px solid white'>
      <Notifications notifications={ notifications }/>
        <Typography variant='h2' 
          gutterBottom 
          align='center' 
          mt={2}>
          Art Rater
        </Typography>
        <Grid container 
          spacing={1} 
          padding='10px'>

          {
            artworks
              .filter((art: Artwork) => !art.disabled)
              .map((art: Artwork) => {
                return <Grid item xs={6} 
                  key={art.id}>
                  <ArtItem  {...art} />
                </Grid>}
              )
          }
        </Grid>
        <Stack direction='row' justifyContent='center'>
          <Grid>
            <ArtworkForm />
          </Grid>
          
        </Stack>

    </Box>
  )
}

export {App};

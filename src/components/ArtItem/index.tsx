import { Button, Card, CardActions, CardContent, CardMedia, Stack, Typography, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { RATINGS_OPTIONS } from "../../constants/ratings";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useDispatch } from "react-redux";
import { getArtworkData, postArtworkRating, removeArtwork } from "../../reducers/artworks";
import { Artwork } from "../../constants/artworks";

const ArtItem = (props: Artwork): JSX.Element | null => {
  const [rating, setRating] = useState('');
  const { id, data, newRating, loading } = props;
  const dispatch = useDispatch();

  const handleRateArtwork = (newRating: string) => {
    setRating(newRating);
  };

  const handleRemoveArtitem = () => {
    dispatch( removeArtwork({id}) );
  };

  const handleSubmit = () => {
    dispatch( postArtworkRating({ id, rating: Number(rating) }) );
  };
  
  useEffect( () => {
    dispatch( getArtworkData({id}) );
  // eslint-disable-next-line
  }, []);

  return <>
    <Card variant='outlined' 
      sx={{
        backgroundColor: loading ? 'grey' : '',
        opacity: loading ? '1' : ''
      }}>
      <CardMedia 
        component='img'
        width='300'
        image={data ?
           `https://www.artic.edu/iiif/2/${data.image_id}/full/843,/0/default.jpg` 
          : 
          'https://via.placeholder.com/600x400/cccccc/ede8e8.png?text=Loading%20Image'}
        alt={data?.artist_title || 'Art Image'} 
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div' align='center'>
          {
          RATINGS_OPTIONS
            .map((e, index) => 
              (index ) < Number(rating) ?
                <StarIcon sx={{ color: 'red' }}
                  data-testid={`${id}-rating-${index + 1}`}
                  fontSize='large' 
                  key={index}/>
                :
                <StarBorderIcon fontSize='large' 
                  color='disabled'
                  key={index}/>
            )
          }
        </Typography>

        <Typography gutterBottom variant='h5' component='div' align='center'>
          {data?.title}
        </Typography>

        <Typography gutterBottom component='div' color='text-secondary' align="center">
          {data?.artist_display}
        </Typography>

      </CardContent>

      <CardActions>
        
        {/* 
          Star ratings. 
          Selected rating will block out the # of stars relative to the rating number. 
         */}
         {
          !newRating && 
          <Stack direction='row' spacing={1}>
            { RATINGS_OPTIONS.map(ratingOption => {
              return <Button size='small' 
                disabled={loading}
                variant={ratingOption === rating ? 'contained' : 'outlined'}
                key={ratingOption} 
                onClick={() => handleRateArtwork(ratingOption)}
                data-testid={`${id}-set-rating-${ratingOption}`}>
                {ratingOption}
              </Button>;
            })}

            <Button size='small'
              variant='outlined'
              onClick={() => handleSubmit()} 
              disabled={!rating}
              data-testid={`${id}-submit-rating`}>
                Submit
            </Button>
          </Stack>
        }
      </CardActions>
      <Divider variant='fullWidth'/>
      <CardActions>

        <Button size='small'
          color='error'
          variant='outlined'
          onClick={() => handleRemoveArtitem()}
          >
            Remove
        </Button>

      </CardActions>
    </Card>
    </>;
}

export {ArtItem};
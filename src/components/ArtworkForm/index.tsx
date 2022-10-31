import { Button, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArtworkData } from "../../reducers/artworks";
import { State } from "../../store/index.types";

const ArtworkForm = () => {

  const [id, setId] = useState<string>('');
  const dispatch = useDispatch();
  const { loading } = useSelector((state: State) => state.artworkForm);

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const sanitizedInput = e.target.value.replace(/\D/g,'')
    setId(String(sanitizedInput));
  };

  const handleAddArtwork = () => {
    dispatch( getArtworkData({ id: Number(id) }) );
  };

  return <Paper elevation={3} 
    sx={{padding: '1em', margin: '1em'}}>
    <TextField
      label='Add Art'
      helperText='Add Art using Art ID'
      variant='standard'
      onChange={(e) => handleIdChange(e)}
      value={id}
      fullWidth
      disabled={loading}
    />
    <Button variant='contained'
      disabled={!id || loading}
      onClick={handleAddArtwork}>
        ADD ARTWORK
    </Button>
  </Paper>
};

export {ArtworkForm};
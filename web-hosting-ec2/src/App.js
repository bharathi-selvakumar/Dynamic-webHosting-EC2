import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Container,
  Snackbar,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const BACKEND_URL = 'http://127.0.0.1:5000'; //replace with ec2 public ip

const StyledBox = styled(Box)(({ theme }) => ({
  fontFamily: `'VT323', monospace`,
  backgroundColor: '#0d0d0d',
  color: '#00ff00',
  padding: theme.spacing(4),
  minHeight: '100vh',
}));

const StyledButton = styled(Button)({
  backgroundColor: '#00ff00',
  color: '#000',
  fontWeight: 'bold',
  fontFamily: "'VT323', monospace",
  '&:hover': {
    backgroundColor: '#00cc00',
  },
});

const StyledCard = styled(Card)({
  backgroundColor: '#1a1a1a',
  border: '1px solid #00ff00',
  borderRadius: '10px',
  boxShadow: '0 0 10px #00ff00',
  textAlign: 'center',
});

const StyledAlert = styled(Alert)({
  backgroundColor: '#000',
  color: '#00ff00',
  fontFamily: "'VT323', monospace",
  border: '1px solid #00ff00',
  fontSize: '1.3rem',
});

const App = () => {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);

  const fetchImages = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/images`);
      setImages(res.data);
    } catch (err) {
      console.error('Fetch images failed:', err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setAlertOpen(true);
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const res = await axios.post(`${BACKEND_URL}/upload`, formData);
      setImages((prev) => [...prev, res.data.imageUrl]);
      setSelectedFile(null);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <StyledBox>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom fontFamily={"'VT323', monospace"}>
          📂 S3 File Upload & Viewer
        </Typography>

        <Box display="flex" justifyContent="center" alignItems="center" gap={2} mb={4}>
          <input
            type="file"
            onChange={handleFileChange}
            style={{
              color: '#00ff00',
              background: '#1a1a1a',
              border: '1px solid #00ff00',
              padding: '6px',
              borderRadius: '4px',
              fontFamily: "'VT323', monospace",
            }}
          />
          <StyledButton onClick={handleUpload}>Upload</StyledButton>
        </Box>

        <Grid container spacing={4}>
          {images.map((url, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <StyledCard>
                {url.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                  <CardMedia
                    component="img"
                    height="200"
                    image={url}
                    alt={`Uploaded File ${idx}`}
                  />
                ) : (
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="#00ff00"
                      sx={{ wordWrap: 'break-word', fontSize: '1rem' }}
                    >
                      <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#00ff00' }}>
                        📎 {url.split('/').pop()}
                      </a>
                    </Typography>
                  </CardContent>
                )}
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        <Snackbar
          open={alertOpen}
          autoHideDuration={3000}
          onClose={() => setAlertOpen(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <StyledAlert severity="warning" onClose={() => setAlertOpen(false)}>
            Please select a file to upload.
          </StyledAlert>
        </Snackbar>
      </Container>
    </StyledBox>
  );
};

export default App;

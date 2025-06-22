const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

AWS.config.update({ region: process.env.AWS_REGION });

const s3 = new AWS.S3();  

const storage = multer.memoryStorage();
const upload = multer({ storage });

 
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const file = req.file;
  const key = `${Date.now()}-${file.originalname}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',  
  };

  try {
    const s3Response = await s3.upload(params).promise();
    res.json({ imageUrl: s3Response.Location });
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({ error: 'Failed to upload to S3' });
  }
});

// Get all images from S3 bucket
app.get('/images', async (req, res) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
  };

  try {
    const s3Response = await s3.listObjectsV2(params).promise();
    const imageUrls = s3Response.Contents.map(item => {
      return `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${item.Key}`;
    });
    res.json(imageUrls);
  } catch (err) {
    console.error('List Error:', err);
    res.status(500).json({ error: 'Failed to list images' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

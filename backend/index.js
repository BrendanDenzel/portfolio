import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { google } from 'googleapis';
import admin from 'firebase-admin';
import { Readable } from 'stream';
import dotenv from 'dotenv';

dotenv.config();

function bufferToStream(buffer) {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

// === Setup Express ===
const app = express();
app.use(cors());
app.use(express.json()); // parse JSON bodies
const upload = multer({ storage: multer.memoryStorage() });

// === Firebase Admin SDK Setup ===
admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    projectId: process.env.FIREBASE_PROJECT_ID,
  }),
});
const db = admin.firestore();

// === OAuth2 Client Setup ===
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// === Upload a file buffer to Google Drive folder with user OAuth2 credentials ===
async function uploadFileToDrive(oAuth2Client, filename, buffer) {
  const drive = google.drive({ version: 'v3', auth: oAuth2Client });
  const res = await drive.files.create({
    requestBody: {
      name: filename,
      parents: [process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID],
    },
    media: {
      mimeType: 'image/jpeg',
      body: bufferToStream(buffer),
    },
    fields: 'id, webViewLink, webContentLink',
  });
  return res.data;
}

// === Upload Endpoint ===
// Client must send lastName, photos[], access_token, refresh_token
app.post('/upload-gallery', upload.array('photos'), async (req, res) => {
  try {
    const lastName = req.body.lastName;
    const files = req.files;
    const { access_token, refresh_token } = req.body;

    if (!lastName || !files || files.length === 0) {
      return res.status(400).json({ error: 'Missing lastName or photos' });
    }
    if (!access_token || !refresh_token) {
      return res.status(400).json({ error: 'Missing OAuth tokens' });
    }

    // Set OAuth2 credentials from frontend
    oAuth2Client.setCredentials({ access_token, refresh_token });

    // Upload each file to Drive as the authorized user
    const uploadedPhotos = await Promise.all(
      files.map(async (file) => {
        const driveFile = await uploadFileToDrive(oAuth2Client, file.originalname, file.buffer);
        return {
          id: driveFile.id,
          viewLink: driveFile.webViewLink,
          downloadLink: driveFile.webContentLink,
        };
      })
    );

    // Save gallery metadata to Firestore
    const galleryId = `${lastName}-${Date.now()}`;
    await db.collection('galleries').doc(galleryId).set({
      lastName,
      photos: uploadedPhotos,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.json({
      success: true,
      galleryId,
      galleryUrl: `https://yourwebsite.com/orders/${galleryId}`,
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Server error uploading gallery' });
  }
});

// === Start Server ===
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 Backend running on port ${port}`));

import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { google } from 'googleapis';
import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

// === Setup ===
const app = express();
app.use(cors());
const upload = multer({ storage: multer.memoryStorage() });

// Load Firebase Admin credentials JSON (adjust path or use environment variable)
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

// Google Drive setup
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
const DRIVE_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

// Upload a file buffer to Google Drive folder
async function uploadFileToDrive(filename, buffer) {
  const res = await drive.files.create({
    requestBody: {
      name: filename,
      parents: [DRIVE_FOLDER_ID],
    },
    media: {
      mimeType: 'image/jpeg', // or detect dynamically
      body: Buffer.from(buffer),
    },
    fields: 'id, webViewLink, webContentLink',
  });
  return res.data;
}

// API endpoint to receive photos and lastName
app.post('/upload-gallery', upload.array('photos'), async (req, res) => {
  try {
    const lastName = req.body.lastName;
    const files = req.files;
    if (!lastName || !files || files.length === 0) {
      return res.status(400).json({ error: 'Missing lastName or photos' });
    }

    // Upload photos to Google Drive
    const uploadResults = [];
    for (const file of files) {
      const driveFile = await uploadFileToDrive(file.originalname, file.buffer);
      uploadResults.push({
        id: driveFile.id,
        viewLink: driveFile.webViewLink,
        downloadLink: driveFile.webContentLink,
      });
    }

    // Save metadata to Firestore
    const galleryRef = db.collection('galleries').doc(`${lastName}-${Date.now()}`);
    await galleryRef.set({
      lastName,
      photos: uploadResults,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Respond with gallery URL (you create this on frontend)
    res.json({
      success: true,
      galleryId: galleryRef.id,
      galleryUrl: `https://yourdomain.com/orders/${galleryRef.id}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Backend running on port ${port}`));

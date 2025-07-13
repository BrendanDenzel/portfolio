import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { google } from 'googleapis';
import admin from 'firebase-admin';

// === Setup Express ===
const app = express();
app.use(cors());
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

// === Google Drive Setup ===
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/drive'],
});
const drive = google.drive({
  version: 'v3',
  auth,
});

// === Upload a file buffer to Google Drive folder ===
async function uploadFileToDrive(filename, buffer) {
  const res = await drive.files.create({
    requestBody: {
      name: filename,
      parents: [process.env.GOOGLE_DRIVE_PARENT_FOLDER_ID],
    },
    media: {
      mimeType: 'image/jpeg',
      body: Buffer.from(buffer),
    },
    fields: 'id, webViewLink, webContentLink',
  });
  return res.data;
}

// === Upload Endpoint ===
app.post('/upload-gallery', upload.array('photos'), async (req, res) => {
  try {
    const lastName = req.body.lastName;
    const files = req.files;

    if (!lastName || !files || files.length === 0) {
      return res.status(400).json({ error: 'Missing lastName or photos' });
    }

    // Upload each file to Google Drive
    const uploadedPhotos = await Promise.all(
      files.map(async (file) => {
        const driveFile = await uploadFileToDrive(file.originalname, file.buffer);
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

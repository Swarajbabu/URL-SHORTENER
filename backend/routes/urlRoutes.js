import express from 'express';
import { nanoid } from 'nanoid';
import Url from '../models/Url.js';
import { urlsShortenedTotal } from '../server.js';

const router = express.Router();

// Validate URL
const isValidUrl = (urlString) => {
  try {
    new URL(urlString);
    return true;
  } catch (err) {
    return false;
  }
};

// @route   POST /api/url/shorten
// @desc    Create short URL
router.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  const baseUrl = process.env.BASE_URL || 'http://localhost:5000';

  if (!isValidUrl(originalUrl)) {
    return res.status(401).json({ error: 'Invalid URL format' });
  }

  try {
    // Check if url already exists
    let url = await Url.findOne({ originalUrl });
    if (url) {
      return res.json(url);
    }

    // Create short ID
    const shortId = nanoid(8);
    url = new Url({
      originalUrl,
      shortId,
      clicks: 0,
    });

    await url.save();
    urlsShortenedTotal.inc(); // Track metric
    res.json(url);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   GET /api/url/history
// @desc    Get all shortened URLs
router.get('/history', async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/url/:id
// @desc    Delete a URL from history
router.delete('/:id', async (req, res) => {
  try {
    const url = await Url.findById(req.params.id);
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }
    
    await url.deleteOne();
    res.json({ message: 'URL removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

import express from 'express';
import Url from '../models/Url.js';

const router = express.Router();

// @route   GET /:shortId
// @desc    Redirect to original URL
router.get('/:shortId', async (req, res) => {
  try {
    const url = await Url.findOne({ shortId: req.params.shortId });

    if (url) {
      // Increment clicks
      url.clicks++;
      await url.save();
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json('No url found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});

export default router;

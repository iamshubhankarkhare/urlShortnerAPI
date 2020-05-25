const express = require('express')
const router = express.Router();

const Url = require('../models/url')

//GET /:code

router.get('/:code', async (req, res) => {
    try {
        const url = await Url.findOne({ urlCode: req.params.code })
        if (url) {
            res.redirect(url.longUrl)
        } else {
            return res.status(404).json('No url found');
        }

    } catch (error) {
        console.error(error);
        res.status.json('Server error')

    }
})

module.exports = router;
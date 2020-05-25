const express = require('express')
const router = express.Router();
const validUrl = require('valid-url')
const shortId = require('shortid')

const Url = require('../models/url')

//POST /api/url/shorten

router.post('/shorten', async (req, res) => {

    const { longUrl } = req.body;
    const baseUrl = process.env.BASE_URL;


    //url validation
    if (!validUrl.isUri(baseUrl)) {
        return res.status(400).json('Invalid base url')
    }

    const urlCode = shortId.generate();
    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });

            if (url) {
                res.json(url);
            }
            else {
                const shortUrl = baseUrl + '/' + urlCode

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                })

                await url.save();
                res.json(url);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json('server error')


        }
    }
    else {
        res.status(400).json('Invalid long url' + longUrl)

    }



})


module.exports = router;
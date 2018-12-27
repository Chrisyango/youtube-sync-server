'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Video = require('../models/video');

/* ========== GET/READ ALL ITEM ========== */
router.get('/videos', (req, res, next) => {
  Video.find()
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

/* ========== GET/READ AN ITEM BY ID ========== */
router.get('/videos/:id', (req, res, next) => {
  const {id} = req.params;
  Video.findById({_id: id})
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });
});

/* ========== UPDATE AN ITEM ========== */
router.put('/videos/:id', (req, res, next) => {
  const { id } = req.params;
  const { videoID } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  const updateItem = { videoID };

  const options = { new: true };

  Video.findByIdAndUpdate(id, updateItem, options)
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
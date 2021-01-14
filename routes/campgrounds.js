const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campground');
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, isAuthor, validateCamground} = require('../middleware');
const Campground = require('../models/campground');

router.get('/', catchAsync(campgrounds.index));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);
router.post('/', isLoggedIn,validateCamground, catchAsync(campgrounds.createCampground));
router.get('/:id', catchAsync(campgrounds.showCampground));
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));
router.put('/:id', isLoggedIn, isAuthor, validateCamground, catchAsync(campgrounds.updateCampground));
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

module.exports = router;
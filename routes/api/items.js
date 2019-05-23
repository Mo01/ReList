const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
	Item.find().sort({ date: -1 }).then((items) => res.json(items));
});

// @route   POST api/items
// @desc    Create An Item
// @access  Private
router.post('/', auth, (req, res) => {
	const newItem = new Item({
		name: req.body.name
	});

	newItem.save().then((item) => res.json(item));
});

// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Private
router.delete('/:id', auth, (req, res) => {
	Item.findById(req.params.id)
		.then((item) => item.remove().then(() => res.json({ success: true })))
		.catch((err) => res.status(404).json({ success: false }));
});

// @route   PUT api/items/:id
// @desc    PUT A Item
// @access  Private
router.put('/:id', auth, (req, res) => {
	console.log("Put item", res)
	Item.findById(req.params.id)
		.then((item) => {
			console.log("Put item", item)
			item.name = req.body.name;
			item.complete = req.body.complete;
			item.save().then((item) => Item.find().sort({ date: -1 }).then((items) => res.json(items)));
		})
		.catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;

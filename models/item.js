const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	complete: {
		type: Number
	}
});

module.exports = Item = mongoose.model('item', ItemSchema);
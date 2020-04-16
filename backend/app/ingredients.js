const express = require('express');
const config = require('../config');
const path = require('path');
const {nanoid} = require('nanoid');
const multer = require('multer');
const router = express.Router();
const Ingredient = require('../models/Ingredient');
const User = require('../models/User');

const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

router.get('/', async (req, res) => {
    const authorization = req.get('Authorization');

    if(!authorization) {
        const ingredients = await Ingredient.find({published: true}).populate('user', {displayName: 1});
        return res.send(ingredients)
    }

    const user = await User.findOne({token: authorization});

    if (user.role !== 'admin') {
        const ingredients = await Ingredient.find({published: true}).populate('user', {displayName: 1});
        return res.send(ingredients);
    } else if (user.role === 'admin') {
        const ingredients = await Ingredient.find().populate('user', {displayName: 1});
        return res.send(ingredients)
    }
});

router.get('/my/ingredients', auth, async (req, res) => {
    
});

router.post('/', auth, upload.single('image'), async (req, res) => {
    if (req.file) {
        req.body.image = req.file.filename;
    }
    const user = req.user;

    const object = {
        user: user._id,
        title: req.body.title,
        image: req.body.image,
        recipe: req.body.recipe,
        ingredients: JSON.parse(req.body.ingredients)
    };
    const ingredient = new Ingredient(object);

    try {
        await ingredient.save();
        return res.send(ingredient);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    const user = req.user;

    await Ingredient.deleteOne({_id: req.params.id});
    try {
        return res.send({message: 'Was deleted'});
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.post('/:id/published', [auth, permit('admin')], async (req, res) => {
    const ingredient = await Ingredient.findById(req.params.id);
    if (!ingredient) {
        return res.status(404).send({message: 'Not found'})
    }
    ingredient.published = true;
    await ingredient.save();
    return res.send(ingredient)
});

module.exports = router;
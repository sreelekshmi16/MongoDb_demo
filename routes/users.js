const express = require('express')
// const mongoose = require('mongoose');
const router = express.Router();

const { param, check, validationResult } = require('express-validator');
const { User } = require('../db/models/user')

router.get('/', async (req, res) => {

    const result = await User.find()

    res.send(result)
});

router.get('/:id', [param('id')
    .isHexadecimal().withMessage("Not in required format")], async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
               return res.send(errors)
                // return res.status(400).json({ errors: errors.array() })
            }
            const user = await User.findById(req.params.id);
            // if (!user) return res.status(404).send("user not exist")
            res.send(user)
        }
        catch (e) {
            res.send({ status: 400, error: true })
        }


    });


router.post('/', [check('name').isLength({ min: 3 }),
check('age').isNumeric()], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    let user = new User({
        name: req.body.name,
        age: req.body.age
    })

    user = await user.save()
    res.send(user)
});

router.put('/:id',[param('id')
.isHexadecimal()], async (req, res) => {

    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {

            return res.status(400).json({ errors: errors.array() })
        }
    const user = await User.findByIdAndUpdate(req.params.id,{$set: {
        name: req.body.name
    }},{new:true})
    res.send(user)
    }
    catch(e){
    // if (!user) return res.status(404).send("no such Id !!!!")
    res.status(404).send("no such Id !!!!")
    }
})

router.delete('/:id', async (req, res) => {
    const users = await User.findByIdAndRemove(req.params.id)
    if (!users) return res.status(404).send("no such Id !!!!")
    res.send(users)
})

module.exports = router;

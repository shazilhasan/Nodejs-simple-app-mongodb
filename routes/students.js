const router = require('express').Router();
let Student = require('../models/student')

router.route('/add').post((req, res) => {

    const name = req.body.name;
    const address = req.body.address;
    const gender = req.body.gender;
    const age = Number(req.body.age);
    const newStudent = new Student({ name, address, gender, age });
    newStudent.save() //hada gattu objecrt eka mongodb ekata pass krnwa documnet ekak widhata
        .then(() => {
            res.json('Student added')
        }) // success unot karana dee
        .catch((err) => {//unsuccess unot karana de
            console.log('error1',err);
        })
})

router.route('/').get((req, res) => {
    Student.find().then((students) => {
        res.json(students)
    }).catch((err) => {
        console.log(err);
    })
})

router.route('/update/:id').put(async (req, res) => {
    let userId = req.params.id;
    // const name = req.body.name;
    const { name, age, gender, address } = req.body;
    const updateStudent = {
        name,
        age,
        gender,
        address
    }
    const update = await Student.findByIdAndUpdate(userId, updateStudent)
    .then(() => {
            res.status(200).send({ status: "user updated"})
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: 'error updating data'})
        });
})
router.route('/delete/:id').delete(async (req, res) => {
    let userId = req.params.id;
    await Student.findByIdAndDelete(userId)
    .then(()=>{
            res.status(200).send({status: 'user deleted'})
        })
    .catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"error with delete user"})
    })    
})

router.route('/get/:id').get(async(req,res)=>{
    let userId = req.params.id;
    const user = await Student.findById(userId);
    res.json(user);

})


module.exports = router;
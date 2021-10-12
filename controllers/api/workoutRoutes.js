const router = require('express').Router();
const { Workout } = require('../../models');



// GET all
router.get("/", (req, res) => {
  Workout.aggregate([
      {
          $addFields: {
              totalDuration :{
                  $sum: "$exercises.duration",
              },
          },
      },
  ])
      .then(dbWorkout => {
          res.json(dbWorkout);
      })
      .catch(err => {
          res.json(err);
      });
});


// GET route for range
router.get("/range", (req, res) => {
  Workout.aggregate([
      {
          $addFields: {
              totalDuration :{
                  $sum: "$exercises.duration",
              },
          },
      },
  ])
      .then(dbWorkout => {
          console.log(dbWorkout[0])
          res.json(dbWorkout);
      })
      .catch(err => {
          res.json(err);
      });
});


// Create workout
router.post('/', (req, res) => {
  Workout.create({})
      .then(dbWorkout => {
          res.json(dbWorkout);
      })
      .catch(err => {
          res.json(err);
      });
});

// Update route by ID
router.put('/:id', ({body, params}, res) => {
  Workout.findByIdAndUpdate(params.id, 
      {$push: {exercises: body}
  })
      .then(dbWorkout => {
          res.json(dbWorkout);
      })
      .catch(err => {
          res.json(err);
      });
});



module.exports = router;

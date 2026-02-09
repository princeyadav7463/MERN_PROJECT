const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// GET all workouts
exports.getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });

  if (!workouts) {
    return res.status(404).json({ error: "No workouts found" });
  }

  res.status(200).json(workouts);
};

// GET single workout
exports.getWorkout = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No workout found" });
  }
  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No workout found" });
  }

  res.status(200).json(workout);
};

// CREATE workout
exports.createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE workout
exports.deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No workout found" });
  } 

  const workout = await Workout.findByIdAndDelete({_id:id});

  if (!workout) {
    return res.status(404).json({ error: "No workout found" });
  }

  res.status(200).json(workout);
};

// UPDATE workout
exports.updateWorkout = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No workout found" });
  }
  const workout = await Workout.findByIdAndUpdate(
    {
       _id: id 
    },

    {
       ...req.body 
    },
    {
       new: true 
    },
  );

  if (!workout) {
    return res.status(404).json({ error: "No workout found" });
  }

  res.status(200).json(workout);
};

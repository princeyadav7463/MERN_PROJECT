const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

exports.getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  if (!workouts) return res.status(404).json({ error: "No workouts found" });
  res.status(200).json(workouts);
};

exports.getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No workout found" });

  const workout = await Workout.findById(id);
  if (!workout) return res.status(404).json({ error: "No workout found" });
  res.status(200).json(workout);
};

exports.createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No workout found" });

  const workout = await Workout.findByIdAndDelete(id);
  if (!workout) return res.status(404).json({ error: "No workout found" });
  res.status(200).json(workout);
};

exports.updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No workout found" });

  const workout = await Workout.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true },
  );
  if (!workout) return res.status(404).json({ error: "No workout found" });
  res.status(200).json(workout);
};

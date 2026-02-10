import { useState, useEffect } from "react";

function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchWorkouts = async () => {
    const res = await fetch("http://localhost:4000/api/workouts");
    const data = await res.json();
    setWorkouts(data);
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workoutData = { title, load, reps };

    if (editingId) {
      const res = await fetch(
        `http://localhost:4000/api/workouts/${editingId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(workoutData),
        },
      );
      const updatedWorkout = await res.json();
      setWorkouts(
        workouts.map((w) => (w._id === editingId ? updatedWorkout : w)),
      );
      setEditingId(null);
    } else {
      const res = await fetch("http://localhost:4000/api/workouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workoutData),
      });
      const newWorkout = await res.json();
      setWorkouts([newWorkout, ...workouts]);
    }

    setTitle("");
    setLoad("");
    setReps("");
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/api/workouts/${id}`, {
      method: "DELETE",
    });
    setWorkouts(workouts.filter((w) => w._id !== id));
  };

  const handleEdit = (workout) => {
    setTitle(workout.title);
    setLoad(workout.load);
    setReps(workout.reps);
    setEditingId(workout._id);
  };

  return (
    <div className="home">
      <h2>Gym Workouts</h2>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Load (kg)"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          required
        />
        <button>{editingId ? "Update Workout" : "Add Workout"}</button>
      </form>

      {/* Workouts List */}
      <ul>
        {workouts.map((w) => (
          <li key={w._id}>
            <span>
              {w.title} - {w.load}kg x {w.reps} reps
            </span>
            <div className="button">
              <button type="button" onClick={() => handleEdit(w)}>
                Edit
              </button>
              <button type="button" onClick={() => handleDelete(w._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;

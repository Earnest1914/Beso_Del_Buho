"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type MovieType = {
  title: string;
  times: string[];
  duration: string;
  image: string;
  director: string;
  year: number;
  language: string;
  synopsis: string;
};

type ScheduleType = {
  [day: string]: MovieType[];
};

const defaultDays = ["Jueves", "Viernes", "Sábado", "Domingo"];

export default function AdminPage() {
  const [schedule, setSchedule] = useState<ScheduleType>({});
  const [form, setForm] = useState<MovieType>({
    title: "",
    times: [],
    duration: "",
    image: "",
    director: "",
    year: new Date().getFullYear(),
    language: "",
    synopsis: "",
  });
  const [day, setDay] = useState("Jueves");
  const [timeInput, setTimeInput] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("customSchedule");
    if (stored) {
      setSchedule(JSON.parse(stored));
    } else {
      const initial = Object.fromEntries(defaultDays.map((d) => [d, []]));
      setSchedule(initial);
    }
  }, []);

  const saveSchedule = (updated: ScheduleType) => {
    localStorage.setItem("customSchedule", JSON.stringify(updated));
    setSchedule(updated);
  };

  const addMovie = () => {
    if (!form.title || !form.image) {
      alert("Título e imagen son requeridos");
      return;
    }

    const updated = {
      ...schedule,
      [day]: [...(schedule[day] || []), form],
    };

    saveSchedule(updated);
    resetForm();
  };

  const removeMovie = (title: string) => {
    const updated = {
      ...schedule,
      [day]: schedule[day].filter((movie) => movie.title !== title),
    };
    saveSchedule(updated);
  };

  const resetForm = () => {
    setForm({
      title: "",
      times: [],
      duration: "",
      image: "",
      director: "",
      year: new Date().getFullYear(),
      language: "",
      synopsis: "",
    });
    setTimeInput("");
  };

  return (
    <div style={{ padding: "2rem", color: "#fff", backgroundColor: "#121212", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Panel de Administración</h1>

      <label>Día:</label>
      <select value={day} onChange={(e) => setDay(e.target.value)}>
        {defaultDays.map((d) => (
          <option key={d}>{d}</option>
        ))}
      </select>

      <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <label>Título:</label>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <label>Duración:</label>
        <input
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
        />

        <label>Imagen (ruta desde /public):</label>
        <input
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <label>Director:</label>
        <input
          value={form.director}
          onChange={(e) => setForm({ ...form, director: e.target.value })}
        />

        <label>Año:</label>
        <input
          type="number"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) })}
        />

        <label>Idioma:</label>
        <input
          value={form.language}
          onChange={(e) => setForm({ ...form, language: e.target.value })}
        />

        <label>Sinopsis:</label>
        <textarea
          value={form.synopsis}
          onChange={(e) => setForm({ ...form, synopsis: e.target.value })}
        />

        <label>Horarios (separados por coma):</label>
        <input
          value={timeInput}
          onChange={(e) => {
            setTimeInput(e.target.value);
            setForm({ ...form, times: e.target.value.split(",").map(t => t.trim()) });
          }}
        />

        <button onClick={addMovie} style={{ marginTop: "1rem", background: "#444", color: "#fff" }}>
          Agregar Película
        </button>
      </div>

      <hr style={{ margin: "2rem 0" }} />

      <h2>Películas en {day}</h2>
      <ul>
        {schedule[day]?.map((movie) => (
          <li key={movie.title} style={{ marginBottom: "2rem" }}>
            <strong>{movie.title}</strong>
            <button onClick={() => removeMovie(movie.title)} style={{ marginLeft: "1rem" }}>
              Eliminar
            </button>
            <div style={{ marginTop: "0.5rem" }}>
              {movie.image ? (
                <Image
                  src={movie.image.startsWith("/") ? movie.image : `/${movie.image}`}
                  alt={movie.title}
                  width={100}
                  height={150}
                />
              ) : (
                <p>Sin imagen</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
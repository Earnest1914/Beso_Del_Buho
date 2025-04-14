"use client";

import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import {
  Container,
  Tabs,
  Tab,
  ScheduleCarousel,
  MovieInfo,
  MovieDetails,
  MovieCardWrapper,
  GlobalStyle,
  MovieTitle,
  MovieSynopsis,
  MovieTimesContainer,
  MoviewTimewrapper,
} from "./styles";

const schedule = {
  Jueves: [
    {
      title: "Anora",
      times: ["16:30", "21:00"],
      duration: "120 min",
      image: "/anora.jpeg",
      director: "Sean Baker",
      year: 2024,
      language: "English",
      synopsis:
        "A young stripper named Anora finds herself in a whirlwind romance with the son of a powerful Russian oligarch, leading to unexpected consequences.",
    },
    {
      title: "Inception",
      times: ["16:00", "19:30", "22:00"],
      duration: "148 min",
      image: "/inception.jpg",
      director: "Christopher Nolan",
      year: 2010,
      language: "English",
      synopsis:
        "A thief who enters the dreams of others to steal secrets from their subconscious is given a chance to have his criminal history erased as payment for a task considered to be impossible: 'inception'.",
    },
    {
      title: "Interstellar",
      times: ["17:30", "20:30"],
      duration: "169 min",
      image: "/interstellar.jpg",
      director: "Christopher Nolan",
      year: 2014,
      language: "English",
      synopsis:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    },
  ],
  Viernes: [
    {
      title: "Buffalo '66",
      times: ["14:00", "19:00", "22:00"],
      duration: "110 min",
      image: "/buffalo66.jpg",
      director: "Vincent Gallo",
      year: 1998,
      language: "English",
      synopsis:
        "After being released from prison, Billy Brown kidnaps a young tap dancer and forces her to pretend to be his wife while he seeks revenge on the person he believes ruined his life.",
    },
    {
      title: "Anora",
      times: ["16:30", "21:00"],
      duration: "120 min",
      image: "/anora.jpeg",
      director: "Sean Baker",
      year: 2024,
      language: "English",
      synopsis:
        "A young stripper named Anora finds herself in a whirlwind romance with the son of a powerful Russian oligarch, leading to unexpected consequences.",
    },
  ],
  Sábado: [
    {
      title: "Pulp Fiction",
      times: ["15:00", "18:30", "21:45"],
      duration: "154 min",
      image: "/pulpfiction.jpg",
      director: "Quentin Tarantino",
      year: 1994,
      language: "English",
      synopsis:
        "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    },
    {
      title: "Mulholland Drive",
      times: ["17:00", "20:00", "23:00"],
      duration: "147 min",
      image: "/mulhollanddrive.jpg",
      director: "David Lynch",
      year: 2001,
      language: "English",
      synopsis:
        "A woman suffering from amnesia after a car crash and an aspiring actress searching for success navigate the surreal and mysterious world of Los Angeles.",
    },
  ],
  Domingo: [
    {
      title: "The Dark Knight",
      times: ["15:30", "20:30"],
      duration: "152 min",
      image: "/darkknight.jpg",
      director: "Christopher Nolan",
      year: 2008,
      language: "English",
      synopsis:
        "When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.",
    },
    {
      title: "Mulholland Drive",
      times: ["17:00", "20:00", "23:00"],
      duration: "147 min",
      image: "/mulhollanddrive.jpg",
      director: "David Lynch",
      year: 2001,
      language: "English",
      synopsis:
        "A woman suffering from amnesia after a car crash and an aspiring actress searching for success navigate the surreal and mysterious world of Los Angeles.",
    },
  ],
};

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

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState("Jueves");
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null);
  const [timeViewActive, setTimeViewActive] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const seatPrice = 60;
  const maxSeats = 12;
  const isSoldOut = selectedSeats.length >= maxSeats;

  const handleTimeClick = () => {
    setTimeViewActive(true);
  };

  const handleBackClick = () => {
    setTimeViewActive(false);
    setSelectedSeats([]);
  };

  const toggleSeatSelection = (index: number) => {
    setSelectedSeats((prev) => {
      const selectedIndex = prev.indexOf(index);
      if (selectedIndex > -1) {
        return prev.filter((item) => item !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleReserveClick = () => {
    const total = selectedSeats.length * seatPrice;
    const confirm = window.confirm(`Total a pagar: $${total} MXN. ¿Confirmas tu reservación?`);
    if (confirm) {
      alert("¡Reservación realizada con éxito!");
      setTimeViewActive(false);
      setSelectedSeats([]);
    }
  };

  const handleWaitlist = () => {
    const name = prompt("Ingresa tu nombre:");
    const email = prompt("Ingresa tu correo electrónico:");
    if (name && email) {
      alert(`Gracias, ${name}. Te hemos añadido a la lista de espera.`);
      setTimeViewActive(false);
      setSelectedSeats([]);
    } else {
      alert("Debes ingresar ambos datos para unirte a la lista.");
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Head>
          <title>Cartelera</title>
        </Head>
        <Image src={"/beso_del_buho_banner.png"} alt={"Beso del Buho"} width={700} height={120} />
        {timeViewActive ? (
          <>
            <button onClick={handleBackClick} style={{ marginTop: "20px", padding: "8px 16px", fontSize: "16px", cursor: "pointer" }}>
              Regresar
            </button>
            <div style={{ color: "white", fontSize: "24px", textAlign: "center", marginTop: "20px" }}>
              Selecciona tus asientos
            </div>
            <div style={{ textAlign: "center", color: "white", fontSize: "16px", marginTop: "20px", marginBottom: "10px" }}>
              Pantalla
            </div>
            <hr style={{ border: "1px solid white", width: "50%" }} />
            {Array.from({ length: maxSeats }).map((_, index) => {
              const row = Math.floor(index / 4);
              const position = index % 4;
              const top = 300 + row * 100;
              const left = 34 + position * 9;
              const isSelected = selectedSeats.includes(index);
              return (
                <div
                  key={index}
                  onClick={() => toggleSeatSelection(index)}
                  style={{
                    position: "absolute",
                    top: `${top}px`,
                    left: `${left}%`,
                    width: "50px",
                    height: "50px",
                    backgroundColor: isSelected ? "white" : "gray",
                    borderRadius: "50%",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                />
              );
            })}
            <div
              style={{
                position: "absolute",
                top: "620px",
                left: "50%",
                transform: "translateX(-50%)",
                color: "white",
                fontSize: "20px",
              }}
            >
              Has seleccionado {selectedSeats.length} asientos · Total: ${selectedSeats.length * seatPrice} MXN
            </div>
            {isSoldOut ? (
              <button
                onClick={handleWaitlist}
                style={{
                  position: "absolute",
                  top: "680px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  marginTop: "20px",
                  padding: "8px 16px",
                  fontSize: "16px",
                  cursor: "pointer",
                  color: "white",
                  backgroundColor: "#a00",
                  border: "none",
                }}
              >
                Unirse a la lista de espera
              </button>
            ) : (
              <button
                onClick={handleReserveClick}
                style={{
                  position: "absolute",
                  top: "680px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  marginTop: "20px",
                  padding: "8px 16px",
                  fontSize: "16px",
                  cursor: "pointer",
                  color: "white",
                  backgroundColor: "black",
                  border: "none",
                }}
              >
                Reservar
              </button>
            )}
          </>
        ) : (
          <>
            <Tabs>
              {Object.keys(schedule).map((day) => (
                <Tab
                  key={day}
                  active={selectedDay === day}
                  onClick={() => {
                    setSelectedDay(day);
                    setSelectedMovie(null);
                    setTimeViewActive(false);
                  }}
                >
                  {day}
                </Tab>
              ))}
            </Tabs>
            {selectedMovie ? (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "start" }}>
                <MovieCardWrapper onClick={() => setSelectedMovie(null)}>
                  <Image src={selectedMovie.image} alt={selectedMovie.title} width={200} height={300} />
                  <MovieTitle>{selectedMovie.title}</MovieTitle>
                </MovieCardWrapper>
                <div style={{ display: "flex", flexDirection: "column", marginLeft: "20px" }}>
                  <MovieTimesContainer>
                    {selectedMovie.times.map((time) => (
                      <MoviewTimewrapper key={time} onClick={handleTimeClick}>
                        {time}
                      </MoviewTimewrapper>
                    ))}
                  </MovieTimesContainer>
                  <MovieInfo>
                    <MovieDetails>
                      <p>Director: <strong>{selectedMovie.director}</strong></p>
                      <p>Año: <strong>{selectedMovie.year}</strong></p>
                      <p>Idioma: <strong>{selectedMovie.language}</strong></p>
                      <p>Duración: <strong>{selectedMovie.duration}</strong></p>
                    </MovieDetails>
                    <MovieSynopsis>{selectedMovie.synopsis}</MovieSynopsis>
                  </MovieInfo>
                  <button onClick={() => setSelectedMovie(null)} style={{ marginTop: "10px", padding: "8px 16px", fontSize: "16px", cursor: "pointer" }}>
                    Regresar
                  </button>
                </div>
              </div>
            ) : (
              <ScheduleCarousel>
                {schedule[selectedDay as keyof typeof schedule].map((movie) => (
                  <MovieCardWrapper key={movie.title} onClick={() => setSelectedMovie(movie)}>
                    <Image src={movie.image} alt={movie.title} width={200} height={300} />
                    <MovieTitle>{movie.title}</MovieTitle>
                    <MovieTimesContainer>
                      {movie.times.map((time) => (
                        <MoviewTimewrapper key={time} onClick={handleTimeClick}>
                          {time}
                        </MoviewTimewrapper>
                      ))}
                    </MovieTimesContainer>
                  </MovieCardWrapper>
                ))}
              </ScheduleCarousel>
            )}
          </>
        )}
      </Container>
    </>
  );
} 
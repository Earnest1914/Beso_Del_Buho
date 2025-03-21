"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import {
  Container,
  Tabs,
  Tab,
  ScheduleContainer,
  ScheduleCarousel,
  MovieInfo,
  MovieDetails,
  MovieCardWrapper,
  GlobalStyle,
  MovieTitle,
  Separator,
  MovieSynopsis,
  //ModalOverlay,
  //ModalContent,
  //CloseButton,
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

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState("Jueves");
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [setModalMovie] = useState(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", () =>
      setIsMobile(window.innerWidth < 768)
    );
  }, []);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Head>
          <title>Cartelera</title>
        </Head>
        <Image
          src={"/beso_del_buho_banner.png"}
          alt={"Beso del Buho"}
          width={700}
          height={120}
        />
        <Tabs>
          {Object.keys(schedule).map((day) => (
            <Tab
              key={day}
              active={selectedDay === day}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </Tab>
          ))}
        </Tabs>
        <ScheduleContainer>
          <ScheduleCarousel>
            {schedule[selectedDay].map((movie) => (
              <MovieCardWrapper
                key={movie.title}
                onClick={() =>
                  isMobile ? setModalMovie(movie) : setHoveredMovie(movie)
                }
                onMouseEnter={() => !isMobile && setHoveredMovie(movie)}
                onMouseLeave={() => !isMobile && setHoveredMovie(null)}
              >
                <Image
                  src={movie.image}
                  alt={movie.title}
                  width={200}
                  height={300}
                />
                <MovieTitle>{movie.title}</MovieTitle>
                <MovieTimesContainer>
                  {movie.times.map((time) => (
                    <MoviewTimewrapper key={time}>{time}</MoviewTimewrapper>
                  ))}
                </MovieTimesContainer>
              </MovieCardWrapper>
            ))}
          </ScheduleCarousel>
        </ScheduleContainer>
        <Separator />
        {hoveredMovie && (
          <MovieInfo>
            <MovieDetails>
              <p>
                Director: <strong>{hoveredMovie.director}</strong>
              </p>
              <p>
                Año: <strong>{hoveredMovie.year}</strong>
              </p>
              <p>
                Idioma: <strong>{hoveredMovie.language}</strong>
              </p>
              <p>
                Duración: <strong>{hoveredMovie.duration}</strong>
              </p>
            </MovieDetails>
            <MovieSynopsis>{hoveredMovie.synopsis}</MovieSynopsis>
          </MovieInfo>
        )}
      </Container>
    </>
  );
}
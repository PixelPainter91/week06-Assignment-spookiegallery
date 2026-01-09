import "./App.css";
import { useRef, useState, useEffect } from "react";
import GallerySideScroll from "./components/Gallery/GallerySideScroll";
import LilDeath from "./components/LilDeath/LilDeath";
import Section from "./components/Section/Section";
import UrnSection from "./components/UrnSection/UrnSection";

function App() {
  const [urnBroken, setUrnBroken] = useState(false);
  const urnSoundRef = useRef(null);

  function handleUrnBreak() {
    if (urnBroken) return;

    setUrnBroken(true);

    setTimeout(() => {
      if (!urnSoundRef.current) {
        urnSoundRef.current = new Audio("/audio/UrnBreakSound.mp3");
        urnSoundRef.current.volume = 0.7;
      }

      urnSoundRef.current.currentTime = 0;
      urnSoundRef.current.play().catch(() => {});
    }, 400);
  }

  useEffect(() => {
    const gallery = document.querySelector(".gallery");
    const sections = document.querySelectorAll(".section");
    const urnSection = document.querySelector(".urn-section");

    if (urnBroken) {
      document.body.classList.add("white-background");
      if (gallery) gallery.classList.add("white-background");
      sections.forEach((sec) => sec.classList.add("white-background"));
      if (urnSection) urnSection.classList.add("white-background");
    } else {
      document.body.classList.remove("white-background");
      if (gallery) gallery.classList.remove("white-background");
      sections.forEach((sec) => sec.classList.remove("white-background"));
      if (urnSection) urnSection.classList.remove("white-background");
    }
  }, [urnBroken]);

  return (
    <div className="App">
      <LilDeath onAttackUrn={handleUrnBreak} />
      <Section title="LilDeath's Spookie Gallery" />
      <GallerySideScroll />
      <UrnSection isBroken={urnBroken} />
    </div>
  );
}

export default App;

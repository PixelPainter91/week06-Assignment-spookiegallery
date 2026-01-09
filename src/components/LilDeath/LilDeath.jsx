import { useEffect, useState, useRef } from "react";
import "./LilDeath.css";

import idleGif from "/sprites/character/idledeath.gif";
import moveRight from "/sprites/character/deathmoveleft.gif";
import moveLeft from "/sprites/character/deathmoveright.gif";
import attackLeft from "/sprites/character/deathweaponattackleft.gif";
import attackRight from "/sprites/character/deathweaponattackright.gif";

export default function LilDeath() {
  const [controlEnabled, setControlEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [keysPressed, setKeysPressed] = useState({});
  const [attacking, setAttacking] = useState(false);
  const [direction, setDirection] = useState("right");

  const attackSoundRef = useRef(null);

  const moveSpeed = 10;
  const attackDuration = 1300;

  useEffect(() => {
    attackSoundRef.current = new Audio("/audio/lilDeathattacksound.mp3");
    attackSoundRef.current.volume = 0.6;
  }, []);

  useEffect(() => {
    function handleKeyDown(e) {
      if (!controlEnabled) return;

      if ((e.key === "a" || e.key === "A") && !attacking) {
        setAttacking(true);

        if (attackSoundRef.current) {
          attackSoundRef.current.currentTime = 0;
          attackSoundRef.current.play().catch(() => {});
        }

        setTimeout(() => setAttacking(false), attackDuration);
      }

      setKeysPressed((prev) => ({ ...prev, [e.key]: true }));

      setPosition((prev) => {
        let { x, y } = prev;

        if (e.key === "ArrowLeft") {
          x -= moveSpeed;
          setDirection("left");
        }
        if (e.key === "ArrowRight") {
          x += moveSpeed;
          setDirection("right");
        }
        if (e.key === "ArrowUp") y -= moveSpeed;
        if (e.key === "ArrowDown") y += moveSpeed;

        return { x, y };
      });
    }

    function handleKeyUp(e) {
      setKeysPressed((prev) => ({ ...prev, [e.key]: false }));
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [controlEnabled, attacking]);

  let sprite;
  if (attacking) {
    sprite = direction === "left" ? attackLeft : attackRight;
  } else if (keysPressed["ArrowLeft"]) {
    sprite = moveLeft;
  } else if (keysPressed["ArrowRight"]) {
    sprite = moveRight;
  } else {
    sprite = idleGif;
  }

  return (
    <>
      <div className="dark-overlay" />

      <div
        className="lildeath-wrapper"
        style={{
          position: "fixed",
          left: position.x,
          top: position.y,
          width: "420px",
          height: "420px",
          zIndex: 1,
        }}
      >
        <div
          className="flashlight"
          style={{
            left: position.x,
            top: position.y + 420 / 2,
          }}
        />

        <img
          src={sprite}
          alt="LilDeath"
          className="lildeath"
          onClick={() => setControlEnabled(true)}
          draggable={false}
          style={{
            position: "absolute",
            left: "0",
            top: "50%",
            width: "257.6px",
            height: "auto",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </>
  );
}

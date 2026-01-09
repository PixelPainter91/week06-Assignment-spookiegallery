import { useEffect, useState } from "react";
import "./LilDeath.css";

import idleGif from "/sprites/character/idledeath.gif";
//the moveRight and Left gifs are named incorrectly
import moveRight from "/sprites/character/deathmoveleft.gif";
import moveLeft from "/sprites/character/deathmoveright.gif";
//
import attackLeft from "/sprites/character/deathweaponattackleft.gif";
import attackRight from "/sprites/character/deathweaponattackright.gif";


//TODO: Change urn png and gif 
const URN_POSITION = { x: 600, y: 400, size: 200 };

export default function LilDeath({ onUnlock }) {
  const [controlEnabled, setControlEnabled] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [keysPressed, setKeysPressed] = useState({});
  const [attacking, setAttacking] = useState(false);
  const [direction, setDirection] = useState("right");

  function isNearUrn(player, urn) {
    return (
      Math.abs(player.x - urn.x) < urn.size &&
      Math.abs(player.y - urn.y) < urn.size
    );
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (!controlEnabled) return;

      if ((e.key === "a" || e.key === "A") && !attacking) {
        setAttacking(true);
        if (isNearUrn(position, URN_POSITION)) {
          onUnlock?.();
        }
        setTimeout(() => setAttacking(false), 1300);
      }

      setKeysPressed((prev) => ({ ...prev, [e.key]: true }));

      setPosition((prev) => {
        let { x, y } = prev;
        if (e.key === "ArrowLeft") {
          x -= 10;
          setDirection("left");
        }
        if (e.key === "ArrowRight") {
          x += 10;
          setDirection("right");
        }
        if (e.key === "ArrowUp") y -= 10;
        if (e.key === "ArrowDown") y += 10;
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
  }, [controlEnabled, attacking, position, onUnlock]);

  let sprite;
  if (attacking) sprite = direction === "left" ? attackLeft : attackRight;
  else if (keysPressed["ArrowLeft"]) sprite = moveLeft;
  else if (keysPressed["ArrowRight"]) sprite = moveRight;
  else sprite = idleGif;

  return (
    <>
      <div className="dark-overlay" />
      <img
        src="/sprites/urn.png"
        alt="Urn"
        style={{
          position: "fixed",
          left: URN_POSITION.x,
          top: URN_POSITION.y,
          width: URN_POSITION.size,
          height: URN_POSITION.size,
          zIndex: 0,
        }}
      />
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
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
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
            left: "50%",
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

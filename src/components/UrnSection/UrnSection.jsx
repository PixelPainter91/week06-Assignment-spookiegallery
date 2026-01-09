import "./Urn.css";

export default function Urn({ isBroken }) {
  return (
    <div className="urn-section">
      <img
        src={isBroken ? "/sprites/bigurn.gif" : "/sprites/idleUrn.png"}
        alt="Urn"
        className="urn-image"
        draggable={false}
      />
    </div>
  );
}

import "./urn.css";

export default function UrnSection({ isBroken }) {
    const URN_POSITION = { x: 600, y: 400, size: 200 };
  return (
    <div className="urn-section">
      <img
        src={isBroken ? "/sprites/bigurn.gif" : "/sprites/idleUrn.png"}
        alt="Urn"
        className="urn-image"
        style={{
    position: "fixed",
    left: URN_POSITION.x,
    top: URN_POSITION.y,
    width: URN_POSITION.size,
    height: URN_POSITION.size,
  }}
      />
    </div>
  );
}

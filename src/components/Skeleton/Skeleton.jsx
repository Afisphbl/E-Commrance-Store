import "./Skeleton.css";

const Skeleton = ({ width, height, borderRadius, style }) => {
  return (
    <div
      className="skeleton"
      style={{
        width: width || "100%",
        height: height || "1em",
        borderRadius: borderRadius || "var(--radius-md)",
        ...style,
      }}
    ></div>
  );
};

export default Skeleton;

const scale = 10

function BlackBackgroundSVG(points) {
  return (
    <svg width="1000" height="1000" style={{ border: '1px solid #ccc' }}>
    
      <rect x="0" y="0" width="1000" height="1000" fill="black" />

      {points.map((point) => (
        <circle cx={`${point[1][0] * scale + 500}`} cy={`${point[1][1] * scale + 500}`} r="10" fill="white" />
      ))}

    </svg>
  );
};

export default BlackBackgroundSVG;
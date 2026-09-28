const contours = [
  "M-80 150 C 180 90, 420 240, 760 170 S 1240 60, 1680 160",
  "M-40 310 C 240 250, 520 390, 860 300 S 1280 220, 1700 340",
  "M-20 490 C 260 430, 600 620, 980 500 S 1360 390, 1720 540",
  "M-60 690 C 220 610, 540 800, 900 680 S 1320 560, 1680 720",
  "M140 20 C 180 160, 90 300, 210 460 S 160 700, 280 900",
  "M430 10 C 470 150, 360 320, 520 470 S 440 720, 600 920",
  "M980 40 C 920 180, 1040 340, 960 520 S 1100 740, 1000 900",
];

const coastContours = [
  "M40 160 C 160 210, 240 140, 320 230 S 470 390, 420 520 S 360 680, 520 820",
  "M70 300 C 190 270, 280 380, 250 510 S 340 690, 480 780",
  "M180 80 C 260 140, 220 260, 340 340 S 300 520, 420 640",
];

const currents = [
  "M-100 240 C 280 180, 720 320, 1700 200",
  "M-60 460 C 360 400, 880 560, 1720 470",
  "M160 840 C 480 700, 920 760, 1560 620",
];

export function ChartField({ coast = false }: { coast?: boolean }) {
  return (
    <div className="chart">
      <div className="chart__depth" />
      <svg className="chart__svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <g className="chart__contours">
          {contours.map((d) => (
            <path key={d} d={d} />
          ))}
          {coast
            ? coastContours.map((d) => (
                <path key={d} className="chart__coast" d={d} />
              ))
            : null}
        </g>
        <g className="chart__currents" fill="none">
          {currents.map((d, index) => (
            <path key={d} className={index === 0 ? "chart__current chart__current--move" : "chart__current"} d={d} />
          ))}
        </g>
        <g className="chart__marks">
          <path d="M1188 128 V148 M1178 138 H1198" />
          <text x="1208" y="142">
            23°36′
          </text>
          <text x="1208" y="162">
            58°24′
          </text>
          <path d="M210 96 H238 M224 84 V108" />
          <text x="246" y="104">
            42 m
          </text>
          <path d="M1420 620 H1452" />
          <text x="1460" y="624">
            086°
          </text>
          <path d="M70 760 H92 M81 749 V771" />
          <text x="100" y="764">
            18 m
          </text>
        </g>
      </svg>
    </div>
  );
}

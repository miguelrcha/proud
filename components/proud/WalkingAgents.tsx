// The four Proud agents as tiny pixel-art sprites, waddling left to right along the top
// of the "Download for Mac" button. The parent needs `relative`.
// Grid legend: k outline, p body colour, d dark limbs, "." empty.

const AGENTS: { color: string; rows: string[] }[] = [
  {
    // Trapezoid
    color: "#e79dad",
    rows: [
      ".........kkkkkkkkkkkk.......",
      ".........kppppppppppk.......",
      ".........kppppppppppk.......",
      "........kppppppppppppk......",
      "........kppppppppppppk......",
      "........kppppppppppppk......",
      ".......kppppkkppkkpppkk.....",
      ".......kppppkkppkkppppk.....",
      ".......kppppppppppppppk.....",
      ".....kkkpppppkkkkpppppkk....",
      "...kkdkpppppppppppppppkk....",
      "..kkddkpppppppppppppppkkk...",
      "..kkdkkppppppppppppppppkdk..",
      ".kkkkkkppppppppppppppppkdkk.",
      "kkppkkkppppppppppppppppkkpk.",
      "kppppkppppppppppppppppppkpk.",
      "kppppkppppppppppppppppppkppk",
      "kpppkkkkkkkkkkkkkkkkkkkkpppk",
      ".kkkk...kddk....kddk...kpppk",
      "........kddk....kddk....kkk.",
      "........kddk....kddk........",
      "........kkkk....kkkkk.......",
      ".......kpppk....kpppkk......",
      "......kppppk....kpppppk.....",
      "......kppppk....kpppppk.....",
      "......kkkkkk....kkkkkkk.....",
    ],
  },
  {
    // Cloud
    color: "#e0523c",
    rows: [
      ".........kkkkkk..........",
      "........kppppppk.........",
      ".......kppppppppk........",
      "......kppppppppppk.......",
      "......kppppppppppk.......",
      "....kkkppppppppppkkk.....",
      "...kppppppppppppppppk....",
      "..kppppppppppppppppppk...",
      ".kppppppppppppppppppppk..",
      ".kpppppppkppppkpppppppk..",
      ".kppppppppppppppppppppk..",
      ".kppppppppkppkppppppppk..",
      ".kpppppppppkkpppppppppk..",
      ".kkppppppppppppppppppk...",
      "..kkppppppppppppppppkk...",
      "..kkkkkkpppppppppkkkkkkk.",
      ".kkdkkkkpppppppppkkkkkppk",
      "kkpkk..kpppppppppkkkkpppk",
      "kppk....kpppppppkddkkppk.",
      "kpppk....kppppkkkkdddkk..",
      "kpppk....kppppkk.kkkk....",
      "kpppk...kkppppkk.........",
      ".kkk....kkppppkk.........",
      ".......kdkkkkkkdk........",
      ".......kdk...kkdk........",
      ".......k.k....kkkk.......",
      "......kppkk...kppkk......",
      ".....kppppk...kppppk.....",
      ".....kppppk...kppppk.....",
      ".....kkkkkk...kkkkkk.....",
    ],
  },
  {
    // Square
    color: "#efa250",
    rows: [
      ".........kkk.................",
      "........kppkkk...............",
      "........kpppppkk.............",
      ".......kppppppppkkk.....kkkk.",
      ".......kpppppppppppkk...kppkk",
      "......kppppppppppppppkk.kpppk",
      "......kpppppppppppppppk.kkppk",
      "......kppppkppppkpppppkkkppk.",
      ".....kpppppkpppkppppppkkkpk..",
      "....kkppppppppppkppppkkkdkk..",
      "...kkppppppppppppppppk..kk...",
      "..kdkpppppppkkkppppppkkkk....",
      ".kk.kpppppppppppppppkkkkk....",
      ".kpkkpppppppppppppppk........",
      "kkpkkkppppppppppppppk........",
      "kpppkkkkpppppppppppk.........",
      "kpppkk.kkkpppppppppk.........",
      ".kppk....kkkppppppk..........",
      "..kk.....kdkkkkpppk..........",
      ".........kdkk.kkkkk..........",
      ".........kdk...kkdk.kkk......",
      ".........kdk....kdkkkppk.....",
      "........kkkk......pkpppk.....",
      "......kkkppk.....kppppk......",
      ".....kkppppk.....kppppk......",
      ".....kpppppk.....kkppk.......",
      ".....kkkkkkk.....kkkkk.......",
    ],
  },
  {
    // Circle
    color: "#65b26b",
    rows: [
      "..........kkkkkk...........",
      "........kkppppppkk.........",
      ".......kppppppppppk........",
      ".....kkppppppppppppk.......",
      ".....kppppppppppppppk......",
      "....kpppppppppppppppk......",
      "....kpppppppppppppppkk.kk..",
      "...kkppppppppppppppppkkkkk.",
      "...kppppkkkpppkkpppppkkppkk",
      "...kpppppkkppkkppppppkkpppk",
      "...kpppppppppppppppppkkkppk",
      "...kppppppkppkpppppppk.kppk",
      "...kpppppppkkpppppppkkkkpkk",
      "..kkkpppppppppppppppkddddk.",
      "..k.kppppppppppppppkkkddk..",
      ".kddkkpppppppppppppk..kk...",
      "kppkk.kpppppppppppk........",
      "kpppk..kkkpppppkkk.........",
      "kpppk..kkkkkkkkkkk.........",
      ".kppk..kdk....kkdk.........",
      ".kkk...kdk....kkdk.........",
      ".......kkk.....kkkk........",
      "......kkpkk....kppkpk......",
      ".....kppppk....kpppppk.....",
      ".....kppppk....kpppppk.....",
      ".....kkkkkk....kkkkkkk.....",
    ],
  },
];

const CELL = 0.9; // px per sprite pixel
const DURATION = 12; // s for one sprite to cross the button
const GAP = 2; // s between sprites

export default function WalkingAgents() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-x-3 bottom-full h-[28px]">
      {AGENTS.map((agent, i) => {
        const cols = agent.rows[0].length;
        const width = cols * CELL;
        const fill: Record<string, string> = { k: "#000000", d: "#2b2b2e", p: agent.color };
        return (
          <svg
            key={agent.color}
            viewBox={`0 0 ${cols} ${agent.rows.length}`}
            shapeRendering="crispEdges"
            className="agent-walker absolute bottom-0"
            style={{
              ["--w" as string]: `${width}px`,
              width,
              // Resting spot (also what reduced-motion users see), spaced out along the button.
              left: `calc((100% - ${width}px) * ${(AGENTS.length - 1 - i) / (AGENTS.length - 1)})`,
              animationDuration: `${DURATION}s`,
              animationDelay: `${-(AGENTS.length - 1 - i) * GAP}s`,
            }}
          >
            <g className="agent-walker-body" style={{ animationDelay: `${-i * 0.15}s` }}>
              {agent.rows.flatMap((row, y) =>
                [...row].map((c, x) =>
                  fill[c] ? <rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" fill={fill[c]} /> : null,
                ),
              )}
            </g>
          </svg>
        );
      })}
    </span>
  );
}

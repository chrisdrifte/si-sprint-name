import adjectives from "./dictionary/adjectives.json";
import nouns from "./dictionary/nouns.json";
import { useState } from "react";

const getRandomItem = (items: string[]) => {
  return items[Math.floor(Math.random() * items.length)];
};

const roll = () => {
  return getRandomItem(adjectives) + " " + getRandomItem(nouns);
};

const rollAnimationSteps = 15;

const rollAnimationTimingFunction = (i: number) => {
  const minValue = 50;
  const maxValue = 500;
  const base = Math.pow(minValue / maxValue, 1 / (rollAnimationSteps - 1));
  return maxValue * Math.pow(base, rollAnimationSteps - i);
};

function App() {
  const [name, setName] = useState(roll);

  const [animatedName, setAnimatedName] = useState("");
  const animateRoll = () => {
    if (animatedName) {
      return;
    }

    let totalDelay = 0;
    for (let i = 0; i <= rollAnimationSteps; i++) {
      totalDelay += rollAnimationTimingFunction(i);
      setTimeout(
        () => setAnimatedName(i < rollAnimationSteps ? roll : ""),
        totalDelay
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center space-y-8">
        <img src="/logo.jpg" alt="" width={200} height={200} />

        <p className="text-4xl">
          {Array.from(animatedName || name).map((character, i) => {
            return character !== " " ? (
              <span
                key={character + i}
                className="animate-[float_1s_ease-in-out_infinite_alternate_both] inline-block"
                style={{ animationDelay: Math.random() * i * 50 + "ms" }}
              >
                {character}
              </span>
            ) : (
              <span className="w-8"> </span>
            );
          })}
        </p>
        <button
          onClick={() => {
            animateRoll();
            setName(roll);
          }}
          className="bg-blue-500 text-white rounded px-4 py-1"
        >
          Roll again
        </button>
      </div>
    </div>
  );
}

export default App;

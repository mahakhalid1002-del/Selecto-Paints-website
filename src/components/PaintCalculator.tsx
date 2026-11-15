// import React, { useState } from "react";

// const PaintCalculator: React.FC = () => {
//   const [paintType, setPaintType] = useState("");
//   const [area, setArea] = useState("");
//   const [coats, setCoats] = useState(1);
//   const [result, setResult] = useState<string | null>(null);

//   const handleCalculate = async () => {
//     if (!paintType || !area || !coats) {
//       setResult("Please fill in all fields");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/calculate-paint", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           paintType,
//           area: Number(area),
//           coats: Number(coats),
//         }),
//       });

//       const data = await response.json();

//       if (data.error) {
//         setResult(data.error);
//       } else {
//         setResult(
//           `${data.minLitres} - ${data.maxLitres} Litres of paint will be used approximately.`
//         );
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setResult("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
//       <div className="backdrop-blur-lg bg-white/30 p-8 rounded-2xl shadow-xl w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Paint Calculator
//         </h2>

//         {/* Dropdown */}
//         <label className="block text-gray-700 mb-2">Paint Type</label>
//         <select
//           value={paintType}
//           onChange={(e) => setPaintType(e.target.value)}
//           className={`w-full p-3 rounded-xl bg-white/60 border border-gray-300 focus:ring-2 focus:ring-blue-500 mb-4 
//             ${!paintType ? "text-gray-400" : "text-gray-800"}`}
//         >
//           <option value="" disabled hidden>
//             Select paint type
//           </option>
//           <option value="wallemulsion">Selecto Wall Emulsion</option>
//           <option value="weatherproof">Selecto Weather Proof</option>
//           <option value="syntheticenamel">Selecto Synthetic Enamel</option>
//           <option value="redoxideprimer">Selecto Red Oxide Primer</option>
//           <option value="stainguard">Selecto Stain Guard</option>
//           <option value="wallfilling">Selecto Premium Wall Filling</option>
//         </select>

//         {/* Area Input */}
//         <label className="block text-gray-700 mb-2">
//           Area in Square meters (m²)
//         </label>
//         <input
//           type="number"
//           value={area}
//           onChange={(e) => setArea(e.target.value)}
//           placeholder="Enter area size"
//           className="w-full p-3 rounded-xl bg-white/60 border border-gray-300 focus:ring-2 focus:ring-blue-500 mb-4"
//         />

//         {/* Coats Input */}
//         <label className="block text-gray-700 mb-2">Number of Coats</label>
//         <input
//           type="number"
//           value={coats}
//           min={1}
//           onChange={(e) => setCoats(Number(e.target.value))}
//           className="w-full p-3 rounded-xl bg-white/60 border border-gray-300 focus:ring-2 focus:ring-blue-500 mb-6"
//         />

//         {/* Button */}
//         <button
//           onClick={handleCalculate}
//           className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl shadow-lg hover:scale-105 transition-transform font-semibold"
//         >
//           Calculate
//         </button>

//         {/* Result */}
//         {result && (
//           <div className="mt-6 p-4 bg-white/70 rounded-xl text-center font-bold text-gray-800 shadow-inner">
//             {result}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaintCalculator;

import React, { useState } from "react";

const paints = [
  { id: "wallemulsion", name: "Wall Emulsion", use: "Everyday interior walls", cover: "12–13 m² per litre", swatch: "bg-sky-300" },
  { id: "weatherproof", name: "Weather Proof", use: "Exterior walls and weather", cover: "13–15 m² per litre", swatch: "bg-blue-600" },
  { id: "syntheticenamel", name: "Synthetic Enamel", use: "Wood, metal, and trim", cover: "14–17 m² per litre", swatch: "bg-slate-800" },
  { id: "redoxideprimer", name: "Red Oxide Primer", use: "A first coat on metal", cover: "12–18 m² per litre", swatch: "bg-orange-800" },
  { id: "stainguard", name: "Stain Guard", use: "Walls that need easy cleaning", cover: "10–13 m² per litre", swatch: "bg-emerald-600" },
  { id: "wallfilling", name: "Wall Filling", use: "Smoothing the surface first", cover: "4–5 m² per litre", swatch: "bg-amber-200" },
];

const PaintCalculator: React.FC = () => {
  const [paintType, setPaintType] = useState("");
  const [area, setArea] = useState("");
  const [coats, setCoats] = useState(1);
  const [result, setResult] = useState<string | null>(null);

  const selected = paints.find((paint) => paint.id === paintType);

  const handleCalculate = () => {
    if (!paintType || !area || !coats) {
      setResult("Choose a paint, then enter the area and number of coats.");
      return;
    }

    const areaNum = parseFloat(area);
    if (!areaNum || areaNum <= 0) {
      setResult("Enter an area greater than zero.");
      return;
    }

    const coverage: Record<string, [number, number]> = {
      stainguard: [10, 13],
      wallemulsion: [12, 13],
      weatherproof: [13, 15],
      redoxideprimer: [12, 18],
      syntheticenamel: [14, 17],
      wallfilling: [4, 5],
    };

    const values = coverage[paintType];
    if (!values) {
      setResult("Choose a paint from the list.");
      return;
    }

    const [low, high] = values;
    const least = (areaNum / high) * coats;
    const most = (areaNum / low) * coats;

    setResult(
      `${least.toFixed(2)} – ${most.toFixed(2)} litres for ${areaNum} m² and ${coats} coat${coats > 1 ? "s" : ""}.`
    );
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-100 via-white to-blue-50 pt-28 pb-12">
      <div className="pointer-events-none absolute -left-16 top-20 h-72 w-72 rounded-full bg-blue-300/50 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-64 w-64 rounded-full bg-amber-200/70 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/2 h-56 w-56 rounded-full bg-teal-200/50 blur-3xl" />

      <div className="relative container mx-auto max-w-5xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">Plan the coat</p>
          <h1 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Paint Calculator</h1>
          <p className="mt-2 text-sm md:text-base text-gray-600">
            Pick the finish, enter the wall area, and see how much paint to buy. The range allows for surface texture and how the coat goes on.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-2xl border border-white/70 bg-white/60 p-5 shadow-lg shadow-blue-900/10 backdrop-blur-xl md:p-6">
            <p className="text-sm font-semibold text-gray-800">Choose a finish</p>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {paints.map((paint) => (
                <button
                  key={paint.id}
                  type="button"
                  onClick={() => setPaintType(paint.id)}
                  className={`flex items-center gap-3 rounded-xl border px-3 py-3 text-left backdrop-blur-md transition ${
                    paintType === paint.id
                      ? "border-blue-400 bg-white/80 shadow-md ring-2 ring-blue-400/40"
                      : "border-white/70 bg-white/40 hover:bg-white/70"
                  }`}
                >
                  <span className={`h-8 w-8 shrink-0 rounded-full border border-white/80 shadow-sm ${paint.swatch}`} />
                  <span>
                    <span className="block text-sm font-semibold text-gray-900">{paint.name}</span>
                    <span className="mt-0.5 block text-xs text-gray-500">{paint.use}</span>
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm text-gray-700">
                Area in square metres
                <input
                  type="number"
                  min={1}
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="For example, 40"
                  className="mt-1 w-full rounded-lg border border-white/80 bg-white/70 px-3 py-2 text-sm backdrop-blur focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label className="block text-sm text-gray-700">
                Number of coats
                <input
                  type="number"
                  min={1}
                  value={coats}
                  onChange={(e) => setCoats(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-white/80 bg-white/70 px-3 py-2 text-sm backdrop-blur focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </label>
            </div>

            <button
              type="button"
              onClick={handleCalculate}
              className="mt-5 w-full rounded-lg bg-gradient-to-r from-blue-600 to-sky-500 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/30 transition hover:from-blue-700 hover:to-sky-600"
            >
              Estimate paint
            </button>

            {result && (
              <div className="mt-4 rounded-xl border border-white/40 bg-gradient-to-r from-blue-600/90 to-sky-500/90 px-4 py-3 text-center text-sm font-medium text-white shadow-md backdrop-blur">
                {result}
              </div>
            )}
          </div>

          <aside className="rounded-2xl border border-white/70 bg-white/55 p-5 shadow-lg shadow-blue-900/10 backdrop-blur-xl md:p-6">
            <div className="mb-3 h-1.5 w-16 rounded-full bg-gradient-to-r from-blue-500 via-amber-300 to-teal-400" />
            <h2 className="text-sm font-semibold text-gray-900">What this estimate includes</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              {selected
                ? `${selected.name} is suited to ${selected.use.toLowerCase()}. A litre covers about ${selected.cover}.`
                : "Select a finish to see where it is used and how far a litre goes."}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li className="rounded-lg border border-white/70 bg-white/50 px-3 py-2 backdrop-blur">Measure only the area you will paint, not windows and doors.</li>
              <li className="rounded-lg border border-white/70 bg-white/50 px-3 py-2 backdrop-blur">Two coats is the usual plan for a lasting colour.</li>
              <li className="rounded-lg border border-white/70 bg-white/50 px-3 py-2 backdrop-blur">Rough or new walls can sit toward the higher end of the range.</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default PaintCalculator;

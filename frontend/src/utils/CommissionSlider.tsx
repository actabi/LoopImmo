import { useState } from "react";
import { ArrowRight } from "lucide-react"; // Ou ton import habituel

const getFees = (price) => ({
  loopimmo: (() => {
    if (price <= 150000) return 2500;
    if (price <= 300000) return 4000;
    if (price <= 500000) return 6000;
    if (price <= 800000) return 8000;
    if (price <= 1200000) return 10000;
    return 10000 + 0.01 * (price - 1200000);
  })(),
  agence: Math.round(price * 0.05),
});

export function CommissionSlider() {
  const [price, setPrice] = useState(300000);
  const fees = getFees(price);
  const percentEconomy = Math.round(100 * (1 - fees.loopimmo / fees.agence));
  const amountEconomy = (fees.agence - fees.loopimmo).toLocaleString();

  return (
    <div>
      <label htmlFor="price" className="block mb-2 text-gray-700 font-medium">
        Prix de vente simulé&nbsp;: <span className="text-blue-600">{price.toLocaleString()} €</span>
      </label>
      <input
        type="range"
        id="price"
        min={50000}
        max={2000000}
        step={10000}
        value={price}
        onChange={e => setPrice(Number(e.target.value))}
        className="w-full accent-blue-600"
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 items-center mt-4 gap-4 sm:gap-2 md:gap-4 text-center">
        {/* Agence */}
        <div className="space-y-1 min-w-0">
          <span className="block text-gray-500 text-xs">
            Agence classique (5 %)
          </span>
          <span className="text-red-600 text-lg md:text-2xl font-bold">
            {fees.agence.toLocaleString()} €
          </span>
        </div>

        {/* Flèche centrée */}
        <div className="flex justify-center">
          <ArrowRight className="w-5 h-5 md:w-8 md:h-8 text-green-400" /> 
        </div>

        {/* Bloc économie */}
        <div className="space-y-1 min-w-0">
          <span className="block text-gray-500 text-xs">
            LoopImmo fait économiser jusqu'à
          </span>
          <span className="text-green-600 text-lg md:text-2xl font-bold">
            {amountEconomy} €  ({percentEconomy} %)
          </span>
        </div>
      </div>

    </div>
  );
}

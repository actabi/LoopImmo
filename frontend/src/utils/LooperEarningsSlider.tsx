import { ArrowRight } from "lucide-react";
import { useState } from "react";

// Logique barème LoopImmo : à jour selon tes paliers
const getLoopimmoFee = (price) => {
  if (price <= 150000) return 2500;
  if (price <= 300000) return 4000;
  if (price <= 500000) return 6000;
  if (price <= 800000) return 8000;
  if (price <= 1200000) return 10000;
  return 10000 + 0.01 * (price - 1200000);
};

export function LooperEarningsSlider() {
  const [price, setPrice] = useState(300000);
  const fee = getLoopimmoFee(price);
  const looperEarning = Math.round(fee * 0.35);

  return (
    <div className="w-full">
      <label htmlFor="looper-price" className="block mb-2 text-gray-700 font-medium">
        Prix du bien vendu : <span className="text-green-700">{price.toLocaleString()} €</span>
      </label>
      <input 
        type="range"
        id="looper-price"
        min={50000}
        max={2000000}
        step={10000}
        value={price}
        onChange={e => setPrice(Number(e.target.value))}
        className="w-full accent-green-600"
      />
      <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-4 w-full">
        {/* <div className="mb-2 md:mb-0">
          <span className="block text-gray-500 text-xs">Forfait LoopImmo</span>
          <span className="text-green-900 text-lg font-bold">{fee.toLocaleString()} €</span>
        </div>
        <ArrowRight className="w-6 h-6 text-green-400 mx-2" /> */}
        <div className="flex-1 text-center w-full">
          <span className="block text-gray-500 text-xs">Votre gain (35 %)</span>
          <span className="text-green-600 text-2xl font-bold">{looperEarning.toLocaleString()} €</span>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500 w-full">
        <span className="font-semibold text-green-600">Jusqu’à {looperEarning.toLocaleString()} € par transaction,</span>
        payé automatiquement après la signature du compromis.
      </div>
    </div>
  );
}

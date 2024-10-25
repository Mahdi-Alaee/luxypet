interface ProductInfoProps {
  prop: string;
  value: string;
}

export default function ProductInfo({prop, value}:ProductInfoProps) {
  return (
    <p className="grid grid-cols-2 py-3 pr-2 text-lg text-gray-600 odd:bg-[#e2e1e19a]">
      <span>{prop}:</span> <span>{value}</span>
    </p>
  );
}

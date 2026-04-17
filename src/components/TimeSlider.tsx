type Props = {
  index: number;
  max: number;
  setIndex: (i: number) => void;
};

export default function TimeSlider({ index, max, setIndex }: Props) {
  return (
    <div className="p-3 bg-slate-900 rounded-xl">
    <input
      type="range"
      min={0}
      max={max}
      value={index}
      onChange={(e) => setIndex(Number(e.target.value))}
      w-full
    />
    </div>
  );
}
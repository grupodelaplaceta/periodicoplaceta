import Icon from '@/components/Icon';

const WAVE = Array.from({ length: 97 }, (_, i) => {
  const a = (i / 96) * Math.PI * 2, r = 44 + 5 * Math.cos(12 * a);
  return `${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`;
}).join(' ');

export default function RosetteIcon({ name, size = 52 }) {
  return (
    <span className="rz" style={{ width: size, height: size }}>
      <svg className="rz-bg" viewBox="0 0 100 100" aria-hidden="true"><polygon points={WAVE} /></svg>
      <Icon name={name} className="rz-ic" />
    </span>
  );
}

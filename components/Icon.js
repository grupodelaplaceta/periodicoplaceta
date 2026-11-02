import { ICON } from '@/lib/icons';

export default function Icon({ name, className = 'i', size }) {
  const style = size ? { width: size, height: size } : undefined;
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false" style={style}
      dangerouslySetInnerHTML={{ __html: ICON[name] || ICON.megaphone }} />
  );
}

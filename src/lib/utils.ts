import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: 'accurate' | 'normal';
  } = {}
) {
  const { decimals = 0, sizeType = 'normal' } = opts;

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === 'accurate'
      ? (accurateSizes[i] ?? 'Bytest')
      : (sizes[i] ?? 'Bytes')
  }`;
}

export function withPrecision({
  num,
  precision = 2
}: {
  num: number;
  precision?: number;
}) {
  if (precision < 1) precision = 1;
  const shift = Math.pow(10, precision);

  return (Math.round(num * shift) / shift).toFixed(precision);
}

export function toCapCase(str: string) {
  const words = str.trim().split(' ');
  const capitalizedWords = words.map((item) => {
    if (item.length < 1) return item;
    return item.charAt(0).toUpperCase().concat(item.substring(1));
  });

  return capitalizedWords.join(' ');
}

export function toHTTPSString(link?: string) {
  if (!link) return '#';

  if (!link.startsWith('http')) return `https://${link}`;
  return link.replace('http:', 'https:');
}

export function toSlug(value: string) {
  return Array.from(value)
    .map((ch) => {
      if (/[a-zA-Z0-9]/.test(ch)) return ch.toLowerCase();
      return '-';
    })
    .join('');
}

interface IToQueryArrayOptionsProps {
  query: string;
  paramName: string;
  delimiter?: string;
}

/**
 *
 * @param options Object
 * @param query String, Delimiter separated query string
 * @param paramName String, expected parameter name in the query string
 * @param delimiter String, separator/delimiter in the query string
 * @returns String[][], returns an array of strings containing a tuple of strings [key, value] where key is the key in the query string and value is the corresponding value.
 */
export function toQueryArray({
  query,
  paramName,
  delimiter = '.'
}: IToQueryArrayOptionsProps) {
  return query
    .split(delimiter)
    .map((q) => {
      if (q.length > 0) return [paramName, q];
    })
    .filter((item) => item !== undefined);
}

export function keyToLabel(key: string) {
  return convertToWords(key);
}

function convertToWords(input: string): string {
  // Handle camelCase or PascalCase
  const words = input
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Split on lowercase-to-uppercase transitions
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') // Handle consecutive capitals (e.g., "XML")
    .replace(/_/g, ' ')
    .toLowerCase()
    .split(' ');

  return words.map((item) => toCapCase(item)).join(' ');
}

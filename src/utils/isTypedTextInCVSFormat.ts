export default function isTypedOptionInCVSFormat(value: string): boolean {
  if (value.includes(",")) {
    const arr = value.split(",");
    const lastDigit = arr[arr.length - 1];
    return !isNaN(parseInt(lastDigit));
  }
  return false;
}

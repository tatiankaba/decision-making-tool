export default function isTypedOptionInCVSFormat(value: string): boolean {
  if (value.includes(",")) {
    const array = value.split(",");
    const lastDigit = array.at(-1);
    if (lastDigit) {
      return !Number.isNaN(Number.parseInt(lastDigit));
    }
  }
  return false;
}

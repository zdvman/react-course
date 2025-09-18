export default function emojiToCountryCode(emoji) {
  // Get the code points of the emoji
  const codePoints = [...emoji].map((char) => char.codePointAt(0));
  // Regional indicator symbols start at 0x1F1E6 ('A')
  return codePoints
    .map((cp) => String.fromCharCode(cp - 0x1f1e6 + 65))
    .join('');
}

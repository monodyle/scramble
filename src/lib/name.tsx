export default function Name() {
  return (
    <h1 className="font-serif text-3xl font-semibold text-center">
      {'Scramble!'.split('').map((char, i) => (
        <span
          key={i}
          className="inline-block transition-transform hover:scale-110"
          style={{
            transform: `rotate(${Math.sin(i * 1.5) * 8}deg)`,
          }}
        >
          {char}
        </span>
      ))}
    </h1>
  )
}

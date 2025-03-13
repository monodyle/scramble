export const modes = ['chill', 'strike', 'rush', 'sprint'] as const
export type GameMode = (typeof modes)[number]

export function getModeLabel(mode: GameMode) {
  switch (mode) {
    case 'chill':
      return 'Chilling'
    case 'strike':
      return 'Three Strikes'
    case 'rush':
      return 'Rush Riddle'
    case 'sprint':
      return 'Sprint Riddle'
    default:
      return mode
  }
}

import { useSettings } from '../state/settings'

export default function Strikes() {
  const { strikes } = useSettings()

  return <div>❤️ × {strikes === Number.POSITIVE_INFINITY ? '∞' : strikes}</div>
}

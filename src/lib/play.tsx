import Actions from './play/actions'
import Input from './play/input'
import Score from './play/score'
import Scrambled from './play/scrambled'
import Strikes from './play/strikes'

export default function PlayScreen() {
  return (
    <div className="flex-1 w-full h-full space-y-4">
      <div className="flex items-center justify-between w-full gap-2 p-4">
        <Actions />
        <Score />
        <Strikes />
      </div>
      <div className="h-32" />
      <div className="p-4 space-y-4">
        <Input />
        <Scrambled />
      </div>
    </div>
  )
}

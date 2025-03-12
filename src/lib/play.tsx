import Actions from './play/actions'
import Input from './play/input'
import Message from './play/message'
import Options from './play/options'
import Score from './play/score'
import Scrambled from './play/scrambled'
import Strikes from './play/strikes'
import Timer from './play/timer'

export default function PlayScreen() {
  return (
    <div className="flex-1 w-full h-full space-y-4">
      <Timer />
      <div className="flex items-center justify-between w-full gap-2 p-4">
        <Actions />
        <Score />
        <Strikes />
      </div>
      <div className="h-32" />
      <div className="p-4 space-y-4">
        <Message />
        <Input />
        <Scrambled />
      </div>
      <Options />
    </div>
  )
}

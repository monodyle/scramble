import { useQuery } from '@tanstack/react-query'
import { createContext, useContext } from 'react'

const WordListContext = createContext<Array<string>>([])
const CACHE_KEY = 'words-data'
const ASSET_PATH = '/words.txt'

function processRawData(text: string): Array<string> {
  return text.split('\n').filter((word) => word.trim())
}

export function WordListProvider({ children }: React.PropsWithChildren) {
  const query = useQuery({
    queryKey: [CACHE_KEY],
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    queryFn: async () => {
      const cache = await caches.open(CACHE_KEY)
      const wordsCache = await cache.match(ASSET_PATH)

      if (wordsCache) {
        const text = await wordsCache.text()
        return processRawData(text)
      }

      const response = await fetch(ASSET_PATH)
      const text = await response.text()
      const words = processRawData(text)

      await cache.put(ASSET_PATH, new Response(text))

      return words
    },
  })

  return (
    <WordListContext.Provider value={query.data ?? []}>
      {query.isLoading ? (
        <div className="flex flex-col items-center justify-center h-full m-auto">
          <div className="inline-flex items-center opacity-60">
            <span className="font-serif font-medium text-primary">Loading</span>
            <span className="inline-flex">
              <span className="text-primary animate-[loading-dots_1.4s_infinite_0.2s]">
                .
              </span>
              <span className="text-primary animate-[loading-dots_1.4s_infinite_0.4s]">
                .
              </span>
              <span className="text-primary animate-[loading-dots_1.4s_infinite_0.6s]">
                .
              </span>
            </span>
          </div>
        </div>
      ) : (
        children
      )}
    </WordListContext.Provider>
  )
}

export function useWordList() {
  return useContext(WordListContext)
}

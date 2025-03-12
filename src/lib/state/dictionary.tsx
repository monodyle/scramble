import { useQuery } from '@tanstack/react-query'
import { createContext, useContext, useMemo } from 'react'

const DictionaryContext = createContext<{
  list: Array<string>
  set: Set<string>
} | null>(null)
const CACHE_KEY = 'words-data'
const ASSET_PATH = '/words.txt'

export function DictionaryProvider({ children }: React.PropsWithChildren) {
  const query = useQuery({
    queryKey: [CACHE_KEY],
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    queryFn: async () => {
      const cache = await caches.open(CACHE_KEY)
      const wordsCache = await cache.match(ASSET_PATH)

      if (wordsCache) {
        const text = await wordsCache.text()
        return text.split('\n').filter((word) => word.trim())
      }

      const response = await fetch(ASSET_PATH)
      const text = await response.text()
      const words = text.split('\n').filter((word) => word.trim())

      await cache.put(ASSET_PATH, new Response(text))

      return words
    },
  })

  const wordSet = useMemo(
    () => new Set(query.data?.map((w) => w.toLowerCase()) ?? []),
    [query.data],
  )

  const value = useMemo(
    () => ({ list: query.data ?? [], set: wordSet }),
    [query.data, wordSet],
  )

  return (
    <DictionaryContext.Provider value={value}>
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
    </DictionaryContext.Provider>
  )
}

export function useDictionary() {
  const value = useContext(DictionaryContext)
  if (!value) {
    throw new Error('useDictionary must be used within a DictionaryProvider')
  }
  return value
}

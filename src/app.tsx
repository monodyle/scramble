import TitleScreen from './lib/title'

export default function App() {
  return (
    <main className="flex flex-col min-h-screen bg-base">
      <div className="flex flex-col flex-1 w-full max-w-2xl px-5 py-4 mx-auto">
        <div className="flex flex-col items-center justify-center flex-1 w-full mx-auto space-y-4 border border-border rounded-xl">
          <TitleScreen />
        </div>
      </div>
      <footer className="px-5 py-4">
        <p className="text-sm text-center text-primary/60">
          made with ❤️ by{' '}
          <a
            href="https://github.com/monodyle"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            monodyle
          </a>
        </p>
      </footer>
    </main>
  )
}

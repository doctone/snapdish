import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

export function Home() {
  return (
    <div className="flex flex-col gap-20 pb-12">
      <section className="pt-8">
        <div className="max-w-md flex flex-col items-start gap-6">
          <h1 className="text-5xl font-extrabold font-headline leading-[1.1] tracking-tight text-on-surface">
            Turn Groceries into{' '}
            <span className="bg-gradient-to-br from-primary to-primary-container bg-clip-text text-transparent">
              Gourmet
            </span>
          </h1>
          <p className="text-lg text-on-surface-variant leading-relaxed max-w-[90%]">
            The minimalist kitchen assistant for busy households.
          </p>
          <Link
            to="/login"
            className="h-14 px-10 rounded-lg bg-gradient-to-br from-primary to-primary-container text-on-primary font-semibold text-lg shadow-xl shadow-primary/10 hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            Get Started
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-label tracking-[0.2em] text-primary font-bold uppercase">
            Experience
          </p>
          <h2 className="text-3xl font-headline font-bold text-on-surface">
            Kitchen Intelligence
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-surface-container-lowest p-8 rounded-lg flex flex-col gap-6 shadow-sm border border-outline-variant/10">
            <div className="w-14 h-14 rounded-lg bg-secondary-container flex items-center justify-center text-primary">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                document_scanner
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-headline font-bold mb-2">
                Scan Receipts
              </h3>
              <p className="text-on-surface-variant leading-relaxed">
                Instantly digitize your grocery shop. Our AI recognizes
                ingredients and expiration dates automatically.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-surface-container-low p-8 rounded-lg flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">menu_book</span>
              </div>
              <h3 className="text-xl font-headline font-bold">
                Personalized Recipes
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Recommendations based on what you actually have in your fridge
                right now.
              </p>
            </div>
            <div className="bg-surface-container-low p-8 rounded-lg flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">inventory_2</span>
              </div>
              <h3 className="text-xl font-headline font-bold">Smart Pantry</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Low on milk? We'll let you know before you start cooking, not
                after.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="-mx-6 px-6 py-20 bg-surface-container-high rounded-t-xl">
        <div className="max-w-md mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-headline font-bold">
              Cook more, waste less.
            </h2>
            <p className="text-on-surface-variant">
              Designed for the conscious kitchen.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-lowest p-6 rounded-lg text-center shadow-sm">
              <p className="text-4xl font-headline font-extrabold text-primary">
                30%
              </p>
              <p className="text-xs font-label uppercase tracking-wider mt-2">
                Less Food Waste
              </p>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-lg text-center shadow-sm">
              <p className="text-4xl font-headline font-extrabold text-primary">
                2h
              </p>
              <p className="text-xs font-label uppercase tracking-wider mt-2">
                Saved Weekly
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
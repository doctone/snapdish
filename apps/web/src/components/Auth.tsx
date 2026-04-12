export function Auth({
  actionText,
  onSubmit,
  status,
  afterSubmit,
}: {
  actionText: string
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  status: 'pending' | 'idle' | 'success' | 'error'
  afterSubmit?: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 bg-background flex items-start justify-center p-8 pt-32">
      <div className="w-full max-w-sm flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <span className="material-symbols-outlined text-primary text-3xl">
            restaurant_menu
          </span>
          <h1 className="text-3xl font-extrabold font-headline tracking-tight text-on-surface">
            {actionText}
          </h1>
          <p className="text-sm text-on-surface-variant">
            {actionText === 'Login'
              ? 'Welcome back to your kitchen.'
              : 'Start cooking smarter today.'}
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit(e)
          }}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-xs font-label font-semibold uppercase tracking-wider text-on-surface-variant"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="px-3 py-2.5 w-full rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
              placeholder="you@example.com"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-xs font-label font-semibold uppercase tracking-wider text-on-surface-variant"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="px-3 py-2.5 w-full rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full h-12 rounded-lg bg-gradient-to-br from-primary to-primary-container text-on-primary font-body font-semibold text-base shadow-lg shadow-primary/10 hover:opacity-90 transition-all disabled:opacity-50"
            disabled={status === 'pending'}
          >
            {status === 'pending' ? '...' : actionText}
          </button>
          {afterSubmit ? (
            <div className="text-sm text-error">{afterSubmit}</div>
          ) : null}
        </form>
      </div>
    </div>
  )
}
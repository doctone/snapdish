import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from '@snapdish/components'

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
      <Card className="w-full max-w-sm">
        <CardHeader>
          <span className="material-symbols-outlined text-primary text-3xl">
            restaurant_menu
          </span>
          <CardTitle className="text-3xl font-extrabold tracking-tight">
            {actionText}
          </CardTitle>
          <CardDescription>
            {actionText === 'Login'
              ? 'Welcome back to your kitchen.'
              : 'Start cooking smarter today.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              onSubmit(e)
            }}
            className="flex flex-col gap-5"
          >
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="you@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" className="w-full" disabled={status === 'pending'}>
              {status === 'pending' ? '...' : actionText}
            </Button>
            {afterSubmit ? (
              <div className="text-sm text-destructive">{afterSubmit}</div>
            ) : null}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

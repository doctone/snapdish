import { createFileRoute } from '@tanstack/react-router'
import { ReceiptDropzone } from '../../components/receipt-dropzone'

export const Route = createFileRoute('/_authed/dashboard')({
  component: Dashboard,
})

export function Dashboard() {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <section className="pt-8">
        <div className="max-w-md mx-auto flex flex-col items-center gap-6">
          <h1 className="text-3xl font-extrabold font-headline text-on-surface text-center">
            Upload a receipt
          </h1>
          <p className="text-on-surface-variant text-center">
            Scan your grocery receipt and we'll handle the rest.
          </p>
          <div className="w-full">
            <ReceiptDropzone />
          </div>
        </div>
      </section>
    </div>
  )
}

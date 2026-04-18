import { createFileRoute } from '@tanstack/react-router'
import { ReceiptDropzone } from '../../components/receipt-dropzone'
import { ReceiptList } from '../../components/receipt-list'
import { fetchReceipts } from '../../utils/fetch-receipts'

export const Route = createFileRoute('/_authed/dashboard')({
  loader: () => fetchReceipts(),
  component: Dashboard,
})

export function Dashboard() {
  const result = Route.useLoaderData()
  const receipts = result && 'receipts' in result ? result.receipts ?? [] : []
  const authError = result && 'error' in result && result.error

  if (authError) {
    return (
      <div className="flex flex-col gap-8 pb-12">
        <section className="pt-8">
          <div className="max-w-md mx-auto flex flex-col items-center gap-6">
            <h1 className="text-3xl font-extrabold font-headline text-on-surface text-center">
              Upload a receipt
            </h1>
            <p className="text-error text-center">{(result as { message: string }).message}</p>
            <div className="w-full">
              <ReceiptDropzone />
            </div>
          </div>
        </section>
      </div>
    )
  }

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

      {receipts.length > 0 && (
        <section className="max-w-2xl mx-auto w-full">
          <h2 className="text-xl font-bold font-headline text-on-surface mb-4">
            Your receipts
          </h2>
          <ReceiptList receipts={receipts} />
        </section>
      )}
    </div>
  )
}

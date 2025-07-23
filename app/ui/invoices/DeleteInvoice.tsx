'use server'
import { deleteInvoiceById } from '@/app/lib/actions';

import { TrashIcon } from '@heroicons/react/24/outline';



export async function DeleteInvoice({ id }: { id: string }) {
  //  const deleteInvoice0=  () => deleteInvoiceById(id) // doing it this way cause error
   const deleteInvoice =  deleteInvoiceById.bind(null, id);
  return (
    <>
      <form action={deleteInvoice}>
        <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <TrashIcon className="w-5" />
        </button>
      </form>
    </>
  );
}
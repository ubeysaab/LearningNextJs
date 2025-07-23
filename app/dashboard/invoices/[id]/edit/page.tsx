import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers,fetchInvoiceById } from '@/app/lib/data';
 
export default async function Page(props:{params:Promise<{id:string}>}) {
  const {id} = (await props.params);

  const s : string= `/dashbaord/invoices/${id}/edit`

const [customers, invoice] = await Promise.all([
  fetchCustomers(),       // Async function 1
  fetchInvoiceById(id),   // Async function 2
]);

  console.log(id)


  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Update Invoice',
            href: {s},
            active: true,
          },
        ]}
      />
      <p>hello</p>
      <Form customers={customers} invoice={invoice}/>
    </main>
  );
}
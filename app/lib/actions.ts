'use server';
//! By adding the 'use server', you mark all the exported functions within the file as Server Actions. These server functions can then be imported and used in Client and Server components. Any functions included in this file that are not used will be automatically removed from the final application bundle
import { revalidatePath } from 'next/cache';

import { redirect } from 'next/navigation';
import postgres from "postgres";
import * as z from "zod";

// Define formSchema based on InvoiceSchema from definitions
const formSchema = z.object({

  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  date: z.string(),

  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: z.enum(['pending', 'paid']),


})

// but there is some data we don't need in form like date and id so we should ommit them 

const createInvoiceScheme = formSchema.omit({ id: true, date: true })

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function createInvoice(formData: FormData) {
  // we use the 'name' property of the component in get 
  // const rawFormData = {
  //   customerId: formData.get('customerId'),
  //   amount: formData.get('amount'),
  //   status: formData.get('status'),
  // };
  // // Test it out:
  // console.log(rawFormData);




  //  const arra =   Object.fromEntries(formData);

  //   for( let key in arra){
  //       console.log(key)
  //       console.log(arra[key])
  // }



  const { customerId, amount, status } = createInvoiceScheme.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  })

  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;




  revalidatePath('/dashboard/invoices');

  redirect('/dashboard/invoices')
}

// export async function updateInvoice(formData: FormData, invoiceId: string) {
export async function updateInvoice(invoiceId: string, formData: FormData) {

  const { customerId, amount, status } = createInvoiceScheme.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  })

  const date = new Date().toISOString().split('T')[0];

  await sql`
  UPDATE invoices
  SET 
    customer_id = ${customerId},
    amount = ${amount},
    status = ${status},
    date = ${date}
  WHERE id = ${invoiceId}
`;

  revalidatePath('/dashboard/invoices');

  redirect('/dashboard/invoices')
}



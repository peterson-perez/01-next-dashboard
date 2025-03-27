'use server'

import { CreateFormState } from "anjrot-components";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce
        .number()
        .gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ date: true, id: true });

export const createInvoice = async (prevState: CreateFormState, formData: FormData) => {
    // Validate form fields using Zod
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    const body = {
        status,
        date,
        amount: amountInCents,
        customer: customerId,
    }

    try {
        await fetch("https://backend-next-tutorial-fay6a.ondigitalocean.app/api/v1/invoices", {
            headers: {
                "Content-Type": 'application/json',
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZGIwODA4NjFjYzI2MzJhOWQwMWEyYSIsImVtYWlsIjoicGV0ZXJzb25AZ21haWwuY29tIiwibmFtZSI6InBldGVyc29uIiwiaWF0IjoxNzQyNDA3OTcxfQ.2knw9WMl0J0g_ZQQWDTyznl2FBAfgAN5AsaGsweilNw"
            },
            method: "POST",
            body: JSON.stringify(body)
        })
    } catch (error) {
        console.log(error)
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}
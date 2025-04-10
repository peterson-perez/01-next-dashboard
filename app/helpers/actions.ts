'use server'

import { auth, handlers, signIn } from "@/auth";
import { CreateFormState } from "anjrot-components";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { CreateStateForm } from "../components/RegisterFormWrapper";
import { FormState } from "../components/LoginWrapper";

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
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }).min(6, {
        message: "Name Must be 6 or more characters long"
    }).refine(name => name.trim(), {
        message: "Name must not start or finish with spaces"
    }),
    username: z.string({
        required_error: "Username is required",
        invalid_type_error: "Username must be a string",
    }).min(6, {
        message: "Username be 6 or more characters long"
    }).refine(name => name.trim(), {
        message: "Username must not start or finish with spaces"
    }),
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z.string().min(6, { message: 'Be at least 6 characters long' }).trim()

    // the correct validations for the a password
    // password: z
    //     .string()
    //     .min(8, { message: 'Be at least 8 characters long' })
    //     .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    //     .regex(/[0-9]/, { message: 'Contain at least one number.' })
    //     .regex(/[^a-zA-Z0-9]/, {
    //         message: 'Contain at least one special character.',
    //     })
    //     .trim(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true, username: true, name: true, email: true, password: true });
const UpdateInvoice = FormSchema.omit({ date: true, username: true, name: true, email: true, password: true });
const registerschema = FormSchema.omit({ id: true, customerId: true, amount: true, status: true, date: true })
const loginschema = FormSchema.omit({ id: true, customerId: true, amount: true, status: true, date: true, name: true, username: true, })

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
        await fetch(`${process.env.BACKEND_URL}/invoices`, {
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


export const updateInvoice = async (prevState: CreateFormState, formData: FormData) => {


    // Validate form fields using Zod
    const validatedFields = UpdateInvoice.safeParse({
        id: formData.get('invoiceId'),
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Invoice.',
        };
    }

    const { customerId, amount, status, id } = validatedFields.data;
    const amountInCents = amount * 100;

    const body = {
        status,
        amount: amountInCents,
        customer: customerId,
    };

    console.log(JSON.stringify(body))

    try {
        await fetch(`${process.env.BACKEND_URL}/invoices/${id}`, {
            headers: {
                "Content-Type": 'application/json',
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZGIwODA4NjFjYzI2MzJhOWQwMWEyYSIsImVtYWlsIjoicGV0ZXJzb25AZ21haWwuY29tIiwibmFtZSI6InBldGVyc29uIiwiaWF0IjoxNzQyNDA3OTcxfQ.2knw9WMl0J0g_ZQQWDTyznl2FBAfgAN5AsaGsweilNw"
            },
            method: "PUT",
            body: JSON.stringify(body)
        })
    } catch (error) {
        console.log(error)
        return {
            message: 'Database Error: Failed to Update Invoice.',
        };
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export const fetchDeleteInvoice = async (formData: FormData) => {
    const id = formData.get('invoiceId')

    try {
        await fetch(`${process.env.BACKEND_URL}/invoices/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZGIwODA4NjFjYzI2MzJhOWQwMWEyYSIsImVtYWlsIjoicGV0ZXJzb25AZ21haWwuY29tIiwibmFtZSI6InBldGVyc29uIiwiaWF0IjoxNzQyNDA3OTcxfQ.2knw9WMl0J0g_ZQQWDTyznl2FBAfgAN5AsaGsweilNw"
            },
            method: "DELETE"
        })
        revalidatePath('/dashboard/invoices');
    } catch (error) {
        return {
            message: "Database Error: Failed to Delete Invoice."
        };
    };
};

export const autenticate = async (state: FormState, formData: FormData) => {
    const validatedFields = loginschema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })
    const message: string = ""

    if (!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors)
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Invalid credentials"
        }
    }

    try {
        await signIn("credentials", formData)
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        message: "Invalid credentials"
                    };
                default:
                    return {
                        message: "Something went wrong"
                    }
            }
        }
        throw error
    }

}

export const register = async (preveState: CreateStateForm, formData: FormData) => {

    const validatedFields = registerschema.safeParse({
        name: formData.get('name'),
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password')
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Fail validation"
        }
    } else {
        const { name, username, email, password } = validatedFields.data;

        console.log('validacion :>>', validatedFields);

        const body = {
            name,
            username,
            email,
            password
        };


        await fetch(`${process.env.BACKEND_URL}/auth/register`, {
            headers: {
                "Content-Type": "Application/json"
            },
            method: "POST",
            body: JSON.stringify(body)
        })
    };

    redirect("/login");
}
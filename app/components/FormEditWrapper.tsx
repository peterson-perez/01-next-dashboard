'use client'

import { CreateForm, CreateFormState, CustomerField, InvoiceForm } from "anjrot-components";
import Link from "next/link";
import { FC, useActionState } from "react";
import { updateInvoice } from "../helpers/actions";

const FormEditWrapper: FC<{ customers: CustomerField[]; invoice: InvoiceForm }> = ({ customers, invoice }) => {
    const initialState: CreateFormState = { message: null, errors: {} }
    const [state, formAction] = useActionState(updateInvoice, initialState)

    return (
        <CreateForm className="create-form" action={formAction} customers={customers} state={state} AnchorElement={Link} invoice={invoice}/>
    );
};

export default FormEditWrapper;
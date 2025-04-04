'use client'

import { LoginForm } from "anjrot-components";
import { authenticate } from "../helpers/actions";
import { useActionState } from "react";

const LoginWrapper = () => {
const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined)
    return (
        <LoginForm action={formAction} error={errorMessage}/>
    );
};

export default LoginWrapper;
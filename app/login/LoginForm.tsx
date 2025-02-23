'use client';

import { useState } from "react";
import Heading from "../components/Heading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../components/inputs/Input";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";


const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        console.log(data);

    }

    return ( 
        <>
            <Heading title={`Sign in to sdley-E~Shop`} />
            <Button 
                label="Sign in with Google"
                onClick={() => {}}
                outline
                icon={AiOutlineGoogle}
            />
            <hr className="bg-slate-300 w-full h-px" />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="email"
            />
            <Input
                id="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="password"
            />
            <Button 
                label={isLoading ? 'Loading...' : 'Login'}
                onClick={handleSubmit(onSubmit)}
            />
            <p className="text-sm">
                New to sdley-E-Shop? <Link 
                className="underline"
                href={`/register`}>
                Create an account
                </Link>
            </p>
        </>
     );
}
 
export default LoginForm;
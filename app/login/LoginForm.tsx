'use client';

import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../components/inputs/Input";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";

interface LoginFormProps {
    currentUser: SafeUser | null;
}

const LoginForm: React.FC<LoginFormProps> = ({currentUser}) => {
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const router = useRouter();

    // Redirecting The User if logged in and try to access the login page
    useEffect(() => {
        if (currentUser) {
            router.push('/cart');
            router.refresh();
        }
    });

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        // console.log(data);
        signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,

        }).then((callback) => {
            setIsLoading(false);

            if(callback?.ok){
                router.push('/cart');
                router.refresh();
                toast.success('Logged in successfully!');
            }

            if(callback?.error){
                toast.error(callback.error);
            }
        })

    }

    if (currentUser) {
        return <p className="text-center">Already Logged in! Redirecting...</p>
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
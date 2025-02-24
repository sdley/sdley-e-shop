'use client';

import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../components/inputs/Input";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";

interface RegisterFormProps {
    currentUser: SafeUser | null
}

const RegisterForm: React.FC<RegisterFormProps> = ({currentUser}) => {
    const [isLoading, setIsLoading] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            // password_confirmation: '',
        }
    });

    const router = useRouter();

    useEffect(() => {
        if(currentUser) {
            router.push('/cart');
            router.refresh();
        }
    });

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        // console.log(data);

        axios.post('/api/register', data)
            .then(() => {
                toast.success('Account created successfully!');

                signIn('credentials', {
                    email: data.email,
                    password: data.password,
                    redirect: false,
                }).then((callback) => {
                    if(callback?.ok){
                        router.push('/cart');
                        router.refresh();
                        toast.success('Logged in successfully!');
                    }

                    if(callback?.error){
                        toast.error(callback.error);
                    }
            });
        })
        .catch(() => {
            toast.error("An error occurred. Please try again.");

        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    if (currentUser) {
        return <p className="text-center">Already Logged in! Redirecting...</p>
    }

    return ( 
        <>
            <Heading title={`Sign up for sdley-E~Shop`} />
            <Button 
                label="Sign up with Google"
                onClick={() => {}}
                outline
                icon={AiOutlineGoogle}
            />
            <hr className="bg-slate-300 w-full h-px" />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
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
                label={isLoading ? 'Loading...' : 'Sign up'}
                onClick={handleSubmit(onSubmit)}
            />
            <p className="text-sm">
                Already have an account? <Link 
                className="underline"
                href={`/login`}>
                Login
                </Link>
            </p>
        </>
     );
}
 
export default RegisterForm;
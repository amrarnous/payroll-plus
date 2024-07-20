"use client";
import { useState } from 'react';
import { Button, Label, TextInput } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState<string | null>(null);
    const navigate = useNavigate();
    const {login}: any = useAuth();


    const handleLogin = (e: any) => {
        e.preventDefault();


        const users = JSON.parse(localStorage.getItem('users')!) || [];
        const user = users.find(
            (user: any) => user.email === email && user.password === password
        );

        if (user) {
            const token = 'fake-jwt-token'; // Simulating token generation
            login(token, { email: user.email, name: user.name });
            setLoginStatus('success');
            setTimeout(() => {
                navigate('/employees');
            }, 500);
        } else {
            setLoginStatus('failure');
        }
    };


    return (
        <div className="Login container mx-auto mt-8">

            <form className="flex max-w-md flex-col gap-4 shadow-md p-4 rounded-md m-auto" onSubmit={handleLogin}>
                <h2 className='text-bold text-primary font-bold text-center'>Login</h2>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Your email" />
                    </div>
                    <TextInput id="email" type="email" placeholder="john@payroll-plus.com" required value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="Your password" />
                    </div>
                    <TextInput id="password" type="password" placeholder="Password" required value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button type="submit" color="failure" onClick={() => handleLogin}>Login</Button>
                <span className='block text-center mt-2'>You don't have an account? <Link to='/register' className='text-primary'>Register</Link></span>
                {loginStatus === 'success' && (
                    <Alert color="success">
                        <span className="font-medium">Success!</span> You have successfully logged in.
                    </Alert>
                )}
                {loginStatus === 'failure' && (
                    <Alert color="failure" icon={HiInformationCircle}>
                        <span className="font-medium">Failure!</span> Incorrect email or password.
                    </Alert>
                )}
            </form>

        </div>
    );
}

export default Login;





"use client";
import { useState } from 'react';
import { Button, Label, TextInput } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import { Link } from 'react-router-dom';


function Register() {
    const [reg, setReg] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [regStatus, setRegStatus] = useState<string | null>(null);
    const [regMessage, setRegMessage] = useState<string | null>(null);


    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!reg.email || !emailRegex.test(reg.email)) {
            setRegMessage('Please enter a valid email.');
            return false;
        }
        if (!reg.name) {
            setRegMessage('Please enter your name.');
            return false;
        }
        if (!reg.password) {
            setRegMessage('Please enter your password.');
            return false;
        }
        return true;
    };

    const handleRegsiteration = (e: any) => {
        e.preventDefault();
        if (validateForm()) {
            const users = JSON.parse(localStorage.getItem('users')!) || [];
            const isEmailExists = users.some((user: { email: string }) => user.email === reg.email);
            if (isEmailExists) {
                setRegMessage('This email is already registered.');
                setTimeout(() => {
                    setRegMessage(null);
                }, 3500);
            } else {
                users.push({ email: reg.email, name: reg.name, password: reg.password });
                localStorage.setItem('users', JSON.stringify(users));
                setRegStatus('success');
            }
        } else {
            setTimeout(() => {
                setRegMessage(null);
            }, 3500);
        }
    };


    return (
        <div className="container mx-auto mt-8">

            <form className="flex max-w-md flex-col gap-4 shadow-md p-4 rounded-md m-auto" onSubmit={handleRegsiteration}>
                <h2 className='text-bold text-primary font-bold text-center'>Register</h2>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email1" value="Your email" />
                    </div>
                    <TextInput id="email1" type="email" placeholder="name@flowbite.com" required value={reg.email}
                        onChange={(e) => setReg({ ...reg, email: e.target.value })} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="name" value="Name" />
                    </div>
                    <TextInput id="name" type="text" placeholder="Enter your name" required value={reg.name}
                        onChange={(e) => setReg({ ...reg, name: e.target.value })} />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="Your password" />
                    </div>
                    <TextInput id="password" type="password" placeholder="Password" required value={reg.password}
                        onChange={(e) => setReg({ ...reg, password: e.target.value })} />
                </div>
                <Button type="submit" color="failure" onClick={() => handleRegsiteration}>Register</Button>
                <span className='block text-center mt-2'>Already have an account? <Link to='/' className='text-primary'>Login</Link></span>
                {regStatus === 'success' && (
                    <Alert color="success">
                        <span className="font-medium">Success!</span> You have successfully Registered.
                    </Alert>
                )}
                {regMessage && (
                    <Alert color="failure" icon={HiInformationCircle}>
                        <span className="font-medium">Failure!</span> {regMessage}
                    </Alert>
                )}
            </form>

        </div>
    );
}

export default Register;





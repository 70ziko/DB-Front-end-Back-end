import React from 'react'
import { Form, redirect, useActionData } from 'react-router-dom'


export default function Login() {

    const data = useActionData();
    return (
        <div className="login">
            <h1>Login</h1>
            <Form method='post' action="/login">
                <label>
                    <span>Your email</span>
                    <input type="email" name="email" required />
                </label>
                <label>
                    <span>Your password</span>
                    <input type="password" name="password" required />
                </label>
                <button>Login</button>
            </Form>
        </div>
    )
}
export const loginAction = async ({ request }) => {
    const data = await request.formData()
    const submission = {
        email: data.get('email'),
        password: data.get('password')
    }
    console.log(submission)
    return redirect('/')
}
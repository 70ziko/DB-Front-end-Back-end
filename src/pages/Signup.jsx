import React from 'react'
import { redirect, useActionData,Form } from 'react-router-dom'

export default function Signup() {
    const credentials = useActionData();
  return (
    <div className="signup">
         <h1>Sign up</h1>
            <Form method='post' action="/sign-up">
                <label>
                    <span>Your email</span>
                    <input type="email" name="email" required />
                </label>
                <label>
                    <span>Your password</span>
                    <input type="password" name="password" required />
                </label>
                <label>
                    <span>Retype your password</span>
                    <input type="password" name="repassword" required />
                </label>
                <button>Sign up</button>
                {credentials && credentials.error && <p>{credentials.error}!!!</p>}
            </Form>
    </div>
  )
}

export const signupAction = async ({ request }) => {
    const credentials = await request.formData()
    const submissioncredentials = {
        email: credentials.get('email'),
        password: credentials.get('password'),
        repassword: credentials.get('repassword')
    }
    console.log(submissioncredentials)
    if(submissioncredentials.password !== submissioncredentials.repassword){
        return { error: 'Passwords are not the same'};
    }else return redirect('/')
}
import 'react'
import { useActionState } from 'react'
import { useAuth } from '../context/AuthContext'




function Login() {
    const {loginUser} = useAuth();
    async function saveUser(prevState, formData) {
        
        //To save into DB
        const userName = formData.get("userName");
        const password = formData.get("password");
        await wait(1000);
        if (userName === ""){
            return {
                error: "Username is required.",
            }
        }
        if (password === ""){
            return {
                error: "Password is required.",
            }
        }
        const result = await loginUser(userName, password);
        if (!result.success){
            return {
                error: result.error,
            }
        }
    }

    function wait(duration){
        return new Promise(res => {
            setTimeout(res, duration);
        })
    }
    const[formData, formAction, formLoading] = useActionState(saveUser, null);

  return (
    <div>
      <form action={formAction}>

        <label htmlFor='userName'>Username</label>
        <input type='text' id="userName" name="userName" placeholder='Navadeep' />
        <label htmlFor='password'>Password</label>
        <input type="password" id="password" name="password" placeholder='password@0' />
        <button disabled={formLoading}>
            Sign in!
        </button>
        {formData?.error && <p style={{ color: 'red' }}>{formData.error}</p>}
      </form>
    </div>
  )
}

export default Login

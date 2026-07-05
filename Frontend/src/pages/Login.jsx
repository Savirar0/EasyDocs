import 'react'
import { useActionState } from 'react'
import { useAuth } from '../context/auth'



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
        <section className="bg-white dark:bg-gray-900">
        <div className="container px-6 py-24 mx-auto lg:py-32">
            <div className="lg:flex">
            <div className="lg:w-1/2">
                <h1 className="mt-4 text-gray-600 dark:text-gray-300 md:text-lg">Welcome back</h1>
                <h1 className="mt-4 text-2xl font-medium text-gray-800 capitalize lg:text-3xl dark:text-white">
                login to your account
                </h1>
            </div>

            <div className="mt-8 lg:w-1/2 lg:mt-0">
                <form action={formAction} className="w-full lg:max-w-xl">
                <div className="relative flex items-center">
                    <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    </span>
                    <input type="text" id="userName" name="userName" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Username"/>
                </div>

                <div className="relative flex items-center mt-4">
                    <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    </span>
                    <input type="password" id="password" name="password" className="block w-full px-11 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password"/>
                </div>

                <div className="mt-8 md:flex md:items-center gap-4">
                    <button disabled={formLoading} type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg md:w-1/2 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 disabled:opacity-50">
                    {formLoading ? "Signing in..." : "Sign in"}
                    </button>
                    {formData?.error && <p className="text-red-500 text-sm">{formData.error}</p>}
                    <a href="#" className="inline-block mt-4 text-center text-blue-500 md:mt-0 hover:underline dark:text-blue-400">
                    Forgot your password?
                    </a>
                </div>
                </form>
            </div>
            </div>
        </div>
        </section>
    </div>
    )
}

export default Login

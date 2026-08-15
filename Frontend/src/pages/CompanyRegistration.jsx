import { useActionState } from 'react'
import { useNavigate } from 'react-router-dom'

function CompanyRegistration() {
    const navigate = useNavigate();

    const [state, formAction, isPending] = useActionState(saveCompany, {
        success: false,
        message: 'Registration not submitted.',
    });

    async function saveCompany(prevState, formData){
        const password = formData.get("password");
        const conform_password = formData.get("confirmPassword");

        if(password != conform_password){

            return{
                success: false,
                error: "Password don't match"
            };
        }

        try{
            const response = await fetch("http://127.0.0.1:8000/api/register-company/", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    company_name: formData.get("companyName"),
                    domain: formData.get("domain") || null, 
                    mail: formData.get("email"),
                    phone_number: formData.get("phone"),
                    location: formData.get("location"),
                    username: formData.get("username"),
                    password: formData.get("password"),
                })
            });
            
            const data = await response.json();
            
            if(response.ok){
                navigate('/login');
                return {
                    success: true,
                    message: "Company and company management admin account created successfully."
                };
            }else{
                return{
                    success: false,
                    error: data.error || "Registration failure."
                };
            }
        
        } catch {
            return {
                success: false, error: "Network error, Server might be offline."
            };
        } 
    }
    
  return (
    <div className= 'flex items-stretch min-h-screen p-4 bg-black'>

        {/* Left side, Easydocs Info */}
        <div className='flex-1 flex flex-col items-center justify-center text-center p-8 bg-blue-600 text-white rounded-l-2xl'>

            <h1>Easy Docs!</h1>

        </div>

        {/* Right side, registration form */}
        <div className='flex flex-1 items-center justify-center bg-red-600 rounded-r-2xl'>
            <form action={formAction} className="max-w-md mx-auto">
                <div className='grid grid-cols-1 gap-8 p-5 border-5 border-solid border-white rounded-4xl'>
                    <h2>Registration</h2>

                    <div>
                        <label htmlFor='email'>Email:</label>
                        <input 
                            className='ml-30 sm:ml:15 border-2 border-solid border-blue-500'
                            type="email"
                            id="email"
                            name="email"
                            required
                            disabled={isPending}
                        />
                    </div>

                    <div>
                        <label htmlFor='phone'>Phone number:</label>
                        <input
                            className='ml-12 sm:ml:6 border-2 border-solid border-blue-500'
                            type="tel"
                            id='phone'
                            name='phone'
                            required
                            disabled={isPending}
                        />
                    </div>

                    <div>
                        <label htmlFor='companyName'>Company Name:</label>
                        <input 
                            className='ml-10 sm:ml:5 border-2 border-solid border-blue-500'
                            type='text'
                            id='companyName'
                            name='companyName'
                            required
                            disabled={isPending}
                        />
                    </div>

                    <div>
                        <label htmlFor='location'>Company Location:</label>
                        <input
                            className='ml-5 sm:ml:2.5 border-2 border-solid border-blue-500'
                            type='text'
                            id="location"
                            name='location'
                            required
                            disabled={isPending}
                        />
                    </div>

                    <div>
                        <label htmlFor='domain'>Company Domain:</label>
                        <input
                            className='ml-6 sm:ml:3 border-2 border-solid border-blue-500'
                            type='text'
                            id="domain"
                            name='domain'
                            disabled={isPending}
                            placeholder="company.com"
                        />
                    </div>

                    <div>
                        <label htmlFor='username'>Username:</label>
                        <input
                            className='ml-20 sm:ml:10 border-2 border-solid border-blue-500'
                            type='text'
                            id='username'
                            name='username'
                            required
                            disabled={isPending}
                        />
                    </div>

                    <div>
                        <label htmlFor='password'>Password:</label>
                        <input
                            className='ml-21 sm:ml:10.5 border-2 border-solid border-blue-500'
                            type='password'
                            id='password'
                            name='password'
                            required
                            disabled={isPending}
                        />
                    </div>

                    <div>
                        <label htmlFor='confirmPassword'>Password Again:</label>
                        <input
                            className='ml-9 sm:ml:4.5 border-2 border-solid border-blue-500'
                            type='password'
                            id='confirmPassword'
                            name='confirmPassword'
                            required
                            disabled={isPending}
                        />
                    </div>

                    <button type="submit" disabled={isPending} className='border-2 border-solid border-black bg-blue-600 rounded-xl hover:bg-white'>
                        {isPending ? 'Signing up...' : 'Sign Up'}
                    </button>
                    <button type="button" onClick={()=>navigate('/login')} className='border-2 border-solid border-black bg-white rounded-xl hover:bg-black hover:text-white '>
                        Sign In
                    </button>
                </div>
            {(state.message || state.error) && (
                <p className={state.success ? 'text-green' : 'text-red'}>
                {state.message || state.error}
                </p>
            )}

            </form>
        </div>
            
    </div>
  )
}

export default CompanyRegistration

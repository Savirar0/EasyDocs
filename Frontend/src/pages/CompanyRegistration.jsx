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
    <div>

        <form action={formAction} className="max-w-md mx-auto">
        
        <h2>Registration</h2>

        <div>
            <label htmlFor='email'>Email:</label>
            <input 
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
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                required
                disabled={isPending}
            />
        </div>

        <button type="submit" disabled={isPending}>
            {isPending ? 'Signing up...' : 'Sign In'}
        </button>

        {(state.message || state.error) && (
            <p className={state.success ? 'text-green' : 'text-red'}>
            {state.message || state.error}
            </p>
        )}

        </form>

            
    </div>
  )
}

export default CompanyRegistration

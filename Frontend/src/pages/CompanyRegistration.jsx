import React from 'react'
import { useActionState, useState } from 'react'

function CompanyRegistration() {

    async function saveCompany(prevState, formData){

        try{
            const response = await fetch("http://127.0.0.1:8000/api/register-company/", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    
                })
            });
            
            const data = await response.json();
            
            if(response.ok){
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
      
    </div>
  )
}

export default CompanyRegistration

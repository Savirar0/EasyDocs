import React from 'react';
import { useActionState, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from './context/auth';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function App() {
  const { role, companyId, companyName, logoutUser, token } = useAuth();
  const [userRole, setUserRole] = useState();
  const [state, formAction, isPending] = useActionState(saveEmployee, {
    success: false,
    message: 'Registration not submitted.',
  });
  async function saveEmployee(prevState, formData){
    const password = formData.get("password");
    const conform_password = formData.get("password2");

    if(password != conform_password){

      return{
        success: false,
        error: "Password don't match"
      };
    }

    try{
      const response = await fetch("http://127.0.0.1:8000/api/register-employee/", {
        method: "POST",
        headers: {"Content-Type": "application/json", "Authorization":`Bearer ${token}`},
        
        body: JSON.stringify({
          name: formData.get("name"),
          mail: formData.get("email"),
          empId: formData.get("empId"),
          username: formData.get("username"),
          password: formData.get("password"),
          role: userRole,
          company: companyName,
          companyId: companyId,
        })
      });
            
      const data = await response.json();
            
      if(response.ok){
        return {
          success: true,
          message: "Company employee/management account created successfully."
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
    <div style={{ fontFamily: 'sans-serif', minHeight: '100vh' }}>
      <header style={{ padding: '20px', backgroundColor: '#f5f5f5', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>EasyDocs Portal</h2>
        <div className='flex flex-row gap-5'>
          <span>Role: <strong>{role}</strong> | Company Id: <strong>{companyId}</strong> | Company Name: <strong>{companyName}</strong></span>
          {role=="MANAGEMENT" ? (<Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Add Employees</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <form action={formAction}>
                <DialogHeader>
                  <DialogTitle>Add Employees</DialogTitle>
                  <DialogDescription>
                    Add your employees on EasyDocs, Enter their details below and click create. Share them the credentials for them to login.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" placeholder="test@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" placeholder="Savirar" />
                  </div>
                  <div className='grid gap-2'>
                    <Label htmlFor='empId'>Employee Id</Label>
                    <Input id='empId' name='empId' placeholder='007'/>
                  </div>
                  <div className='grid gap-2'>
                    <Label htmlFor='role'>Role</Label>
                    <DropdownMenu htmlFor='role'>
                      <DropdownMenuTrigger render={<Button variant="outline" />}>
                        Select
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={()=>setUserRole("MANAGEMENT")}>Management</DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>setUserRole("EMPLOYEE")}>Employee</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" name="username" placeholder="Savirar0" />
                  </div>
                  <div className='grid gap-2'>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" placeholder="secret"/>
                  </div>
                  <div className='grid gap-2'>
                    <Label htmlFor="password2">Confirm Password</Label>
                    <Input id="password2" name="password2" placeholder="secret"/>
                  </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Create</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>) : ( <></> )}
          <button onClick={logoutUser} style={{ marginLeft: '15px' }}>Logout</button>
        </div>
      </header>

      {/* Dynamic Page Content */}
      <main style={{ padding: '40px' }}>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
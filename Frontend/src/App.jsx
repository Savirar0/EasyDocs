import React from 'react';
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
  const { role, companyId, companyName, logoutUser } = useAuth();
  
  return (
    <div style={{ fontFamily: 'sans-serif', minHeight: '100vh' }}>
      <header style={{ padding: '20px', backgroundColor: '#f5f5f5', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>EasyDocs Portal</h2>
        <div className='flex flex-row gap-5'>
          <span>Role: <strong>{role}</strong> | Company Id: <strong>{companyId}</strong> | Company Name: <strong>{companyName}</strong></span>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Add Employees</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <form onSubmit={(e) => { e.preventDefault(); /* submit logic */ }}>
                <DialogHeader>
                  <DialogTitle>Add Employees</DialogTitle>
                  <DialogDescription>
                    Add your employees on EasyDocs, Enter their details below and click create. Share them the credentials for them to login.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
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
                        <DropdownMenuItem>Mangement</DropdownMenuItem>
                        <DropdownMenuItem>Employee</DropdownMenuItem>
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
          </Dialog>
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
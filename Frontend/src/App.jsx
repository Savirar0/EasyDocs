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
import PillNav from './components/ui/Navbar';

function App() {
  const { role, companyId, companyName, logoutUser, token } = useAuth();
  const [userRole, setUserRole] = useState();


  return (
    <div style={{ fontFamily: 'sans-serif', minHeight: '100vh' }} className='relative flex min-h-screen w-full flex-col'>


      <div className="fixed left-1/2 top-3 z-50 -translate-x-1/2">
        <PillNav
          className='whitespace-nowrap'
              
          // logo={logo}
          logoAlt="Company"
          items={[
            { label: 'Dashboard', href: '/' },
            { label: 'Boards', href: '/boards' },
            { label: 'Logout', onClick: logoutUser },
          ]}
          activeHref="/"
          itemStyle="plane"
          hoverEffect="fill"
          indicator="dot"
          layout="split"
          surface="glass"
          size="md"
          bounce={0.3}
          stretch={0.5}
          collapse="auto"
          intro
        />
      </div>

      {/* Dynamic Page Content */}
      <main className="relative z-0 min-h-screen w-full flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
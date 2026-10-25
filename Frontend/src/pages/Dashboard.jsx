import { useActionState, useState, useEffect } from 'react'
import { useAuth } from '@/context/auth'
import { DonutChart, Card, Title } from "@tremor/react";
import { ArrowUpRight, Building2, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Dashboard() {

    const {role, companyId, companyName, token} = useAuth();

    const[totalEmp, setTotalEmp] = useState(0);
    const[managementCount, setManagementCount] = useState(0);
    const[employeeCount, setEmployeeCount] = useState(0);
    const [userRole, setUserRole] = useState();
    const [state, formAction, isPending] = useActionState(saveEmployee, {
        success: false,
        message: 'Registration not submitted.',
    });
    async function saveEmployee(prevState, formData){
        const password = formData.get("password");
        const confirm_password = formData.get("password2");

        if(password != confirm_password){

        return{
            success: false,
            error: "Password don't match"
        };
        }

        try{
        const response = await fetch("http://127.0.0.1:8000/api/register-employee/", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },

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

    const getCount = async ()=>{
        if (role!="MANAGEMENT"){
            return{
                success: false,
                error: "You do not have access to this data."
            }
        }else{
            try {
                const response = await fetch('http://127.0.0.1:8000/api/company-employee-count/', {
                headers: {
                    'Authorization': "Bearer " + token,
                }
                });
                if (!response.ok) {
                throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                console.log("Fetched Employee Counts:", data);
                setTotalEmp(data?.Total_Company_Employees)
                setManagementCount(data?.Management)
                setEmployeeCount(data?.Employees)
            } catch (error) {
                console.error('Dashboard Fetch Error:', error);
            }
        }
    }

    useEffect(() => {
        getCount();
    }, [role, token]);

    const chartData = [
        { name: "Management", amount: managementCount },
        { name: "Employees", amount: employeeCount },
    ];


    const data = [
        { name: "/home", value: 843 },
        { name: "/imprint", value: 46 },
        { name: "/cancellation", value: 3 },
        { name: "/blocks", value: 108 },
        { name: "/documentation", value: 384 },
    ]
    const maxBoardViews = Math.max(...data.map((item) => item.value));

    return (
        <>
            {role=='MANAGEMENT' ?
                (
                <>
                <main className="flex h-full  w-full flex-col space-y-6 bg-neutral-200">
                    <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#111111] text-white shadow-lg shadow-zinc-900/10">
                        <div className="h-1 bg-orange-500" />
                        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_1.15fr] lg:items-center">
                            <div>
                                <div className="flex items-center gap-2 text-orange-400">
                                    <Building2 className="h-4 w-4" />
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                                        EasyDocs Portal
                                    </p>
                                </div>
                                <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                                    Company overview
                                </h1>
                                <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400">
                                    Your workspace at a glance. Manage your team and monitor documentation activity.
                                </p>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-3">
                                <div className="border-l-2 border-orange-500 px-4 py-1">
                                    <p className="text-xs uppercase tracking-wider text-zinc-500">Role</p>
                                    <p className="mt-2 truncate text-sm font-medium text-zinc-100">{role}</p>
                                </div>
                                <div className="border-l border-zinc-700 px-4 py-1">
                                    <p className="text-xs uppercase tracking-wider text-zinc-500">Company ID</p>
                                    <p className="mt-2 truncate text-sm font-medium text-zinc-100">{companyId}</p>
                                </div>
                                <div className="border-l border-zinc-700 px-4 py-1">
                                    <p className="text-xs uppercase tracking-wider text-zinc-500">Company name</p>
                                    <p className="mt-2 truncate text-sm font-medium text-zinc-100">{companyName}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 border-t border-zinc-800 bg-[#171717] px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                            <div className="flex items-center gap-2 text-xs text-zinc-400">
                                <span className="h-2 w-2 rounded-full bg-orange-500" />
                                Management workspace
                            </div>
                            <div className="shrink-0">
                        {role=="MANAGEMENT" ? (<Dialog>
                            <DialogTrigger asChild>
                            <Button className="w-full bg-orange-500 text-sm font-semibold text-black hover:bg-orange-400 sm:w-auto">
                                <Users className="mr-2 h-4 w-4" />
                                Add employees
                            </Button>
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
                                    <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline">{userRole || "Select Role"}</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onClick={() => setUserRole("MANAGEMENT")}>Management</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setUserRole("EMPLOYEE")}>Employee</DropdownMenuItem>
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
                            </div>
                        </div>
                    </section>

                <section className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <p className="text-sm text-zinc-500">Total team</p>
                            <span className="rounded-xl bg-orange-50 p-2 text-orange-600"><Users className="h-4 w-4" /></span>
                        </div>
                        <p className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950">{totalEmp}</p>
                        <p className="mt-1 text-xs text-zinc-400">Active company members</p>
                    </div>
                    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <p className="text-sm text-zinc-500">Employees</p>
                            <span className="rounded-xl bg-zinc-100 p-2 text-zinc-700"><ShieldCheck className="h-4 w-4" /></span>
                        </div>
                        <p className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950">{employeeCount}</p>
                        <p className="mt-1 text-xs text-zinc-400">Across your workspace</p>
                    </div>
                    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <p className="text-sm text-zinc-500">Management</p>
                            <span className="rounded-xl bg-orange-500 p-2 text-black"><Building2 className="h-4 w-4" /></span>
                        </div>
                        <p className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950">{managementCount}</p>
                        <p className="mt-1 text-xs text-zinc-400">People with admin access</p>
                    </div>
                </section>

                <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
                    <Card className="rounded-2xl border-zinc-200 p-6 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <Title className="text-zinc-950">Team composition</Title>
                                <p className="mt-1 text-sm text-zinc-500">People by account type</p>
                            </div>
                            <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700">Live</span>
                        </div>
                        <DonutChart
                            className="mt-4 h-56"
                            data={chartData}
                            category="amount"
                            index="name"
                            colors={["orange", "zinc"]}
                            showLabel={true}
                            variant="donut"
                        />
                    </Card>

                    <Card className="rounded-2xl border-zinc-200 p-6 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <Title className="text-zinc-950">Boards breakdown</Title>
                                <p className="mt-1 text-sm text-zinc-500">Views across your documentation boards</p>
                            </div>
                            <ArrowUpRight className="h-5 w-5 text-orange-500" />
                        </div>
                        <div className="mt-7 space-y-5">
                            {data.map((item, index) => (
                                <div key={item.name}>
                                    <div className="mb-2 flex items-center justify-between text-sm">
                                        <span className="font-medium text-zinc-700">{item.name}</span>
                                        <span className="tabular-nums text-zinc-400">{item.value.toLocaleString()}</span>
                                    </div>
                                    <div className="h-2 overflow-hidden rounded-full bg-zinc-100">
                                        <div
                                            className={`h-full rounded-full ${index === 0 ? "bg-orange-500" : "bg-zinc-800"}`}
                                            style={{ width: `${(item.value / maxBoardViews) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </section>
                </main>
                </>)
                :
                <div>

                </div>
            }
        </>
    )
}

export default Dashboard
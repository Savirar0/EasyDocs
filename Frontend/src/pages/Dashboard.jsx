import 'react'
import { useState } from 'react'
import { useAuth } from '@/context/auth'
import { DonutChart } from "@tremor/react";

function Dashboard() {
    
    const {role, companyId, companyName, token} = useAuth();

    const[totalEmp, setTotalEmp] = useState(null);
    const[managementCount, setManagementCount] = useState(null);
    const[employeeCount, setEmployeeCount] = useState(null);

    const getCount = async ()=>{
        if (role!="MANAGEMENT"){
            return{
                success: false,
                error: "You do not have access to this data."
            }
        }else{
            try {
                const response = await fetch('/api/company-employee-count/', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
                });
                if (!response.ok) {
                throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setTotalEmp(data?.Total_Company_Employees)
                setManagementCount(data?.Management)
                setEmployeeCount(data?.Employees)
            } catch (error) {
                console.error('Dashboard Fetch Error:', error);
            }
        }
    }

    const chartData = [
        {
            name: "Total Employees",
            amount: totalEmp
        },
        {
            name: "Management",
            amount: managementCount
        },
        {
            name: "Employees",
            amount: employeeCount
        },
    ]

    return (
        <>
            <DonutChart
                className="mx-auto"
                data={chartData}
                category="name"
                value="amount"
                showLabel={true}
            />
        </>
    )
}

export default Dashboard
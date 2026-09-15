import 'react'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/auth'
import { DonutChart , Card, Title} from "@tremor/react";

function Dashboard() {
    
    const {role, companyId, companyName, token} = useAuth();

    const[totalEmp, setTotalEmp] = useState(0);
    const[managementCount, setManagementCount] = useState(0);
    const[employeeCount, setEmployeeCount] = useState(0);

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
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
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
    }, [role, token]   );

    // const chartData = [
    //     {
    //         name: "Total Employees",
    //         amount: totalEmp 
    //     },
    //     {
    //         name: "Management",
    //         amount: managementCount 
    //     },
    //     {
    //         name: "Employees",
    //         amount: employeeCount 
    //     },
    // ]

    const chartData = [
        { name: "Management", amount: managementCount },
        { name: "Employees", amount: employeeCount },
    ];

    return (
        <>  
            {managementCount}
            <Card className="max-w-md mx-auto">
                <Title className="text-center">Employee Breakdown</Title>
                {/* Added h-52 for explicit container height */}
                <DonutChart
                    className="h-52 mt-4"
                    data={chartData}
                    category="amount"
                    index="name"
                    showLabel={true}
                    variant="donut"
                />
            </Card>
        </>
    )
}

export default Dashboard
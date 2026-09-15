import 'react'
import { useState, useEffect } from 'react'
import { useAuth } from '@/context/auth'
import { DonutChart , Card, Title, BarList} from "@tremor/react";

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
    
    return (
        <>  
            <div className='flex flex-row '>
                <Card className="max-w-md mx-auto">
                    <Title className="text-center">Employee Breakdown</Title>
                    <DonutChart
                        className="h-52 mt-4"
                        data={chartData}
                        category="amount"
                        index="name"
                        colors={["rose","indigo"]}
                        showLabel={true}
                        variant="donut"
                    />
                </Card>

                <Card className="w-full md:w-1/2">
                    <Title className="mb-4 text-center">Most Visited Pages</Title>
                    <BarList
                        data={data}
                        className="mt-2"
                    />
                </Card>
            </div>
        </>
    )
}

export default Dashboard
import React from "react";
import { useActionState, useState, useEffect } from 'react'
import { useAuth } from '@/context/auth'

function Boards(){
    const {role, companyId, companyName, token} = useAuth();

    const [board, setBoard] = useState();
    

}

export default Boards
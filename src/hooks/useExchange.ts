import { useEffect, useState } from "react"
const useExchange = (source_account_id?: string, destination_account_id?: string) => {
   const [equal,setEqual] = useState(true);
   const [message,setMessage] = useState(null)
   const [error,setError] = useState<Error | null>(null);
   const [loading,setLoading] = useState(false);
   useEffect(() => {
    if(!destination_account_id) return;
    setLoading(true)
    setTimeout(() => {
        fetch('/api/accounts/checkCurrencies', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                source_account_id: source_account_id,
                destination_account_id : destination_account_id
            })
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.message)
            {
            setMessage(data.message)
            }
            if(!data) {
                setMessage(null)
            }
            setEqual(data)
            setError(null)
        })
        .catch((error: Error) => {
            setError(error)
            setMessage(null)
        })
        .finally(() => setLoading(false))
    }, 750)
}, [
    source_account_id,destination_account_id
   ])
   return {equal , loading , error, message}
}

export default useExchange
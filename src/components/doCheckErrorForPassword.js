import { onChangeKeyCheck } from "./PassKeyCheck"

export async function doSendErrorForPassword({place, val, setError, Detail, error}) {
    try{
        setError({
            ...error, [place]: {
                ...Detail[place],
                val: onChangeKeyCheck(val)
            }
        })
    }catch(e){
        console.log(e)
    }
}
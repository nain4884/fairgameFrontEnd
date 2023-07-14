import { onChangeKeyCheck } from "./PassKeyCheck"

export async function doSendErrorForPassword({ place, val, val2, setError, Detail, error }) {
    try {
        setError({
            ...error, [place]: {
                ...Detail[place],
                val: onChangeKeyCheck(val2)
            }
        })
    } catch (e) {
        console.log(e)
    }
}
import { onChangeKeyCheck, onChangeKeyCheckNumber } from "./PassKeyCheck"

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

export async function doSendErrorForPasswordNumber({ place, val, val2, setError, Detail, error }) {
    try {
        setError({
            ...error, [place]: {
                ...Detail[place],
                val: onChangeKeyCheckNumber(val2)
            }
        })
    } catch (e) {
        console.log(e)
    }
}
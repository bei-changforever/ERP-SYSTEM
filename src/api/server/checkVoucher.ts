import service from "../request";


interface checkVoucherData {
    start: string | number,
    length: string | number
}




// 检验单据
export const checkVoucher = ({ start, length }: checkVoucherData) => {
    return service.get(`/api/CheckVoucher/CheckVoucherList?start=${start}&length=${length}`)
}

export const upLoadFile = (file: object) => {

    return service({
        url: '/api/upload',
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data"
        },
        data: file
    })
}


export const expressLabel = (FORM: Object) => {
    return service({
        url: '/api/printLabel',
        method: 'POST',
        data: FORM
    })
}
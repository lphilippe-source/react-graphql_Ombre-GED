import { ApolloCache, DefaultContext, MutationFunctionOptions, OperationVariables, useMutation } from "@apollo/client"
import { TEMPORARY_FILE_DOWNLOAD } from "../GraphQl/mutation"

// interface GetDataMutation{
//     name:string,
//     mime:string
//     getData:(options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>> | undefined) => Promise<any>
// }
export const download = async (res:any,name: string, mime: string) => {
    console.log(name, mime)
    
            const requestOptions: RequestInit = {
                method: 'GET',
                redirect: 'follow'
            }
            return fetch(`http://localhost:3000/files/download/${res.data.temporaryDocument}`, requestOptions)
                .then((response) => response.text())

                .then((result: string) => {
                    function _binStrToArrayBuffer(binaryStr: string) {
                        const binary_array: number[] = JSON.parse(binaryStr).data
                        const len: number = binary_array.length
                        const bytes = new Uint8Array(len)
                        for (var i = 0; i < len; i++) {
                            bytes[i] = binary_array[i]
                        }
                        return bytes.buffer
                    }

                    const arrayBuffer: ArrayBuffer = _binStrToArrayBuffer(result)
                    const file: File = new File([arrayBuffer], name, { type: mime })

                    //download onClick event
                    const saveFile = async (blob: Blob) => {
                        const a: HTMLAnchorElement = document.createElement('a')
                        a.download = name
                        a.href = URL.createObjectURL(blob)
                        a.addEventListener('click', (e) => {
                            setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000)
                        })
                        a.click()
                    }
                    saveFile(file)
                })
}
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react"
import { FC, useState } from "react"
import { Col, Row } from "../../../css/style"
import { UsersDTO } from "../MainLogic"
import { List, Avatar, Button, Skeleton } from 'antd';
import { useMutation } from "@apollo/client";
import { TEMPORARY_FILE_DOWNLOAD } from "../../../Services/GraphQl/mutation";
import { readFile } from "fs/promises";
import download from 'downloadjs'
import { readFileSync } from "fs";
import { Buffer } from 'buffer'

interface Files {
    name: string,
    ext: string,
    __typename: string
}
interface Data {
    __typename: string,
    files: Files[],
    id: number
}
interface IFiles {
    // token: string,
    // data: UsersDTO
    fileInfo: Data
}

export const ViewMainComponent: FC<IFiles> = ({ fileInfo }) => {

    const [getData, { data, loading, error }] = useMutation(TEMPORARY_FILE_DOWNLOAD)
    console.log("fileinfo", fileInfo)
    const downloadFile = async (name: string,mime:string) => {
        //    console.log("getData",getData())
        return await getData({
            variables: {
                filename: name
            }
        })
            .then(async (res) => {
                console.log("res----->", res)
                const requestOptions: RequestInit = {
                    method: 'GET',
                    redirect: 'follow'
                }
               return fetch(`http://localhost:3000/files/download/${res.data.temporaryDocument}`, requestOptions)
                    .then((response) => response.arrayBuffer())
                    // .then((response) => console.log(response))
                    // .then((response) => JSON.parse(response))
                    // .then(response => response.blob())
                    // const blob = await Promise.resolve(response.blob())
                    // .then((res)=>console.log("res----->",res))
                    .then(result => {
                        
                        const convertedArray = new Uint8Array(result)
                        console.log("result---->",convertedArray)
                    //   let   base64Data = btoa(String.fromCharCode.apply(null, result));

                        // let base64ImageString = Buffer.from(result,'binary')
                        // const b64Str = "data:image/jpeg;base64,"+Buffer.from(result.data,'binary').toString("base64") 
                        // console.log("convArr--->",base64ImageString)
                        // const file = new File([convertedArray], 'toto.jpg', { type: "image/jpeg" })
                        //  download(convertedArray, 'toto.jpg', "image/jpeg")
                        // return convertedArray

                        const saveFile = async (blob:any) => {
                            const a = document.createElement('a');
                            a.download = name;
                            a.href = URL.createObjectURL(blob);
                            a.addEventListener('click', (e) => {
                              setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
                            });
                            a.click();
                          };
                        //   const toto = result.data.toString('base64')
                          const blob = new Blob([convertedArray], { type: mime })
                        //   saveFile(new Blob([result], { type: mime }))
                        saveFile(blob)
                    })
            })
    }
    // .then(res => {
    //     setFile(res)
    //     return res
    // })
    // .then(res=>(readFile('./'+res.name)))
    // .then((res)=>{
    //     let toto =  new FileReader()
    //     toto.readAsArrayBuffer(res)
    //     return toto.result
    // })
    // .then((res)=> res.readAsArrayBuffer()))
    // .then((res)=>console.log(res))
    // .catch(error => console.log('error', error));
    // fetch(`http://localhost:3000/files/download/${str}`)
    // .then((res)=> console.log(res))
    //         })
    // })
    // }
    return (
        // <Row size={1} direction="column">{
        //     data.files.map((file,index) =>

        //         <Row size={1} css={css`border-radius: 4px;
        //                         font-size: 14px;
        //                         margin: 20px 0;
        //                         border: 1px solid #e22063;
        //                         text-align: center;
        //                         padding: 10px 0;`}
        //             key={index}>
        //             <Col grow={1}>{file.name}</Col>
        //             <Col size={1}>{file.ext}</Col>
        //         </Row>
        //     )}
        // </Row>
        <List
            className="demo-loadmore-list"
            // loading={initLoading}
            itemLayout="horizontal"
            // loadMore={loadMore}
            dataSource={fileInfo.files}
            renderItem={item => (
                <List.Item
                    actions={[<a key="list-loadmore-edit" onClick={() => downloadFile(item.name,item.ext)}>Download</a>, <a key="list-loadmore-more">Remove</a>]}
                >
                    {/* <Skeleton avatar title={false}
             loading={item.loading}
              active> */}
                    <List.Item.Meta
                        // avatar={<Avatar src={item.picture.large} />}
                        title={<a href="https://ant.design">{item.name}</a>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                    <div>content</div>
                    {/* </Skeleton> */}
                </List.Item>
            )}
        />
    )
}

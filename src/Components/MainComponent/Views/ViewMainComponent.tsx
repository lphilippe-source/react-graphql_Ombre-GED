/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react"
import { FC, useState, Fragment } from "react"
import { Col, Row } from "../../../css/style"
import { UsersDTO } from "../MainLogic"
import { List, Avatar, Button, Skeleton } from 'antd';
import { useMutation } from "@apollo/client";
import { TEMPORARY_FILE_DOWNLOAD } from "../../../Services/GraphQl/mutation";
import { readFile } from "fs/promises";
import download from 'downloadjs'
import { readFileSync } from "fs";
import { Buffer } from 'buffer'
import { ListItemTypeProps } from "antd/lib/list/Item";
import { IViewMainDropZoneProps, ViewMainDropZone } from "./ViewMainDropZone"
import { nanoid } from 'nanoid'

interface Files {
    name: string,
    ext: string,
    size: number,
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
    DownloadFile: (a: string, b: string) => Promise<any>
    uploadFile: IViewMainDropZoneProps
    removeFile: (filename: string) => any
    loading: boolean
}

export const ViewMainComponent: FC<IFiles> = ({ fileInfo, DownloadFile, uploadFile, removeFile, loading = false }) => {
    return (

        <Fragment>
            <List
                className="demo-loadmore-list"
                loading={false}
                itemLayout="horizontal"
                // loadMore={loadMore}
                dataSource={fileInfo.files}
                renderItem={item => (
                    <List.Item
                        actions={[<a key={nanoid()} onClick={() => DownloadFile(item.name, item.ext)}>Download</a>, <a onClick={() => removeFile(item.name)} key={nanoid()}>Remove</a>]}
                    >
                        <Skeleton avatar title={false}
                            loading={loading}
                            active>
                            <List.Item.Meta
                                // avatar={<Avatar src={item.picture.large} />}
                                title={<a onClick={() => DownloadFile(item.name, item.ext)}>{item.name}</a>}
                            // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                            <div>{Math.ceil(item.size/1024)} ko</div>
                        </Skeleton>
                    </List.Item>
                )}
            />
            <ViewMainDropZone {...uploadFile} />
        </Fragment>
    )
}

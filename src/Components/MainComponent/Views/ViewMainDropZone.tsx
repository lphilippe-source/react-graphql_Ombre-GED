import { FC } from "react";
export interface IViewMainDropZoneProps {
    getRootProps:()=>any,
    getInputProps:()=>any,
    isDragActive:any
};


export const ViewMainDropZone: FC<IViewMainDropZoneProps> = ({getRootProps,getInputProps,isDragActive}) => {
    return (
        <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
    )
}

import { FC, useEffect, useState, useCallback } from "react"
import { ApolloClient, gql, useMutation, useQuery } from '@apollo/client'
import { useNavigate } from "react-router-dom"
import { cache, persistor } from "../../MasterComponent/appConfig"
import { isJson } from "../../Services/utilsFunction/parsingTokenFunctions"
import { TEMPORARY_FILE_DOWNLOAD, UPLOAD_DOCUMENT } from "../../Services/GraphQl/mutation"
import { useDropzone } from 'react-dropzone'
import { stringify } from "querystring"
import { download } from "../../Services/utilsFunction/filesFunctions"

interface IMainProps {
  children?: (data: any, downloadFile: any, uploadFile: any) => JSX.Element
  client: ApolloClient<object>
}
interface UserModel {
  __typename: string
  email: string
  id: string
  password: string
  pseudo: string
}
export interface UsersDTO {
  users: UserModel[]
}

export const MainLogic: FC<IMainProps> = ({ children, client }) => {

  const navigate = useNavigate()
  const [files, setFiles] = useState<string | null>(null)
  const userData: string | null = window.sessionStorage.getItem('user-logged-in')
  const [getData, { data, loading, error }] = useMutation(TEMPORARY_FILE_DOWNLOAD)

  // const [getData, { data, loading, error }] = useMutation(TEMPORARY_FILE_DOWNLOAD)

  // useEffect(() => {

  //   const restore = async () => persistor.restore()
  //     .then(async () => {
  //       const email = await client.readFragment({

  //         id: 'user:1', // The value of the to-do item's cache ID

  //         fragment: gql`

  //       fragment MyToken on user {
  //   email
  //       }

  //     `,
  //         variables: {
  //           id: 1,
  //         }

  //       })
  //       console.log("email: ",email)
  //       return email
  //     })
  //     .then(async (email) => {
  //       console.log(email)
  //       const fileResp:any = await  client.writeFragment({
  //         id:'files:1',
  //         fragment:gql`
  //         fragment writeFile on files{
  //           files
  //         }`,
  //         data: {
  //           files: {
  //             __typename: 'files',
  //             id: 1,
  //             files
  //           },
  //         }
  //       })
  //     console.log("fileResp: ",fileResp)
  //     })

  //     .then(() => persistor.persist())
  //   restore()

  // }, [files])

  const downloadFile = async (name: string, mime: string) => {

    return await getData({
      variables: {
        filename: name
      }
    })
      .then((res) => download(res, name, mime))
  }

  const [uploadDocument] = useMutation(UPLOAD_DOCUMENT)
  const onDrop = useCallback(([picture]: File[]) => {
    // Do something with the files
    console.log(picture)

    uploadDocument({ variables: { picture } })
      .then(() => {
        const fragment = {
          id: 'files:1',
          fragment: gql`
                fragment updateFile on files{
                  files
                }`
        }
        // const newFile = [{
        //   __typename: "FileModel",
        //   name: picture.name,
        //   ext: picture.type
        // }]
        cache.updateFragment(fragment, (data) => {

          console.log("data---->", data)
          return {
            files: [ {
              __typename: "FileModel",
              name: picture.name,
              ext: picture.type
            }]
          }
          // return ({


          //   // files: data.files.map((file:File) => ({ ...file, completed: true }))
          //   // files: data.file.push({
          //   //   name: picture.name,
          //   //   ext: picture.type,
          //   //   __typename: "FileModel"
          //   // })

          //   // files: data.files.push({
          //   //   __typename: "FileModel",
          //   //   name: picture.name,
          //   //   ext: picture.type
          //   // })


          //   files: {
          //     data: {
          //       files: [...data.files, {
          //         __typename: "FileModel",
          //         name: picture.name,
          //         ext: picture.type
          //       }]
          //     }
          //   }
          //   //  data.files.push({
          //   //   __typename: "FileModel",
          //   //   name: picture.name,
          //   //   ext: picture.type
          //   // })
          // })
        }
        )
        // console.log("fileResp: ", fileResp)
      })

  }, [uploadDocument])
  const uploadFile = useDropzone({ onDrop })
  // const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  useEffect(() => {

    persistor.restore()
    if (userData && isJson(userData) && JSON.parse(userData) && JSON.parse(userData)['files:1']) {
      console.log("userData----->", JSON.parse(userData)['files:1'])
      setFiles(JSON.parse(userData)['files:1'])
      console.log("files: ", JSON.parse(userData)['files:1'])
    }
    else {
      persistor.purge()
      client.clearStore()
      navigate("/Login")
    }
  }, [userData])
  return (
    <>
      {files && children && children(files, downloadFile, uploadFile)}
    </>
  )
}


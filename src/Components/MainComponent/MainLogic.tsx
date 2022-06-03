import { FC, useEffect, useState, useCallback } from "react"
import { ApolloClient, gql, useMutation } from '@apollo/client'
import { useNavigate } from "react-router-dom"
import { cache, persistor } from "../../MasterComponent/appConfig"
import { isJson } from "../../Services/utilsFunction/parsingTokenFunctions"
import { REMOVE_FILE, TEMPORARY_FILE_DOWNLOAD, UPLOAD_DOCUMENT } from "../../Services/GraphQl/mutation"
import { useDropzone } from 'react-dropzone'
import { download } from "../../Services/utilsFunction/filesFunctions"

interface IMainProps {
  children?: (data: any, downloadFile: any, uploadFile: any, removeFile: any, isLoading: any) => JSX.Element
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
interface FileCache {
  __typename: string,
  id: number,
  files: object[]
}
export const MainLogic: FC<IMainProps> = ({ children, client }) => {

  const navigate = useNavigate()
  const userData: string = window.sessionStorage.getItem('user-logged-in') || ""
  const [files, setFiles] = useState<FileCache>(userData && JSON.parse(userData)['files:1'])
  const [getData, { loading, error }] = useMutation(TEMPORARY_FILE_DOWNLOAD)
  const [uploadDocument, { data, loading: loading2, error: error2 }] = useMutation(UPLOAD_DOCUMENT)
  const [removedDocument, { loading: loading3, error: error3 }] = useMutation(REMOVE_FILE)
  const [isLoading, setIsLoading] = useState<null | Boolean>(null)
  // const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  // TODO confirmDelete need to delete item from cache
  useEffect(() => {
    if (isLoading == null) setIsLoading(false)
    else setIsLoading(s => !s)
  }, [loading, loading2, loading3])
  useEffect(() => {
    const cachedFiles = client.readFragment({

      id: 'files:1',
      fragment: gql`
                fragment updateFile on files{
                  files
                }`
    })
    setFiles(cachedFiles)
  }, [data])

  const removeFile = (filename: string) => {
    removedDocument({
      variables: {
        filename
      },
    })
      .then(() => {
        const fragment = {
          id: 'files:1',
          fragment: gql`
        fragment updateFile on files{
          files
        }`
        }
        cache.updateFragment(fragment, (data) => {
          console.log('data------->', data)
          return { files: data.files.filter((file: any) => file.name !== filename) }
        })
      })
      .then(() => persistor.persist())
    // .then((res) => setConfirmDelete(res.data.removedDocument))
  }
  const downloadFile = async (name: string, mime: string) => {
    return await getData({
      variables: {
        filename: name
      }
    })
      .then((res) => download(res, name, mime))
  }

  const onDrop = useCallback(([picture]: File[]) => {
    // Do something with the files

    uploadDocument({ variables: { picture } })
      .then(() => {
        const fragment = {
          id: 'files:1',
          fragment: gql`
                fragment updateFile on files{
                  files
                }`
        }
        cache.updateFragment(fragment, (data) => {

          return {
            files: [...data.files, {
              __typename: "FileModel",
              name: picture.name,
              ext: picture.type
            }]
          }
        }
        )
      })
      .then(() => persistor.persist())
  }, [uploadDocument])
  const uploadFile = useDropzone({ onDrop })
  // const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  useEffect(() => {

    persistor.restore()
    if (userData && isJson(userData) && JSON.parse(userData) && JSON.parse(userData)['files:1']) {
      setFiles(JSON.parse(userData)['files:1'])
    }
    else {
      persistor.purge()
      client.clearStore()
      navigate("/Login")
    }
  }, [userData])
  return (
    <>
      {!error && !error2 && !error3 && files && children && children(files, downloadFile, uploadFile, removeFile, isLoading)}
    </>
  )
}


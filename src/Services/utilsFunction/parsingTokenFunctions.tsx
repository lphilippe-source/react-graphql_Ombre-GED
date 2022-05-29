export function isJson(str: string | null): boolean {
    try {
        if (str)
            return JSON.parse(str)
    } catch (e) {
        return false
    }
    return true
}
export function returnTokenFromLocal() {

    const data = window.sessionStorage.getItem('user-logged-in')
    console.log(data)
  
    if (isJson(data)) {
      let token
      if (data)
        token = data && JSON.parse(data)['user:1'].token
      console.log('data from storage: ', token)
      return token && token
    }
  }

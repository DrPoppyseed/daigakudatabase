// @flow
import * as React from 'react'
import { firebaseAuth } from './util/firebase'
import { useLocation } from 'react-router-dom'
import history from './util/history'

const AuthContext: React.Context<any> = React.createContext()

const AuthProvider = ({
  children,
}: {
  children: React.Element<any>,
}): React.Element<any> => {
  const [globalLoading, setGlobalLoading] = React.useState(true)
  const [currentPath, setCurrentPath] = React.useState('')
  const location = useLocation()
  const [user, setUser] = React.useState({
    uid: '',
  })

  React.useEffect(() => {
    setCurrentPath(location.pathname)
  }, [location])

  React.useEffect(() => {
    firebaseAuth.onAuthStateChanged(result => {
      if (result) {
        if (result.uid !== user.uid) {
          setUser(result)
          setGlobalLoading(false)

          if (currentPath.match(/(auth\/signin|auth\/signup)/)) {
            history.push('/')
          }
        } else {
          setGlobalLoading(false)
        }
      } else {
        setGlobalLoading(false)
      }
    })
  })

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        globalLoading,
        setGlobalLoading,
        currentPath,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthConsumer = AuthContext.Consumer
export { AuthContext, AuthProvider, AuthConsumer }
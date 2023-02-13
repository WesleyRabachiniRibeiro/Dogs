import React from 'react'
import { useNavigate } from 'react-router-dom';
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './Api';

export const UserContext = React.createContext();

export const UserStorage = ({children}) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const userLogout = React.useCallback(async function () {
    setData(null)
    setError(null)
    setLoading(false)
    setLogin(false)
    window.localStorage.removeItem('token')
    navigate("/login")
  }, [navigate])

  async function getUser(token){
    const {url, options}  = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json)
    setData(json);
    setLogin(true);
  }

  async function userLogin(username, password) {
    try{
      setError(null);
      setLoading(true);
      const {url, options} = TOKEN_POST({username, password});
      const response = await fetch(url, options);
      console.log(response)
      if(!response.ok) throw new Error('Error: ' + response.statusText);
      const {token} = await response.json();
      window.localStorage.setItem('token', token);
      getUser(token);
    }catch(err){
      setError(err.message);
      setLogin(false);
    }finally{
      setLoading(false);
    }
  }

  React.useEffect(() => {
    async function autoLogin(){
      const token = window.localStorage.getItem('token');
      if(token){
        try {
          setError(null)
          setLoading(true)
          const {url, options} = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if(!response.ok) throw new Error('Token Inválido');
          await getUser(token)
          navigate("/account")
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
  }, [userLogout, navigate]);

  return (
    <UserContext.Provider value={{userLogin, userLogout, data, error, loading, login}}>
        {children}
    </UserContext.Provider>
  )
}



import { useState, useEffect } from 'react'
import loginService from '../services/login'


const Login = ({user, setUser, username, password, setUsername, setPassword}) => {
    const handleInput = setter => {
        return event => {
            event.preventDefault()
            setter(event.target.value)
        }
    }

    const handleSubmit = event => {
        event.preventDefault()
        loginService.login(username, password)
        .then(({token, username, name}) => {
            setUsername('')
            setPassword('')
            window.localStorage.setItem('token', token)
            window.localStorage.setItem('username', username)
            window.localStorage.setItem('name', name)
            setUser({token, username, name})
        })
        .catch(reason => console.log(reason))
    }

    return <>
        <form onSubmit={handleSubmit}>
            <label>
                username:
                <input type='text' name='name' value={username} onChange={handleInput(setUsername)} />
            </label>
            <br/>
            <label>
                password:
                <input type='password' name='password' value={password} onChange={handleInput(setPassword)} />
            </label>
            <br/>
            <input type='submit' value='login' />
        </form>
    </>
}

const Logout = ({user, setUser}) => {
    const handleLogout = event => {
        event.preventDefault()
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('username')
        window.localStorage.removeItem('name')
        setUser(null)
    }

    return <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
}

const LoginForm = ({user, setUser}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return user
        ?   <Logout user={user} setUser={setUser} />
        :   <Login user={user} setUser={setUser} username={username} password={password} setUsername={setUsername} setPassword={setPassword} />
}

export default LoginForm
import axios from 'axios'
import Input from '@/components/Input'
import { useCallback, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

const Auth = () => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const [variant, setVariant] = useState('login')

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login'
    )
  }, [])

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email: email,
        password: password,
        redirect: false,
        callbackUrl: '/',
      })

      router.push('/')
    } catch (err) {
      console.log(err)
    }
  }, [email, password, router])

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', { email, name, password })
      login()
    } catch (err) {
      console.log(err)
    }
  }, [email, name, password, login])

  return (
    <>
      <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
        <div className="bg-black w-full h-full lg:bg-opacity-50">
          <nav className="px-12 py-8">
            <img src="/images/logo.png" alt="logo" className="h-12" />
          </nav>
          <div className="flex justify-center">
            <div className="bg-black/50 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
              <h2 className="text-white text-4xl mb-8 font-semibold">
                {variant === 'login' ? 'Sign In' : 'Register'}
              </h2>
              <div className="flex flex-col gap-4">
                {variant === 'register' && (
                  <Input
                    label="Username"
                    onChange={(e: any) => {
                      setName(e.target.value)
                    }}
                    id="name"
                    type="text"
                    value={name}
                  />
                )}
                <Input
                  label="Email"
                  onChange={(e: any) => {
                    setEmail(e.target.value)
                  }}
                  id="email"
                  type="email"
                  value={email}
                />
                <Input
                  label="Password"
                  onChange={(e: any) => {
                    setPassword(e.target.value)
                  }}
                  id="password"
                  type="password"
                  value={password}
                />
              </div>
              <button
                className="
                bg-red-600
                font-semibold
                py-3
                text-white
                rounded-md
                w-full
                mt-10
                hover:bg-red-700
                transition
              "
                onClick={variant === 'login' ? login : register}
              >
                {variant === 'login' ? 'Login' : 'Sign up'}
              </button>
              <p className="text-neutral-500 mt-12 text-[0.95rem] text-center">
                {variant === 'login'
                  ? 'First time using netflix?'
                  : 'Already have an account?'}
                <span
                  className="
                    text-white                    
                    ml-1
                    hover:underline 
                    cursor-pointer
                  "
                  onClick={toggleVariant}
                >
                  {variant === 'login' ? 'Create an account' : 'Log in here'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth
'use client'

// import { useEffect, useState } from 'react'
import { useEffect, useState } from 'react'
import { WebApp } from '@twa-dev/types'

declare global {
  interface Window {
    Telegram?: {
      WebApp: WebApp
    }
  }
}

export default function Home() {
  // const [user, setUser] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [notification, setNotification] = useState('')
  const [userData, setUserData] = useState<any>(null)


  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp
      tg.ready()

      // const initData = tg.initData || ''
      const initDataUnsafe = tg.initDataUnsafe || {}
      // setUser(initDataUnsafe)
      setUserData(tg.initDataUnsafe.user);
    }
  }, [])
  

  // useEffect(() => {
  //   if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
  //     const tg = window.Telegram.WebApp
  //     tg.ready()

  //     const initData = tg.initData || ''
  //     const initDataUnsafe = tg.initDataUnsafe || {}

  //     if (initDataUnsafe.user) {
  //       fetch('/api/user', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(initDataUnsafe.user),
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           if (data.error) {
  //             setError(data.error)
  //           } else {
  //             setUser(data)
  //           }
  //         })
  //         .catch((err) => {
  //           setError('Failed to fetch user data')
  //         })
  //     } else {
  //       setError('No user data available')
  //     }
  //   } else {
  //     setError('This app should be opened in Telegram')
  //   }
  // }, [])

  const generateUserData = async () => {
    const userData = {
        id: Math.floor(Math.random() * 1000000), // Generate a random ID
        username: 'test_user',
        first_name: 'Test',
        last_name: 'User',
    }
    setUserData(userData)

    try {
        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })

        if (!response.ok) {
            throw new Error('Failed to send user data')
        }

        const result = await response.json()
        console.log('User data sent successfully:', result)
    } catch (error) {
        console.error('Error sending user data:', error)
    }
}

const saveTgUserData = async () => {

  try {
    const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })

    if (!response.ok) {
        throw new Error('Failed to send user data')
    }

    const result = await response.json()
    console.log('User data sent successfully:', result)
} catch (error) {
    console.error('Error sending user data:', error)
}
}



  // const handleIncreasePoints = async () => {
  //   if (!user) return

  //   try {
  //     const res = await fetch('/api/increase-points', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ telegramId: user.telegramId }),
  //     })
  //     const data = await res.json()
  //     if (data.success) {
  //       setUser({ ...user, points: data.points })
  //       setNotification('Points increased successfully!')
  //       setTimeout(() => setNotification(''), 3000)
  //     } else {
  //       setError('Failed to increase points')
  //     }
  //   } catch (err) {
  //     setError('An error occurred while increasing points')
  //   }
  // }

  // if (error) {
  //   return <div className="container mx-auto p-4 text-red-500">{error}</div>
  // }

  // if (!user) return <div className="container mx-auto p-4">Loading...</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to db, {userData?.firstName || 'User'}!</h1>
      <div>
        <p>{JSON.stringify(userData, null, 2)}</p>
      </div>
      {/* {user.points && <p>Your current points: {user.points}</p>} */}
      {/* <button
        onClick={handleIncreasePoints}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Increase Points
      </button> */}
      {notification && (
        <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">
          {notification}
        </div>
      )}
      <div>
      <button 
          onClick={generateUserData}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >Generate and Send userData
      </button>
          {userData && (
              <div>
                  <h2>Generated User Data:</h2>
                  <pre>{JSON.stringify(userData, null, 2)}</pre>
              </div>
          )}
      </div>
      <div>
        <button 
          onClick={saveTgUserData}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
          >Send tg userData
      </button>
      </div>

    </div>
  )
}
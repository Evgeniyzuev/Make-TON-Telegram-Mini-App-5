'use client'

// import { useEffect, useState } from 'react'
import { useEffect, useState } from 'react'



export default function Home() {
    const [initDataUnsafe, setInitDataUnsafe] = useState<any>(null)
    const [userData, setUserData] = useState<any>(null)

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

    return (
        <div>
            <h1>Welcome to db</h1>
            <button 
            onClick={generateUserData}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >Generate and Send userData</button>
            {userData && (
                <div>
                    <h2>Generated User Data:</h2>
                    <pre>{JSON.stringify(userData, null, 2)}</pre>
                </div>
            )}
        </div>
    )
}
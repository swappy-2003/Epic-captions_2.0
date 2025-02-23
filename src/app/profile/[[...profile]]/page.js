import React from 'react'
import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import ClientUserProfile from '../ClientUserProfile';

const profile = async () => {
    const { userId } = await auth();
    const isAuth = !!userId;
    const user = await currentUser();
    if (!isAuth) {
        redirect('/');
    }
  return (
    <div className='flex flex-col items-center justify-center'> 
        <h1>{user.username}</h1>
        <ClientUserProfile/>
    </div>
  )
}

export default profile
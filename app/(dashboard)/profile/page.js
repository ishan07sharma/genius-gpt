import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const ProfilePage = () => {
  return (
    <UserProfile routing='hash'/>
  )
}

export default ProfilePage
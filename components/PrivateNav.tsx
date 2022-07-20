import React, { useState, useEffect } from 'react'
import { User, GlobeStand, SignOut } from 'phosphor-react'
import { logout, reset } from '../features/auth/authSlice'
import { getUser, resetUser } from '../features/private/privateSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

interface modalProps {
    setIsPasswordModal: any
    isPasswordModal: boolean
}

const PrivateNav = ({setIsPasswordModal, isPasswordModal}: modalProps) => {
    const [showDrop, setShowDrop] = useState(false)
    const { user: userData, isLoading, isSuccess, isError, message } = useSelector((state: any) => state.private)
    const { user } = useSelector((state: any) => state.auth)

    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        if (isError) {
          alert(message)
        }
    
        dispatch(getUser())
    
        return () => {
          dispatch(resetUser())
        };
    
      }, [user, router, isError, message, dispatch])
    


    const handleToggleIs2FA = () => {
        setIsPasswordModal(val => !isPasswordModal)
      }

      const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        router.push('/signin')
      }

    return (
        <div className='dash-area'>
            <div className="circle-wrapper">
                <div className="success circle"></div>
                <div className="icon">
                    <GlobeStand size={32} color="#fff" weight='fill' />
                </div>
            </div>
            <div>
                <span className='cursor-pointer'><User size={30} onClick={() => setShowDrop(!showDrop)} color="#302b63" weight="duotone" /></span>
                {showDrop &&
                    <div className='panel-dropdown'>
                        <div className='verify-2fa-group'>
                            <h3>Toggle 2FA Mode</h3>
                            <div className='switch-toggle'>
                                <h6>Off</h6>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        onChange={handleToggleIs2FA}
                                        checked={userData.two_fa_status === "on" && true}
                                    />
                                    <span className="slider round"></span>
                                </label>
                                <h6>On</h6>
                            </div>
                        </div>
                        <div onClick={onLogout} className='logout'> <SignOut size={20} color="#fff" weight="bold" /> Logout </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default PrivateNav
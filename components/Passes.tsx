import React from 'react'
import Button from './Button'

const Passes = () => {
    return (
        <div className='passes-container gen-wrapper'>
            <div className='passes-wrapper '>
                <h1>View Passes We&apos;ve Made<br className='br-passess' /> Available For You</h1>
                <div>
                    <Button text='View Passes' icon={'/images/fly_plane.png'} background='primary-blue' color="white" onClick={() => alert('view passes route')} />
                </div>
            </div>


        </div>
    )
}

export default Passes
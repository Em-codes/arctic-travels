import React, { useEffect } from 'react'
import Image from 'next/image';
import NavLinks from './NavLinks';


const Navbar = () => {
    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });

    const isSticky = () => {
        const header:any = document.querySelector('.header-section');
        const scrollTop = window.scrollY;
        scrollTop >= 50 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
    };
    return (
        <header className='header-section flex items-center justify-between gen-wrapper'>
            <div className="logo-wrapper flex items-center space-x-3">
                <Image src="/images/artic-logo.png" height={'40px'} width={'40px'} />
                <span className='font-bold text-white'>Arctic Travels</span>
            </div>
            <NavLinks />
        </header>
    )
}

export default Navbar;
import React from 'react';
import Menu from './components/Menu';
import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <div className='relative'>

            {/* Dynamic pages */}
            <div>
                <Outlet></Outlet>
            </div>

            {/* This is menu */}
            <div className='fixed bottom-0 w-full'>
                <Menu></Menu>
            </div>
        </div>
    );
};

export default Root;
import * as React from 'react';


export default class Logo extends React.Component {

    render() {
        return (
            <div className='flex-parent-centered transparent-for-clicks'>
                <div className='logo'>
                    <div className='logo-title'>Raycast demo</div>
                    <div className='logo-subtitle'>[ touch the screen ]</div>
                </div>
            </div>
        );
    }
}
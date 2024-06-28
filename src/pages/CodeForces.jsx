import React from 'react'

import '../App.css'
import NavbarComponent from '../components/NavbarComponent'
import OnlineCompiler from '../components/OnlineCompiler'
import ProblemStatementFetcher from '../components/Problems'
import Comments from '../components/Comments'

export default function CodeForces() {
    return (
        <>
            <div className='bg-[#1C1C1C]'>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <div class="order-1 lg:order-1">
                        <ProblemStatementFetcher />
                    </div>
                    <div class="order-2 lg:order-2">
                        <OnlineCompiler />
                    </div>
                </div>
                <Comments />
            </div>

        </>

    )

}



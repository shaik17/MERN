import React from 'react'

function Footer() {
    return (
        <div>
            <footer className="text-center text-white mt-5 p-2 bg-dark">
             Copyrights &copy; {new Date().getFullYear()} Shaik Rahuman
            </footer>
        </div>
    )
}

export default (Footer);

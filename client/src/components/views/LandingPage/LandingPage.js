import React, {useEffect} from 'react'
import axios from 'axios';

function LandingPage() {
    useEffect(() => {
        axios.get('api/hello')
        .then(response => console.log(response.data))
    }, [])
    const onClickHandler = () => {
        axios.get(`/api/users/logout`)
            .then(response => {
                if(response.data.success) {
                    window.location.href = 'login'
                } else {
                    alert('Failed logout!')
                }
            })
    }

  return (
    <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        width: '100%', height: '100vh'
    }}>
        <h2>Sussy start page</h2>
        <button onClick={onClickHandler}>
            Logout
        </button>
    </div>
  )
}

export default LandingPage
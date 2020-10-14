import React, { useRef } from "react"
import { useHistory } from "react-router-dom"
import { Button } from "semantic-ui-react"
import video from "../../video/ibs-video.mp4"
import "./Login.css"

export const Register = (props) => {
    const firstName = useRef()
    const lastName = useRef()
    const username = useRef()
    const email = useRef()
    let emailExist = false
    const conflictDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => user.length ? emailExist = true : emailExist = false)
            .then(existingNameCheck)
    }

    const existingNameCheck = () => {
        return fetch(`http://localhost:8088/users`)
            .then(res => res.json())
            .then(users => users.find(user => user.username.toUpperCase() === username.current.value.toUpperCase()))
    }

    const handleRegister = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then((userExists) => {
                if (!userExists && !emailExist) {
                    fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: email.current.value,
                            name: `${firstName.current.value} ${lastName.current.value}`,
                            username: username.current.value
                        })
                    })
                        .then(_ => _.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("nutty_user", createdUser.id)
                                history.push("/")
                            }
                        })
                }
                else {
                    conflictDialog.current.showModal()
                }
            })

    }

    return (
        <>
            <div className="mainContainer">
                <main className="container--login" style={{ textAlign: "center" }}>

                    <dialog className="dialog dialog--password" ref={conflictDialog}>
                        <div>Account with that email address or username already exists</div>
                        <button className="button--close" onClick={e => conflictDialog.current.close()}>Close</button>
                    </dialog>

                    <form className="form--login" onSubmit={handleRegister}>
                        <h1 className="h3 mb-3 font-weight-normal">Please Register for IBS</h1>
                        <fieldset>
                            <label htmlFor="firstName"> First Name </label>
                            <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="lastName"> Last Name </label>
                            <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="username"> Username </label>
                            <input ref={username} type="text" name="username" className="form-control" placeholder="Username" required />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="inputEmail"> Email address </label>
                            <input ref={email} type="email" name="email" className="form-control" placeholder="Email address" required />
                        </fieldset>
                        <fieldset>
                            <Button primary type="submit"> Sign in </Button>
                        </fieldset>
                    </form>
                </main>

                <video className="videoTag" autoPlay loop muted>
                    <source src={video} type="video/mp4" />
                </video>
            </div>
        </>
    )
}
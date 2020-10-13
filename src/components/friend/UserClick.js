import React from "react"

const friendCheck = name => {
    //Checks if the user exists
        const foundFriend = users.find(user => user.username.toUpperCase() === name.toUpperCase())
        
        //Checks if the friendship already exists and is not the user
        if (foundFriend && foundFriend.id !== parseInt(localStorage.getItem("nutty_customer"))) {
            const friendshipExist = friends.find(friend => {
                if (friend.activeUserId === parseInt(localStorage.getItem("nutty_customer")) 
                    && friend.userId === foundFriend.id) {
                        return true
                } else {
                    return false
                }
            })

            if (friendshipExist) {
                alert("You are already friends!")
            } else {
                //When everything checks out, creates new friendship
                addFriend({
                    activeUserId: parseInt(localStorage.getItem("nutty_customer")),
                    userId: foundFriend.id
                })
                addFriend({
                    activeUserId: foundFriend.id,
                    userId: parseInt(localStorage.getItem("nutty_customer"))
                })
                return foundFriend
            }
        } else if (foundFriend?.id === parseInt(localStorage.getItem("nutty_customer"))) {
            alert("Can't add yourself as a friend")
        } else {
            alert("User does not exist!")
        }
    }
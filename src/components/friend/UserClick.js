import React, { useState } from "react"

useState
state = {
    show: false
  };

  showModal = e => {
    this.setState({
      show: true
    });
  };


  <button  onClick={e => {
    this.showModal();
}}
> show Modal </button>
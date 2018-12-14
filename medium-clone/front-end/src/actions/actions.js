const url = 'http://localhost:7000' ;

export const signUpAction = (data) => {
  return(dispatch) => {
    fetch(`${url}/signup`, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(data)
    })
    .then(data => {
      if(data.status === 200) {
      console.log(data, 'in signup action')
      dispatch({type: 'SIGNUP_SUCCESS', data})
      } else {
        dispatch({type: 'SIGNUP_ERR'})
      }
    })
  }
}

export const loginAction = (data) => {
  console.log(data , "in action")
  return(dispatch) => {
    fetch(`${url}/login`, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(data)
    })
    .then(data => {
      if(data.status === 200) {
      console.log(data, 'in login action')
      dispatch({type: 'LOGIN_SUCCESS', data})
      } else {
        dispatch({type: 'LOGIN_ERR'})
      }
    })
  }
}
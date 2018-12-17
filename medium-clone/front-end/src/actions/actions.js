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
  return(dispatch) => {
    fetch(`${url}/api/login`, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(data)
    }).then(res => res.json())
    .then( data => {
      if(data) {
        dispatch({type: 'LOGIN_SUCCESS', data})
      } else {
        dispatch({type: 'LOGIN_ERR'})
      }
    })
  }
}

export const createPostAction = (data) => {
  return(dispatch) => {
    fetch(`${url}/create`, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(data)
    })
    .then(data => {
      console.log(data)
    })
  }
}

export const getLoggedinUserData = (data) => {
  console.log(data, 'action')
  return(dispatch) => {
    dispatch({type: 'ISLOGGEDINDATA', data})
  }
}
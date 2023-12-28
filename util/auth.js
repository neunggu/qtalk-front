export function signIn({ email, password }) {
    const form = new FormData();
    form.append('username', email);
    form.append('password', password);
    form.append('grant_type','password');
    form.append('client_id','quack');
    fetch(`${process.env.SSO_URL}/oauth/token`,{
      method:"POST",
      headers: {"Authorization":"Basic cX5V5e2n34zpka3NzdWRna3RwZHkh"},
      body:form
    }).then( response => {
      if (response.ok) {
        return response.json();
      }
    }).then(data =>{
      const accessToken = data.access_token;
      window.location.replace(`/talks/openTalks?accessToken=${accessToken}`);
    })
    .catch( error => { console.log('failed', error) })
}

export function getUserInfo () {
  const urlParams = new URLSearchParams(window.location.search);
  const accessToken = urlParams.get('accessToken');
  const headers = {
    Authorization:accessToken
  }
  return fetch(`${process.env.CHAT_API_URL}/friend/updateMyInfo`, {method: 'POST', headers})
    .then(response => response.json())
    .then(data => {
      localStorage.setItem("accessToken",accessToken);
      localStorage.setItem('userId', data.id);
      localStorage.setItem('name', data.name);
      localStorage.setItem('image', data.image);
      return {
        accessToken,
        userId:data.id,
        name:data.name,
        image:data.image
      }
    }).catch(()=>{
      // localStorage.clear();
      // window.location.replace(`/`);
    });
  // return fetch(`${process.env.SSO_URL}/users`, {headers})
  //   .then(response => response.json())
  //   .then(data => {
  //     localStorage.setItem("accessToken",accessToken);
  //     localStorage.setItem('userId', data.id);
  //     localStorage.setItem('name', data.name);
  //     localStorage.setItem('image', data.imgKey);
  //     return {
  //       accessToken,
  //       userId:data.id,
  //       name:data.name,
  //       image:data.imgKey
  //     }
  //   }).catch(()=>{
  //     localStorage.clear();
  //     window.location.replace(`/`);
  //   });

}
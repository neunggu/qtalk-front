import { useState, useEffect } from "react";
import Login from "/components/login/Login";

export default function Home() {
  useEffect(()=>{ 
    const accessToken = localStorage.getItem('accessToken');
    if(accessToken) {
      window.location.replace(`/talks/openTalks?accessToken=${accessToken}`);
    }
  },[])
  
  return (
      <Login /> 
  )
}

export const setUserNameSession = (uname) => {
    sessionStorage.setItem("uname", uname);
  };
  
  export const getUname = () => {
    const uname = sessionStorage.getItem("uname");
    if (uname) return uname;
    else return null;
  };
  
  export const removeUserSession = () => {
    sessionStorage.removeItem("uname");
    sessionStorage.clear();
    localStorage.clear();
  };
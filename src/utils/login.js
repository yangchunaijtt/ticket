// const  cookie = this.$cookies;
console.log("login",this.cookies);
const userid=this.$cookies.get("USERIDGDLY");
const WHERE=this.$cookies.get("WHERE");
const gdmobileusername=this.$cookies.get("gdmobileusername");
const gdmobileuserphone=this.$cookies.get("gdmobileuserphone");
const usersecret=this.$cookies.get("usersecret");



export const isLogin= ()=>{
  if(userid==null||userid==""){
    console.log("userid")
    return false;
  }
  if(gdmobileusername==null||gdmobileusername==""){
    console.log("gdmobileusername")

    return false;
  }
  if(gdmobileuserphone==null||gdmobileuserphone==""){
    return false;
  }
  if(usersecret==null||usersecret==""){
    return false;
  }
  return true;  
}
export const getToken=()=>{
  return `?token=${this.$cookies.get("USERIDGDLY")}|${this.$cookies.get(
    "usersecret"
  )}|${this.$cookies.get("gdmobileuserphone")}|${this.$cookies.get("WHERE")}`
}



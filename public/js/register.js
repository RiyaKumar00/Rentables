function validate(){
  let data = document.forms["registrationForm"];
  var name = data["name"].value;
  var email = data["emailID"].value;
  var phone = data["phone"].value;
  var password = data["password"].value;
  var confPassword = data["confPassword"].value;
  console.log(name);
  var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

  if(!passwordRegex.test(password)){
    alert("Password should be atleast 8 characters long and should contain atleast one small letter, one capital letter, and one numeric value.");
    return false;
  }
  if(password.value!=confPassword.value){
    alert("Passwords do not match");
    return false;
  }
  return true;
}

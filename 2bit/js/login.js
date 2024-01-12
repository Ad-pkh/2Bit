function validateForm() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var errorElement = document.getElementById('error');

    if (username === '' || password === '') {
      errorElement.textContent = 'Both username and password are required.';
      return false;
    }
    if(password.length<8 )
    errorElement.textContent = 'Enter Valid Password';
    return false;
  }
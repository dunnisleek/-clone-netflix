<template>
       <body>
       <div>
              <!-- start of logo -->
              <div class="logo">
                    <NuxtLink to="/"> <img src="../images/Netflix_Logo_PMS.png" alt="netflix logo"></NuxtLink>
              </div>

              <!-- login form -->
              <div class="form-background">
                     <h2>Sign In</h2>
                     <form action="" @submit.prevent="">
                            <input type="email" placeholder="Email or Phone Number">
                            <input type="password" placeholder="Password">
                            <button class="submit">Sign In</button>
                            <h3>OR</h3>
                            <button class="sign-in">Use a sign-in code</button>
                            <h3>forget password?</h3>
              <div class="remember-container">
               <input type="checkbox" id="remember me" name="remember me" value="remember me" />
               <label for="remember me">remember me</label>
              </div>

              <p>New to Netflix? <NuxtLink to='/'>Sign up now.</NuxtLink></p>
              <p class="policy">This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn more.</p>
                     </form>
              </div>
              <footer>
                     <div>
                            <h4>Questions? Contact us.</h4>
                            <p>FAQ</p>
                            <p>Cookie Preferences</p>
                     </div>
                     <div>
                            <p>Help Center</p>
                            <p>Corporate Information</p>
                     </div>
                     <div>
                            <p>Terms of Use</p>
                     </div>
                     <div>
                            <p>Privacy</p>
                     </div>
              </footer>
       </div>
       
       </body>

</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Login page',
  ogTitle: 'login page',
  description: 'This is my amazing login, let me tell you all about it.',
})
</script>

<style scoped>
body{
       background-image:url(../images/netflix-bg.jpeg), linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5));
       background-blend-mode: overlay; ;
       background-size:auto;
       
       width:100%;
       height:100vh;
       margin:0px;
       color:#fff;
}
div{
       /* width:100%;
       max-width:calc(1440 - 170px); */
}
.logo{
       display:flex;
      justify-content: flex-start;
      padding:1rem 4rem;
}
.logo img{
       width:200px;
       
}

/* login form style */
.form-background{
       background:#07050498;
       width:380px;
       height:80vh;
       border-radius: 5px;
       padding:40px;
       margin: 0 auto;
}
.form-background h2{
       color:#fff;
       font-family: "Nunito Sans", sans-serif;
       font-size:32px;
       line-height: 36px;
}
form{
       display:flex;
       flex-direction: column;
       gap:10px;
}
form input{
       background:#292929a6;
       border:1px solid #828181;
       border-radius: 4px;
       padding:20px;
}
.submit{
       background:red;
       padding:15px;
       border:none;
       border-radius: 4px;
       color:#fff;
       text-transform: capitalize;
       font-size:16px;
       
}
.sign-in{
       background:#343434;
       padding:15px;
       color:#fff;
       border:none;
       border-radius: 4px;
       font-size:16px;
       text-transform: capitalize;
}
.form-background h3{
       text-align: center;
       color:#e1dfdf;
       font-family: "Nunito Sans", sans-serif;
       font-weight: 300;
}
a{
       color:#fff;
}
.policy{
       font-size:12px;
}

footer{
       background:#07050498;
       width:100%;
       height:30vh;
       padding-top:4rem;
       margin-top:60px;
       display:flex;
       justify-content: space-evenly;
       /* align-content: center; */
       color:#b3afaf;
      
}
footer p{
       text-decoration: underline;
}
</style>
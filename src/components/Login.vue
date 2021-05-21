<template>
<div class="container">
        <div class="frm">
            <form @submit.prevent="login">
                <input required v-model="email" type="text" placeholder="Enter your E-mail...">
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
</template>
<script>
/* eslint-disable no-mixed-spaces-and-tabs */
export default {
  data() {
    return {
      email: '',
    };
  },
  methods: {
    login: function() {
      let email = this.email;
      this.$store
        .dispatch('login', { email })
        .then(
          () => this.$router.replace({ path: '/home' })
          //    Sincere@april.biz
        )
        .catch((err) => console.log(err));
    },
  },
};
</script>
<style>


body{
   background: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWi58nijjksG8vJ8r-tVcDDQizpol1rAMpIQ&usqp=CAU");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.container{
    display: flex;
    justify-content: center;
}

.frm{
    margin-top: 10%;
}

form{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

form input{
    width: 80%;
    height: 35px;
    margin: 5px;
    padding: 10px;
    background: none;
    border: 0;outline: 0;
    border-bottom: 1px solid #fff;
    color: #fff;
    transition: border .3s;
}

form input::placeholder{
    color: #fff;
}

form input:focus{
    border-bottom: 1px solid #8c00ff;
}

form button{
    width: 55%;
    height: 40px;
    margin-top: 20px;
    background: #8c00ff;
    border: 0;outline: 0;
    color: #fff;
   
    box-shadow: 0 0 10px #8c00ff;
    cursor: pointer;
    transition: .3s;
}

form button:hover{
    transform: scale(1.1);
    box-shadow: 2px 2px 10px #8c00ff;
}
	
</style>
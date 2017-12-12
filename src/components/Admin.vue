<template>
  <div class="container">
    <h1>{{ message }}</h1>
    <form id="login" @submit.prevent="validateBeforeSubmit" method="POST" action="/api/auth/local">
      <div class="form-group">
        <b-form-input name="username" v-model="username" v-validate="'required|alpha_num'" :class="{'input': true, 'is-danger': errors.has('username') }" type="text" placeholder="Admin Username"></b-form-input>
        <p class="text-danger" align="center" v-show="errors.has('username')">{{ errors.first('username') }}</p>
      </div>
      <div class="form-group">
        <b-form-input name="password" v-model="password" v-validate="'required|alpha_num'" data-vv-as="password" :class="{'input': true, 'is-danger': errors.has('password') }" type="password" placeholder="Password"></b-form-input>
        <p class="text-danger" align="center" v-show="errors.has('password')">{{ errors.first('password') }}</p>
      </div>
      <div class="form-group">
        <p class="control">
            <button class="button is-primary" type="submit">Submit</button>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Kiosk Admin',
  data() {
    return {
      username: '',
      password: '',
      message: 'Welcome Admin!',
    };
  },
  methods: {
    validateBeforeSubmit(event) {
      event.preventDefault();
      this.$validator.validateAll().then((result) => {
        if (result) {
          // console.log('attempting to login ...');
          document.querySelector('#login').submit();
          // console.log('logged in!');
          // return
          /* register admin code use later */
          // const Admin = {
          //   username: this.username,
          //   password: this.password,
          // };
          // this.$store.dispatch('registerAdmin', Admin).then((res) => {
          //   if (res.status === 200) {
          //     this.$toast('Admin Registration Complete!', {
          //       duration: 2000,
          //       horizontalPosition: 'center',
          //       verticalPosition: 'bottom',
          //     });
          //     event.target.reset();
          //   }
          // });
        }
      });
    },
  },
  mounted() {
    // this.$store.dispatch('getUser');
    // this.$store.dispatch('getList');
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.is-danger {
  border-color: red;
}
</style>

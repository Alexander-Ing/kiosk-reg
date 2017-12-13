<template>
  <div class="container">
    <h1>Welcome to Toro-Kiosk</h1>
    <form id="register" @submit.prevent="validateBeforeSubmit" method="POST" action="/api/users/register">
      <div class="form-group">
        <b-form-input name="name" v-model="name" v-validate="'required|alpha_spaces'" :class="{'input': true, 'is-danger': errors.has('name') }" type="text" placeholder="Full Name"></b-form-input>
        <p class="text-danger" align="left" v-show="errors.has('name')">{{ errors.first('name') }}</p>
      </div>
      <div class="form-group">
        <b-form-input name="email" v-model="email" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" type="text" placeholder="Email"></b-form-input>
        <p class="text-danger" align="left" v-show="errors.has('email')">{{ errors.first('email') }}</p>
      </div>
      <div class="form-group">
        <b-form-input name="phone" v-model="phone" v-validate="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('phone') }" type="text" placeholder="Phone"></b-form-input>
        <p class="text-danger" align="left" v-show="errors.has('phone')">{{ errors.first('phone') }}</p>
      </div>
      <div class="form-group">
        <b-form-input name="company" v-model="company" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('company') }" type="text" placeholder="Company"></b-form-input>
        <p class="text-danger" align="left" v-show="errors.has('company')">{{ errors.first('company') }}</p>
      </div>  
      <div class="form-group">
        <input type="checkbox" name="officialVisit" v-model="officialVisit"> Offical Visit<br>
      </div>
      <div class="form-group">
        <div id="selector">
          <div class="checkbox">
              <label><input type="checkbox" v-model="escChecker">Escort Needed</label>
          </div>
          <div class="container" id="app-container" v-if="escChecker">
              <b-form-input name="escortName" v-model="escortName" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('escortName') }" type="text" placeholder="Escort Name"></b-form-input>
              <p class="text-danger" align="left" v-show="errors.has('escortName')">{{ errors.first('escortName') }}</p>
          </div>       
        </div>
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
import Vue from 'vue';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);

export default {
  name: 'Kiosk',
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      company: '',
      officialVisit: false,
      escortNeeded: false,
      escortName: '',
      escChecker: false,
      submitCheck: false,
    };
  },
  methods: {
    validateBeforeSubmit(event) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const kioskUser = {
            name: this.name,
            email: this.email,
            phone: this.phone,
            company: this.company,
            officialVisit: this.officialVisit,
            escortNeeded: this.escChecker,
            escortName: this.escortName,
          };
          this.$store.dispatch('register', kioskUser).then((res) => {
            if (res.status === 200) {
              alert('Registration Completed!')
              location.reload();
            } else {
              this.$toast('Email already used!', {
                duration: 2000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              });
            }
          });
        } else {
          // console.log('test not valid');
        }
      });
    },
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

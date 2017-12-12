<template>
  <div v-if="!this.$store.state.admin.username">
      <p class="text" align="center"> Please Login First!</p>
      <form id="logout" @submit="loginRedirect">
        <div class="form-group">
            <p class="control">
                <button class="button is-primary" type="submit">Login Page</button>
            </p>
        </div>
        </form>
  </div>
  <div v-else>  
    <div class="container">
        <h1>{{ message }} {{this.$store.state.admin.username}}</h1>
        <!-- <form id="logout" @submit.prevent="validateBeforeSubmit" method="POST" action="/api/admin/logout">
        <div class="form-group">
            <p class="control">
                <button class="button is-primary" type="submit">Logout</button>
            </p>
        </div>
        </form> -->
        
        <div class="table" v-if="updateUserList">
            <vue-good-table
            title="Users Table"
            :columns="columns"
            :rows="rows"
            :perPage=10
            :paginate="true"
            :lineNumbers="true"/>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Admin Home',
  data() {
    return {
      username: '',
      password: '',
      message: 'Welcome ',

      columns: [
        {
          label: 'Name',
          field: 'name',
          filterable: true,
        },
        {
          label: 'Email',
          field: 'email',
          filterable: true,
        },
        {
          label: 'Phone',
          field: 'phone',
          type: 'number',
          filterable: true,
        },
        {
          label: 'Company',
          field: 'company',
          filterable: true,
        },
        {
          label: 'Official Visit',
          field: 'officialVisit',
        },
        {
          label: 'Escort Needed',
          field: 'escortNeeded',
        },
        {
          label: 'Escort Name',
          field: 'escortName',
          filterable: true,
        },
      ],
      rows: [],
    };
  },
  computed : {
    updateUserList: function() {
      console.log('update called getter: ', this.$store.getters.listOfUsers[0]);
      if (this.listRetrieved) {
        console.log('getter length: ', this.$store.getters.listOfUsers.length);
        for (var k = 0; k < this.$store.getters.listOfUsers.length; k++) {
          this.rows.push(this.$store.getters.listOfUsers[k]);
        }
        return true;
      }
      return false;
    },
  },
  methods: {
    loginRedirect(event) {
      this.$store.dispatch('logout');
      this.$router.push('/admin');
    },
    validateBeforeSubmit(event) {
      this.username = '';
      this.password = '';
      this.$store.dispatch('logout');
      this.$router.push('/admin');
    },
    getList() {
      if (!this.listRetrieved) {
        this.$store.dispatch('getList').then((res) => {
          console.log('list here', this.$store.state);
        }, (err) => {
          console.log('Error', err);
        });
        console.log('Posts list');
        this.listRetrieved = true;
      }
    },
  },
  mounted() {
    this.$store.dispatch('getUser');
  },
  updated() {
    this.getList();
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
table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
}
th, td {
    padding: 15px;
}
</style>

<template>
  <div>
    <ul class="nav">
      <li><a href="#">Home</a></li>
      <li><a @click="posts">Add post</a></li>

      <li><a @click="logout">Logout</a></li>
    </ul>
    <div class="row">
      <div
        class="column"
        v-for="gettersuser in gettersusers"
        :key="gettersuser.id"
      >
        <div class="card">
          <h3>{{ gettersuser.title }}</h3>
          <p>{{ gettersuser.body }}</p>
          <button
                  v-on:click="showblog(gettersuser.title)"
                  class="button"
                >
                  Read more
                </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$store.dispatch('getPosts');
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    gettersusers() {
      return this.$store.getters.allPost;
    },
  },
  methods: {
      showblog(proId) {
      this.$router.push({
        name: "Showblog",
        params: { data: this.gettersusers, Pid: proId },
      });
    },
    logout: function() {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/');
      });
    },
    posts() {
      this.$router.push('/post');
    },
  },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
}

/* Float four columns side by side */
.column {
  float: left;
  width: 25%;
  margin-top: 20px;
  padding: 0 10px;
}

/* Remove extra left and right margins, due to padding */
.row {
  margin: 0 -5px;
}

/* Clear floats after the columns */
.row:after {
  content: '';
  display: table;
  clear: both;
}

/* Responsive columns */
@media screen and (max-width: 600px) {
  .column {
    width: 100%;
    display: block;
    margin-bottom: 20px;
  }
}

/* Style the counter cards */
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 16px;
  text-align: center;
  background-color: #f1f1f1;
}
ul.nav {
  margin: 0;
  padding: 0;
  list-style: none;
  height: 36px;
  line-height: 36px;
  background: #0d7963; /* you can change the backgorund color here. */
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
}
ul.nav li {
  border-right: 1px solid #189b80; /* you can change the border color matching to your background color */
  float: left;
}
ul.nav a {
  display: block;
  padding: 0 28px;
  color: #ccece6;
  text-decoration: none;
}
ul.nav a:hover,
ul.nav li.current a {
  background: #086754;
}
</style>

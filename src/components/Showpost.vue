<template>
  <div>
    <div class="row">
      <div
        class="column"
        v-for="gettersuser in gettersusers"
        :key="gettersuser.id"
      >
        <div v-if="proId == gettersuser.title">
          <div class="card">
            <h3>{{ gettersuser.title }}</h3>
            <p>{{ gettersuser.body }}</p>
           
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <h1>Comments</h1>
      <hr />

      <div class="coments form-group">
        <p>
          <input
            v-model="name"
            class="form-control"
            placeholder="name"
            type="text"
            name="author"
          />
        </p>
        <p>
          <textarea
            v-model="message"
            class="form-control"
            placeholder="comment"
            name="message"
          ></textarea>
        </p>
        <p v-if="typing">typing...</p>
        <button
          v-on:click="addComment"
          type="submit"
          class="btn btn-primary mb-5"
        >
          comment
        </button>
      </div>
    </div>
     <div class="row">
      <div
        class="column"
        v-for="gettersuser in commentcheck"
        :key="gettersuser.title"
      >
        <div class="card">
            <ul>
                <li>Name: {{ gettersuser.title }}</li>
                <li>Message:  {{ gettersuser.body }}</li>
            </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      proId: this.$route.params.Pid,
      name: '',
      message: '',
       typing: false,
       commentcheck: [],
    };
  },
  methods: {
    addComment(evt) {
      evt.preventDefault();
      let title = this.name;
      let body = this.message;
      this.commentcheck.push({title,body})
      this.$store
        .dispatch('sendComment', { title, body })
        .then(
          () => console.log('send successfully')
          //    Sincere@april.biz
        )
        .catch((err) => console.log(err));

      this.name = '';
      this.message = '';
    },
  },
  watch:{
      message() {
      if (this.message) {
        this.typing = true;

        setTimeout(() => {
          this.typing = false;
        }, 1000);
      }
    },
  },
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
};
</script>
<template>
  <div class="container">
    <div class="frm">
      <form @submit.prevent="sendPosts">
        <input required v-model="title" type="text" placeholder="Title..." />
        <input required v-model="body" type="text" placeholder="Body..." />
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: '',
      body: '',
    };
  },
  methods: {
    sendPosts: function() {
      let title = this.title;
      let body = this.body;

      this.$store
        .dispatch('sendPosts', { title, body })
        .then(
          () => console.log('send successfully')
          //    Sincere@april.biz
        )
        .catch((err) => console.log(err));
    },
  },
};
</script>

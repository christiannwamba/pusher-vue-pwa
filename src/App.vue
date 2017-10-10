<template>
  <section class="hero is-danger is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="level">
          <div class="level-item has-text-centered">
            <div>
              <status :progress="progress"></status>
              <h1 class="title">{{statusText}}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import pusher from 'pusher-js';

import Status from '@/components/Status';

export default {
  data() {
    return {
      statusText: 'In the Oven',
      progress: 0
    }
  },
  created() {
    var pusher = new Pusher('894ef51996eb4c5b867a', {
      cluster: 'eu',
      encrypted: true
    });

    var channel = pusher.subscribe('food');
    channel.bind('status', (data) => {
      console.log(data)
      this.statusText = data.message;
      this.progress = data.progress;
      // this.$emit('status', data);
    });
    
  },
  components: {
    'status': Status
  }
}
</script>

<style>
.title {
  margin-top: 40px;
}
</style>



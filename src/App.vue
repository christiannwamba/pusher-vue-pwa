<template>
  <section class="hero is-danger is-fullheight">
    <div class="notification is-warning" v-show="!connectivityStatus">
      <button class="delete"></button>
      {{connectivityText}}
    </div>
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
      progress: 0,
      connectivityText: '',
      connectivityStatus: true,
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

    window.addEventListener('offline', () => {
      this.connectivityStatus = false;
      this.connectivityText = 'Your seem to be offline. Connect to see latest order status';
    })

    window.addEventListener('online', () => {
      console.log('asd')
      this.connectivityStatus = true;
    })
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



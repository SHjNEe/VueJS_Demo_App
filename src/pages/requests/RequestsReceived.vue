<template>
  <section>
    <base-card>
      <header>
        <h2>Request Received</h2>
      </header>
      <ul v-if="hasRequest">
        <request-item
          v-for="request in recievedRequest"
          :key="request.id"
          :email="request.userEmail"
          :message="request.message"
        ></request-item>
        <h3 v-if="!hasRequest">>You haven't received any requests yet.</h3>
      </ul>
    </base-card>
  </section>
</template>

<script>
import RequestItem from "../../components/requests/RequestItem.vue";
export default {
  components: {
    RequestItem,
  },
  computed: {
    recievedRequest() {
      return this.$store.getters["requests/requests"];
    },
    hasRequest() {
      return this.$store.getters["requests/hasRequest"];
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>

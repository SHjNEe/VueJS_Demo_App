<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hours</h4>
    <div>
      <base-badge
        v-for="area in areas"
        :key="area"
        :title="area"
        :type="area"
      ></base-badge>
    </div>
    <div class="actions">
      <base-button mode="outline" :link="true" :to="contactURL"
        >Contact</base-button
      >
      <base-button :link="true" :to="contactDetailURL"
        >View Details</base-button
      >
    </div>
  </li>
</template>

<script>
import BaseBadge from "../ui/BaseBadge.vue";
export default {
  props: ["id", "firstName", "lastName", "hourlyRate", "areas"],
  computed: {
    fullName() {
      return this.firstName + " " + this.lastName;
    },
    rate() {
      return this.hourlyRate;
    },
    contactDetailURL() {
      return `/coaches/${this.id}`;
    },
    contactURL() {
      return `/coaches/${this.id}/contact`;
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>

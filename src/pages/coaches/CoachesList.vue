<template>
  <div>
    <section>
      <coach-filter @change-filter="setFilter"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline">Refresh</base-button>
          <base-button v-if="!isCoach" :link="true" to="/register"
            >Register as Coach</base-button
          >
        </div>
        <ul v-if="hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            v-bind="coach"
          >
          </coach-item>
        </ul>
        <h3 v-else>No coaches found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from "../../components/coaches/CoachItem.vue";
import CoachFilter from "../../components/coaches/CoachFilter.vue";
export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  data() {
    return {
      activeFilters: {
        frontEnd: true,
        backEnd: true,
        career: true,
      },
    };
  },
  computed: {
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    },
    filteredCoaches() {
      const coaches = this.$store.getters["coaches/coaches"];
      return coaches.filter((coach) => {
        if (this.activeFilters.frontEnd && coach.areas.includes("frontend")) {
          return true;
        }
        if (this.activeFilters.backEnd && coach.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes("career")) {
          return true;
        }
      });
    },
    hasCoaches() {
      return this.$store.getters["coaches/hasCoaches"];
    },
  },
  methods: {
    setFilter(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>

<template>
  <section>
    <base-card>
      <h2>Register as a coach!</h2>
      <coach-registration @save-data="saveData"></coach-registration>
    </base-card>
  </section>
</template>
<script>
import CoachRegistration from "../../components/coaches/CoachForm.vue";
export default {
  components: {
    CoachRegistration,
  },
  computed: {
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    },
  },
  methods: {
    saveData(coachData) {
      this.$store.dispatch("coaches/registerCoach", coachData);
      this.$router.replace("/coaches");
    },
  },
};
</script>

<template>
  <section class="dashboard h_100vh">
    <div class="content h_100vh">
      <div class="row h_100vh" v-if="listOfTests">
        
        <div class="col-xl-8 padding-col col-xl-reversed">
          <div class="dashboard__content dashboard-content">

            <div class="main-extra">
              <div v-for="(Test, index) in listOfTests" :key="index">
                <Questions 
                  :Test="Test" v-if="index === startQuest"
                  :index="index" @nextTest="nextTest"
                />
              </div>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  </section>
</template>

<script>

import { mapActions, mapGetters } from "vuex";
// import { Trans } from '../plugins/Translation';

import Questions from "@/components/Questions";

export default {
  name: "Home",
  components: { Questions },
  data: () => ({
    startQuest: 0,
  }),
  computed: {
    ...mapGetters(['StepInfo']),
    listOfTests() { // we get list of Tests
      if (this.StepInfo && this.StepInfo.result) {
        let listOfTests = this.StepInfo.result.tests.sort(
          (a,b) => (a.questions[0].order > b.questions[0].order) ? 1 
          : ((b.questions[0].order > a.questions[0].order) ? -1 : 0)
        );
        return listOfTests
      }
    },
    // currentLocale() {
    //   return Trans.currentLocale.trim();
    // },
    checkLevelUser()  { // we check user level test
      if (this.listOfTests && this.listOfTests.length) {
        let test = this.listOfTests.find(el => el.views === false)
        if (test) {
          this.startQuest = test.questions[0].order - 1;
          return 1
        } else if (localStorage.getItem('LevUserTest')){
          this.startQuest = parseInt(localStorage.getItem('LevUserTest')) || 0;
        }
      }
    },
  },
  methods: {
    ...mapActions(["getStepInfo", "fetchStepStatus", "fetchTestStatus"]),

    async nextTest () { // Function for next question
      if (this.startQuest < this.listOfTests.length - 1) {
        if (this.checkLevelUser === 1) {
          await this.fetchTestStatus({test_id: this.listOfTests[this.startQuest].id});
          this.startQuest++;
          await this.getStepInfo({event: 'extravaganza', eventStep: 'hngrow-test'});
        } else {
          this.startQuest++;
          localStorage.setItem('LevUserTest', this.startQuest);
        }
      } else {
        if (this.StepInfo.result.views === true) {
          localStorage.removeItem('LevUserTest');
          this.$router.push({ name: 'Extravaganza', query: {marketing: 'jncvubwsdufbm'} })
        } else {
          await this.fetchTestStatus({test_id: this.listOfTests[this.startQuest].id});
          await this.fetchStepStatus({step_id: this.StepInfo.result.id});
          this.$router.push({ name: 'Extravaganza', query: {marketing: 'jncvubwsdufbm'} })
        }
      }
    },
  },
  async mounted() {
    await this.getStepInfo({event: 'extravaganza', eventStep: 'hngrow-test'});
    this.checkLevelUser;
  },
};
</script>


<style>
.dashboard.h_100vh {
  height: 100vh;
}
.dashboard__content {
  padding: 85px 20px;
   background: linear-gradient(
169.68deg, #3F298D 6.91%, #1A0657 20.42%, #1D1B29 38.25%);
}
.main-extra {
  width: 100%;
  margin: -32px 0 64px;
  color: #fff;
}

@media screen and (max-width: 1199px) {
  .main-extra {
    margin: 40px 0 32px;
  }
}

@media screen and (max-width: 767px) {
  .main-extra {
    margin: 32px 0 2px;
  }
}
</style>
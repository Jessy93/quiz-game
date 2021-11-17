
<template>
  <section>
    <transition name="fade">
      <div class="block-quest" :key="index">
        <div class="title-1">Question {{Test.questions[0].order}}</div>
        <div class="card__img-caption">
          <div class="card-img">
            <img :src="require(`@/assets/img/img-${index}.png`)" alt="">
          </div>
          <div class="caption">
            {{Test.questions[0].description}}
          </div>
        </div>
        <div class="card-list__quest">
          <div class="title-2">
            {{Test.questions[0].text}}
          </div>
          <div v-if="answSort">
            <div v-for="(Answ, index) in answSort" :key="Answ.id">
              <Answer :answer="Answ" :id="index" :correctAnswers="correctAnswers" />
            </div>
          </div>
          <div class="btn button" 
            :class="{'btn_disable': correctAnswers.length !== AllGoodAnswCount}"
            @click="$emit('nextTest')"
          >
            {{ index === 4 ? 'Finition': 'Next Question' }}
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import Answer from "@/components/Answer";

export default {
  name: "Questions",
  components: {Answer},
  props: {
    Test: Object,
    index: Number,
  },
  data: () => ({
    correctAnswers: [],
    locked: null,
  }),
  computed: {
    answSort() {
      let arr = [];
      if (this.Test && this.Test.questions[0].answers && this.Test.questions[0].answers.length) {
        arr = this.Test.questions[0].answers.sort(() => Math.random() - 0.5);
      }
      return arr;
    },
    AllGoodAnswCount() {
      let essaie = 0
      if(this.Test && this.Test.questions[0].answers.length ) {
        this.Test.questions[0].answers.forEach(function (item) {
          if (item.is_correct) {
            essaie++
          }
        })
      }
      return essaie
    }
  },
};
</script>


<style>
.card__img-caption {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.card__img-caption .caption {
  max-width: 694px;
}
.card-img {
  margin: 32px 40px 40px 0;
}
.block-quest .success{
  color: #77bb2f;
}
.title-1, .title-2 {
  font-weight: 700;
}
.title-1 {
  font-size: 32px;
  line-height: 42px;
}
.title-2 {
  font-size: 24px;
  line-height: 32px;
}
.caption {
  font-size: 18px;
  line-height: 28px;
}
.extra-answwer {
  font-weight: 400;
  font-size: 16px;
  height: 16px;
}
.card-list__quest {
  /* background-color: black; */
  border: 1px solid #42556C;
  box-sizing: border-box;
  border-radius: 16px;
  padding: 32px;
  margin-top: 40px;
}
.button {
  width: fit-content;
  border: 1px solid #ffffff;
  padding: 12px 24px;
  font-weight: 500;
  line-height: 24px;
  color: #ffffff;
  outline: none;
  opacity: 1;
  pointer-events: inherit;
}
.button.btn__green {
  border: none;
  background: #77bb2f;
}
.btn__green:hover {
  background: #629727;
}
.block-quest .button {
  margin: 24px 0 0 0;
}
.button.btn_disable {
  opacity: 0.3;
  cursor: not-allowed;
  pointer-events: none;
}
.button.btn_disable:hover {
  opacity: 0.5;
}

@media screen and (max-width: 1920px) {
  .card__img-caption {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .card-img {
    margin: 32px 0 40px;
  }
}

@media screen and (max-width: 1199px) {
  .card-indice {
    padding: 48px;
  }
}

@media screen and (max-width: 767px) {
  .title-1 {
  font-size: 24px;
  line-height: 28px;
  }
  .title-2 {
    font-size: 20px;
    line-height: 26px;
  }
  .card-list__quest {
    padding: 24px;
  }
  .card-img {
    margin: 32px auto;
  }
  .card-img img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .button {
    font-size: 15px;
    padding: 8px 24px;
    margin-left: 0;
  }
}

</style>
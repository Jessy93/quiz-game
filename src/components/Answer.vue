<template>
  <div>
    <label class="container-label" 
      :key="id + inputClass.length" @click="checkAnswer(answer, id)"
      :class="[{'disable': locked}, answersId.includes(answer.id) ? inputClass[id] : '']"
    >
      <div class="wrapper-checkbox">
        <input type="radio" :disabled="locked" :value="answer.id">
        <div class="check">
        </div>
      </div>
      <div>
        <div class="extra-answer">
          {{answer.text.split("###")[0]}} {{locked}}
        </div>
        <div class="indice">
           {{answer.text.split("###")[1]}}
        </div>
      </div>
    </label>
  </div>
</template>

<script>
export default {
  name: "Answer",
  component: {},
  props: {
    answer: Object, 
    id: Number,
    correctAnswers: Array
  },
  data: () => ({
    inputClass: [],
    locked: null,
    answersId: [],
  }),
  methods: {
    checkAnswer(answer, id){
      if(!this.locked && !this.correctAnswers.includes(answer.id)) {
        this.answersId.push(answer.id);
        this.$set(this.inputClass, id, answer.is_correct ? 'success' : 'error');
        if(answer.is_correct) {
          this.correctAnswers.push(answer.id)
        }
      }
    },
  }
}
</script>


<style>
.container-label {
  text-align: left;
  position: relative;
  box-sizing: border-box;
  width: auto;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 24px;
}
.disable {
  pointer-events: none;
  opacity: 0.7;
}
.wrapper-checkbox input[type="radio" i] {
  width: 16px;
  height: 16px;
  margin: 0 16px 0 0;
  opacity: 0;
}
.wrapper-checkbox {
  display: flex;
  position: relative;
  height: 16px;
}
.wrapper-checkbox .check{
  position: absolute;
  background-color: transparent;
  border: 1px solid #D1D2CD;
  content: '.';
  border-radius: 50px;
  width: 16px;
  height: 16px;
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container-label .wrapper-checkbox .check::after {
  /* position: absolute; */
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin: 0 auto;
}
.container-label.success .wrapper-checkbox .check {
  border: 1px solid #77bb2f;
  padding: 3px;
}
.container-label.success .wrapper-checkbox .check::after {
  background-color: #77bb2f;
}

.container-label.error .wrapper-checkbox .check {
  border: 1px solid #EB4343;
  padding: 3px;
}
.container-label.error .wrapper-checkbox .check::after {
  background-color: #EB4343;
}
.container-label.success .extra-answer {
  color: #77bb2f;
}
.container-label.error .extra-answer {
  color: #EB4343;
}
.container-label .extra-answer {
  font-size: 16px;
}
.container-label .indice {
  color: #ffffff;
  font-size: 14px;
  line-height: 20px;
  max-height: 0;
  display: none;
  transition: all  2s ease-out 2s;
}
.container-label.success .indice,
.container-label.error .indice {
  max-height: fit-content;
  display: flex;
  margin-top: 8px;
}
.button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "HelveticaNeue", sans-serif;
    font-style: normal;
    font-size: 16px;
    line-height: 20px;
    border-radius: 5px;
    border: none;
    outline: none;
    padding: 0;
    cursor: pointer;
    text-align: center;
    transition: 0.3s;
}

.button.btn_disable {
  opacity: 0.3;
  cursor: not-allowed;
  pointer-events: none;
}
@media screen and (max-width: 767px) {
  .container-label .extra-answer {
    font-size: 15px;
    /* line-height: 24px; */
  }
  .container-label .indice {
    font-size: 12px;
    line-height: 18px;
  }
}

</style>
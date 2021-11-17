import si from './infos'
export default ({
  state: {
		stepStatus: {},
        stepInfo: {},
	},
	getters: {
		StepStatus(state) {
			return state.stepStatus;
		},
    StepInfo(state) {
      return state.stepInfo;
    },
	},
	mutations: {
		updateStepStatus(state, stepStatus) {
			state.stepStatus = stepStatus;
		},
        updateStepInfo(state, stepInfo) {
            state.stepInfo = stepInfo;
        },
	},
  actions: {

    getAllStepStatus(ctx) {
      return axios({
        method: 'GET',
        url: 'api/step/status'
      })
        .then((response) => {
          const stepStatus = response.data;
          ctx.commit('updateStepStatus', stepStatus);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getStepInfo(ctx, {event, eventStep}) {
      let getsi = si 
      ctx.commit('updateStepInfo', getsi);
    },

  },
})
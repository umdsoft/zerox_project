export const state = () => ({
  isLoading: false,
  isOpen: false,
  actType: "",
  contractData: {},
  end_date: null,
  isActModalOpen: false,
  isContractModalOpen: false,
  links: [],
  myInfo: [],
  isModal: false,
  partialAmount: 0,
  renderIndex: 0,
});
export const getters = {
  isModalInfo: (s) => s.isModal,
};
export const actions = {
  IsActiveModal({ dispatch, commit }) {
    commit("ACTIVE_MODAL");
  },
};
export const mutations = {
  changeRenderIndex(state) {
    state.renderIndex = state.renderIndex + 1;
  },
  changePartialAmount(state, data) {
    state.partialAmount = data;
  },
  changeLoading(state, data) {
    state.isLoading = data;
  },
  ACTIVE_MODAL(state) {
    state.isModal = !state.isModal;
  },
  SHOW_ACT_MODAL(state, payload) {
    state.actType = payload.type;
    state.contractData = payload.contract;
    state.contractData.act = payload.act;
    state.end_date = payload.time;
    state.isActModalOpen = true;
  },
  SHOW_CONTRACT_MODAL(state, payload) {
    state.actType = payload.type;
    state.contractData = payload.contract;
    state.isModal = true;
    state.isContractModalOpen = true;
  },
  HIDE_CONTRACT_MODAL(state, data) {
    (state.isContractModalOpen = false), (state.contractData = {});
  },
  HIDE_ACT_MODAL(state, data) {
    (state.isActModalOpen = false), (state.contractData = {});
  },

  SET_MYINFO(state, data) {
    state.myInfo = data;
  },

  ACTIVE_LOADING(state) {
    state.isLoading = true;
  },
  FALSE_LOADING(state) {
    state.isLoading = false;
  },
  Media_Menu_Open(state) {
    state.isOpen = true;
  },
  Media_Menu_Close(state) {
    state.isOpen = false;
  },
  changeBreadCrumb(state, data) {
    state.links = data;
  },
};

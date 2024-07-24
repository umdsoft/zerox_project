export default function ({ $axios, store, redirect }) {
  $axios.onRequest((config) => {
    if (!config?.falseLoading && config.url !== "/user/me") {
      store.commit("ACTIVE_LOADING");
    }
  });
  $axios.onResponse((res) => {
    store.commit("FALSE_LOADING");
  });
  $axios.onError((res) => {
    store.commit("FALSE_LOADING");
  });
}

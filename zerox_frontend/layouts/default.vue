<template>
  <div class="layout mb-6">
    <div
      @click="isModalActive"
      :class="{ active: isModalInfo }"
      class="ModalArea"
    ></div>
    <LoadingBar />
    <div v-if="isOpen" class="overlay" @click="closeMenu"></div>

    <div class="my-bg">
      <Bg-blue />
      <!-- <Esp-modal
        v-if="EspModal"
        @getEspData="getEspData"
        @closeEspModal="closeEspModal"
        :espData="keys"
      /> -->
      <act-modal />

      <div
        class="lg:container lg:px-0 px-2 relative mx-auto my-30 bg-[#F7FAFC]"
      >
        <div class="media-p">
          <!-- <NotificationModal 
        :item="message"
        @reject="reject"
        @affirm="affirm"/> -->
          <div class="pt-10 navbar-mobil">
            <div :class="isOpen ? 'fixed open-nav' : 'fixed'">
              <NavbarLogged v-if="$auth.loggedIn" />
              <Navbar @showModal="showLoginModal" v-else />
              <br />
            </div>
          </div>
          <div class="absolute myclass left-105">
            <Header class="mb-10" :notification="message" :key="$store.state.renderIndex" />
            <Nuxt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  startApi,
  getAllCertificates,
  preLoadKey,
  postLoadKey,
} from "@/services/eimzo/index";
import Notification from "../components/Notification.vue";
import NotificationModal from "../components/NotificationModal.vue";
import ActModal from "../components/ActModal.vue";

export default {
  components: { Notification, NotificationModal, ActModal },
  data() {
    return {
      EspModal: false,
      keys: null,
      result: null,
      selectedKey: null,
      timeOut: null,
      message: [],
      messageAct: [],
      userData: null,
    };
  },
  created() {
    // this.$store.commit("changeLoading", true);
    this.$nuxt.$on("forceUpdateParent", ($event) => {
      // this.getMyInfo();
      this.getNotifications();
    });
  },
  computed: {
    isOpen() {
      return this.$store.state.isOpen;
    },
    isModalInfo() {
      return this.$store.getters.isModalInfo;
    },
  },
  async mounted() {
    if (this.$auth.loggedIn) {
      // await this.getMyInfo();
      await this.getNotifications();
      //  try {
      //    this.socket = this.$nuxtSocket({
      //      channel: "/",
      //      name:'home',
      //      secure: true,
      //    });
      //  } catch (err) {
      //   console.log(err);
      // }
     
   
    }
    // this.$store.commit("changeLoading", false);
  },
  methods: {
    isModalActive() {
      this.$store.dispatch("IsActiveModal");
    },
    closeMenu() {
      this.$store.commit("Media_Menu_Close", false);
    },
    async getMyInfo() {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        if (data) {
          this.userData = data;
        }
      } catch (e) {
        console.log(e);
      }
    },

    async getNotifications() {
      try {
        const response = await this.$axios.get("/notification/me");

        if (response.status == 200) {
          this.message = response.data.data;
        }
      } catch (e) {
        console.log(e);
      }
    },

    async reject(id) {
      try {
        const response = await this.$axios.put(`/notification/success/${id}`, {
          status: 2,
        });
        if (response.status == 200) {
          this.$toast.success("Shartnoma bekor qilindi");
          this.getNotifications();
        }
      } catch (e) {
        console.log(e);
      }
    },

    async affirm(id) {
      try {
        const response = await this.$axios.put(`/notification/success/${id}`, {
          status: 1,
        });
        if (response.status == 200) {
          this.$toast.success("Shartnoma tasdiqlandi");
          this.getNotifications();
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
::-webkit-scrollbar {
  height: 12px;
  width: 12px;
  background: #000;
}

::-webkit-scrollbar-thumb {
  background: #393812;
  -webkit-border-radius: 1ex;
  -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
}

::-webkit-scrollbar-corner {
  background: #000;
}
@media (max-width: 1024px) {
  .overlay {
    position: fixed;
    overflow-y: hidden;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9;
  }
  .layout {
    .media-p {
      padding: 0 !important;
    }
    .navbar-mobil {
      // top: 0;
      // left: 0;
      // height: 100vh;
      // padding: 0 !important;
      .fixed {
        position: fixed;
        overflow: hidden;
        top: 0;
        transform: translateX(-500px);
        left: 0;
        min-height: 100vh;
        background: white;
        padding: 0 !important;
        border-radius: 0 !important;
        z-index: 10;
        transition: 0.5s;
        width: 42%;
      }
      .open-nav {
        transform: translateX(0) !important;
        transition: 0.5s;
      }
    }
    .myclass {
      width: unset;
      position: unset;
      left: 0px;
    }
  }
}

@media (max-width: 768px) {
  .overlay {
    position: fixed;
    overflow: hidden;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9;
  }
  .layout {
    .media-p {
      padding: 0 !important;
    }
    .navbar-mobil {
      // top: 0;
      // left: 0;
      // height: 100vh;
      // padding: 0 !important;
      .fixed {
        position: fixed;
        display: flex;
        justify-content: center;
        top: 0;
        transform: translateX(-800px);
        left: 0;
        background: white;
        overflow: hidden;
        min-height: 100vh;
        padding: 0 !important;
        border-radius: 0 !important;
        z-index: 10;
        transition: 0.5s;
        width: 100%;
      }
      .open-nav {
        transform: translateX(0px) !important;
        transition: 0.5s;
      }
    }
    .myclass {
      width: unset;
      position: unset;
      left: 0px;
    }
  }
}

.my-bg {
  background: #f7fafc;
}
.myclass {
  width: calc(100% - 400px);
  left: 390px;
}
.ModalArea {
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  z-index: 111;
  width: 100%;
  height: 100vh;
  position: absolute;
  transition-duration: 0.3s;
  background: rgba(0, 0, 0, 0.15);
}
.ModalArea.active {
  opacity: 1;
  visibility: visible;
}
</style>

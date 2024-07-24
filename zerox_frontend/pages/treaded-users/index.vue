<template>
  <div class="bg-white rounded-xl flex flex-col">
    <div
      style="justify-content: space-between"
      class="flex w-full justify-start mt-6"
    >
      <div
        @click="step == 0 ? $router.go(-1) : step--"
        class="my-2 mx-6 hidden lg:inline-flex items-center"
        style="cursor: pointer"
      >
        <svg
          class="h-5 w-5 text-blue-500"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <polyline points="15 6 9 12 15 18" />
        </svg>
        <p class="text-blue-500">{{ $t("back") }}</p>
      </div>
      <div class="input my-2 mx-6">
        <input :placeholder="$t('search') + '...'" type="text" />
        <div style="cursor: pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M9.5 9.5L12.5 12.5"
              stroke="#37363C"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.75 10.5C8.37335 10.5 10.5 8.37335 10.5 5.75C10.5 3.12665 8.37335 1 5.75 1C3.12665 1 1 3.12665 1 5.75C1 8.37335 3.12665 10.5 5.75 10.5Z"
              stroke="#37363C"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="main block text-black bg-white mb-10 rounded-xl px-6">
      <div v-for="(user, index) in users" :key="index">
        <TableAccordion
          :selectedId="selectedUserId"
          :user="user"
          @clickRequest="clickRequest"
        />
      </div>
    </div>
  </div>
</template>


<script>
export default {
  middleware: "auth",

  data: () => ({
    users: [],
    step: 0,
    reservatedUsers: [],
    selectedUserId: false,
  }),
  updated() {

  },
  fetch() {
    this.getThreadedUsers();
  },
  methods: {
    clickRequest(data) {
      this.selectedUserId = data;
    },
    async searchUser(e) {
      try {
        const response = await this.$axios.get(
          `/contract/oldi-bardi/search?search=${e.target.value}`
        );
        if (response.status == 200) {
          this.users = response.data.data;
        }
      } catch (e) {
        console.log(e);
      }
    },

    async getThreadedUsers() {
      // this.$store.commit("changeLoading", true);
      const response = await this.$axios.get(`/contract/oldi-bardi`);
      if (response.status == 200) {
        this.users = response.data.data.filter((item) => item.id != null);
        // console.log(this.users);
      }
      // this.$store.commit("changeLoading", false);
    },
  },
};
</script>
<style lang="scss">
.input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px 10px 14px;
  width: 320px;
  border: 1px solid #c0c0c0;
  border-radius: 10px;
  input {
    width: 100%;
    height: 100%;
    &:focus {
      outline: none;
    }
  }
}

.sch {
  display: flex;
  align-items: center;
}

.avatar {
  background: gray;
}

.main {
  width: 100%;
}

.bt {
  border: 1px solid #3182ce;
  outline: none;
  box-shadow: 0px 5px 14px rgba(0, 0, 0, 0.06);
}

.h1 {
  text-align: center;
  align-items: center;
  justify-content: center;
}

.userCart {
  margin: 15px 0;
  background: #ffffff;
  box-shadow: 0px 3px 14px rgba(0, 0, 0, 0.11);
  border-radius: 10px;
  padding: 10px;
}

.userCart__info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .userCart__start,
  .userCart__end {
    display: flex;
    align-items: center;
  }
  .userCart__Icon {
    padding: 7px 8px;
    background: #3182ce;
    border-radius: 10px;
    svg {
      fill: white;
    }
  }
  .userCart__name {
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 1px;
    color: #2d3748;
    margin: 0 0 0 25px;
  }
  .userCart__Id {
    margin: 0 30px 0 0;
    padding: 5px 10px;
    background: #f5f5f5;
    border-radius: 10px;
    display: flex;
    align-items: center;
    span {
      margin: 0 0 0 15px;
    }
  }
  .userCart__arrow {
    transition-duration: 0.3s;
    z-index: 1111;
    cursor: pointer;
    &.active {
      transform: rotate(180deg);
    }
  }
}

.userCart__additionalInfo {
  position: relative;
  margin: 15px 0 0 0;
}

.active {
  display: block;
}

.userCart__btns {
  margin: 20px 0 0 0;
  display: flex;
  justify-content: end;
}

.userCart__text {
  width: 70%;
  margin: 10px 0 0 0;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 1px;
  color: #000000;
}
</style>

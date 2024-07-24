<template>
  <header>
    <div class="flex justify-between items-center">
      <ul class="flex media-open bar-btn">
        <li class="text-white tetx-xs font-normal bar-btn">
          <button class="mr-4 mb-4" @click="barClick">
            <svg width="27" height="17" viewBox="0 0 27 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="22" height="3" rx="1.5" fill="#F7FAFC" />
              <rect x="5" y="7" width="22" height="3" rx="1.5" fill="#F7FAFC" />
              <rect y="14" width="22" height="3" rx="1.5" fill="#F7FAFC" />
            </svg>
          </button>
        </li>
      </ul>

      <div class="flex items-center">
        <div class="flex items-center">
          <nuxt-link :to="{ name: 'mobil-hisob___' + $i18n.locale }" v-if="$auth.loggedIn" class="flex items-center">
            <div
              class="ml-4 cash hidden md:flex lg:flex lg:w-64 md:w-64 items-center text-sm bg-white rounded-md justify-between">
              <div class="flex flex-col">
                <span>{{ $t("navbar.mobile") }}: </span>
                <span>{{
                  dds.amount
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                }}</span>
              </div>
              <div class="ml-4">
                <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.5 31C24.0604 31 31 24.0604 31 15.5C31 6.93959 24.0604 0 15.5 0C6.93959 0 0 6.93959 0 15.5C0 24.0604 6.93959 31 15.5 31Z"
                    fill="#3182CE" />
                  <rect width="31" height="31" rx="5.16667" fill="#3182CE" />
                  <g clip-path="url(#clip0_254_14246)">
                    <path
                      d="M11.1068 11.3447H20.1889C20.295 11.3446 20.4009 11.3514 20.5062 11.3648C20.4705 11.1145 20.3845 10.8739 20.2533 10.6576C20.1222 10.4414 19.9486 10.2539 19.743 10.1066C19.5375 9.95924 19.3042 9.85505 19.0573 9.80029C18.8104 9.74553 18.5549 9.74134 18.3063 9.78798L10.8372 11.0632H10.8287C10.3599 11.1528 9.94294 11.4181 9.66309 11.8048C10.0847 11.5049 10.5894 11.344 11.1068 11.3447Z"
                      fill="white" />
                    <path
                      d="M20.189 12.0273H11.1069C10.6254 12.0279 10.1636 12.2194 9.82312 12.5599C9.48259 12.9005 9.29105 13.3622 9.29053 13.8437V19.293C9.29105 19.7745 9.48259 20.2362 9.82312 20.5768C10.1636 20.9173 10.6254 21.1088 11.1069 21.1094H20.189C20.6705 21.1088 21.1322 20.9173 21.4728 20.5768C21.8133 20.2362 22.0048 19.7745 22.0054 19.293V13.8437C22.0048 13.3622 21.8133 12.9005 21.4728 12.5599C21.1322 12.2194 20.6705 12.0279 20.189 12.0273ZM18.8408 17.4766C18.6612 17.4766 18.4856 17.4233 18.3363 17.3235C18.1869 17.2237 18.0705 17.0819 18.0018 16.9159C17.933 16.75 17.9151 16.5674 17.9501 16.3912C17.9851 16.215 18.0716 16.0532 18.1987 15.9262C18.3257 15.7991 18.4875 15.7126 18.6637 15.6776C18.8398 15.6426 19.0224 15.6605 19.1884 15.7293C19.3544 15.798 19.4962 15.9144 19.596 16.0638C19.6958 16.2131 19.749 16.3887 19.749 16.5684C19.749 16.8092 19.6534 17.0402 19.483 17.2106C19.3127 17.3809 19.0817 17.4766 18.8408 17.4766Z"
                      fill="white" />
                    <path
                      d="M9.30469 15.7585V12.9346C9.30469 12.3196 9.64526 11.2885 10.8273 11.0651C11.8306 10.877 12.824 10.877 12.824 10.877C12.824 10.877 13.4767 11.3311 12.9375 11.3311C12.3983 11.3311 12.4124 12.0264 12.9375 12.0264C13.4626 12.0264 12.9375 12.6934 12.9375 12.6934L10.8231 15.0916L9.30469 15.7585Z"
                      fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_254_14246">
                      <rect width="14.5312" height="14.5312" fill="white" transform="translate(8.39648 8.39453)" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>

      <div class="flex items-center">
        <div class="lang">
          <div class="til">
            <h3 v-if="$i18n.locale == 'uz'" class="flex items-center" @click.prevent="clickUz">
              Uz
              <span class="flex">
                <img src="@/assets/img/lang/uz.png" alt="" />
              </span>
            </h3>
            <h3 v-if="$i18n.locale == 'ru'" class="flex items-center" @click.prevent="clickRu">
              Ру
              <span class="flex">
                <img src="@/assets/img/lang/ru.png" alt="" />
              </span>
            </h3>
            <h3 v-if="$i18n.locale == 'kr'" class="flex items-center" @click.prevent="clickKr">
              Уз
              <span class="flex">
                <img src="@/assets/img/lang/uz.png" alt="" />
              </span>
            </h3>

            <span class="flex-center"><svg width="13" height="8" viewBox="0 0 13 8" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1L6.49996 6.50004L0.999928 1" stroke="white" stroke-width="1.57975" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </span>
            <div class="ru">
              <h2 @click.prevent="clickUz" class="flex items-center" v-if="$i18n.locale !== 'uz'">
                Uz
                <span class="flex">
                  <img src="@/assets/img/lang/uz.png" alt="" />
                </span>
              </h2>
              <h2 @click.prevent="clickRu" class="flex items-center" v-if="$i18n.locale !== 'ru'">
                Ру
                <span class="flex">
                  <img src="@/assets/img/lang/ru.png" alt="" />
                </span>
              </h2>
              <h2 @click.prevent="clickKr" class="flex items-center" v-if="$i18n.locale !== 'kr'">
                Уз
                <span class="flex">
                  <img src="@/assets/img/lang/uz.png" alt="" />
                </span>
              </h2>
            </div>
          </div>
        </div>

        <nuxt-link v-if="$auth.loggedIn" class="mr-8 py-1 bell" :to="{ name: 'notification___' + $i18n.locale }">
          <p v-if="dds.not" class="noti_count">
            {{ dds.not }}
          </p>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.1918 13.3324C17.127 13.2543 17.0633 13.1762 17.0008 13.1008C16.1414 12.0613 15.6215 11.434 15.6215 8.4914C15.6215 6.96797 15.2571 5.71797 14.5387 4.78047C14.009 4.08789 13.293 3.5625 12.3492 3.17422C12.3371 3.16746 12.3263 3.1586 12.3172 3.14805C11.9778 2.01133 11.0489 1.25 10.0012 1.25C8.95355 1.25 8.02503 2.01133 7.68558 3.14687C7.67652 3.15704 7.66582 3.16562 7.65394 3.17226C5.45159 4.07891 4.38128 5.81836 4.38128 8.49023C4.38128 11.434 3.86214 12.0613 3.00199 13.0996C2.93949 13.175 2.87581 13.2516 2.81097 13.3312C2.64347 13.5332 2.53735 13.779 2.50516 14.0394C2.47296 14.2999 2.51606 14.5641 2.62933 14.8008C2.87035 15.3086 3.38402 15.6238 3.97034 15.6238H16.0364C16.6199 15.6238 17.1301 15.309 17.3719 14.8035C17.4857 14.5667 17.5292 14.3023 17.4972 14.0416C17.4653 13.7809 17.3593 13.5348 17.1918 13.3324Z"
              fill="white" />
            <path
              d="M9.99845 18.75C10.5629 18.7495 11.1167 18.5963 11.6012 18.3066C12.0856 18.0168 12.4826 17.6014 12.75 17.1043C12.7626 17.0805 12.7688 17.0538 12.7681 17.0269C12.7673 16.9999 12.7596 16.9736 12.7457 16.9506C12.7318 16.9275 12.7121 16.9084 12.6887 16.8952C12.6652 16.8819 12.6387 16.875 12.6117 16.875H7.38595C7.35897 16.8749 7.33243 16.8818 7.3089 16.895C7.28537 16.9082 7.26567 16.9273 7.25171 16.9504C7.23774 16.9735 7.23 16.9998 7.22922 17.0268C7.22845 17.0537 7.23467 17.0804 7.24728 17.1043C7.51468 17.6013 7.9116 18.0167 8.39596 18.3065C8.88031 18.5962 9.43405 18.7495 9.99845 18.75Z"
              fill="white" />
          </svg>
        </nuxt-link>

        <nuxt-link v-if="$auth.loggedIn" :to="{ name: 'cabinet___' + $i18n.locale }">
          <div class="flex w-24 lg:w-full flex-col items-center justify-center">
            <img v-if="$auth.user.image" class="rounded-3xl" src="" alt="" />
            <span v-if="$auth.user.type == 2 && $auth.user.gender == 1">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
                  fill="white" />
                <g clip-path="url(#clip0_616_503)">
                  <path
                    d="M19.8451 18.4588C22.9034 18.4588 25.3821 15.7962 25.3821 12.511C25.3821 9.2257 22.9034 6.56311 19.8451 6.56311C16.7867 6.56311 14.308 9.2257 14.308 12.511C14.308 15.7962 16.7867 18.4588 19.8451 18.4588ZM17.8682 20.6893C13.6072 20.6893 10.1552 24.3974 10.1552 28.9744C10.1552 29.7365 10.7306 30.3545 11.44 30.3545H28.2502C28.9596 30.3545 29.5349 29.7365 29.5349 28.9744C29.5349 24.3974 26.0829 20.6893 21.822 20.6893H17.8682V20.6893Z"
                    fill="#3182CE" />
                </g>
                <defs>
                  <clipPath id="clip0_616_503">
                    <rect width="19.3797" height="23.7914" fill="white" transform="translate(10.1552 6.56311)" />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <span v-if="$auth.user.type == 2 &&
              $auth.user.gender != 1 &&
              $auth.user.gender != 2
            ">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
                  fill="white" />
                <g clip-path="url(#clip0_616_503)">
                  <path
                    d="M19.8451 18.4588C22.9034 18.4588 25.3821 15.7962 25.3821 12.511C25.3821 9.2257 22.9034 6.56311 19.8451 6.56311C16.7867 6.56311 14.308 9.2257 14.308 12.511C14.308 15.7962 16.7867 18.4588 19.8451 18.4588ZM17.8682 20.6893C13.6072 20.6893 10.1552 24.3974 10.1552 28.9744C10.1552 29.7365 10.7306 30.3545 11.44 30.3545H28.2502C28.9596 30.3545 29.5349 29.7365 29.5349 28.9744C29.5349 24.3974 26.0829 20.6893 21.822 20.6893H17.8682V20.6893Z"
                    fill="#3182CE" />
                </g>
                <defs>
                  <clipPath id="clip0_616_503">
                    <rect width="19.3797" height="23.7914" fill="white" transform="translate(10.1552 6.56311)" />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <span v-if="$auth.user.type == 2 && $auth.user.gender == 2">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
                  fill="white" />
                <path
                  d="M29.1581 23.5005L24.4834 21.0675L22.5066 20.0386C22.5561 20.0044 22.6033 19.9657 22.652 19.9295H25.2476C25.4406 19.9295 25.6257 19.8458 25.7622 19.6969C25.8987 19.548 25.9754 19.346 25.9754 19.1354V17.0461H25.9688C25.8894 14.1343 24.9625 11.5727 23.5705 9.96634C22.8365 9.06318 21.8851 8.44956 20.8209 8.26619C20.7734 8.25772 20.7259 8.2499 20.6782 8.24306C20.6232 8.23557 20.5686 8.22808 20.5131 8.2232C20.3938 8.21106 20.2741 8.20465 20.1543 8.20398H20.1537C20.0349 8.20398 19.9176 8.21147 19.8005 8.22254C19.7444 8.22776 19.6889 8.23525 19.6334 8.24274C19.5868 8.24925 19.5405 8.25642 19.4946 8.26489C18.439 8.445 17.4942 9.04917 16.7622 9.93931C15.3568 11.544 14.4198 14.1177 14.3398 17.0464H14.3335V19.1358C14.3335 19.3464 14.4102 19.5483 14.5467 19.6973C14.6832 19.8462 14.8683 19.9298 15.0613 19.9298H17.6641C17.7351 19.9826 17.8058 20.0363 17.8793 20.0845L15.9861 21.0463L11.1597 23.4988C10.7403 23.7132 10.465 24.2291 10.465 24.8052V30.5913C10.465 31.3668 10.9603 31.9954 11.5719 31.9954H28.7378C29.3495 31.9954 29.8447 31.3668 29.8447 30.5913V24.8046C29.8444 24.2304 29.5734 23.7193 29.1581 23.5005Z"
                  fill="#3182CE" />
              </svg>
            </span>
            <span v-if="$auth.user.type == 1">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
                  fill="white" />
                <path
                  d="M19.7673 19.6894C22.8257 19.6894 25.3044 17.0268 25.3044 13.7416C25.3044 10.4563 22.8257 7.7937 19.7673 7.7937C16.7089 7.7937 14.2302 10.4563 14.2302 13.7416C14.2302 17.0268 16.7089 19.6894 19.7673 19.6894ZM23.9114 21.2042L21.8437 30.0981L20.4594 23.7786L21.8437 21.1764H17.6909L19.0752 23.7786L17.6909 30.0981L15.6232 21.2042C12.5388 21.3622 10.0775 24.0713 10.0775 27.4216V29.3547C10.0775 30.5861 11.0075 31.5851 12.1539 31.5851H27.3808C28.5271 31.5851 29.4572 30.5861 29.4572 29.3547V27.4216C29.4572 24.0713 26.9958 21.3622 23.9114 21.2042V21.2042Z"
                  fill="#3182CE" />
              </svg>
            </span>

            <div class="text" v-if="$auth.user.type === 1">
              <h1 class="text-white text-center text-xs font-semibold mt-2">
                {{ $auth.user.company }}
              </h1>
            </div>
            <div v-if="$auth.user.type === 2" class="text">
              <h1 class="text-white text-center text-xs font-semibold mt-2">
                {{ $auth.user.last_name }} {{ $auth.user.first_name }}
              </h1>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>

    <div v-if="$route.name !== 'index___uz' ||
      $route.name !== 'index___kr' ||
      $route.name !== 'index___ru'
    " @click="$router.go(-1)" style="cursor: pointer"
      class="back_icon flex mt-4 justify-center items-center text-black bg-white rounded-full w-10 h-10">
      <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.57059 0.856445L1.42773 7.9993L8.57059 15.1422" stroke="#152C07" stroke-width="1.5"
          stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
  </header>
</template>

<script>
export default {
  // props: ["notification"],
  data() {
    return {
      isOpen: false,
      notCon: [],
      user: null,
      dds: {
        amount: 0,
        not: 0,
      },
    };
  },
  computed: {
    links() {
      return this.$store.state.links;
    },
  },
  async created() {
    if (this.$auth.loggedIn) {
      try {
        this.socket = this.$nuxtSocket({
          // nuxt-socket-io opts:
          name: "home", // Use socket "home"
          channel: "/", // connect to '/index',
          secure: true,
        });
        this.socket.emit("notification", { userId: this.$auth.user.id });
        this.socket.on("notification", (data) => {
          const conUser = data.pps.find(e => e.id == this.$auth.user.id)
          this.dds.amount = conUser.balance
          this.notCon = []
          data.not.forEach(e => {
            if (e.reciver == this.$auth.user.id) {
              this.notCon.push(e)
            }
          });
          this.dds.not = this.notCon.length
        });

        console.log(this.dds)
      } catch (err) {
        console.log(err);
      }
    }
  },
  methods: {
    barClick() {
      this.$store.commit("Media_Menu_Open", {
        isOpen: true,
      });
    },
    clickUz() {
      this.$i18n.setLocale("uz");
    },
    clickRu() {
      this.$i18n.setLocale("ru");
    },
    clickKr() {
      this.$i18n.setLocale("kr");
    },
  },
};
</script>

<style lang="scss" scoped>
@media (max-width: 768px) {
  header {
    .media-open {
      display: block;
    }

    .back_icon {
      display: flex;
    }

    .media-close {
      display: none;
    }

    .bar-btn {
      display: block !important;
    }
  }
}

@media (max-width: 1024px) {
  header {
    .media-open {
      display: block;
    }

    .back_icon {
      display: flex;
    }

    .media-close {
      display: none;
    }

    .bar-btn {
      display: block !important;
    }
  }
}

header {
  .bar-btn {
    display: none;
  }
}

.cash {
  padding: 5px 12px;
  box-shadow: 0px 3px 14px rgba(0, 0, 0, 0.11);
  border-radius: 5px;
}

.bell {
  position: relative;
}

.noti_count {
  font-size: 8px;
  min-width: 15px;
  display: flex;
  color: white;
  position: absolute;
  font-weight: 600;
  top: 0;
  right: -13px;

  align-items: center;
  justify-content: center;
  background: red;
  border-radius: 50%;
}

.back_icon {
  display: none;
}

.til {
  cursor: pointer;
  padding: 5px 10px;
  transition: 0.2s;
  margin-right: 15px;

  span {
    svg {
      transition: 0.3s;
    }
  }

  &:hover {
    span {
      svg {
        transform: rotate(-180deg);
      }
    }

    .ru {
      display: block;
      z-index: 12;
    }
  }

  position: relative;

  h3 {
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    color: #ffffff;

    span {
      margin: 0 10px;
    }
  }

  .ru {
    display: none;
    width: 100%;
    top: 30px;
    left: 5px;
    position: absolute;
    left: 0;
    background: #ffffff;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
    border-radius: 0px 0px 6px 6px;
    position: absolute;

    h2 {
      padding: 5px 10px;
      font-weight: bold;
      font-size: 14px;
      line-height: 18px;
      color: #000000;

      img {
        margin-left: 10px;
      }

      &:hover {
        background: #d3d3d3;
      }
    }
  }

  display: flex;
  align-items: center;
}

.noAvaterSvg {
  fill: white;
  padding: 5px 0px 0px 0px;
  border-radius: 50%;
  background: gray;
}
</style>

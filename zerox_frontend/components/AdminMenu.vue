<template>
  <div>
    <nav :class="isMobile ? 'nav active-mobile-nav ' : 'nav scroll'">
      <div class="logo-shop">
        <div class="logo-shop__inner">
          <img data-v-5ad8378d="" src="/_nuxt/assets/img/logo.svg" alt="" width="100" height="100">

        </div>
      </div>
      <div class="menu-nav">
        <ul class="menu-nav-ul">
          <li v-for="(item, index) in menu" :key="index">
            <a href="#" v-if="item.items != undefined" @click="toggleMenu(index)">
              <fa class="left-icon" :icon="item.ricon" />
              {{ item.title }}
              <fa :class="item.isOpen ? 'icon icon-rotate' : 'icon'
                " v-if="item.licon" :icon="item.licon" />
            </a>

            <nuxt-link v-else :to="{ path: item.route }" @click.native="hideMobile">

              <fa class="left-icon" :icon="item.ricon" /> {{ item.title }}
            </nuxt-link>

            <ul :class="item.isOpen ? 'menu-accordion open' : 'menu-accordion'" v-if="item.items">
              <li v-for="(i, j) in item.items" :key="j">
                <nuxt-link nuxt-link-exact-link @click.native="hideMobile" :to="{ path: i.itemRoute }">{{ i.itemTitle
                  }}</nuxt-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
    <div @click="isMobile = false" :class="isMobile ? 'fixvh active-mobile-vh' : 'fixvh'"></div>
    <div class="header">
      <div class="header__inner">
        <div class="header-left"></div>

        <div class="header-right" v-if="$auth.user">
          <div class="profile-dropdown">
            <button v-click-outside="hide" @click="toggleProfile" type="button"
              :class="isDropdown ? 'bt-dropdown __active' : 'bt-dropdown'" data-target="profile-dropdown">
              <h5>{{ $auth.user.first_name }} {{ $auth.user.last_name }}</h5>
              <span>
                <fa icon="angle-down" />
              </span>
            </button>
            <div v-if="isDropdown" class="dropdown-content my-dropdown" id="profile-dropdown">
              <button class="logout" @click="$auth.logout()">
                <fa class="icon-profile logout-icon" icon="power-off" />
                Chiqish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

Vue.directive("click-outside", {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      // here I check that click was outside the el and his childrens
      if (!(el === event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unbind: function (el) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
});
export default {
  data() {
    return {
      isDropdown: false,
      isMobile: false,
      menu: [
        {
          route: "/admin",
          ricon: "home",
          title: "Dashboard",

        },
        {
          route: "/admin/news",
          ricon: "list-alt",
          title: "Yangiliklar",
        },
        {
          route: "/admin/version",
          ricon: "mobile",
          title: "Mobil ilova versiyasi",
        },
        {
          route: "/admin/users",
          ricon: "users-cog",
          licon: "angle-down",
          title: "Foydalanuvchilar",
          isOpen: false,
          items: [
            {
              itemRoute: "/admin/users/legal",
              itemTitle: "Yuridik shaxslar",
            },
            {
              itemRoute: "/admin/users/users",
              itemTitle: "Jismoniy shaxslar",
            },
          ],
        },
        {
          route: "/admin/transfer/payment",
          ricon: "users-cog",
          licon: "angle-down",
          title: "Amaliyotlar",
          isOpen: false,
          items: [
            {
              itemRoute: "/admin/transfer/payment",
              itemTitle: "Tushgan mablag`lar",
            },
            {
              itemRoute: "/admin/transfer/mobil-transfer",
              itemTitle: "O'tkazmalar",
            },
            {
              itemRoute: "/admin/transfer/paid",
              itemTitle: "Yechilgan mablag`lar",
            },
          ],
        },
        {
          route: "/admin/contracts",
          ricon: "list-alt",
          title: "Qarz shartnomalari",
        },
        {
          route: "/admin/#",
          ricon: "chart-line",
          title: "Tahlil",
        },
        {
          route: "/admin/setting",
          ricon: "users-cog",
          licon: "angle-down",
          title: "Sozlamalar",
          isOpen: false,
          items: [
            {
              itemRoute: "/admin/setting/banner",
              itemTitle: "Reklama",
            },
            {
              itemRoute: "/admin/setting/payment",
              itemTitle: "To`lov tizimlari bo’yicha",
            },
          ],
        },
        {
          route: "/admin/mobile-bill",
          ricon: "users-cog",
          licon: "angle-down",
          title: "Mobil hisob raqam bo'yicha hisobot",
          isOpen: false,
          items: [
            {
              itemRoute: "/admin/mobile-bill/iden-report",
              itemTitle: "Identifikatsiya jarayoni bo’yicha",
            },
            {
              itemRoute: "/admin/setting/payment",
              itemTitle: "Qarz shartnomalari bo’yicha",
            },
          ],
        },
        {
          route: "/admin/#",
          ricon: "headset",
          title: "Foydalanuvchilar bilan aloqa",
        },
      ],
      user: null,
    };
  },
  async mounted() { },
  methods: {

    toggleMenu(e) {
      // this.menu.forEach(element => {
      // 	element.isOpen = false;
      // });
      this.menu[e].isOpen = !this.menu[e].isOpen;
    },
    hideMobile() {
      this.isMobile = false;
    },
    toggleProfile() {
      this.isDropdown = !this.isDropdown;
    },
    hide() {
      this.isDropdown = false;
    },
  },
};
</script>

<style lang="scss" scoped>
nav {
  a.nuxt-link-active {
    background-color: #38445a;
    color: #b6daff !important;

    .left-icon {
      color: #b6daff !important;
    }
  }
}

.toggle-enter-active,
.toggle-leave-active {
  transition: all 2s;
}

nav.nav {
  width: 240px;
  position: fixed;
  overflow: visible;
  top: 0;
  display: block;
  left: 0;
  height: 100vh;
  z-index: 15;
  overflow: auto;
  background-color: #38445a;
  box-shadow: 0px 0px 8px rgba($color: #000000, $alpha: 0.15);

  div.logo-shop {
    display: flex;
    justify-content: center;
    height: 60px;
    width: 100%;
    align-items: center;
    background-color: #f8fbff;

    div.logo-shop__inner {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    a {
      display: flex;
      align-items: center;
    }
  }

  div.menu-nav {
    padding: 15px 0px;
  }

  ul.menu-nav-ul {
    list-style-type: none;
    padding-left: 0px;
    margin-bottom: 0px;

    li {
      display: block;

      .left-icon {
        margin-right: 10px;
        font-size: 16px;
        color: #dcdcdc;
        max-width: 20px;
        min-width: 20px;
      }

      .icon {
        font-size: 11px;
        float: right;
        margin-top: 5px;
      }
    }

    // a.nuxt-link-exact-active {
    //     background-color: $gc !important;
    //     color: #fff !important;
    // }
    li>a {
      display: block;
      padding: 12px 25px;
      transition: 0.3s font-weight;
      color: #dcdcdc;
      font-size: 14px;
      transition: 0.3s;
      font-weight: normal;

      &:hover {
        background-color: #38445a;
      }
    }
  }

  ul.menu-accordion {
    // padding-left: 40px;
    // background-color: #f6f6f6;
    display: none;

    a {
      padding-left: 50px !important;
    }
  }

  ul.open {
    display: block;
    border-left: 4px solid #b6daff;
  }

  .icon-rotate {
    transform: rotate(-180deg) !important;
  }
}

div.fixvh {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  display: none;
  left: 0;
  background-color: rgba($color: #000000, $alpha: 0.6);
  z-index: 90;
}

div.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 13;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 0px 8px rgba($color: #000000, $alpha: 0.15);
  background-color: #fff;

  div.header__inner {
    margin-left: 240px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0px 20px;
    align-items: center;

    div.header-left {
      .header__bars {
        font-size: 22px;

        cursor: pointer;
      }
    }

    div.header-right {
      height: 100%;

      div.profile-dropdown {
        height: 100%;
        position: relative;

        h5 {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 0px;
          margin-left: 10px;
        }

        div.img-pro {
          width: 38px;
          height: 38px;
          position: relative;
          border-radius: 100%;
          overflow: hidden;

          img {
            width: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }

        button {
          padding: 5px 15px;
          height: 100%;
          border: none;
          background: transparent;
          display: flex;
          align-items: center;
        }

        button.__active {
          background-color: #eee;
        }

        span {
          margin-left: 10px;
          font-weight: 400;
        }

        div.dropdown-content {
          position: absolute;
          right: 0;
          padding: 4px 0px;
          width: 170px;
          background-color: #fff;
          z-index: 30;
          display: block;
          border-radius: 3px;
          border: 1px solid rgba(0, 0, 0, 0.15);

          a {
            display: block;
            background-color: #ffffff;
            padding: 0.5rem 1rem;
            color: #212529;
            font-size: 13px;
            line-height: 20px;

            i {
              min-width: 20px;
              font-size: 16px;
            }

            b {
              font-weight: 400;
              margin-left: 6px;
            }

            &:hover {
              background-color: #f0f4f7;
              color: #354558;
            }
          }

          hr {
            margin: 8px 0px;
          }

          .icon-profile {
            margin-right: 10px;
          }

          a.logout {
            .logout-icon {
              color: #fc5454 !important;
            }

            color: #fc5454 !important;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  nav.nav {
    position: fixed;
    top: 0;
    // left: 0;
    z-index: 99;
    transform: translateX(-102%);
    transition: 0.5s;
  }

  div.header__inner {
    margin-left: 0px !important;
  }

  nav.active-mobile-nav {
    transform: translateX(0%);
  }

  div.active-mobile-vh {
    display: block;
  }
}
</style>

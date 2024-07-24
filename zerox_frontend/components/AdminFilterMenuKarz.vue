<template>
    <div :class="{ FilterMenuActive: ActivFilterMenu }" class="FilterMenu">
      <div class="FilterMenu__body">
        <div @click="isActivFilterMenu" class="DisconnectActivFilterMenuBtn">
          X
        </div>
        <form action="" class="filter_form">
          <div class="filter__inputs">
           
            <input
              v-model="filter.id"
              placeholder="Qarz shartnomasi raqami"
              class="input"
              type="text"
            />
            <input
              v-model="filter.dfio"
              placeholder="Qarz beruvchi"
              class="input"
              type="text"
            />
            <input
              v-model="filter.cfio"
              placeholder="Qarz oluvchi"
              class="input"
              type="text"
            />
            <!-- <input
              v-model="filter.date"
              placeholder="Shartnoma sanasi"
              class="input"
              type="date"
            />  
            -->
          </div>
          <div class="flex justify-between">
            <button type="button" class="filter_btn" @click="filterData">
              Izlash
            </button>
            <button type="button" class="reset_btn" @click="resetFilter">
              Tozalash
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: "filterMenu",
    props: {
      ActivFilterMenu: {
        default: false,
        required: false,
      },
      isActivFilterMenu: {
        default: function () {
          alert("что то пошло не так :(");
        },
      },
    },
  
    data() {
      return {
        filter: {
          id: "",
          cfio: "",
          dfio:"",
          date: ""
        },
      };
    },
  
    methods: {
      filterData() {
        this.$emit("filter", this.filter);
      },
      resetFilter() {
        this.filter.id = "";
        this.filter.cfio = "";
        this.filter.dfio = "";
        this.filter.date="";
        this.filterData();
      },
    },
  };
  </script>
  
  <style>
  .FilterMenu {
    box-shadow: 0px 0px 8px rgb(0 0 0 / 15%);
    background-color: white;
    transition-duration: 0.3s;
    height: 100vh;
    width: 25%;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: 0;
    right: -20%;
    z-index: 111;
  }
  
  .FilterMenuActive {
    right: 0px;
    opacity: 1;
    visibility: visible;
  }
  
  .FilterMenu__body {
    position: relative;
    padding: 35px;
  }
  
  .DisconnectActivFilterMenuBtn {
    color: red;
    font-size: 25px;
    text-align: end;
    font-weight: bold;
    cursor: pointer;
  }
  
  .filter__inputs {
    color: rgb(90, 90, 90);
    margin: 10px 0 0 0;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .filter_btn {
    transition-duration: 0.3s;
    margin: 20px 0 0 0;
    display: inline-block;
    padding: 7px 20px;
    border-radius: 5px;
    background: rgb(55, 144, 228);
    color: white;
  }
  .reset_btn {
    transition-duration: 0.3s;
    margin: 20px 0 0 0;
    display: inline-block;
    padding: 7px 20px;
    border-radius: 5px;
    background: #fff;
    border: 1px solid rgb(55, 144, 228);
    color: rgb(55, 144, 228);
  }
  .filter_btn:hover {
    background: rgb(49, 128, 203);
  }
  .filter__inputs .input {
    margin: 20px 0 0 0;
    padding: 10px 0 10px 10px;
    width: 100%;
    border-radius: 5px;
    border: 1px rgb(175, 175, 175) solid;
  }
  .filter__inputs .input:focus {
    outline: 2px rgba(55, 144, 228, 0.43) solid;
  }
  </style>
  
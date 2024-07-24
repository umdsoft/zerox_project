<template>
    <div>
      <div class="box-all">
        <button
          @click.prevent="isActiveNewsform('add', null)"
          class="table__btnAdd"
        >
          <span>+</span> Qo'shish
        </button>
        <div
          @click="isActiveNewsform"
          :class="{ activeDarkArea: NewsformActive }"
          class="ModalDarkArena"
        ></div>
        <div :class="{ NewsformActive: NewsformActive }" class="News__Add">
          <form class="News__form">
            <select
              class="input form-control"
              v-model="version.type"
              id="exampleFormControlSelect1"
            >
              <option value="android">Android</option>
              <option value="ios">iOS</option>
              
            </select>
            <input
              v-model="version.version"
              placeholder="Ilova versiyasi"
              class="input"
              required
              type="text"
            />
            <textarea
              v-model="version.desc"
              placeholder="O'zgarish"
              class="input"
              required
              name=""
              id=""
              cols="30"
              rows="10"
            ></textarea>
            <div class="News__btns">
              <button @click.prevent="isActiveNewsform" class="News__Btn">
                Yopish
              </button>
              <button class="News__Btn" @click="addData">Qo'shish</button>
            </div>
          </form>
        </div>
  
        <div
          @click="deleteModal = false"
          :class="{ activeDarkArea: deleteModal }"
          class="ModalDarkArena"
        ></div>
        <div :class="{ NewsformActive: deleteModal }" class="News__Add">
          <form class="News__form">
            <h5>Ma'lumot o'chirilsinmi?</h5>
            <div class="News__btns">
              <button @click.prevent="deleteModal = false" class="News__Btn">
                Yo'q
              </button>
              <button class="News__Btn" @click="deleteRequest">Ha</button>
            </div>
          </form>
        </div>
        <div class="table">
          <table>
            <thead>
              <tr>
                <th>№</th>
                <th>Tizim</th>
                <th>Ilova versiyasi</th>
                <th>O'zgarish</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in newsList" :key="index">
                <th>{{ page * limit + index + 1 }}</th>
                <th>{{ item.type }}</th>
                <th>
                  {{ item.version }}
                </th>
                <th>{{ item.desc }}</th>
                <th class="table__btns">
                  <div class="flex">
                    <button
                      class="table__btn"
                      @click="isActiveNewsform('edit', item.id, item)"
                    >
                      O'zgartirish</button
                    ><button class="table__btn" @click="deleteData(item.id)">
                      O'chirish
                    </button>
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div class="pagination">
          <pagination
            :total-items="length"
            :max-visible-pages="6"
            :items-per-page="limit"
            :page="page"
            @page-change="pageChange"
          >
          </pagination>
        </div>
      </div>
    </div>
  </template>
  <script>
  import VueAdsPagination from "vue-ads-pagination";
  export default {
    middleware: ["auth","checkRole"],
    layout: "admin",
    name: "AddNews",
    components: {
      pagination: VueAdsPagination,
    },
    data() {
      return {
        deleteModal: false,
        NewsformActive: false,
        version: {
          type: "android",
          version: "",
          desc: "",
        },
        method: "add",
        editId: null,
        length: 1,
        page: 0,
        limit: 10,
        newsList: [],
      };
    },
    created() {
      this.getData();
    },
    methods: {
      deleteData(id) {
        this.deleteModal = true;
        this.editId = id;
      },
      pageChange(page) {
        this.page = page;
        this.getData();
      },
      deleteRequest() {
        this.$axios.$delete(`version/${this.editId}`).then((res) => {
          this.deleteModal = false;
          this.getData();
        });
      },
      async getData() {
        let news = await this.$axios.$get(
          `version/for-admin?page=${this.page + 1}&limit=${this.limit}`
        );
        this.newsList = news.data;
        this.length = news.count;
      },
      addData() {
        if (this.method == "add") {
          this.$axios.$post("version/create", this.version).then((res) => {
            this.NewsformActive = false;
            this.version.type = "android";
            this.version.version = "";
            this.version.desc = "";
            this.getData();
          });
        }
  
        if (this.method == "edit") {
          this.$axios.$put(`version/${this.editId}`, this.news).then((res) => {
            this.NewsformActive = false;
            this.version.type = "android";
            this.version.version = "";
            this.version.desc = "";
            this.getData();
          });
        }
      },
  
      isActiveNewsform(method, id, data) {
        if (data) {
          this.editId = id;
          this.version.type = data.type;
          this.version.desc = data.desc;
          this.version.version = data.version;
        }
        this.method = method;
        this.NewsformActive = !this.NewsformActive;
      },
    },
  };
  </script>
  
  <style>
  * {
    box-sizing: border-box;
  }
  
  .table {
    margin: 20px 0 0 0;
    position: relative;
  }
  
  th {
    border: 1px solid #eff2f7;
    text-align: left;
    padding: 12px;
    font-size: 14px;
    color: #495057;
  }
  
  th:nth-child(3) {
    max-width: 500px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  
  .table__btnAdd,
  .table__btn {
    display: inline-block;
    background: rgb(49, 206, 67);
    margin: 0 0 0 15px;
    padding: 5px 10px;
    border-radius: 5px;
    color: white;
  }
  
  .table__btn:nth-child(2) {
    background: rgb(206, 49, 49);
  }
  
  .table__btnAdd {
    padding: 5px 18px;
    display: block;
    width: max-content;
    margin: auto 0px auto auto;
  }
  
  .table__btnAdd span {
    font-size: 22px;
  }
  
  .News__Add {
    transition-duration: 0.3s;
    position: absolute;
    border-radius: 5px;
    opacity: 0;
    visibility: hidden;
    top: -20px;
    left: 25%;
    background-color: white;
    z-index: 111;
    box-shadow: 0px 0px 8px rgb(0 0 0 / 15%);
    width: 40%;
    padding: 20px;
  }
  
  .News__form {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  textarea {
    max-height: 350px;
  }
  
  .News__Btn {
    display: inline-block;
    width: max-content;
    background: rgb(49, 206, 67);
    margin: 15px 0 0 0;
    padding: 5px 10px;
    border-radius: 5px;
    color: white;
  }
  
  .News__Btn:nth-child(1) {
    background: rgb(206, 49, 49);
  }
  
  .NewsformActive {
    top: 5px;
    opacity: 1;
    visibility: visible;
  }
  
  .ModalDarkArena {
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 101;
    background: rgba(0, 0, 0, 0.151);
  }
  
  .activeDarkArea {
    opacity: 1;
    visibility: visible;
  }
  
  .input {
    margin: 20px 0 0 0;
    padding: 10px 0 10px 10px;
    width: 100%;
    border-radius: 5px;
    border: 1px rgb(175, 175, 175) solid;
  }
  
  .input:focus {
    outline: 2px rgba(55, 144, 228, 0.43) solid;
  }
  </style>
  
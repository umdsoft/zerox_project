<template>
  <div>
    <div class="box-all">
      <button
        @click.prevent="isActiveNewsform('add', null)"
        class="table__btnAdd"
      >
        <span>+</span> Add
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
            v-model="news.lang"
            id="exampleFormControlSelect1"
          >
            <option value="uz">O'zbek (lotin)</option>
            <option value="ru">Ruscha</option>
            <option value="kr">O'zbek (kirill)</option>
          </select>
          <input
            v-model="news.title"
            placeholder="Mavzu"
            class="input"
            type="text"
          />
          <textarea
            v-model="news.description"
            placeholder="Yangilik"
            class="input"
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
              <th>Mavzu</th>
              <th>Yangilik</th>
              <th>til</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in newsList" :key="index">
              <th>{{ page * limit + index + 1 }}</th>
              <th>{{ item.title }}</th>
              <th>
                {{ item.description }}
              </th>
              <th>{{ item.lang }}</th>
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
      news: {
        lang: "uz",
        title: "",
        description: "",
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
      this.$axios.$delete(`news/${this.editId}`).then((res) => {
        this.deleteModal = false;
        this.getData();
      });
    },
    async getData() {
      let news = await this.$axios.$get(
        `news/for-admin?page=${this.page + 1}&limit=${this.limit}`
      );
      this.newsList = news.data;
      this.length = news.count;
    },
    addData() {
      if (this.method == "add") {
        this.$axios.$post("news/create", this.news).then((res) => {
          this.NewsformActive = false;
          this.news.lang = "uz";
          this.news.title = "";
          this.news.description = "";
          this.getData();
        });
      }

      if (this.method == "edit") {
        this.$axios.$put(`news/${this.editId}`, this.news).then((res) => {
          this.NewsformActive = false;
          this.news.lang = "uz";
          this.news.title = "";
          this.news.description = "";
          this.getData();
        });
      }
    },

    isActiveNewsform(method, id, data) {
      if (data) {
        this.editId = id;
        this.news.title = data.title;
        this.news.description = data.description;
        this.news.lang = data.lang;
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

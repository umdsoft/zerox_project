<template>
  <div>
    <div style="padding: 0 0 30px 0" class="bg-white rounded tableList">
      <div>
        <div @click="$router.go(-1)" class="my-2 mx-6 hidden lg:inline-flex items-center" style="cursor: pointer">
          <svg class="h-5 w-5 text-blue-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
            stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <polyline points="15 6 9 12 15 18" />
          </svg>
          <p class="text-blue-500">{{ $t("back") }}</p>
        </div>
        <div class="flex justify-between text-xs lg:text-sm items-center px-2 w-full">
          <h2 style="
              padding: 10px 0 0 20px;
              font-size: 14px;
              font-weight: bold;
              line-height: 140%;
              color: #37363c;
            ">
            {{ $t("home.reportD") }}
          </h2>
        </div>
        <div style="padding: 20px" class="flex justify-between">
          <SearchComponent @searchData="searchData" :getContracts="getContracts" :url="`/contract/report/search?type=debitor&page=${this.page + 1
            }&limit=${this.limit}`" />
          <div class="flex">
            <button @click="sortModal = true" style="border-radius: 5px"
              class="bt ml-2 text-white bg-t_primary text-center font-bold py-2 mr-0">
              <div style="justify-content: center" class="flex">
                <svg width="18" height="18" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.8464 8H51.8464L31.8064 33.2L11.8464 8ZM0.846415 6.44C8.92642 16.8 23.8464 36 23.8464 36V60C23.8464 62.2 25.6464 64 27.8464 64H35.8464C38.0464 64 39.8464 62.2 39.8464 60V36C39.8464 36 54.7264 16.8 62.8064 6.44C64.8464 3.8 62.9664 0 59.6464 0H4.00642C0.686415 0 -1.19358 3.8 0.846415 6.44Z"
                    fill="#FFFFFF" />
                </svg>

                <span class="ml-2"> {{ $t("debt_list.Sorting") }}</span>
              </div>
            </button>
            <button style="background: #48bb78; border-radius: 5px" @click="exportExcel()"
              class="bt ml-2 text-white bg-t_primary text-center font-bold py-2 rounded mr-0">
              <div class="flex">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M17.7167 10.6977H14.5359V9.06976H17.7167V10.6977ZM17.7167 11.6279H14.5359V13.2558H17.7167V11.6279ZM17.7167 3.95348H14.5359V5.58138H17.7167V3.95352V3.95348ZM17.7167 6.51162H14.5359V8.13951H17.7167V6.51162ZM17.7167 14.186H14.5359V15.814H17.7167V14.186V14.186ZM19.9136 17.3954C19.8228 17.8791 19.2548 17.8907 18.8753 17.907H11.8096V20H10.3987L0 18.1395V1.8628L10.4601 0H11.8096V1.85349H18.6323C19.0162 1.86976 19.4388 1.84185 19.7728 2.07672C20.0068 2.42091 19.9841 2.85814 20 3.25347L19.9909 15.3605C19.9796 16.0372 20.0522 16.7279 19.9136 17.3954V17.3954ZM8.33121 13.7465C7.70418 12.4442 7.06578 11.1512 6.44097 9.84882C7.05894 8.58138 7.66785 7.30931 8.27445 6.0372C7.75871 6.06279 7.24297 6.09534 6.72953 6.13256C6.34554 7.08836 5.89797 8.0186 5.59808 9.00698C5.31863 8.07442 4.94832 7.17672 4.6098 6.26743C4.10996 6.29534 3.61012 6.32557 3.11031 6.3558C3.63738 7.54654 4.19859 8.72089 4.70976 9.91859C4.10769 11.0814 3.54426 12.2605 2.96035 13.4302C3.45789 13.4512 3.95547 13.4721 4.45301 13.4791C4.80746 12.5535 5.2482 11.6628 5.55719 10.7186C5.83437 11.7326 6.30465 12.6698 6.6909 13.6395C7.23843 13.6791 7.78371 13.714 8.33125 13.7465H8.33121ZM18.9164 2.95798H11.8096V3.95348H13.6272V5.58138H11.8096V6.51162H13.6272V8.13951H11.8096V9.06976H13.6272V10.6977H11.8096V11.6279H13.6272V13.2558H11.8096V14.186H13.6272V15.814H11.8096V16.8894H18.9164V2.95798Z"
                    fill="white" />
                </svg>
                <span class="ml-2"> {{ $t("debt_list.Upload") }}</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div class="tab-z">
        <button class="tab-z-item" :class="{ __active: status == 'all' }" @click="changeStatus('all')">
          {{ $t("debt_list.total") }}
          <span class="count-z count-primary">{{ length }}</span>
        </button>
        <button class="tab-z-item" :class="{ __active: status == '1' }" @click="changeStatus('1')">
          {{ $t("debt_list.totals") }}
          <span class="count-z count-success">{{ act }}</span>
        </button>
        <button class="tab-z-item" :class="{ __active: status == '2' }" @click="changeStatus('2')">
          {{ $t("debt_list.totalss") }}
          <span class="count-z count-warning">{{ pass }}</span>
        </button>
      </div>
      <!--  -->
      <div class="px-8">
        <table class="table-z">
          <thead>
            <tr>
              <th>{{ $t("debt_list.Debt") }}</th>
              <th>{{ $t("debt_list.debtsumm") }}</th>
              <th>{{ $t("debt_list.date") }}</th>
              <th>{{ $t("debt_list.datt") }}</th>
              <th>{{ $t("debt_list.debtc") }}</th>
            </tr>
          </thead>
          <tbody v-if="contracts.length > 0">
            <tr class="cursor-pointer" v-for="(item, index) in contracts" :key="index" @click="viewFullItem(item)">
              <td>
                <div>
                  <div class="status-circle" :class="{
                    online: item.status == '2',
                    offline: item.status == '3' || item.status == '4',
                  }"></div>
                  <nuxt-link :to="localePath({ name: 'user', query: { id: item.creditor_uid } })">{{
                    item.creditor_name }}
                  </nuxt-link>
                </div>
              </td>
              <td>
                <div>
                  <span class="t-chip">
                    <img src="@/assets/img/$.png" alt="" />

                    <b>
                      {{
                        item.amount &&
                        item.amount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                      }}
                      {{ item.currency }}</b>
                  </span>
                </div>
              </td>
              <td>
                <div>
                  <span class="t-chip">
                    <img src="@/assets/img/Date.png" alt="" />
                    <b> {{ dateFormat(item.created_at) }}</b>
                  </span>
                </div>
              </td>
              <td>
                <div>
                  <span class="t-chip">
                    <img src="@/assets/img/Date.png" alt="" />
                    <b> {{ dateFormat(item.sana) }}</b>
                  </span>
                </div>
              </td>

              <td>
                <div>
                  <span class="t-doc">
                    <img src="@/assets/img/book.png" alt="" />
                    {{ item.number }}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <template v-if="contracts.length == 0">
          <div class="p-3 rounded-lg text-center w-full bg-t_primary flex justify-center mt-3">
            <div class="inline-flex align-center text-white">
              <span class="mr-4">
                <img src="@/assets/img/datanot.png" alt="" />
              </span>
              {{ $t("result.malumot") }}.
            </div>
          </div>
        </template>

        <div class="pagination2 pagination">
          <pagination :total-items="length" :max-visible-pages="6" :items-per-page="limit" :page="page"
            @page-change="pageChange">
          </pagination>
        </div>
      </div>

      <div slot="pdf-content" ref="tableToExcel" class="tableToExcel" style="padding: 2rem">
        <div style="display: block" class="table-responsive uns">
          <table ref="exportable_table" class="table table-centered table-nowrap mt-4">
            <thead class="table-light">
              <tr>
                <th>№</th>
                <th>{{ $t("list.creditor") }}</th>
                <th>{{ $t("list.deb") }}</th>
                <th>{{ $t("debt_list.debtsumm") }}</th>
                <th>{{ $t("debt_list.date") }}</th>
                <th>{{ $t("debt_list.datt") }}</th>
                <th>{{ $t("debt_list.debtsum") }}</th>
                <th>{{ $t("debt_list.summy") }}</th>
                <th>{{ $t("debt_list.Status") }}</th>
                <th>Qarz shartnomasi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in contracts" :key="i">
                <td>{{ page * limit + i + 1 }}</td>
                <td>{{ item.creditor_name }}</td>
                <td>
                  <span v-if="item.currency == 'UZS'">UZS</span>
                  <span v-if="item.currency == 'USD'">USD</span>
                </td>
                <td>{{ item.amount }}</td>
                <td>{{ item.created_at }}</td>
                <td>
                  <span v-if="item.status == 2">{{ item.sana }}</span><span
                    v-if="item.status == 3 || item.status == 4">{{
                      item.created_at
                    }}</span>
                </td>

                <td>
                  <span v-if="item.status == '2'">{{ item.inc }}</span>
                  <span v-if="item.status == '3' || item.status == '4'">0</span>
                </td>
                <td>
                  <span v-if="item.status == '2'"> {{ item.vos_summa }}</span>
                  <span v-if="item.status == '3' || item.status == '4'">0</span>
                </td>
                <td>
                  <span class="text-green-500" v-if="item.status == '2'">{{
                    $t("home.Completeds")
                    }}</span>
                  <span class="text-red-500" v-if="item.status == '3' || item.status == '4'">{{
                    $t("home.Rejected")
                    }}</span>
                </td>
                <td>{{ item.number }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <ZModal v-if="viewModal" :width="520" @closeModal="viewModal = false">
        <template #modal_body v-if="viewData">
          <div class="text-center font-semibold text-xl mb-8">
            {{ viewData.number }} - {{ $t("debt_list.sonli") }}
          </div>

          <div class="mb-6">
            <div class="flex items-center justify-between mb-4">
              <div class="text-base font-medium mr-3">
                {{ $t("list.creditor") }}:
              </div>
              <div class="text-base font-semibold text-t_primary">
                {{ viewData.creditor_name }}
              </div>
            </div>

            <div class="flex items-center justify-between mb-4">
              <div class="text-base font-medium mr-3">
                {{ $t("action.a11") }}:
              </div>
              <div class="text-base font-semibold text-t_primary">
                <span v-if="viewData.amount != null">
                  {{
                    viewData.amount
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                  }}
                  {{ viewData.currency }}</span>
                <span v-if="viewData.amount == null">-</span>
              </div>
            </div>

            <div class="flex items-center justify-between mb-4">
              <div class="text-base font-medium mr-3">
                {{ $t("debt_list.a10") }}:
              </div>
              <div class="text-base font-semibold text-t_primary">
                <span v-if="viewData.inc != null">
                  {{
                    viewData.inc
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                  }}
                  {{ viewData.currency }}</span>
                <span v-if="viewData.inc == null">-</span>
              </div>
            </div>

            <div class="flex items-center justify-between mb-4">
              <div class="text-base font-medium mr-3">
                {{ $t("action.a9") }}:
              </div>
              <div class="text-base font-semibold text-t_primary">
                <span v-if="viewData.vos_summa != null">{{
                  viewData.vos_summa
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                }}
                  {{ viewData.currency }}</span>
                <span v-if="viewData.vos_summa == null">-</span>
              </div>
            </div>

            <div v-if="viewData.status == '2'" class="flex items-center justify-between mb-4">
              <div class="text-base font-medium mr-3">
                {{ $t("debt_list.date") }}:
              </div>
              <div class="text-base font-semibold text-t_primary">
                {{ dateBeauty(viewData.created_at) }}
              </div>
            </div>
            <div v-if="viewData.status == '3' || viewData.status == '4'"
              class="flex items-center justify-between mb-4">
              <div class="text-base font-medium mr-3">
                {{ $t("comp.time") }}:
              </div>
              <div class="text-base font-semibold text-t_primary">
                {{ dateBeauty(viewData.created_at) }}
              </div>
            </div>
            <div v-if="viewData.status == '2'" class="flex items-center justify-between mb-4">
              <div class="text-base font-medium mr-3">
                {{ $t("debt_list.datt") }}:
              </div>
              <div class="text-base font-semibold text-t_primary">
                {{ dateBeauty(viewData.sana) }}
              </div>
            </div>
            <div class="flex items-center justify-between mb-4">
              <div class="text-base font-medium mr-3">
                {{ $t("debt_list.Status") }}:
              </div>
              <div class="text-base font-semibold text-t_primary">
                <span class="text-green-500" v-if="viewData.status == '2'">{{
                  $t("home.Completeds")
                  }}</span>
                <span class="text-red-500" v-if="viewData.status == '3' || viewData.status == '4'">
                  {{ $t("home.Rejected") }}
                </span>
              </div>
            </div>
          </div>

          <div class="bottom-actions grid grid-cols-2 gap-6 mb-4">
            <a class="flex w-full" :href="`https://pdf.zerox.uz/index.php?id=${viewData.uid}&lang=uz&download=0`">
              <button
                class="rounded-lg justify-center w-full py-2.5 px-4 flex items-center bg-t_primary text-white text-sm">
                <img class="mr-2 w-5" src="@/assets/img/pdf.png" alt="" />
                {{ $t("action.a7") }}
              </button>
            </a>

            <a :href="`https://pdf.zerox.uz/index.php?id=${viewData.uid}&lang=uz&download=1`" download
              class="rounded-lg justify-center py-2.5 px-2 flex items-center bg-t_gr text-white text-sm">
              <img class="mr-2 w-5" src="@/assets/img/pdf-2.png" alt="" />
              {{ $t("action.a8") }}
            </a>
          </div>
        </template>
      </ZModal>

      <ZModal v-if="sortModal" :width="400" @closeModal="sortModal = false">
        <template #modal_body>
          <div class="text-md font-bold mb-2 mt-4">
            {{ $t("debt_list.Sorting") }}
          </div>
          <div class="form-date-picker2 mb-5">
            <date-picker range value-type="YYYY-MM-DD" format="DD.MM.YYYY" v-model="sortDate"
              :placeholder="$t('placeholder.oraliq')"></date-picker>
          </div>
          <button class="btn-z w-full" @click="searchDateFunction">
            {{ $t("searching") }}
          </button>
        </template>
      </ZModal>
    </div>
  </div>
</template>

<script>
import SearchComponent from "../../../components/SearchComponent.vue";
import dateformat from "dateformat";
import XLSX from "xlsx";
import VueAdsPagination from "vue-ads-pagination";
export default {
  middleware: "auth",
  created() {
    let links = [{ title: "Hisobot (debitor)", name: "hisobot-debitor" }];
    this.$store.commit("changeBreadCrumb", links);
  },
  async mounted() {
    this.getContracts();
  },
  components: {
    SearchComponent,
    pagination: VueAdsPagination,
  },
  methods: {
    searchDateFunction() {
      this.getContracts();
      this.sortModal = false;
    },
    viewFullItem(item) {
      this.viewModal = true;
      this.viewData = item;
    },
    async exportExcel(type, fn, dl) {
      const date = new Date();
      var elt = await this.$refs.tableToExcel;
      var wb = XLSX.utils.table_to_book(elt, { sheet: "Sheet JS" });
      return dl
        ? XLSX.write(wb, {
          bookType: type,
          bookSST: true,
          type: "base64",
        })
        : XLSX.writeFile(
          wb,
          fn ||
          ("Hisobot (debitor)" +
            " " +
            date.toLocaleString().slice(0, 10) +
            "." || "SheetJSTableExport.") + (type || "xlsx")
        );
    },
    async setPage({ page, limit }) {
      this.page = page;
      this.limit = limit;
      this.getContracts();
      window.scrollTo(0, 0);
    },

    async getContracts() {
      let start =
        this.sortDate && this.sortDate?.length ? this.sortDate[0] : "0";
      let end = this.sortDate && this.sortDate?.length ? this.sortDate[1] : "0";
      start = start ? start : "0";
      end = end ? end : "0";
      try {
        const response = await this.$axios.$get(
          `/contract/report?type=debitor&status=${this.status}&page=${this.page + 1
          }&limit=${this.limit}&start=${start}&end=${end}`
        );
        const exp = await this.$axios.$get(
          `/contract/exp-report?type=creditor`
        );
        this.contracts = response.data;
        this.exportss = exp.data;
        this.act = response.act;
        this.pass = response.pass;
        this.length = response.count;
        console.log("cc", this.contracts);
      } catch (e) {
        console.log(e);
      }
    },

    changeStatus(status) {
      this.status = status;
      this.page = 0;
      this.getContracts();
    },

    searchData(data) {
      this.contracts = data.data;
      this.length = data.count;
    },

    dateFormat(date) {
      let date1 = dateformat(date, "isoDate");
      date1 = date1.split("-").reverse();
      date1 = date1.join(".");
      return date1;
    },

    pageChange(page) {
      this.page = page;
      this.getContracts();
    },
  },
  data() {
    return {
      sortDate: null,
      sortModal: false,
      viewModal: false,
      status: "all",
      page: 0,
      count: 0,
      act: 0,
      pass: 0,
      limit: 10,
      length: 0,
      tableHeader: [
        "№",
        "Qarzdor nomi",
        "Qarz summasi",
        "Qarz berilgan sana ",
        "Tugallangan sana",
        "Qaytarilgan summa",
        "Voz kechilgan summa",
        "Holat",
        "Hujjatlar",
      ],
      contracts: [],
      exportss: null,

      viewData: null,
    };
  },
};
</script>

<style lang="scss" scoped>
.bt {
  width: max-content;
  padding: 0 10px;
}

.greenCercle,
.redCercle {
  width: 15px;
  height: 15px;
  border-radius: 50%;
}

.greenCercle {
  background: #48bb78;
}

.redCercle {
  background: #fe5e58;
}

.hisobot {
  width: 95%;
  background: #ffffff;
  box-shadow: 0px 3px 14px rgba(0, 0, 0, 0.11);
  border-radius: 10px;
  margin: 10px auto;

  .hisobot__body {
    padding: 16px 17px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .hisobot__name {
      font-weight: 400;
      font-size: 12px;
      line-height: 15px;
      letter-spacing: 1px;
      color: #2d3748;
    }

    .hisobot__date,
    .hisobot__pirce {
      display: flex;
      align-items: center;
      padding: 3px 6px;
      border-radius: 15px;

      background: #f5f5f5;
      border-radius: 10px;

      span {
        font-weight: 400;
        font-size: 12px;
        color: #37363c;
        margin: 0 0 0 3px;
      }
    }

    .hisobot__ids {
      display: flex;
      align-items: center;

      span {
        font-weight: 600;
        font-size: 12px;
        line-height: 15px;
        color: #3182ce;
        margin: 0 0 0 5px;
      }
    }
  }
}
</style>

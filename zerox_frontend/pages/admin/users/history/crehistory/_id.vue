<template>
    <div>
      <div class="box-all">
        <div class="title-admin">
          <h4>Olingan qarz (Kreditor)</h4>
          <!-- <button class="btn-simple" to="/admin/home">
            <div class="flex items-center">
              <svg
                width="22"
                height="22"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.7167 10.6977H14.5359V9.06976H17.7167V10.6977ZM17.7167 11.6279H14.5359V13.2558H17.7167V11.6279ZM17.7167 3.95348H14.5359V5.58138H17.7167V3.95352V3.95348ZM17.7167 6.51162H14.5359V8.13951H17.7167V6.51162ZM17.7167 14.186H14.5359V15.814H17.7167V14.186V14.186ZM19.9136 17.3954C19.8228 17.8791 19.2548 17.8907 18.8753 17.907H11.8096V20H10.3987L0 18.1395V1.8628L10.4601 0H11.8096V1.85349H18.6323C19.0162 1.86976 19.4388 1.84185 19.7728 2.07672C20.0068 2.42091 19.9841 2.85814 20 3.25347L19.9909 15.3605C19.9796 16.0372 20.0522 16.7279 19.9136 17.3954V17.3954ZM8.33121 13.7465C7.70418 12.4442 7.06578 11.1512 6.44097 9.84882C7.05894 8.58138 7.66785 7.30931 8.27445 6.0372C7.75871 6.06279 7.24297 6.09534 6.72953 6.13256C6.34554 7.08836 5.89797 8.0186 5.59808 9.00698C5.31863 8.07442 4.94832 7.17672 4.6098 6.26743C4.10996 6.29534 3.61012 6.32557 3.11031 6.3558C3.63738 7.54654 4.19859 8.72089 4.70976 9.91859C4.10769 11.0814 3.54426 12.2605 2.96035 13.4302C3.45789 13.4512 3.95547 13.4721 4.45301 13.4791C4.80746 12.5535 5.2482 11.6628 5.55719 10.7186C5.83437 11.7326 6.30465 12.6698 6.6909 13.6395C7.23843 13.6791 7.78371 13.714 8.33125 13.7465H8.33121ZM18.9164 2.95798H11.8096V3.95348H13.6272V5.58138H11.8096V6.51162H13.6272V8.13951H11.8096V9.06976H13.6272V10.6977H11.8096V11.6279H13.6272V13.2558H11.8096V14.186H13.6272V15.814H11.8096V16.8894H18.9164V2.95798Z"
                  fill="white"
                />
              </svg>
              <span class="ml-1">{{ $t("debt_list.Upload") }}</span>
            </div>
          </button> -->
        </div>
        <div class="table">
          <table v-if="users != null">
            <thead>
              <tr>
                <th>Qarz beruvchi</th>
                <th>Qarz summasi</th>
                <th>Qolgan qarz summasi</th>
                <th>Qarz berilgan sana</th>
                <th>Qarz shartnomasi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in users" :key="index">
                <td>
                  <nuxt-link
                    :to="{
                      name: 'admin-users-id___uz',
                      params: { id: item.debitor_uid },
                    }"
                    >{{ item.debitor_name }}</nuxt-link
                  >
                </td>
                <td>
                  {{
                    item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                  }}
                  {{ item.currency }}
                </td>
                <td>
                  {{
                    item.residual_amount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                  }}
                  {{ item.currency }}
                </td>
                <td>{{ dateFormat(item.created_at) }}</td>
                <td>
                  <a
                    :href="`https://pdf.zerox.uz/index.php?id=${item.uid}&lang=uz&download=1`"
                    >{{ item.number }}</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
  
          <div class="pagination">
            <pagination
              :total-items="count"
              :max-visible-pages="10"
              :items-per-page="limit"
              :page="page"
              @page-change="setPage"
            >
            </pagination>
          </div>
          <div
            slot="pdf-content"
            ref="tableToExcel"
            class="tableToExcel"
            style="padding: 2rem"
          >
            <div style="display: block" class="table-responsive uns">
              <table
                ref="exportable_table"
                class="table table-centered table-nowrap mt-4"
              >
                <thead class="table-light">
                  <tr>
                    <th>Qarz beruvchi</th>
                    <th>Qarz summasi</th>
                    <th>Qolgan qarz summasi</th>
                    <th>Qarz berilgan sana</th>
                    <th>Qarz shartnomasi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in users" :key="index">
                    <td>{{ item.debitor_name }}</td>
                    <td>
                      {{
                        item.amount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                      }}
                      {{ item.currency }}
                    </td>
                    <td>
                      {{
                        item.residual_amount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                      }}
                      {{ item.currency }}
                    </td>
                    <td>{{ dateFormat(item.created_at) }}</td>
                    <td>{{ item.number }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import dateformat from "dateformat";
  import XLSX from "xlsx";
  export default {
    middleware: ["auth", "checkRole"],
    layout: "admin",
    data() {
      return {
        count: 0,
        users: null,
        page: 0,
        length: 45,
        limit: 10,
        isModal: false,
        isEdit: false,
        isPassword: false,
        id: null,
        isDelete: false,
      };
    },
    async mounted() {
      this.getData();
    },
    methods: {
      async exportExcel(type, fn, dl) {
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
                ("Tizim foydalanuvchilari (yuridik shaxslar)" + "." ||
                  "SheetJSTableExport.") + (type || "xlsx")
            );
      },
  
      setPage(page) {
        this.page = page;
        window.scrollTo(0, 0);
        this.getData();
      },
      dateFormat(date) {
        let date1 = dateformat(date, "isoDate");
        date1 = date1.split("-").reverse();
        date1 = date1.join(".");
        return date1;
      },
      async getData() {
        let users = await this.$axios.$get(
          `/dashboard/con/history/${this.$route.params.id}?page=${
            this.page + 1
          }&limit=${this.limit}&type=creditor`
        );
        this.users = users.data;
        console.log("cc".this.users);
      },
    },
  };
  </script>
  
  <style lang="scss">
  .fix-vh {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba($color: #000000, $alpha: 0.6);
    z-index: 98;
  }
  </style>
  
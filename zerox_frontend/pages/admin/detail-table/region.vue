<template>
  <div class="flex justify-center items-center">
    <div class="">
      <div class="flex flex-col px-4 py-4 rounded bg-white justify-end mb-4">
    <div class="flex justify-between my-2 items-center">
       <span class="text-xl">Taxlil viloyat kesimida</span>
           <button @click="exportExcel('xls')" class="btn-simple" >
          <fa icon="file-excel" /> {{ $t('debt_list.Upload') }}
        </button>
    </div> 
  
      <table
        class="table-auto bg-white border-collapse border border-gray-300"
      >
        <thead>
          <tr>
            <th
              class="bg-blue-500 text-white border border-gray-300 px-4 py-2"
             >
            №
            </th>
            <th
              class="bg-blue-500 text-white border border-gray-300 px-4 py-2"
             >
            Viloyat nomi
            </th>
            <th
              class="bg-blue-500 text-white border border-gray-300 px-4 py-2"
             >
            Foydalanuvchilar soni
            </th>
            <th
              class="bg-blue-500 text-white border border-gray-300 px-4 py-2"
             >
            Foydalanuvchilar ulushi
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            class="border border-gray-300"
            v-for="(region, index) in regions"
            :key="region.region"
          >
            <td class="border border-gray-300 px-4 py-1">{{ index + 1 }}</td>

            <td class="border underline border-gray-300 px-4 py-1">
              {{ region.region }}
            </td>

            <td class="border border-gray-300 px-4 py-1">
              {{ region.cnt }}
            </td>

            <td class="border border-gray-300 px-4 py-1">
              {{ region.userProfit }}
            </td>
          </tr>
          <tr>
            <td colspan="2" class="text-center border border-gray-300 py-1">
              Jami
            </td>
            <td class="text-center border border-gray-300">

            </td>
            <td class="text-center border border-gray-300">
            </td>
          </tr>
        </tbody>
      </table>
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
            class="table-auto bg-white border-collapse border border-slate-500"
          >
            <thead>
              <tr>
                <th
                  class="
                    bg-blue-500
                    text-white
                    border border-slate-500
                    px-4
                    py-2
                  "
                >
                  №
                </th>
                 <th
                  class="
                    bg-blue-500
                    text-white
                    border border-slate-500
                    px-4
                    py-2
                  "
                >
                  Viloyat nomi
                </th>
                 <th
                  class="
                    bg-blue-500
                    text-white
                    border border-slate-500
                    px-4
                    py-2
                  "
                >
                  Soni
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="border border-slate-500"
                v-for="(region, index) in regions"
                :key="region.name"
              >
                <td class="border border-slate-500 px-4 py-1">
                  {{ index + 1 }}
                </td>

                <td class="border underline border-slate-500 px-4 py-1">
                  {{ region.region }}
                </td>

                <td class="border border-slate-500 px-4 py-1">
                  {{ region.cnt }}
                </td>

                <td class="border border-slate-500 px-4 py-1">
                  {{ region.userProfit }}
                </td>
              </tr>
              <tr>
                <td
                  colspan="2"
                  class="text-center border border-slate-500 py-1"
                >
                  Jami
                </td>
                <td class="text-center border border-slate-500">
                </td>
                <td class="text-center border border-slate-500">
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div style="width: 400px">
      <div>
        <div id="chart">
          <apexchart
            ref="piechart"
            type="pie"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import XLSX from "xlsx";
export default {
  middleware: ["auth","checkRole"],
  layout: "admin",
  data: () => ({
    regions:[],
    tableHeads: [],
      series: [],
    chartOptions: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 430,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  }),
  async mounted(){
    const response = await this.$axios.$get('/dashboard/statistic')
    this.regions = response.byRegion
    console.log(this.regions)
     response.byRegion.forEach(element => {
      this.series.push(element.cnt)
      this.chartOptions.labels.push(element.region)
      console.log(element)
    });
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
              ("excelFile" + "." || "SheetJSTableExport.") + (type || "xlsx")
          );
    },
  },
};
</script>

<style>
</style>
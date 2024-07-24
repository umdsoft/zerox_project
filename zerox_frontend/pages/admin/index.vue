<template>
  <div>
    <div class="flex items-stretch gap-x-5">
      <div class="flex-1">
        <div class="bg-white p-5 h-full">
          <div id="chart">
            <apexchart
              type="pie"
              :options="chartOptions"
              :series="series" 
            ></apexchart>
          </div>

          <div class="mt-2">
             <nuxt-link to="/admin/detail-table/region"><h3 class="text-center">Hududlar kesimida</h3></nuxt-link>
          </div>
        </div>
      </div>
      <div class="flex-1">
        <div class="bg-white p-5 h-full">
          <div id="chart">
            <apexchart
              type="pie"
              :options="chartOptions2"
              :series="series2"
            ></apexchart>
          </div>
          <div class="mt-2">
            <nuxt-link to="/admin/detail-table/age"><h3 class="text-center">Yosh kesimida</h3></nuxt-link>
          </div>
        </div>
      </div>
      <div class="flex-1">
        <div class="bg-white p-5 h-full">
          <div id="chart">
            <apexchart
              type="pie"
              :options="chartOptions3"
              :series="series3"
            ></apexchart>
          </div>
          <div class="mt-2">
             <nuxt-link to="/admin/detail-table/gender"><h3 class="text-center">Jins kesimida</h3></nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["auth","checkRole"],
  layout: "admin",
  data() {
    return {
      series: [],
      chartOptions: {
        chart: {
          width: '100%',
          type: "pie",
        },
        labels: [],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      series3: [],
      chartOptions3: {
        chart: {
          width: '100%',
          type: "pie",
        },
        labels: [],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
        series2: [],
      chartOptions2: {
        chart: {
          width: '100%',
          type: "pie",
        },
        labels: [],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  },
  async mounted(){
    const response = await this.$axios.$get('/dashboard/statistic')
    response.byGender.forEach(element => {
      if(element.gender == 1){
        this.chartOptions3.labels.push('Erkaklar')
        this.series3.push(element.cnt)
      }
      if(element.gender == 2){
        this.chartOptions3.labels.push('Ayollar')
        this.series3.push(element.cnt)
      }
    });
    response.byRegion.forEach(element => {
      this.series.push(element.cnt)
      this.chartOptions.labels.push(element.region)
      console.log(element)
    });
  response.byAge.forEach(element => {
      this.series2.push(element.count)
      this.chartOptions2.labels.push(element.age_range)
      console.log(element)
    });
}
};
</script>

<style></style>

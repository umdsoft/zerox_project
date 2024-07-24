<template>
  <div v-if="contract !== null" class="rounded-xl bg-white">
    <table class="table-auto my-8 shadow-md text-sm w-full">
      <tbody>
        <tr style="border-bottom: 1px solid #d9d5ec" class="py-4 w-full">
          <td class="px-8 py-4">Qarz bergan shaxs</td>
          <td class="px-4 py-4">
            {{ contract.debitor_name }}
          </td>
        </tr>

        <tr style="border-bottom: 1px solid #d9d5ec" class="py-4 w-full">
          <td class="px-8 py-4">{{$t('debt_list.debtsumm')}}</td>
          <td class="px-4 py-4">
            {{
             
              contract.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            }}
            {{ contract.currency }}
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #d9d5ec" class="py-4 w-full">
          <td class="px-8 py-4">{{$t('debt_list.date')}} </td>
          <td class="px-4 py-4">
            {{ dateFormat(contract.created_at) }}
          </td>
        </tr>

        <tr style="border-bottom: 1px solid #d9d5ec" class="py-4 w-full">
          <td class="px-8 py-4"> {{$t('debt_list.dateee') }}</td>
          <td class="px-4 py-4">
            {{ dateFormat(contract.end_date) }}
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #d9d5ec" class="py-4 w-full">
          <td class="px-8 py-4">{{ $t('debt_list.debtsum') }}</td>
          <td class="px-4 py-4">
            {{
              contract.refundable_amount
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            }}
            {{ contract.currency }}
          </td>
        </tr>
 <tr style="border-bottom: 1px solid #d9d5ec" class="py-4 w-full">
          <td class="px-8 py-4">{{ $t('debt_list.debtsums') }}</td>
          <td class="px-4 py-4">
            {{
              contract.residual_amount
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            }}
            {{ contract.currency }}
          </td>
        </tr>

        <tr style="border-bottom: 1px solid #d9d5ec" class="py-4 w-full">
          <td class="px-8 py-4">Qarz shartnomasi</td>
          <td class="px-4 py-4">
            <nuxt-link
              class="text-blue-500"
              :to="{ name: 'pdf-generate___'+ $i18n.locale, query: { id: contract.id } }"
              >{{ contract.number }}</nuxt-link
            >
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex mb-12  mx-auto items-center flex-col" style="max-width:23rem">
      <nuxt-link class="w-full bg-blue-500 text-center my-2 py-2 rounded text-white px-4"  :to="{
            name: 'debt-extend-ask___'+ $i18n.locale,
            query: {
              id: contract.id,
            },
          }" >
          {{ $t("list.clong") }}
      </nuxt-link>
      <nuxt-link class="w-full bg-blue-500 text-center py-2 rounded text-white px-4"  :to="{
            name: 'debt-refund___'+ $i18n.locale,
            query: {
              contract: contract.id,
            },
          }">
       
          {{ $t("list.return") }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import dateformat from "dateformat";
export default {
  middleware:'auth',
  data: () => ({
    contract: null,
  }),
  mounted() {
    this.getContract();
  },
  methods: {
    async getContract() {
      try {
        const contract = await this.$axios.get(
          `/contract/by/${this.$route.query.id}`
        );
        // console.log(contract);
        this.contract = contract.data.data;
      } catch (e) {
        this.$toast.error("Xatolik yuz berdi !");
      }
    },
    dateFormat(date) {
      let date1 = dateformat(date, "isoDate");
      date1 = date1.split("-").reverse();
      date1 = date1.join(".");
      return date1;
    },
  },
  name: "mobile-table",
};
</script>

<style>
</style>
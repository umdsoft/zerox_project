<template>
  <div v-if="contract !== null" class="rounded-xl bg-white">
    <table class="table-auto my-8 shadow-md text-sm w-full">
      <tbody>
        <tr style="border-bottom: 1px solid #d9d5ec" class="py-4 w-full">
          <td class="px-8 py-4">Qarz bergan shaxs</td>
          <td class="px-4 py-4">
            <nuxt-link :to="{ name: 'user___'+ $i18n.locale, query: { id: item.debitor_uid } }"
              >{{ contract.debitor_name }}
            </nuxt-link>
          </td>
        </tr>

        <tr style="border-bottom: 1px solid #d9d5ec" class="py-4 w-full">
          <td class="px-8 py-4">{{$t('debt_list.debtsumm')}}</td>
          <td class="px-4 py-4">
            {{
              contract.amount &&
              contract.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            }}
            {{ contract.currency }}
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #d9d5ec" class="py-4 w-full">
          <td class="px-8 py-4">{{$t('debt_list.date')}}</td>
          <td class="px-4 py-4">
            {{ contract.created_at && dateFormat(contract.created_at) }}
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #d9d5ec" class="py-4 w-full">
          <td class="px-8 py-4">{{ $t('debt_list.datt') }}</td>
          <td class="px-4 py-4">
            {{ contract.end_date && dateFormat(contract.end_date) }}
          </td>
        </tr>

        <tr style="border-bottom: 1px solid #d9d5ec" class="py-4 w-full">
          <td class="px-8 py-4">{{ $t('debt_list.debtsum') }}</td>
          <td class="px-4 py-4">
            {{ contract.inc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}
            {{ contract.currency }}
          </td>
        </tr>
        <tr style="border-bottom: 1px solid #d9d5ec" class="py-4 w-full">
          <td class="px-8 py-4">{{ $t('debt_list.summy') }} </td>
          <td class="px-4 py-4">
            {{
              contract.vos_summa
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
        const response = await this.$axios.get(
          `/contract/reports/${this.$route.query.id}?type=creditor`
        );
        if (response.status == 200) {
          this.contract = response.data.data[0];
          console.log(this.contract);
        }
      } catch (e) {
        console.log(e);
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
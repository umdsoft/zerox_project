<template>
  <div class="pay-bill bg-white rounded px-4 py-4">
    <div
      @click="$router.go(-1)"
      class="my-2 mx-6 hidden lg:inline-flex items-center"
      style="cursor: pointer"
    >
      <div
        class="flex justify-between text-xs lg:text-sm items-center px-2 py-3"
      >
        <h2>{{$t(mobil.practikum)}}</h2>
      </div>
    </div>
    <ul
      class="
  
        flex
        justify-center

        list-none
        border-b-0
        pl-0
        mb-2
        mt-1
      "
      id="tabs-tab"
      role="tablist"
    >
      <li class="nav-item" role="presentation">
        <button
          @click="tab = 0"
          style="position:relative"
          :class="tab === 0 ? 'bg-blue-500 text-white ' : ''"
          class="
            nav-link
            py-2
            block
            font-medium
            rounded
            text-xs
            leading-tight
            border-x-0 border-t-0 border-b-2 border-transparent
            px-12
            my-1

            focus:border-transparent
            active
          "
          id="tabs-home-tab"
          data-bs-toggle="pill"
          data-bs-target="#tabs-home"
          role="tab"
          aria-controls="tabs-home"
          aria-selected="true"
        >
        {{$t('debt_list.Kirm')}}
             
        </button>
      
      </li>
      <li class="nav-item" role="presentation">
        <button
          @click="tab = 1"
          :class="tab === 1 ? 'bg-blue-500 text-white ' : ''"
          class="
            nav-link
            ml-4
            rounded
            py-2
            block
            font-medium
            text-xs
            leading-tight
            border-x-0 border-t-0 border-b-2 border-transparent
            px-12
            my-1
   
            focus:border-transparent
          "
          id="tabs-profile-tab"
          data-bs-toggle="pill"
          data-bs-target="#tabs-profile"
          role="tab"
          aria-controls="tabs-profile"
          aria-selected="false"
        > 
        {{$t('debt_list.Chiqim')}}
        </button>
  
      </li>
    </ul>
    <div v-if="tab == 0">
      <table class="iksweb">
        <thead>
          <tr>
            <th>№</th>
            <th>{{$t('debt_list.a19')}}</th>
            <th>Miqdori</th>
            <th>Sababi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>29.08.2022 yil</td>
            <td><span class="text-green-600">+300 000 so'm</span></td>
            <td>Payme elekron to'lov tizimi orqali hisob to'ldirildi</td>
          </tr>
         
          <tr>
            <td>2</td>
            <td>30.08.2022 yil</td>
            <td><span class="text-green-600">+100 000 so'm</span></td>
            <td>
              Mobil hisob raqamga Umidbek Jumaniyozov tomonidan o'tkazildi
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="tab == 1">
      <table class="iksweb">
        <thead>
          <tr>
            <th>№</th>
            <th>{{$t('debt_list.a19')}}</th>
            <th>Miqdori</th>
            <th>Sababi</th>
          </tr>
        </thead>
        <tbody>
        
          <tr>
            <td>1</td>
            <td>30.08.2022 yil</td>
            <td><span class="text-red-600">-13 000 so'm</span></td>
            <td>14/8/2022-6 sonli shartnoma uchun mobil hisobdan yechildi</td>
          </tr>
          <tr>
            <td>2</td>
            <td>30.08.2022 yil</td>
            <td><span class="text-red-600">-100 000 so'm</span></td>
            <td>Umidbek Jumaniyozovning mobil hisobiga o'tkazildi</td>
          </tr>
        
        </tbody>
      </table>
  </div>
  </div>
</template>

<script>
export default {
  data:()=>({
    tab:0
  })
};
</script>

<style>
table.iksweb {
  text-decoration: none;
  border-collapse: collapse;
  width: 100%;
  text-align: center;
}
table.iksweb th {
  font-weight: normal;
  font-size: 14px;
  color: #ffffff;
  background-color: #3995f7;
}
table.iksweb td {
  font-size: 15px;
  color: #354251;
}
table.iksweb td,
table.iksweb th {
  white-space: pre-wrap;
  padding: 10px 11px;
  line-height: 15px;
  vertical-align: middle;
  border: 1px solid #000000;
}
table.iksweb tr:hover {
  background-color: #f9fafb;
}
table.iksweb tr:hover td {
  color: #354251;
  cursor: default;
}
</style>
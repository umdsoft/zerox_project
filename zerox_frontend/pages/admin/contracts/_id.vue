<template>
  <div>
  <div class="rounded-xl bg-white px-8 py-8 block" v-if="contract != null">
  <div class="flex  justify-between w-100 h-16">
    <span>{{contract.number}}-sonli qarz shartnomasi</span>
    <div class="bts">

       <div class="bottom-actions grid grid-cols-2 gap-6 mb-4">
           

            <a
              :href="`https://pdf.zerox.uz/index.php?id=${contract.uid}&lang=uz&download=1`"
              download
              class="
                rounded-lg
                justify-center
                py-2.5
                px-4
                flex
                items-center
                bg-t_gr
                text-white text-sm
              "
            >
              <img class="mr-2 w-5" src="@/assets/img/pdf-2.png" alt="" />
              {{ $t('action.a8')  }}  
            </a>

            <a
              :href="`https://pdf.zerox.uz/index.php?id=${contract.uid}&lang=uz&download=1&all=1`"
              download
              class="
                rounded-lg
                justify-center
                py-2.5
                px-4
                flex
                items-center
                bg-t_gr
                text-white text-sm
              "
            >
              <img class="mr-2 w-5" src="@/assets/img/pdf-2.png" alt="" />
              Barcha hujjatlarni yuklab olish
            </a>
          </div>
    </div>
  </div>
<br>
    <div>
        <p><b>{{$t('debt_list.debtber')}} (Debitor):</b> {{contract.debitor_name}}</p>
            <p><b>{{ $t('list.creditor') }} (Kreditor):</b> {{contract.creditor_name}}</p>
            <p><b>{{ $t('action.a11') }}:</b> {{contract.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}} {{contract.currency}}</p>
            <p><b>Qarz rasmiylashtirilgan vaqt:</b> {{dateFormat(contract.created_at)}} yil</p>
    </div>

    <div class="table" v-if="acts!=null">
       <table>
         <thead>
            <tr>
                <th>№</th>
                <th>Hujjat turi</th>
                <th>Yaratilgan sana</th>
                <th>Qaytarilgan miqdor</th>                              
                <th>Voz kechilgan miqdor</th>
                <th>Qoldiq qarz miqdori </th>  
                <th> {{$t('debt_list.dateee') }}</th> 
                <th>Amaliyot</th>
                <th>Amaliyot kim tomonidan bajarildi </th>  
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) in acts" :key="item.id">
                <td>{{index+1}}</td>
                <td> 
                    <p v-if="item.type == 0">Qarz mablag‘i olinganligi to‘g‘risida dalolatnoma</p>
                    <p  v-if="item.type == 1">Qarz qisman qaytarilganligi to‘g‘risida dalolatnoma</p>
                    <p  v-if="item.type == 2">Qarz to‘liq qaytarilganligi to‘g‘risida dalolatnoma</p>
                    <p v-if="item.type == 3">Qarz muddati uzaytirilganligi to‘g‘risida dalolatnoma</p>
                    <p v-if="item.type == 4">Qarzdan voz kechilganligi to‘g‘risida dalolatnoma</p>
                    <p v-if="item.type == 6">Qarz muddati uzaytirilganligi to‘g‘risida dalolatnoma</p>
                </td>
                <td style="text-align:center;">{{dateFormat(item.created_at)}} yil</td>                
                <td style="text-align:center;">{{item.refundable_amount == 0 ? '-' : item.refundable_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}} <span v-if="item.refundable_amount != 0">{{contract.currency}}</span></td>
                
                <td style="text-align:center;">{{item.vos_summa == 0 ? '-' : item.vos_summa.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}} <span v-if="item.vos_summa != 0">{{contract.currency}}</span></td>
                <td style="text-align:center;">{{item.residual_amount == 0 ? '-' : item.residual_amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}} <span v-if="item.residual_amount != 0">{{contract.currency}}</span></td>
                <td style="text-align:center;">{{dateFormat(item.end_date)}} yil</td>
                <td style="text-align:center;"> 
                    <span class="badge badge-success" v-if="item.status == 1">Tasdiqlangan</span>
                    <span class="badge badge-danger" v-if="item.status == 2">{{ $t('home.Rejected') }}</span>
                    <span class="badge badge-secondary" v-if="item.status == 0">Jarayonda</span>
                </td>
                <td v-if="item.res_name != null">{{ item.res_name }}</td>
                <td v-if="item.res_name == null">Tizim tomonidan {{dateFormat(item.created_at)}} 23:59 da rad qilindi.</td>
            </tr>
             
        </tbody>
       </table>
    </div>
  </div>
  </div>
</template>

<script>
import dateformat from "dateformat";
export default {
  middleware: ["auth","checkRole"],
    layout:'admin',
    mounted() {
        this.getContractById(this.$route.params.id)
    },  
    data:() => ({
        contract:null,
        acts: null
    }),
    methods:{

        dateFormat(date) {
            let date1 = dateformat(date, "isoDate");
            date1 = date1.split("-").reverse();
            date1 = date1.join(".");
            return date1;
        },
      async  getContractById (id) {
            try {
                const response = await this.$axios.get(`/contract/admin/contract/${id}`)
                if(response.status === 200) {
                    this.contract = response.data.contract
                    this.acts = response.data.acts
                    console.log(this.acts)
                }
            }
            catch(e) {
                console.log(e)
            }
        }
    }


}
</script>

<style lang="scss">
bts{
    height: 70px
}
.bt {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin: 0px auto;
    color: #fff;
    background: #3d95ff;
    border-radius: 5px;
    
    svg{
        padding-right: 10px;
    }
    &:hover{
        background: #368df7;
    }
  }

.dtype{
    display: flex;
}
</style>
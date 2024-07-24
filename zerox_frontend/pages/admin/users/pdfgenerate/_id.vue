<template>
  <div>
  <div class="rounded-xl bg-white px-8 py-8 block">
    <div class="page-title text-3xl rounded font-bold text-white text-center py-5 bg-blue-500">
        Foydalanuvchi
        <p class="mt-2">(Jismoniy shaxslar bo'yicha)</p>
    </div>
    <div  v-if="contract != null" class="rounded font-bold  text-white text-center mt-4 w-1/2 mx-auto py-5 px-8 bg-blue-500">
          {{contract.number}}-sonli shartnomaga va ilova hujjatlar
        </div>  
    <div class="container rounded-xl justify-center ">
      <div
        class="flex flex-col justify-center  rounded-xl px-4 py-6 mt-12"
        style="width: 100%"
        ref="pdfGenerate"
        v-if="contract != null"
      >
        
      
      
       
        
       
      </div>
 
    
    </div>
         <div class="flex justify-center my-6
       
          text-white
          mt-6
          items-center
    
          rounded"><span class="bg-t_primary
          hover:bg-blue-700  py-2       px-8"> {{ $t('action.a8')  }}  </span></div>

  </div>
  </div>
</template>

<script>
import dateformat from "dateformat";

export default {
  middleware: "checkRole",
  layout:'admin',
  mounted () {
    this.getContract(this.$route.params.id)
  },
  data:() => ({
   contract:null,
   acts:null,
  }),
  methods:{

          dateFormat(date) {
            let date1 = dateformat(date, "isoDate");
            date1 = date1.split("-").reverse();
            date1 = date1.join(".");
            return date1;
        },
 async getContract(id) { 
      try {
        const response = await this.$axios.get(`/contract/my/${id}`)
        if(response.status == 200) {
          this.contract = response.data.data
          this.acts = response.data.acts
        }
      }
      catch(e) {
  
      }
    }
  },
  
}
</script>

<style lang="scss" scoped>
.container {
  width: 8.5in;
  min-height: 11in;
  padding: 2rem 3rem;
  margin: 0 auto;
  margin-top: 2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
}
</style>>


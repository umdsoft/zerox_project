<template>
    <div class="news" style="display:block">
         <h3>{{news_title}}</h3>
         <p class="my-4" style="text-align:justify">{{ news_content }}</p>
         <button class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-10 rounded my-5">Batafsil ma'lumot</button>
    </div>
</template>

<script>
    export default {
        name:"newscard",
        props:['news_title','news_content']
    }
</script>

<style scoped>
    .news {
      padding: 28px 23px 53px 23px  ;
      border-radius: 10px;
      
      background: white;
     
    
    
    }
    
   
</style>
<template>
  <div>
    <div class="bottom-box mt-10 px-4 bg-white rounded-xl mb-4">
      <div
        class="flex flex-col-reverse md:flex-row lg:flex-row items-center justify-between"
      >
        <div class="bottom-left flex-1 py-4">
          <div class="text-bottom flex">
            <p class="text-xl font-normal text-t_black mr-1">
              {{ $t("home.new") }}
            </p>
            <h1 class="text-xl font-normal text-t_blue">Zero</h1>
            <h2 class="text-xl font-normal text-red-500 mr-1">X</h2>
            <p class="text-xl font-normal text-t_black">
              {{ $t("home.phon") }}
            </p>
          </div>
          <p class="text-lg font-normal text-t_black mt-3 leading-tight">
            {{ $t("home.comfurt") }}
          </p>
          <p class="text-lg font-normal text-t_black leading-tight">
            {{ $t("home.sped") }}
          </p>

          <div class="market mt-6">
            <div class="market-box flex justify-between mb-6">
              <div class="playm cursor-pointer">
                <img src="@/assets/img/googlePlayBtn.svg" alt="" />
              </div>
              <div class="appstore ml-2 cursor-pointer">
                <img src="@/assets/img/appstoreBtn.svg" alt="" />
              </div>
            </div>
            <nuxt-link :to="{name:'news___'+ $i18n.locale}">
              <div
                class="buttons w-full text-white bg-t_primary hover:bg-blue-700 text-center py-5 rounded-md cursor-pointer"
              >
                {{ $t("home.btns") }}
              </div>
            </nuxt-link>
            <div class="social_icons mx-auto flex justify-evenly mt-4">
              <a href="https://instagram.com/zeroxuz"
                ><img src="@/assets/img/instagram_icon.svg" alt=""
              /></a>

              <a href="https://t.me/ZeroxUZ">
                <img src="@/assets/img/telegram_logo.svg" alt=""
              /></a>

              <a href="https://youtube.com/channel/UCanYHFqJPnWAz-l162Aof4w"
                ><img src="@/assets/img/youtube_icon.svg" alt=""
              /></a>

              <a href="https://www.facebook.com/ZeroxUZ/"
                ><img src="@/assets/img/facebookIcon.svg" alt=""
              /></a>
              <a href="https://mobile.twitter.com/zeroxuz/"
                ><img src="@/assets/img/twitter_icon.svg" alt=""
              /></a>
            </div>
          </div>
        </div>
        <div class="bottom-right shrink-0 flex-1" style="min-width: 200px">
          <img width="100%" height="100%" src="@/assets/img/phone.png" alt="" />
        </div>
        
      </div>
      <br>
      <div class="pb-3">
        <p>©2022-2024. "ZEROX" MChJ.</p>
        <p>Elektron pochta manzili: <a href="mailto:info@zerox.uz">info@zerox.uz</a></p>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "bottom",
};
</script>

<style lang="css" scoped>
div.bottom-box {
  box-shadow: 0px 5px 14px rgba(0, 0, 0, 0.06);
}
div.bottom-left {
  max-width: 473px;
}
div.cent{
  padding-bottom: 10px;
  width:100%;
  display: grid;
  justify-content: center;
}
div.market {
  max-width: 310px;
}
</style>

<template>
  <div class="banner">
    <swiper style="width: 100%" class="swiper" :options="options">
      <swiper-slide v-for="(it, index) in images" :key="index">
        <img :src="it" class="img" alt="" />
      </swiper-slide>
      <div class="swiper-pagination px-8 vertical" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import img1 from "@/assets/img/img.jpg";


import "swiper/css/swiper.css";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },

  data: () => ({
    images: [img1],
    options: {

      direction: "vertical",
      pagination: {
        el: '.swiper-pagination',
        clickable: true


      },
      loop: true,
      effect: "fade",
    },
  }),
};
</script>

<style lang="scss" scoped>
@media (max-width: 767px) {
  .banner {
    height: 150px !important;

    .img {
      height: 150px !important;
    }
  }
}

@media (max-width: 1024px) {
  .banner {
    height: 300px !important;

    .img {
      height: 300px !important;
    }
  }
}

@-webkit-keyframes progress {
  0% {
    stroke-dashoffset: -75;
    opacity: 1;
  }

  95% {
    stroke-dashoffset: 0;
    opacity: 1;
  }

  100% {
    opacity: 0;
    stroke-dashoffset: 0;
  }
}

@-moz-keyframes progress {
  0% {
    stroke-dashoffset: -75;
    opacity: 1;
  }

  95% {
    stroke-dashoffset: 0;
    opacity: 1;
  }

  100% {
    opacity: 0;
    stroke-dashoffset: 0;
  }
}

@-o-keyframes progress {
  0% {
    stroke-dashoffset: -75;
    opacity: 1;
  }

  95% {
    stroke-dashoffset: 0;
    opacity: 1;
  }

  100% {
    opacity: 0;
    stroke-dashoffset: 0;
  }
}

@keyframes progress {
  0% {
    stroke-dashoffset: -75;
    opacity: 1;
  }

  95% {
    stroke-dashoffset: 0;
    opacity: 1;
  }

  100% {
    opacity: 0;
    stroke-dashoffset: 0;
  }
}




.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background-color: #fff !important;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-pagination-bullet {
  background-color: white !important;
  margin-top: 30px;
  opacity: 1;
}

.swiper-pagination-bullet--svg-animation {
  width: 26px;

  height: 26px;
  margin: 0 6px !important;
  display: inline-block;
}

.swiper-pagination-bullet--svg-animation svg {
  -webkit-transform: rotate(-90deg);
  -moz-transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  -o-transform: rotate(-90deg);
  transform: rotate(-90deg);
}

.swiper-pagination-bullet--svg-animation .svg__circle-inner {
  stroke: #000;
  fill: transparent;
  -webkit-transition: all 0.7s ease;
  -moz-transition: all 0.7s ease;
  -ms-transition: all 0.7s ease;
  -o-transition: all 0.7s ease;
  transition: all 0.7s ease;
}

.swiper-pagination-bullet-active .svg__circle {
  stroke: #000;
  stroke-dasharray: 75;
  stroke-dashoffset: 0;
  -webkit-animation: progress 7s ease-in-out 1 forwards;
  -moz-animation: progress 7s ease-in-out 1 forwards;
  -ms-animation: progress 7s ease-in-out 1 forwards;
  animation: progress 7s ease-in-out 1 forwards;
}

.swiper-pagination-bullet-active .svg__circle-inner {
  fill: #000;
}

#swiper {
  width: 500px;
  height: 300px;
}

#swiper .swiper-container {
  padding-bottom: 3rem;
}

#swiper .swiper-slide {
  background-color: #eaeaea;
}

#swiper .swiper-pagination {
  position: absolute;
  bottom: 0;
}

.banner {
  height: 345px;
  position: relative;
  border-radius: 10px;
  background: white;
  overflow: hidden;
}

img {
  width: 100%;
  border-radius: 10px;
  height: 345px;
}
</style>

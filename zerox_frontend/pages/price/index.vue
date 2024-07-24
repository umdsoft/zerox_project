<template>
  <div class="bg-white rounded pb-12">
    <div>
      <iframe src="https://pdf.zerox.uz/tarif.pdf" width="100%" height="1000px" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      message: "Hello Vue!",
    };
  },
  mounted() {
    if (this.$auth.user.is_active == 1 && this.$auth.user.is_contract == 0) {
      this.$router.push(this.localePath({ name: 'universal_contract' }));
    }
    this.accordion();
  },
  methods: {
    accordion() {
      let question = document.querySelectorAll(".question");

      question.forEach((question) => {
        question.addEventListener("click", (event) => {
          const active = document.querySelector(".question.active");
          if (active && active !== question) {
            active.classList.toggle("active");
            active.nextElementSibling.style.maxHeight = 0;
          }
          question.classList.toggle("active");
          const answer = question.nextElementSibling;
          if (question.classList.contains("active")) {
            answer.style.maxHeight = answer.scrollHeight + "px";
          } else {
            answer.style.maxHeight = 0;
          }
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.question::before {
  content: "\203A";
  font-size: 2.2rem;
  position: absolute;
  left: 20px;
  transition: 0.2s;
}

.question.active::before {
  transform: rotate(90deg);
}

.question.active {
  span {
    svg {
      transition: 0.2s;
      transform: rotate(180deg);
    }
  }
}

.answercont {
  max-height: 0;
  overflow: hidden;
  transition: 0.3s;
}

.answer {
  padding: 0 20px 20px;
  line-height: 1.5rem;
}

.service {
  text-align: center;
  padding: 45px;
  font-weight: 700;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  background-color: rgb(76, 144, 210);
  color: white;
  padding: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  width: 300px;

  span {
    svg {
      transition: 0.2s;
    }
  }
}

.call {
  text-align: center;
  color: rgb(76, 144, 210);
}
</style>

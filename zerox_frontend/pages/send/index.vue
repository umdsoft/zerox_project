<template>
  <div class="bg-white rounded pb-12">
    <h2 class="service">Bizga murojaat yo'llang</h2>

    <div class="text-center">
       
     <textarea name="" id="" cols="40" rows="10" class="bt p-5 mb-5 bg-white text-gray text-lg rounded" placeholder="Murojaat matnini kiriting"></textarea>
    </div>
   
  </div>
</template>

<script>
export default {
   middleware:'auth',
  data() {
    return {};
  },

  created() {
    let links = [{ title: "Qo'llab quvvatlash", name: "call-center" }];
    this.$store.commit("changeBreadCrumb", links);
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
.bt {
  border: 1px solid #3182ce;
  width: 306px;

  outline: none;
  box-shadow: 0px 5px 14px rgba(0, 0, 0, 0.06);
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

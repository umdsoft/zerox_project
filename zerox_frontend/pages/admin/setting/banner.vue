<template>
  <div>
    <div v-if="isModalVisible"  class="modal">
      <div class="modal__content">
        <div class="flex justify-between items-center">
                <p  class="inline-block mb-2 font-bold text-gray-700"
      >Banner qo'shish</p>
      <div @click="toogleModal">
        <svg class="h-6 w-6 text-black cursor-pointer"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
      </div>
          </div>
     
          <div class="grid mt-4 grid-cols-2 gap-2"> 
             <input
      type="text"
      class="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
      id="exampleFormControlInput1"
      placeholder="Example label"
    />
     <input
      type="text"
      class="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
      id="exampleFormControlInput1"
      placeholder="Example label"
    />
          </div>
   
  </div>
      </div>

    <div class="box-all">
      <div class="title-admin">
        <h4>Reklama va e'lonlar</h4>
        <button class="btn-simple" @click="toogleModal">
     Banner qo'shish
        </button>
      </div>

      <div class="table">
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Rasm</th>
              <th>Banner nomi</th>
              <th>Til</th>
              <th>Sozlash</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>2</td>
              <td>
                <button class="edit">
                  <fa icon="edit" />
                </button>
                <button class="trash">
                  <fa icon="trash" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ["auth","checkRole"],
  mounted() {
    console.log(this.$refs);
  },
  data:() => ({
    isModalVisible :false
  }), 
  layout: "admin",
  methods: {
    fileUpload(index) {
      this.$refs.input[index].click();
    },

    toogleModal () {
      this.isModalVisible = !this.isModalVisible
    }
  },
};
</script>

<style lang="scss">
.modal {
 position: fixed;
 display: flex;
 justify-content: center;
 align-items: center;
 width: 100vw;
 height:100vh;
 background: rgba(0, 0, 0, 0.687);
}

.modal__content {
  width: 70%;
  padding: 2rem;
  height: 600px;
  border-radius: 10px;
  background: white;
}
.edit {
  font-size: 18px;
  cursor: pointer;
  padding-right: 8px;
  color: rgb(0, 102, 255);
}
.trash {
  font-size: 18px;
  cursor: pointer;
  color: rgb(231, 84, 39);
}
</style>
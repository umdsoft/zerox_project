<template>
  <div class="bg-white rounded-xl flex flex-col px-4 py-4">
    <div @click="$router.go(-1)" class="my-2 mx-6 hidden lg:inline-flex items-center" style="cursor: pointer">
      <svg class="h-5 w-5 text-blue-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
        stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" />
        <polyline points="15 6 9 12 15 18" />
      </svg>
      <p class="text-blue-500">{{ $t("back") }}</p>
    </div>

    <div v-if="step == 1">
      <div>
        <div style="margin-top: 30px; justify-content: center; margin-bottom: 40px"
          class="flex items-center place-self-center">
          <input style="padding: 0 0 0 10px" :value="id" v-mask="'######/AA'" @input="setUserId" @change="disabled"
            type="text" class="bt input bg-white text-sm rounded" :placeholder="$t('placeholder.id')" />

          <div class="user-birthday">
            <input style="padding: 0 0 0 10px" v-mask="'#########'" v-model="stir" @change="disabled" type="text"
              class="bt input bg-white text-sm rounded" :placeholder="$t('placeholder.stir')" />
          </div>
          <!-- ss -->
          <button style="background: #3182ce" :class="bg - t_primary"
            class="bt p-5 btn text-white rounded text-center text-base" @click="search">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19.9399 18.5624L13.4474 12.0699C14.4549 10.7675 14.9999 9.17496 14.9999 7.49997C14.9999 5.49498 14.2174 3.61498 12.8024 2.19749C11.3874 0.779996 9.50246 0 7.49997 0C5.49748 0 3.61248 0.782496 2.19749 2.19749C0.779996 3.61248 0 5.49498 0 7.49997C0 9.50246 0.782496 11.3874 2.19749 12.8024C3.61248 14.2199 5.49498 14.9999 7.49997 14.9999C9.17496 14.9999 10.765 14.4549 12.0674 13.4499L18.5599 19.9399C18.579 19.959 18.6016 19.9741 18.6264 19.9844C18.6513 19.9947 18.678 20 18.7049 20C18.7318 20 18.7585 19.9947 18.7834 19.9844C18.8083 19.9741 18.8309 19.959 18.8499 19.9399L19.9399 18.8524C19.959 18.8334 19.9741 18.8108 19.9844 18.7859C19.9947 18.761 20 18.7343 20 18.7074C20 18.6805 19.9947 18.6538 19.9844 18.6289C19.9741 18.6041 19.959 18.5815 19.9399 18.5624ZM11.46 11.46C10.4 12.5174 8.99496 13.0999 7.49997 13.0999C6.00497 13.0999 4.59998 12.5174 3.53998 11.46C2.48249 10.4 1.89999 8.99496 1.89999 7.49997C1.89999 6.00497 2.48249 4.59748 3.53998 3.53998C4.59998 2.48249 6.00497 1.89999 7.49997 1.89999C8.99496 1.89999 10.4025 2.47999 11.46 3.53998C12.5174 4.59998 13.0999 6.00497 13.0999 7.49997C13.0999 8.99496 12.5174 10.4025 11.46 11.46Z"
                fill="white" />
            </svg>
            {{ $t("searching") }}
          </button>
        </div>
        <div v-if="user != null">
          <div class="userCart">
            <div class="userCart__info">
              <div class="userCart__start">
                <div class="userCart__Icon">
                  <svg width="20" height="20" viewBox="0 0 106 122" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M53 61C69.7281 61 83.2857 47.3465 83.2857 30.5C83.2857 13.6535 69.7281 0 53 0C36.2719 0 22.7143 13.6535 22.7143 30.5C22.7143 47.3465 36.2719 61 53 61ZM42.1871 72.4375C18.8813 72.4375 0 91.4523 0 114.923C0 118.831 3.14688 122 7.02723 122H98.9728C102.853 122 106 118.831 106 114.923C106 91.4523 87.1188 72.4375 63.813 72.4375H42.1871V72.4375Z" />
                  </svg>
                </div>
                <div class="userCart__name">
                  <!-- {{user}} -->
                  {{ user.company }}
                </div>
              </div>
              <div class="userCart__end">
                <div class="userCart__Id">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M8.00414 5.442C8.00414 4.93533 8.41481 4.52533 8.9208 4.52533H11.1241C14.1581 4.52533 16.6428 6.95 16.6428 9.972C16.6428 12.9927 14.1581 15.418 11.1241 15.418H8.92014C8.41347 15.418 8.00347 15.0073 8.00347 14.5013V5.44133L8.00414 5.442ZM9.83747 13.5013C9.83747 13.5473 9.8748 13.5847 9.9208 13.5847H11.1241C13.1735 13.5847 14.8095 11.9533 14.8095 9.97133C14.8095 7.98933 13.1735 6.358 11.1241 6.358H9.92014C9.90914 6.358 9.89825 6.36018 9.88809 6.36441C9.87794 6.36864 9.86872 6.37483 9.86098 6.38264C9.85323 6.39045 9.84711 6.39972 9.84296 6.4099C9.83881 6.42009 9.83672 6.431 9.83681 6.442V13.5013H9.83747ZM5.59014 4.59333C5.71054 4.59307 5.82982 4.61655 5.94114 4.66242C6.05246 4.7083 6.15364 4.77567 6.23891 4.86068C6.32417 4.94569 6.39183 5.04668 6.43803 5.15787C6.48423 5.26906 6.50805 5.38826 6.50814 5.50867L6.51747 14.432C6.51774 14.6751 6.42141 14.9084 6.24969 15.0805C6.07797 15.2526 5.84492 15.3494 5.60181 15.3497C5.35869 15.3499 5.12543 15.2536 4.95333 15.0819C4.78124 14.9102 4.6844 14.6771 4.68414 14.434L4.67481 5.51067C4.67463 5.39029 4.69817 5.27105 4.74407 5.15977C4.78998 5.04849 4.85735 4.94734 4.94235 4.86209C5.02734 4.77685 5.1283 4.70918 5.23945 4.66295C5.3506 4.61673 5.46976 4.59284 5.59014 4.59267V4.59333Z"
                      fill="#37363C" />
                    <path
                      d="M3.33333 0C2.89559 0 2.46214 0.0862192 2.05772 0.253735C1.6533 0.421251 1.28584 0.666782 0.976311 0.976311C0.351189 1.60143 0 2.44928 0 3.33333V16.6667C0 17.5507 0.351189 18.3986 0.976311 19.0237C1.28584 19.3332 1.6533 19.5788 2.05772 19.7463C2.46214 19.9138 2.89559 20 3.33333 20H16.6667C17.5507 20 18.3986 19.6488 19.0237 19.0237C19.6488 18.3986 20 17.5507 20 16.6667V3.33333C20 2.89559 19.9138 2.46214 19.7463 2.05772C19.5788 1.6533 19.3332 1.28584 19.0237 0.976311C18.7142 0.666782 18.3467 0.421251 17.9423 0.253735C17.5379 0.0862192 17.1044 0 16.6667 0H3.33333ZM1.33333 3.33333C1.33333 2.8029 1.54405 2.29419 1.91912 1.91912C2.29419 1.54405 2.8029 1.33333 3.33333 1.33333H16.6667C17.1971 1.33333 17.7058 1.54405 18.0809 1.91912C18.456 2.29419 18.6667 2.8029 18.6667 3.33333V16.6667C18.6667 17.1971 18.456 17.7058 18.0809 18.0809C17.7058 18.456 17.1971 18.6667 16.6667 18.6667H3.33333C2.8029 18.6667 2.29419 18.456 1.91912 18.0809C1.54405 17.7058 1.33333 17.1971 1.33333 16.6667V3.33333Z"
                      fill="#37363C" />
                  </svg>
                  <span>{{ user.uid }}</span>
                </div>
              </div>
            </div>
            <div class="userCart__additionalInfo">
              <hr />
              <div class="flex items-center justify-between pr-3 pt-2">
                <div class="userCart__text">
                  <span v-if="status == 3">
                    Foydalanuvchining debitor va kreditor qarzdorliklari to‘g‘risidagi
                    ma’lumotlar bilan tanishib chiqqan holda qarz shartnomasi
                    rasmiylashtirish uchun foydalanuvchidan ruxsat so‘rash talab
                    qilinadi.</span>
                  <span v-if="status == 2">
                    So‘rovnoma foydalanuvchi tomonidan qabul qilinmadi. Qayta so‘rov
                    yuborishingiz mumkin.</span>
                  <span v-if="status == 5">
                    So‘rovnoma foydalanuvchi tomonidan qabul qilinmadi. Qayta so‘rov
                    yuborishingiz mumkin.</span>

                  <span v-if="status == 1">
                    So‘rovnoma foydalanuvchi tomonidan qabul qilindi.</span>
                  <span v-if="status == 4">
                    So‘rovnoma yuborildi. So‘rovnoma qabul qilinganidan so‘ng
                    foydalanuvchining qarzdorliklari to‘g‘risidagi ma’lumotlar bilan
                    tanishishingiz mumkin.</span>
                </div>
                <div>
                  <div class="userCart__date" v-if="status == 4">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7 0C3.1402 0 0 3.1402 0 7C0 10.8598 3.1402 14 7 14C10.8598 14 14 10.8598 14 7C14 3.1402 10.8598 0 7 0ZM7 12.6C3.9123 12.6 1.4 10.0877 1.4 7C1.4 3.9123 3.9123 1.4 7 1.4C10.0877 1.4 12.6 3.9123 12.6 7C12.6 10.0877 10.0877 12.6 7 12.6Z"
                        fill="#37363C" />
                      <path d="M7.6998 3.5H6.2998V7.2898L8.6049 9.5949L9.5947 8.6051L7.6998 6.7102V3.5Z"
                        fill="#37363C" />
                    </svg>
                    <span id="timer"> {{ waitingTime }} </span>
                  </div>

                  <div class="userCart__date" v-if="status == 1">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.2002 8.35L7.3002 10.45L10.8002 6.25" stroke="#48BB78" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" />
                      <path
                        d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
                        stroke="#48BB78" stroke-width="2" />
                    </svg>
                    <p style="color: #48bb78">Ruxsat berildi</p>
                  </div>

                  <div class="userCart__date" v-if="status == 2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.1004 10.1L5.90039 5.90002M10.1004 5.90002L5.90039 10.1" stroke="#FE5E58"
                        stroke-width="2" stroke-linecap="round" />
                      <path
                        d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
                        stroke="#FE5E58" stroke-width="2" />
                    </svg>
                    <p style="color: #fe5e58">Rad etildi</p>
                  </div>
                </div>
              </div>

              <div class="userCart__btns">
                <nuxt-link v-if="user?.id" :to="localePath({ name: 'give-money', query: { id: user?.uid } })"
                  class="userCart__btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M3.66978 3.875H13.4541V4.875H3.66978V3.875ZM3.66978 8.875H8.61451V9.875H3.66978V8.875ZM13.0737 6.375H3.66978V7.375H12.0959L13.0737 6.375ZM6.60079 16.92C6.76527 17.1128 6.97404 17.2608 7.20833 17.3506C7.44262 17.4405 7.6951 17.4695 7.94307 17.435H12.7147C12.8283 17.435 12.9371 17.3889 13.0174 17.3069C13.0977 17.2248 13.1428 17.1135 13.1428 16.9975C13.1428 16.8815 13.0977 16.7702 13.0174 16.6881C12.9371 16.6061 12.8283 16.56 12.7147 16.56H7.94307C7.38598 16.55 7.48504 16.0556 7.56332 15.9025C7.66537 15.7228 7.74488 15.5306 7.79997 15.3306C7.83654 15.1697 7.8193 15.0009 7.75103 14.8511C7.68275 14.7014 7.56736 14.5793 7.42328 14.5044C7.19179 14.3978 6.9325 14.3717 6.6851 14.43C6.43771 14.4884 6.21584 14.628 6.05348 14.8275C5.84312 15.0494 5.55081 15.3888 5.27074 15.7188C5.4438 15.0256 5.66822 14.1362 5.88837 13.2688C5.95145 13.0711 5.9389 12.8563 5.85322 12.6678C5.76755 12.4792 5.61513 12.3308 5.42667 12.2525C5.21797 12.1793 4.98987 12.1898 4.78842 12.2818C4.58696 12.3737 4.42715 12.5404 4.34123 12.7481C4.07705 13.2675 1.98566 16.8494 1.96487 16.8856C1.93604 16.935 1.917 16.9896 1.90884 17.0465C1.90067 17.1033 1.90354 17.1612 1.91728 17.2169C1.93103 17.2727 1.95537 17.3251 1.98893 17.3712C2.02248 17.4173 2.0646 17.4562 2.11286 17.4856C2.21033 17.5451 2.32694 17.5626 2.43704 17.5343C2.54713 17.5059 2.64169 17.434 2.69992 17.3344C2.77819 17.2 4.44763 14.3419 4.97415 13.3875C4.57789 14.95 4.14126 16.6887 4.11558 16.845C4.08667 16.9599 4.09535 17.0813 4.14029 17.1906C4.18523 17.3 4.26397 17.3913 4.36447 17.4506C4.47641 17.5074 4.60364 17.5244 4.7261 17.4991C4.84857 17.4737 4.95929 17.4074 5.04081 17.3106C5.11786 17.2394 5.26218 17.07 5.62603 16.6381C5.96503 16.2306 6.31225 15.8303 6.66744 15.4375C6.80075 15.2937 6.88147 15.3575 6.8032 15.4987C6.65009 15.6965 6.55079 15.9321 6.51535 16.1816C6.47992 16.4312 6.5096 16.6859 6.6014 16.92H6.60079Z"
                      fill="white" />
                    <path
                      d="M15.8995 12.3094V18.75H1.22304V1.25H15.8995V4.37063L16.7128 3.53938C16.838 3.41317 16.9752 3.3001 17.1225 3.20188V0.625C17.1225 0.45924 17.0581 0.300268 16.9434 0.183058C16.8287 0.065848 16.6732 0 16.511 0H0.611518C0.449333 0 0.293791 0.065848 0.179109 0.183058C0.0644275 0.300268 0 0.45924 0 0.625V19.375C0 19.5408 0.0644275 19.6997 0.179109 19.8169C0.293791 19.9342 0.449333 20 0.611518 20H16.511C16.6732 20 16.8287 19.9342 16.9434 19.8169C17.0581 19.6997 17.1225 19.5408 17.1225 19.375V12.1419C16.7474 12.345 16.3136 12.4044 15.8995 12.3094Z"
                      fill="white" />
                    <path
                      d="M19.6471 6.16313L19.3273 5.83625C19.4908 5.61548 19.5735 5.34322 19.5613 5.06665C19.549 4.79008 19.4424 4.52661 19.2601 4.32188C19.0234 4.10865 18.7138 3.99965 18.3988 4.01861C18.0838 4.03758 17.789 4.18297 17.5784 4.42313L9.91913 12.25L9.40729 14.2138C9.39919 14.2394 9.3982 14.2669 9.40444 14.2932C9.41068 14.3194 9.42391 14.3433 9.44265 14.3624C9.46139 14.3814 9.48491 14.3947 9.51062 14.4009C9.53633 14.4071 9.56321 14.406 9.5883 14.3975L11.503 13.8681L18.6528 6.56063L18.9549 6.87C18.976 6.89154 18.9927 6.91711 19.0042 6.94526C19.0156 6.97341 19.0215 7.00359 19.0215 7.03406C19.0215 7.06454 19.0156 7.09472 19.0042 7.12287C18.9927 7.15102 18.976 7.17659 18.9549 7.19813L15.9481 10.2713C15.8564 10.3651 15.8049 10.4923 15.8049 10.6249C15.805 10.7575 15.8566 10.8847 15.9484 10.9784C16.0402 11.0722 16.1647 11.1248 16.2944 11.1247C16.4242 11.1247 16.5486 11.0719 16.6403 10.9781L19.6471 7.905C19.8731 7.67388 20.0001 7.3605 20.0001 7.03375C20.0001 6.707 19.8731 6.39362 19.6471 6.1625V6.16313Z"
                      fill="white" />
                  </svg>
                  <span>Ma’lumotlarni ko‘rmasdan qarz berish</span>
                </nuxt-link>

                <button @click="seeInfo" v-if="status != 1" :disabled="status == 4"
                  :class="status == 4 ? 'userCart__btn_dis' : ''" class="userCart__btn">
                  <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10.2564 4.23529H2.05128C1.50725 4.23529 0.985497 4.4584 0.600807 4.85554C0.216117 5.25268 0 5.79131 0 6.35294V10.5882C0 11.1499 0.216117 11.6885 0.600807 12.0856C0.985497 12.4828 1.50725 12.7059 2.05128 12.7059H3.07692V16.9412C3.07692 17.222 3.18498 17.4913 3.37733 17.6899C3.56967 17.8884 3.83055 18 4.10256 18H6.15385C6.42586 18 6.68674 17.8884 6.87908 17.6899C7.07143 17.4913 7.17949 17.222 7.17949 16.9412V12.7059H10.2564L15.3846 16.9412V0L10.2564 4.23529ZM13.3333 12.2824L11.2821 10.5882H2.05128V6.35294H11.2821L13.3333 4.65882V12.2824ZM20 8.47059C20 10.2812 19.0154 11.9224 17.4359 12.7059V4.23529C19.0051 5.02941 20 6.67059 20 8.47059Z"
                      fill="white" />
                  </svg>
                  <span>Ma’lumotlarni ko‘rishni so‘rash</span>
                </button>

                <button style="background: #48bb78" @click="sendUrl(token)" v-if="status == 1" class="userCart__btn">
                  <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10.2564 4.23529H2.05128C1.50725 4.23529 0.985497 4.4584 0.600807 4.85554C0.216117 5.25268 0 5.79131 0 6.35294V10.5882C0 11.1499 0.216117 11.6885 0.600807 12.0856C0.985497 12.4828 1.50725 12.7059 2.05128 12.7059H3.07692V16.9412C3.07692 17.222 3.18498 17.4913 3.37733 17.6899C3.56967 17.8884 3.83055 18 4.10256 18H6.15385C6.42586 18 6.68674 17.8884 6.87908 17.6899C7.07143 17.4913 7.17949 17.222 7.17949 16.9412V12.7059H10.2564L15.3846 16.9412V0L10.2564 4.23529ZM13.3333 12.2824L11.2821 10.5882H2.05128V6.35294H11.2821L13.3333 4.65882V12.2824ZM20 8.47059C20 10.2812 19.0154 11.9224 17.4359 12.7059V4.23529C19.0051 5.02941 20 6.67059 20 8.47059Z"
                      fill="white" />
                  </svg>
                  <span>Ma’lumotlarni ko‘rish</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dateformat from "dateformat";
export default {
  middleware: "auth",
  data: () => ({
    step: 1,
    birthday: "",
    inputType: "text",
    id: null,
    ex: false,
    type: null,
    user: null,
    time1: null,
    isDisabled: true,
    dsds: true,
    nr: false,
    act: false,
    timeH: null,
    timeSecond: null,
    countDown: null,
    dis: false,
    disa: true,
    dd: null,
    sd: null,
    token: null,
    sec: false,
    stir: '',
    content: false,
    status: 3, // 1 - accepted, 2 - rejected, 3 - start, 4 - waiting
    intervalSecond: null,
    intervalNotification: null,
    time: 300,
  }),
  async created() {
    this.timeSecond = null;
    this.countDown = null;
    this.dis = false;
    this.disa = true;
    this.dd = null;
    this.sd = null;
    this.token = null;
    this.sec = false;
  },
  mounted() {
    setTimeout(() => {
      function keydownInput(e) { }
      let input = document.querySelector(".mx-input");
      input.addEventListener("keydown", (e) => {
        console.log("code", e);
        let key = parseInt(e.key);

        if (
          e.which == 8 &&
          e.target.value.charAt(e.target.value.length - 1) == "."
        ) {
          e.target.value = e.target.value.slice(0, e.target.value.length - 2);
          e.preventDefault();
        }
        if (
          !(
            (Number.isInteger(key) && e.target.value.length < 10) ||
            e.which == 8
          )
        ) {
          e.preventDefault();
        }
      });

      input.addEventListener("keyup", (e) => {
        let value = e.target.value.replace(/[^0-9]/g, "");

        let length = value.length;

        if (length >= 8) {
          e.target.value = `${value.slice(0, 2)}.${value.slice(
            2,
            4
          )}.${value.slice(4, 8)}`;
          return true;
        }
        if (length >= 4) {
          e.target.value = `${value.slice(0, 2)}.${value.slice(
            2,
            4
          )}.${value.slice(4, length)}`;
          return true;
        }
        if (length >= 2) {
          e.target.value = `${value.slice(0, 2)}.${value.slice(2, length)}`;
          return true;
        }
      });
    }, 500);
  },
  beforeDestroy() {
    if (this.countDown) {
      clearInterval(this.countDown);
    }
  },
  computed: {
    waitingTime() {
      let minute = parseInt(this.time / 60);
      let second = this.time % 60;

      minute = minute < 10 ? `0${minute}` : minute;
      second = second < 10 ? `0${second}` : second;
      return `${minute}:${second}`;
    },
  },
  methods: {
    startTimer() {
      this.intervalSecond = setInterval(() => {
        if (this.time > 0) {
          this.time = this.time - 1;
        } else {
          clearInterval(this.intervalSecond);
          clearInterval(this.intervalNotification);
          this.status = 5;
          this.time = 300;
          this.$emit("clickRequest", false);
        }
      }, 1000);
    },
    async checkNotification(id) {
      const notification = await this.$axios.$get(`notification/by/${id}`);
      if (notification.data.status == 1 || notification.data.status == 2) {
        this.status = notification.data.status;
        clearInterval(this.intervalSecond);
        clearInterval(this.intervalNotification);
        this.$emit("clickRequest", false);
        return 0;
      }
    },
    async seeInfo() {
      this.status = 4;
      this.startTimer();
      const data = {
        debitor: this.$auth.user.id,
        creditor: this.$auth.user.id,
        reciver: this.user.id,
      };
      try {
        const response = await this.$axios.post("notification/reqquest", data);
        if (response.status == 201) {
          this.$toast.success("So'rov jo'natildi");

          this.$emit("clickRequest", true);

          this.intervalNotification = setInterval(async () => {
            this.checkNotification(response.data.data.id);
          }, 1000);
        }
      } catch (e) {
        this.user = null;
        this.$toast.error("Foydalanuvchi topilmadi");
      }
    },

    setUserId(e) {
      this.id = e.target.value.toUpperCase();
    },

    disabled() {
      if (this.id && this.time1) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
    async search() {
      if (this.id == null) {
        return this.$toast.error("Ma'lumotlarni to'ldiring!");
      }
      if (this.stir == null) {
        return this.$toast.error("Ma'lumotlarni to'ldiring!");
      }

      if (this.stir.length < 9) {
        return this.$toast.error("STIRni to‘g‘ri kiriting!");
      }
      const id = this.id.split("/").join("");
      try {
        const response = await this.$axios.post("user/search", {
          id: id,
          stir: this.stir,
          type: 2,
        });
        if (response.status == 200) {
          if (response.data.user.id == this.$auth.user.id) {
            return this.$toast.error(
              "Foydalanuvchi ma'lumotlari to'g'ri kelmadi."
            );
          }
          this.user = response.data.user;
          this.$auth.user2 = this.user;
        }
      } catch (e) {
        this.$toast.error("Foydalanuvchi topilmadi");
      }
    },
    sendUrl(token) {
      this.$auth.user2 = this.user;
      this.$router.push(this.localePath({ name: `search-debitor-result`, query: { secret: token } }));
    },
  },
};
</script>

<style lang="scss" scoped>
.my-picker-class {
  border: none !important;
  border-bottom: 1px solid #f26f31 !important;

  &:focus {
    outline: none !important;
  }
}

.userCart {
  margin: 15px 0;
  background: #ffffff;
  box-shadow: 0px 3px 14px rgba(0, 0, 0, 0.11);
  border-radius: 10px;
  padding: 10px;
}

.userCart__info {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .userCart__start,
  .userCart__end {
    display: flex;
    align-items: center;
  }

  .userCart__Icon {
    padding: 7px 8px;
    background: #3182ce;
    border-radius: 10px;

    svg {
      fill: white;
    }
  }

  .userCart__name {
    font-weight: 600;
    font-size: 14px;
    line-height: 15px;
    letter-spacing: 1px;
    color: #2d3748;
    margin: 0 0 0 15px;
  }

  .userCart__Id {
    margin: 0 30px 0 0;
    padding: 5px 10px;
    background: #f5f5f5;
    border-radius: 10px;
    display: flex;
    align-items: center;

    span {
      margin: 0 0 0 15px;
    }
  }

  .userCart__arrow {
    transition-duration: 0.3s;
    z-index: 1111;
    cursor: pointer;

    &.active {
      transform: rotate(180deg);
    }
  }
}

.userCart__additionalInfo {
  position: relative;
  margin: 15px 0 0 0;
}

.active {
  display: block;
}

.userCart__btn {
  cursor: pointer;
  margin: 0 5px;
  display: flex;
  width: max-content;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  font-size: 14px;
  color: white;
  background: #3182ce;
  border-radius: 5px;

  span {
    margin: 0 0 0 12px;
  }
}

.userCart__btn_dis {
  margin: 0 5px;
  display: flex;
  width: max-content;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  font-size: 14px;
  color: white;
  border-radius: 5px;

  span {
    margin: 0 0 0 12px;
  }
}

.userCart__btns {
  margin: 20px 0 0 0;
  display: flex;
  justify-content: end;
}

.userCart__text {
  width: 70%;
  margin: 10px 0 0 0;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: 1px;
  color: #000000;
}

.test {
  input {
    border: none !important;
  }
}

.date {
  outline: none;
}

.bta {
  width: 306px;
  outline: none;
  box-shadow: 0px 5px 14px rgba(0, 0, 0, 0.06);
}

.input {
  margin: 0 15px 0 0;
  width: 228px;
  height: 40px;
  background: #ffffff;
  border: 1px solid #8692a6;
  box-shadow: 0px 5px 14px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
}

.btn {
  margin: 0 0 0 15px;
  width: 131px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #d9d9d9;
  border-radius: 5px;
}
</style>

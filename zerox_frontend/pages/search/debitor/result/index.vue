<template>
  <div style="background: #eaf2fb" class="py-6 rounded">
    <div class="px-4">
      <div class="search">

        <div class="search__content items-center flex flex-wrap">
          <div class="user__avatar mx-auto lg:mx-12">
            <svg width="120" height="120" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="13" cy="12.5" rx="13" ry="12.5" fill="white" />
              <path
                d="M15.2107 6.94546C14.6493 6.33576 13.8653 6 12.9999 6C12.13 6 11.3434 6.33373 10.7846 6.93965C10.2198 7.55226 9.94464 8.38483 10.0093 9.28386C10.1373 11.0575 11.4789 12.5004 12.9999 12.5004C14.521 12.5004 15.8603 11.0578 15.9903 9.28444C16.0558 8.39354 15.7789 7.56271 15.2107 6.94546Z"
                fill="#3182CE" />
              <path
                d="M18.0768 19.0002H7.92322C7.79032 19.0019 7.6587 18.9738 7.53795 18.9179C7.41719 18.8621 7.31034 18.7798 7.22516 18.6772C7.03766 18.4517 6.96209 18.1438 7.01805 17.8324C7.2615 16.4737 8.02129 15.3324 9.21549 14.5311C10.2764 13.8199 11.6203 13.4284 13 13.4284C14.3797 13.4284 15.7236 13.8202 16.7845 14.5311C17.9787 15.3321 18.7385 16.4734 18.982 17.8321C19.0379 18.1435 18.9623 18.4514 18.7748 18.6769C18.6897 18.7796 18.5828 18.8619 18.4621 18.9178C18.3413 18.9737 18.2097 19.0019 18.0768 19.0002Z"
                fill="#3182CE" />
            </svg>
          </div>
          <div class="user__info mt-5">
            <div class="user__info__left">
              <h1><b>{{ user.type == 1 ? "Korxona nomi" : "FISH" }} :</b> </h1>
              <h1 class="text-black">
                {{
                  user.type === 1
                    ? user.company
                    : `${user.name} `
                }}
              </h1>
              <h1><b>{{ $t('user.vaqt') }}</b></h1>
              <p class="text-black">{{ dateFormat(user.created_at) }}</p>
              <h1><b>{{ $t('transfer.id') }} :</b></h1>
              <p class="text-black">{{ user.uid }}</p>
            </div>

          </div>
        </div>
      </div>

      <div>
        <div class="
            grid
            gap-5
            grid-cols-1
            lg:grid-cols-2
            md:grid-cols-2
            gap-x-8
            mt-10
            items-stretch
            self-stretch
          ">
          <div class="
              debtor-sum
              flex
              justify-between
              rounded-xl
              bg-white
              p-5
              h-full
            ">
            <div class="">
              <h1 class="text-xl font-normal text-t_bl mb-1">
                {{ $t("home.debitor") }}
              </h1>
              <h2 v-if="debitorUzs != null" class="text-xl font-semibold text-t_gr">
                {{
                  debitorUzs.residual_amount
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                }}
                <span>UZS</span>
              </h2>
              <h2 v-else class="text-xl font-semibold text-t_gr">
                0
                <span>UZS</span>
              </h2>
              <h2 v-if="debitorUsd != null" class="text-xl font-semibold text-t_gr mb-1">
                {{
                  debitorUsd.residual_amount
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                }}
                <span>USD</span>
              </h2>
              <h2 v-else class="text-xl font-semibold text-t_gr mb-1">
                0
                <span>USD</span>
              </h2>
            </div>
            <div class="iconn">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z"
                  fill="#3182CE" />
                <rect width="48" height="48" rx="8" fill="#3182CE" />
                <path
                  d="M17.1964 17.5695H31.2589C31.4232 17.5694 31.5873 17.5799 31.7502 17.6007C31.695 17.213 31.5618 16.8405 31.3588 16.5057C31.1557 16.1708 30.8869 15.8806 30.5686 15.6524C30.2503 15.4243 29.8891 15.263 29.5068 15.1782C29.1245 15.0934 28.7289 15.0869 28.344 15.1591L16.779 17.1336H16.7658C16.0398 17.2724 15.3943 17.6831 14.9609 18.2819C15.6138 17.8175 16.3953 17.5685 17.1964 17.5695V17.5695Z"
                  fill="white" />
                <path
                  d="M31.2593 18.625H17.1968C16.4511 18.6258 15.7362 18.9224 15.2089 19.4497C14.6817 19.9769 14.3851 20.6918 14.3843 21.4375V29.875C14.3851 30.6207 14.6817 31.3356 15.2089 31.8628C15.7362 32.3901 16.4511 32.6867 17.1968 32.6875H31.2593C32.0049 32.6867 32.7198 32.3901 33.2471 31.8628C33.7744 31.3356 34.071 30.6207 34.0718 29.875V21.4375C34.071 20.6918 33.7744 19.9769 33.2471 19.4497C32.7198 18.9224 32.0049 18.6258 31.2593 18.625V18.625ZM29.1719 27.0625C28.8937 27.0625 28.6219 26.98 28.3906 26.8255C28.1593 26.671 27.9791 26.4514 27.8727 26.1944C27.7662 25.9374 27.7384 25.6547 27.7926 25.3819C27.8469 25.1091 27.9808 24.8585 28.1775 24.6619C28.3742 24.4652 28.6247 24.3313 28.8975 24.277C29.1703 24.2228 29.4531 24.2506 29.71 24.357C29.967 24.4635 30.1866 24.6437 30.3411 24.875C30.4956 25.1062 30.5781 25.3781 30.5781 25.6562C30.5781 26.0292 30.43 26.3869 30.1662 26.6506C29.9025 26.9143 29.5448 27.0625 29.1719 27.0625Z"
                  fill="white" />
                <path
                  d="M14.4062 24.4023V20.0298C14.4062 19.0775 14.9336 17.481 16.7639 17.1351C18.3174 16.8437 19.8555 16.8438 19.8555 16.8438C19.8555 16.8438 20.8662 17.5469 20.0312 17.5469C19.1963 17.5469 19.2183 18.6235 20.0312 18.6235C20.8442 18.6235 20.0312 19.6562 20.0312 19.6562L16.7573 23.3696L14.4062 24.4023Z"
                  fill="white" />
                <path
                  d="M15.9238 23.5859V22.0566H18.3262V19.6543H19.8672V22.0566H22.2695V23.5859H19.8672V26H18.3262V23.5859H15.9238Z"
                  fill="#3182CE" />
              </svg>
            </div>
          </div>
          <div class="
              debtor-sum
              flex
              justify-between
              rounded-xl
              bg-white
              p-5
              h-full
            ">
            <div class="text">
              <h1 class="text-xl font-normal text-t_bl mb-1">
                {{ $t("home.creditor") }}
              </h1>
              <h2 v-if="creditorUzs != null" class="text-xl font-semibold text-t_gr">
                {{
                  creditorUzs.residual_amount
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                }}
                <span>UZS</span>
              </h2>
              <h2 v-else class="text-xl font-semibold text-t_gr">
                0
                <span>UZS</span>
              </h2>
              <h2 v-if="creditorUsd != null" class="text-xl font-semibold text-t_gr mb-1">
                {{
                  creditorUsd.residual_amount
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                }}
                <span>USD</span>
              </h2>
              <h2 v-else class="text-xl font-semibold text-t_gr mb-1">
                0
                <span>USD</span>
              </h2>
            </div>
            <div class="iconn">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z"
                  fill="#3182CE" />
                <rect width="48" height="48" rx="8" fill="#3182CE" />
                <path
                  d="M17.1967 17.5676H31.2592C31.4234 17.5675 31.5875 17.5779 31.7505 17.5988C31.6953 17.2111 31.5621 16.8386 31.359 16.5037C31.1559 16.1689 30.8871 15.8786 30.5688 15.6505C30.2506 15.4223 29.8894 15.261 29.507 15.1762C29.1247 15.0914 28.7292 15.0849 28.3443 15.1572L16.7792 17.1316H16.766C16.0401 17.2704 15.3945 17.6812 14.9612 18.2799C15.614 17.8155 16.3955 17.5665 17.1967 17.5676Z"
                  fill="white" />
                <path
                  d="M31.2593 18.625H17.1968C16.4511 18.6258 15.7362 18.9224 15.2089 19.4497C14.6817 19.9769 14.3851 20.6918 14.3843 21.4375V29.875C14.3851 30.6207 14.6817 31.3356 15.2089 31.8628C15.7362 32.3901 16.4511 32.6867 17.1968 32.6875H31.2593C32.0049 32.6867 32.7198 32.3901 33.2471 31.8628C33.7744 31.3356 34.071 30.6207 34.0718 29.875V21.4375C34.071 20.6918 33.7744 19.9769 33.2471 19.4497C32.7198 18.9224 32.0049 18.6258 31.2593 18.625ZM29.1719 27.0625C28.8937 27.0625 28.6219 26.98 28.3906 26.8255C28.1593 26.671 27.9791 26.4514 27.8727 26.1944C27.7662 25.9374 27.7384 25.6547 27.7926 25.3819C27.8469 25.1091 27.9808 24.8585 28.1775 24.6619C28.3742 24.4652 28.6247 24.3313 28.8975 24.277C29.1703 24.2228 29.4531 24.2506 29.71 24.357C29.967 24.4635 30.1866 24.6437 30.3411 24.875C30.4956 25.1062 30.5781 25.3781 30.5781 25.6562C30.5781 26.0292 30.43 26.3869 30.1662 26.6506C29.9025 26.9143 29.5448 27.0625 29.1719 27.0625Z"
                  fill="white" />
                <path
                  d="M14.4062 24.4014V20.0288C14.4062 19.0765 14.9336 17.48 16.7639 17.1341C18.3174 16.8428 19.8555 16.8428 19.8555 16.8428C19.8555 16.8428 20.8662 17.5459 20.0312 17.5459C19.1963 17.5459 19.2183 18.6226 20.0312 18.6226C20.8442 18.6226 20.0312 19.6553 20.0312 19.6553L16.7573 23.3687L14.4062 24.4014Z"
                  fill="white" />
                <line x1="17" y1="21.5" x2="22" y2="21.5" stroke="#3182CE" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="
          grid
          gap-5
          grid-cols-1
          lg:grid-cols-2
          md:grid-cols-2
          gap-x-8
          mt-10
          items-center
          self-stretch
        ">
        <div>
          <div class="
              debtor-sum
              flex
              justify-between
              rounded-xl
              px-4
              py-4
              bg-white
              mb-10
            ">
            <div class="text">
              <h1 class="text-xl font-normal text-t_bl mb-3">
                {{ $t("home.expiredD") }}
              </h1>
              <h2 v-if="expiredDebitorUzs != null" class="text-xl font-semibold text-t_gr">
                {{
                  expiredDebitorUzs.residual_amount
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                }}
                <span>UZS</span>
              </h2>
              <h2 v-else class="text-xl font-semibold text-t_gr">
                0
                <span>UZS</span>
              </h2>
              <h2 v-if="expiredDebitorUsd != null" class="text-xl font-semibold text-t_gr mb-1">
                {{
                  expiredDebitorUsd.residual_amount
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                }}
                <span>USD</span>
              </h2>
              <h2 v-else class="text-xl font-semibold text-t_gr mb-1">
                0
                <span>USD</span>
              </h2>
            </div>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z"
                fill="#3182CE" />
              <rect width="48" height="48" rx="8" fill="#3182CE" />
              <path
                d="M24 35.25C21.775 35.25 19.5999 34.5902 17.7498 33.354C15.8998 32.1179 14.4578 30.3609 13.6064 28.3052C12.7549 26.2495 12.5321 23.9875 12.9662 21.8052C13.4003 19.623 14.4717 17.6184 16.0451 16.0451C17.6184 14.4717 19.623 13.4003 21.8052 12.9662C23.9875 12.5321 26.2495 12.7549 28.3052 13.6064C30.3609 14.4578 32.1179 15.8998 33.354 17.7498C34.5902 19.5999 35.25 21.775 35.25 24C35.25 26.9837 34.0647 29.8452 31.955 31.955C29.8452 34.0647 26.9837 35.25 24 35.25ZM24 14.25C22.0716 14.25 20.1866 14.8218 18.5832 15.8932C16.9798 16.9645 15.7301 18.4873 14.9922 20.2688C14.2542 22.0504 14.0611 24.0108 14.4373 25.9021C14.8136 27.7935 15.7422 29.5307 17.1057 30.8943C18.4693 32.2579 20.2066 33.1865 22.0979 33.5627C23.9892 33.9389 25.9496 33.7458 27.7312 33.0078C29.5127 32.2699 31.0355 31.0202 32.1068 29.4168C33.1782 27.8134 33.75 25.9284 33.75 24C33.75 21.4141 32.7228 18.9342 30.8943 17.1057C29.0658 15.2772 26.5859 14.25 24 14.25Z"
                fill="white" />
              <path
                d="M27.18 28.245L23.4675 24.5325C23.398 24.4624 23.343 24.3793 23.3057 24.2879C23.2684 24.1966 23.2494 24.0987 23.25 24V18H24.75V23.6925L28.245 27.18L27.18 28.245Z"
                fill="white" />
              <path
                d="M16.6929 21.1895V20.0425H18.4946V18.2407H19.6504V20.0425H21.4521V21.1895H19.6504V23H18.4946V21.1895H16.6929Z"
                fill="white" />
            </svg>
          </div>
        </div>
        <div>
          <div class="
              debtor-sum
              flex
              justify-between
              rounded-xl
              px-4
              py-4
              bg-white
              mb-10
            ">
            <!--  -->
            <div class="text">
              <h1 class="text-xl font-normal text-t_bl mb-3">
                {{ $t("home.expiredD") }}
              </h1>
              <h2 v-if="expiredCreditorUzs != null" class="text-xl font-semibold text-t_gr">
                {{
                  expiredCreditorUzs.residual_amount
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                }}
                <span>UZS</span>
              </h2>
              <h2 v-else class="text-xl font-semibold text-t_gr">
                0
                <span>UZS</span>
              </h2>
              <h2 v-if="expiredCreditorUsd != null" class="text-xl font-semibold text-t_gr mb-1">
                {{
                  expiredCreditorUsd.residual_amount
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                }}
                <span>USD</span>
              </h2>
              <h2 v-else class="text-xl font-semibold text-t_gr mb-1">
                0
                <span>USD</span>
              </h2>
            </div>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z"
                fill="#3182CE" />
              <rect width="48" height="48" rx="8" fill="#3182CE" />
              <path
                d="M24 35.25C21.775 35.25 19.5999 34.5902 17.7498 33.354C15.8998 32.1179 14.4578 30.3609 13.6064 28.3052C12.7549 26.2495 12.5321 23.9875 12.9662 21.8052C13.4003 19.623 14.4717 17.6184 16.0451 16.0451C17.6184 14.4717 19.623 13.4003 21.8052 12.9662C23.9875 12.5321 26.2495 12.7549 28.3052 13.6064C30.3609 14.4578 32.1179 15.8998 33.354 17.7498C34.5902 19.5999 35.25 21.775 35.25 24C35.25 26.9837 34.0647 29.8452 31.955 31.955C29.8452 34.0647 26.9837 35.25 24 35.25ZM24 14.25C22.0716 14.25 20.1866 14.8218 18.5832 15.8932C16.9798 16.9645 15.7301 18.4873 14.9922 20.2688C14.2542 22.0504 14.0611 24.0108 14.4373 25.9021C14.8136 27.7935 15.7422 29.5307 17.1057 30.8943C18.4693 32.2579 20.2066 33.1865 22.0979 33.5627C23.9892 33.9389 25.9496 33.7458 27.7312 33.0078C29.5127 32.2699 31.0355 31.0202 32.1068 29.4168C33.1782 27.8134 33.75 25.9284 33.75 24C33.75 21.4141 32.7228 18.9342 30.8943 17.1057C29.0658 15.2772 26.5859 14.25 24 14.25Z"
                fill="white" />
              <path
                d="M27.18 28.245L23.4675 24.5325C23.398 24.4624 23.343 24.3793 23.3057 24.2879C23.2684 24.1966 23.2494 24.0987 23.25 24V18H24.75V23.6925L28.245 27.18L27.18 28.245Z"
                fill="white" />
              <line x1="17" y1="20.5" x2="21" y2="20.5" stroke="white" />
            </svg>
          </div>
        </div>
      </div>

      <div class="
          grid
          gap-5
          grid-cols-1
          lg:grid-cols-2
          md:grid-cols-2
          gap-x-8
          mt-10
          items-stretch
          self-stretch
        ">
        <div class="debitor w-full rounded-xl px-4 py-4 bg-white mb-10">
          <h1 class="text-xl font-normal text-t_bl border-b-2">
            {{ $t("home.ozD") }}
          </h1>
          <div class="flex items-center justify-between">
            <div style="cursor: pointer" @click="handleTab('left', 1)" :class="[
              tabLeft == 1
                ? 'flex w-full text-white bg-blue-400 rounded py-1 m-2 justify-center'
                : 'flex w-full  rounded py-1 m-2 justify-center',
            ]">
              <span style=""> UZS </span>
            </div>
            <div style="cursor: pointer" @click="handleTab('left', 2)" :class="[
              tabLeft == 2
                ? 'flex w-full text-white bg-blue-400 rounded py-1 m-2 justify-center'
                : 'flex w-full  rounded py-1 m-2 justify-center',
            ]">
              <span style=""> USD </span>
            </div>
          </div>
          <table class="divide-y-2 w-full">
            <thead class="bg-t_grayy py-1 flex items-center">
              <th class="w-1/2 text-sm">{{ $t("result.vaqt") }}</th>
              <th class="w-1/2 text-sm">{{ $t("result.SUMMA") }}</th>
            </thead>
            <tbody>
              <tr v-for="(item, i) in debitorData" :key="i" class="text-center py-1 flex items-center">
                <td class="w-1/2" v-html="getDays(item.end_date)"></td>
                <td class="w-1/2">
                  {{
                    item.residual_amount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                  }}
                  {{ item.currency }}
                </td>
              </tr>
            </tbody>
          </table>
          <div class="flex justify-center items-center py-4" v-if="debitorData.length === 0">
            {{ $t('result.malumot') }}
          </div>
        </div>
        <div class="debitor w-full rounded-xl px-4 py-4 bg-white mb-10">
          <h1 class="text-xl font-normal text-t_bl border-b-2">
            {{ $t("home.ozC") }}
          </h1>
          <div class="flex items-center justify-between">
            <div style="cursor: pointer" @click="handleTab('right', 1)" :class="[
              tabRight == 1
                ? 'flex w-full text-white bg-blue-400 rounded py-1 m-2 justify-center'
                : 'flex w-full  rounded py-1 m-2 justify-center',
            ]" class="flex w-full items-center justify-center">
              <span style="">UZS</span>
            </div>
            <div style="cursor: pointer" @click="handleTab('right', 2)" :class="[
              tabRight == 2
                ? 'flex w-full text-white bg-blue-400 rounded py-1 m-2 justify-center'
                : 'flex w-full  rounded py-1 m-2 justify-center',
            ]">
              <span>USD</span>
            </div>
          </div>
          <table class="divide-y-2 w-full">
            <thead class="bg-t_grayy py-1 flex items-center">
              <th class="w-1/2 text-sm">{{ $t("result.vaqt") }}</th>
              <th class="w-1/2 text-sm">{{ $t("result.SUMMA") }}</th>
            </thead>

            <tbody>
              <tr v-for="(item, i) in creditorData" :key="i" class="text-center flex items-center py-1">
                <td class="w-1/2" v-html="getDays(item.end_date)"></td>

                <td class="w-1/2">
                  {{
                    item.residual_amount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                  }}
                  {{ item.currency }}
                </td>
              </tr>
            </tbody>
          </table>
          <div class="flex justify-center items-center py-4" v-if="creditorData.length === 0">
            {{ $t('result.malumot') }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="$auth.user.id !== $auth.user2.id" class="flex justify-between pl-4 pr-4">

      <nuxt-link :to="localePath({ name: 'give-money', query: { id: user.uid } })" class="
      shadow flex justify-between items-center bg-t_primary w-full rounded-xl p-5 cursor-pointer mr-4
        ">
        <div class="text cursor-pointer">
          <h1 class="text-white text-2xl font-normal">{{ $t("home.give") }}</h1>
        </div>

        <div class="iconn bg-white p-3 rounded-lg flex items-center">
          <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M24.6982 1.13244L11.1396 0.0993364C10.794 0.0733843 10.4521 0.185612 10.1891 0.411398C9.92605 0.637184 9.76332 0.958088 9.7366 1.3037L9.18032 8.60445C9.15437 8.95012 9.26659 9.29198 9.49238 9.55501C9.71816 9.81804 10.0391 9.98077 10.3847 10.0075L23.9432 11.0406C24.2889 11.0665 24.6307 10.9543 24.8938 10.7285C25.1568 10.5027 25.3195 10.1818 25.3462 9.83622L25.9025 2.53548C25.9285 2.1898 25.8163 1.84795 25.5905 1.58491C25.3647 1.32188 25.0438 1.15916 24.6982 1.13244ZM14.7108 8.76359L11.1275 5.08125L15.2273 1.98433L20.3721 2.37634L23.9554 6.05868L19.8555 9.1556L14.7108 8.76359ZM24.2119 4.07252L22.7366 2.5565L24.3182 2.67701L24.2119 4.07252ZM12.8627 1.80416L11.1748 3.07915L11.2812 1.68365L12.8627 1.80416ZM10.871 7.0674L12.3462 8.58342L10.7646 8.46291L10.871 7.0674ZM22.2201 9.33576L23.908 8.06077L23.8017 9.45627L22.2201 9.33576ZM17.76 2.70181C17.1927 2.65859 16.6254 2.78455 16.1297 3.06377C15.634 3.34299 15.2322 3.76292 14.9752 4.27046C14.7182 4.77801 14.6175 5.35037 14.6858 5.91517C14.754 6.47997 14.9883 7.01184 15.3588 7.44352C15.7294 7.8752 16.2196 8.1873 16.7675 8.34036C17.3155 8.49343 17.8965 8.48057 18.4371 8.30342C18.9777 8.12627 19.4537 7.79278 19.8048 7.34513C20.1559 6.89748 20.3664 6.35577 20.4096 5.7885C20.4667 5.02802 20.2197 4.27595 19.723 3.69728C19.2263 3.11861 18.5203 2.76061 17.76 2.70181ZM17.4421 6.87366C17.1842 6.85402 16.938 6.75835 16.7345 6.59876C16.5311 6.43917 16.3795 6.22283 16.2989 5.97709C16.2184 5.73135 16.2126 5.46725 16.2822 5.21819C16.3517 4.96913 16.4936 4.7463 16.6898 4.57786C16.886 4.40943 17.1278 4.30296 17.3845 4.27193C17.6412 4.24089 17.9014 4.28668 18.1321 4.40351C18.3628 4.52034 18.5537 4.70295 18.6806 4.92826C18.8075 5.15357 18.8648 5.41145 18.8451 5.6693C18.8184 6.01491 18.6557 6.33582 18.3926 6.5616C18.1296 6.78739 17.7878 6.89962 17.4421 6.87366Z"
              fill="#3182CE" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M4.57469 15.0735C4.33731 14.7908 3.95401 14.6512 3.57313 14.74L0.778962 15.3922C0.507458 15.4556 0.274429 15.6286 0.135048 15.8701C-0.00433401 16.1113 -0.0374855 16.3998 0.0433365 16.6667L2.22892 23.8782C2.38306 24.3869 2.9055 24.6884 3.4231 24.5676L6.21726 23.9155C6.48877 23.8521 6.7218 23.6791 6.86118 23.4378C6.93135 23.3161 6.97467 23.1828 6.99015 23.046C8.76049 23.0393 12.021 23.0003 14.5395 22.8188C16.2818 22.6935 17.6976 22.4546 18.2113 22.1773C19.4989 21.4824 23.5872 18.6403 24.7804 16.9048C25.3643 16.0559 25.353 15.2949 25.0493 14.8095C24.679 14.2181 24.242 13.8686 23.7394 13.6896C23.2649 13.5204 22.7081 13.5015 22.0308 13.6794C21.4972 13.8195 20.8506 14.1065 20.0504 14.5198C19.9188 14.2604 19.7182 14.0114 19.4358 13.7837C19.2533 13.6368 18.9087 13.4604 18.4209 13.3723C17.6603 13.2351 16.4282 13.2678 15.1321 13.8713C14.6092 14.1147 14.1669 13.9485 13.6933 13.7595C13.1779 13.5541 12.6412 13.2959 12.035 13.1137C10.623 12.6892 8.90544 13.0248 7.36014 13.6431C6.27873 14.076 5.28636 14.6328 4.57469 15.0735ZM3.11143 16.9186L3.11481 16.9292L4.71117 22.1964L3.8848 22.3893L2.2853 17.1114L3.11143 16.9186ZM15.0167 17.3103C15.9851 16.7768 17.6836 15.8117 17.7204 15.7919C17.8595 15.7169 17.9802 15.6356 18.0783 15.5473C18.1225 15.5076 18.1709 15.4447 18.2024 15.4001C17.9684 15.3757 16.8659 15.2883 15.9832 15.6992C15.0382 16.1391 14.2102 16.0683 13.3659 15.7873C12.7704 15.5891 12.1647 15.2581 11.4545 15.0449C10.4408 14.7403 9.21905 15.0713 8.10956 15.5153C6.93159 15.9867 5.87341 16.6241 5.25248 17.0306L6.46505 21.0308C8.00817 21.0301 11.65 21.0054 14.3946 20.8077C15.7443 20.7104 16.8555 20.6178 17.2533 20.4029C18.2684 19.855 21.2289 17.8432 22.673 16.3008C22.8668 16.0937 23.1899 15.7873 23.0624 15.5889C22.8985 15.3346 22.4339 15.6361 21.9488 15.8376C21.163 16.1641 20.1714 16.7168 18.886 17.4466C18.8192 17.4877 18.6546 17.5789 18.6428 17.5848C17.8675 18.0254 16.9888 18.5261 15.9895 19.0766C15.5425 19.3227 14.9061 19.4272 14.2271 19.3984C13.431 19.3648 12.571 19.1671 12.0698 19.0243C11.5348 18.8719 11.2241 18.3136 11.3766 17.7783C11.529 17.2431 12.0873 16.9326 12.6225 17.0851C13.0153 17.1969 13.6885 17.3573 14.3125 17.3837C14.5809 17.395 14.84 17.4076 15.0167 17.3103Z"
              fill="#3182CE" />
          </svg>
        </div>
      </nuxt-link>

      <nuxt-link :to="localePath({ name: 'take-money', query: { id: user.uid } })" class="
      shadow debtor flex justify-between items-center bg-t_primary w-full rounded-xl p-5 cursor-pointer ml-4
        ">
        <div class="text cursor-pointer">
          <h1 class="text-white text-2xl font-normal">{{ $t("home.take") }}</h1>
        </div>
        <div class="iconn bg-white p-3 rounded-lg flex items-center">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19.6171 15.1854L5.65857 14.1218C5.3027 14.0951 4.95076 14.2106 4.67997 14.4431C4.40918 14.6755 4.24165 15.0059 4.21414 15.3617L3.64145 22.8778C3.61473 23.2337 3.73027 23.5856 3.96271 23.8564C4.19516 24.1272 4.52553 24.2947 4.88134 24.3222L18.8398 25.3858C19.1957 25.4125 19.5476 25.297 19.8184 25.0645C20.0892 24.8321 20.2568 24.5017 20.2843 24.1459L20.857 16.6298C20.8837 16.2739 20.7681 15.922 20.5357 15.6512C20.3032 15.3804 19.9729 15.2129 19.6171 15.1854ZM9.33503 23.0416L5.64603 19.2507L9.86681 16.0624L15.1634 16.466L18.8524 20.2569L14.6316 23.4452L9.33503 23.0416ZM19.1164 18.2122L17.5977 16.6515L19.2259 16.7755L19.1164 18.2122ZM7.43251 15.8769L5.69481 17.1895L5.80428 15.7528L7.43251 15.8769ZM5.38196 21.2954L6.90072 22.8562L5.27249 22.7321L5.38196 21.2954ZM17.0659 23.6307L18.8036 22.3181L18.6941 23.7548L17.0659 23.6307ZM12.4742 16.801C11.8902 16.7565 11.3061 16.8862 10.7958 17.1737C10.2855 17.4611 9.87191 17.8935 9.60731 18.416C9.34271 18.9385 9.239 19.5277 9.30929 20.1092C9.37958 20.6907 9.62071 21.2382 10.0022 21.6826C10.3837 22.127 10.8884 22.4484 11.4525 22.6059C12.0166 22.7635 12.6147 22.7503 13.1713 22.5679C13.7279 22.3855 14.2179 22.0422 14.5793 21.5813C14.9408 21.1205 15.1575 20.5628 15.202 19.9788C15.2607 19.1959 15.0065 18.4216 14.4952 17.8259C13.9838 17.2301 13.257 16.8616 12.4742 16.801ZM12.1469 21.096C11.8815 21.0757 11.628 20.9773 11.4185 20.813C11.209 20.6487 11.053 20.4259 10.9701 20.1729C10.8872 19.92 10.8812 19.6481 10.9528 19.3917C11.0244 19.1353 11.1705 18.9058 11.3725 18.7324C11.5745 18.559 11.8234 18.4494 12.0877 18.4175C12.352 18.3855 12.6198 18.4327 12.8573 18.5529C13.0948 18.6732 13.2913 18.8612 13.422 19.0932C13.5526 19.3251 13.6116 19.5906 13.5914 19.8561C13.5639 20.2119 13.3963 20.5423 13.1255 20.7747C12.8547 21.0071 12.5028 21.1227 12.1469 21.096Z"
              fill="#3182CE" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M18.8037 1.59381C16.9811 1.60079 13.6242 1.6409 11.0317 1.82774C9.23774 1.95703 7.78013 2.20267 7.25125 2.48816C5.92568 3.20388 1.7168 6.1298 0.488383 7.91624C-0.112744 8.7904 -0.101035 9.57364 0.211611 10.0734C0.592765 10.6822 1.04293 11.042 1.5601 11.2263C2.04887 11.4007 2.62185 11.4199 3.31914 11.2368C3.86845 11.0928 4.5341 10.7973 5.35794 10.3716C5.49346 10.6386 5.69998 10.8952 5.9907 11.1294C6.17854 11.2809 6.53354 11.4622 7.03576 11.5529C7.81875 11.6944 9.08702 11.6608 10.4216 11.0395C10.9597 10.7888 11.4153 10.96 11.9026 11.1543C12.4332 11.3661 12.9858 11.6319 13.61 11.8195C15.0637 12.2562 16.8317 11.9109 18.4226 11.2741C19.5361 10.8285 20.5578 10.2555 21.2902 9.80158C21.5346 10.0926 21.9294 10.2365 22.3213 10.1449L25.1979 9.47349C25.4774 9.40822 25.7173 9.2301 25.8608 8.98173C26.0043 8.73311 26.0387 8.43615 25.9555 8.16162L23.7052 0.73709C23.5465 0.213439 23.0086 -0.0969645 22.4757 0.0273465L19.5992 0.698726C19.3196 0.763995 19.0797 0.942116 18.9362 1.19074C18.864 1.3158 18.8194 1.45331 18.8037 1.59381ZM19.3443 3.66849C17.7554 3.66924 14.0061 3.6949 11.1809 3.89843C9.79128 3.99857 8.64732 4.09374 8.23752 4.31496C7.19246 4.87921 4.14472 6.9504 2.65797 8.53804C2.45843 8.75129 2.12585 9.06668 2.25739 9.27096C2.42579 9.53303 2.9041 9.22238 3.40359 9.01486C4.21248 8.67905 5.23338 8.10981 6.55695 7.35846C6.62546 7.31611 6.69671 7.275 6.7707 7.23514C6.78266 7.22867 6.79486 7.22244 6.80707 7.21646C7.60525 6.76256 8.50981 6.24713 9.53867 5.68038C9.9988 5.42703 10.654 5.31941 11.353 5.34905C12.1726 5.38393 13.0582 5.58721 13.5739 5.73419C14.125 5.89114 14.4449 6.46611 14.2877 7.01692C14.1307 7.56797 13.556 7.88784 13.0049 7.73089C12.6006 7.61555 11.9076 7.45038 11.2651 7.42323C10.9891 7.41152 10.7222 7.39882 10.5404 7.49896C9.54316 8.04803 8.65629 8.54925 7.86459 8.99493C7.83046 9.01909 7.79458 9.04152 7.75697 9.06194C7.61347 9.13942 7.48916 9.22312 7.38827 9.3138C7.34293 9.35466 7.29285 9.41968 7.26047 9.46527C7.50162 9.49068 8.63636 9.58061 9.54515 9.15736C10.518 8.70446 11.3705 8.77745 12.2396 9.06668C12.8527 9.27096 13.4765 9.6115 14.2074 9.83123C15.2513 10.1449 16.5091 9.80382 17.6513 9.34669C18.8637 8.8614 19.9532 8.20522 20.5924 7.78695L19.3443 3.66849ZM22.7969 7.90204L22.7934 7.89108L21.1499 2.46873L22.0004 2.27018L23.6474 7.70349L22.7969 7.90204Z"
              fill="#3182CE" />
          </svg>
        </div>
      </nuxt-link>
      <div></div>
    </div>
  </div>
</template>

<script>
import dateformat from "dateformat";
export default {
  middleware: "auth",
  data: () => ({
    step: 1,
    user: null,
    userDebtInfo: null,
    tabLeft: 1,
    tabRight: 1,
    debitorData: [],
    expiredDebitor: [],
    expiredCreditor: [],
    creditorData: [],
    expiredDebitorUsd: null,
    expiredDebitorUzs: null,
    creditorUsd: null,
    creditorUzs: null,
    expiredCreditorUsd: null,
    expiredCreditorUzs: null,
    debitorUsd: null,
    debitorUzs: null,
  }),

  async mounted() {
    console.log('dd', this.user)
    const debitor = await this.$axios.get(
      `/home/by/${this.user.id}?type=debitor`
    );
    const creditor = await this.$axios.get(
      `/home/by/${this.user.id}?type=creditor`
    );
    this.nearCreditor = creditor.data.data.five;
    this.nearDebitor = debitor.data.data.five;
    this.debitorData = debitor.data.data.five.filter(
      (item) => item.currency === "UZS"
    );
    this.creditorData = creditor.data.data.five.filter(
      (item) => item.currency === "UZS"
    );
    this.debitorUsd = debitor.data.data.data.find(
      (item) => item.currency == "USD"
    );
    this.debitorUzs = debitor.data.data.data.find(
      (item) => item.currency == "UZS"
    );
    this.expiredDebitorUsd = debitor.data.data.expired.find(
      (item) => item.currency == "USD"
    );
    this.expiredDebitorUzs = debitor.data.data.expired.find(
      (item) => item.currency == "UZS"
    );
    this.creditorUsd = creditor.data.data.data.find(
      (item) => item.currency == "USD"
    );
    this.creditorUzs = creditor.data.data.data.find(
      (item) => item.currency == "UZS"
    );
    this.expiredCreditorUsd = creditor.data.data.expired.find(
      (item) => item.currency == "USD"
    );
    this.expiredCreditorUzs = creditor.data.data.expired.find(
      (item) => item.currency == "UZS"
    );
  },

  methods: {
    handleTab(tab, value) {
      if (tab == "left") {
        const currency = value === 1 ? "UZS" : "USD";
        this.debitorData = this.nearDebitor.filter(
          (item) => item.currency === currency
        );
        this.tabLeft = value;
      } else if (tab == "right") {
        const currency = value === 1 ? "UZS" : "USD";
        this.creditorData = this.nearCreditor.filter(
          (item) => item.currency === currency
        );
        this.tabRight = value;
      }
    },
    dateFormat(date) {
      let date1 = dateformat(date, "isoDate");
      date1 = date1.split("-").reverse();
      date1 = date1.join(".");
      return date1;
    },

    getDays(time) {
      const restTimeMillisec = new Date(time) - Date.now();
      if (restTimeMillisec < 0) {
        return `<span class='text-red-500'>${$nuxt.$t('a1.a56')}</span>`;
      }
      const fixedNumber = restTimeMillisec / (24 * 60 * 60 * 1000).toFixed(2);

      if (Math.ceil(fixedNumber) > 1 && Math.ceil(fixedNumber) < 4) {
        return `<span class='text-red-500'>${Math.ceil(fixedNumber).toFixed(
          0
        )} ${$nuxt.$t('a1.a57')}</span>`;
      }
      if (Math.ceil(fixedNumber) > 3 && Math.ceil(fixedNumber) < 5) {
        return `${Math.ceil(fixedNumber).toFixed(0)} ${$nuxt.$t('a1.a57')}`;
      }
      if (Math.ceil(fixedNumber) >= 5) {
        return `${Math.ceil(fixedNumber).toFixed(0)} ${$nuxt.$t('a1.a60')}`;
      }
      if (fixedNumber < 1 && fixedNumber > 0) {
        return `<span class='text-red-500' > ${$nuxt.$t('a1.a55')}</span>`;
      }
    },
  },
  created() {
    if (!this.$auth.user2) {
      return this.$router.go(-1);
    }
    // if (!this.$route.query.secret) {
    //   return this.$router.go(-1);
    // }
    this.user = this.$auth.user2;
  },
};
</script>

<style lang="scss" scoped>
.user__info__left {
  height: 100%;
  color: #195a96;
  font-weight: 500;
}

.user__info__right {
  margin-left: 25px;
  height: 100%;
}

.user__avatar {
  width: 100px;
  max-height: 100px;
  border-radius: 50%;
}

.user__info {
  display: flex;
}

div.debt {
  div.debt-left {
    width: 465px;

    div.debtor-sum {
      padding: 18px 23px 11px 23px;
    }

    div.debitor {
      h1 {
        padding: 28px 106px 15px 23px;
      }

      table {
        width: 100%;

        th {
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 15px;
          /* identical to box height */

          /* Gray/Gray-400 */

          color: #a0aec0;
        }

        tr {
          td {
            padding: 14px 0;
          }

          td:first-child {
            font-weight: 500;
            font-size: 14px;
            line-height: 17px;

            color: #718096;
          }
        }
      }

      // tr {
      //   border: 1px solid #e2e8f0;
      //   border-collapse: collapse;
      // }
    }
  }
}
</style>

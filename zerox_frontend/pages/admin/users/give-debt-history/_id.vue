<template>
  <div style="background: #eaf2fb" class="py-6 rounded" v-if="user != null">
    <div class="px-4">
      <div class="search">
        <div class="search__content items-center flex flex-wrap">
          <div class="user__avatar mx-auto lg:mx-12">
            <svg
              width="120"
              height="120"
              viewBox="0 0 26 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse cx="13" cy="12.5" rx="13" ry="12.5" fill="white" />
              <path
                d="M15.2107 6.94546C14.6493 6.33576 13.8653 6 12.9999 6C12.13 6 11.3434 6.33373 10.7846 6.93965C10.2198 7.55226 9.94464 8.38483 10.0093 9.28386C10.1373 11.0575 11.4789 12.5004 12.9999 12.5004C14.521 12.5004 15.8603 11.0578 15.9903 9.28444C16.0558 8.39354 15.7789 7.56271 15.2107 6.94546Z"
                fill="#3182CE"
              />
              <path
                d="M18.0768 19.0002H7.92322C7.79032 19.0019 7.6587 18.9738 7.53795 18.9179C7.41719 18.8621 7.31034 18.7798 7.22516 18.6772C7.03766 18.4517 6.96209 18.1438 7.01805 17.8324C7.2615 16.4737 8.02129 15.3324 9.21549 14.5311C10.2764 13.8199 11.6203 13.4284 13 13.4284C14.3797 13.4284 15.7236 13.8202 16.7845 14.5311C17.9787 15.3321 18.7385 16.4734 18.982 17.8321C19.0379 18.1435 18.9623 18.4514 18.7748 18.6769C18.6897 18.7796 18.5828 18.8619 18.4621 18.9178C18.3413 18.9737 18.2097 19.0019 18.0768 19.0002Z"
                fill="#3182CE"
              />
            </svg>
          </div>
          <div class="user__info mt-5">
            <div class="user__info__left">
              <h1>
                <b>{{ user.type == 1 ? "Korxona nomi" : "FISH" }} :</b>
              </h1>
              <h1 class="text-black">
                {{
                  user.type === 1
                    ? user.company
                    : `${user.last_name} ${user.first_name} ${user.middle_name}`
                }}
              </h1>
              <h1><b>Tizimda ro‘yxatdan o‘tgan vaqti :</b></h1>
              <p class="text-black">{{ dateFormat(user.created_at) }}</p>
              <h1>
                <b>{{ $t("transfer.id") }}:</b>
              </h1>
              <p class="text-black">{{ user.uid }}</p>
              <h1><b>Status:</b></h1>
              <h1 class="text-black">
                {{ user.rating }}
                <span v-if="user.rating_type == 1">
                  <svg
                    width="14"
                    height="10"
                    viewBox="0 0 14 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 5L0 9.5L7 4.5L14 9.5V5L7 0L0 5Z"
                      fill="#049D26"
                    />
                  </svg>
                </span>
                <span v-if="user.rating_type == 2">
                  <svg
                    width="14"
                    height="17"
                    viewBox="0 0 14 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 5L0 9.5L7 4.5L14 9.5V5L7 0L0 5Z"
                      fill="#049D26"
                    />
                    <path
                      d="M0 12L0 16.5L7 11.5L14 16.5V12L7 7L0 12Z"
                      fill="#049D26"
                    />
                  </svg>
                </span>
                <span v-if="user.rating_type == 3">
                  <svg
                    width="14"
                    height="10"
                    viewBox="0 0 14 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 4.5V0L7 5L0 0V4.5L7 9.5L14 4.5Z"
                      fill="#FF0000"
                    />
                  </svg>
                </span>
                <span v-if="user.rating_type == 4">
                  <svg
                    width="14"
                    height="17"
                    viewBox="0 0 14 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 11.5V7L7 12L0 7V11.5L7 16.5L14 11.5Z"
                      fill="#FF0000"
                    />
                    <path
                      d="M14 4.5V0L7 5L0 0V4.5L7 9.5L14 4.5Z"
                      fill="#FF0000"
                    />
                  </svg>
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div
          class="grid gap-5 grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-x-8 mt-10 items-stretch self-stretch"
        >
          <nuxt-link
            :to="{
              name: 'admin-users-history-debhistory-id___uz',
              params: { id: user.uid },
            }"
            class="debtor-sum flex justify-between rounded-xl bg-white p-5 h-full"
          >
            <div>
              <h1 class="text-xl font-normal text-t_bl mb-1">
                {{ $t("result.qarz") }}({{ $t("result.debitor") }})
              </h1>
              <h2
                v-if="debitorUzs != null"
                class="text-xl font-semibold text-t_gr"
              >
                {{
                  debitorUzs.residual_amount
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                }}
                <span>UZS</span>
              </h2>
              <h2 v-else class="text-xl font-semibold text-t_gr">
                0
                <span>{{ $t("result.sum") }}</span>
              </h2>
              <h2
                v-if="debitorUsd != null"
                class="text-xl font-semibold text-t_gr mb-1"
              >
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
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z"
                  fill="#3182CE"
                />
                <rect width="48" height="48" rx="8" fill="#3182CE" />
                <path
                  d="M17.1964 17.5695H31.2589C31.4232 17.5694 31.5873 17.5799 31.7502 17.6007C31.695 17.213 31.5618 16.8405 31.3588 16.5057C31.1557 16.1708 30.8869 15.8806 30.5686 15.6524C30.2503 15.4243 29.8891 15.263 29.5068 15.1782C29.1245 15.0934 28.7289 15.0869 28.344 15.1591L16.779 17.1336H16.7658C16.0398 17.2724 15.3943 17.6831 14.9609 18.2819C15.6138 17.8175 16.3953 17.5685 17.1964 17.5695V17.5695Z"
                  fill="white"
                />
                <path
                  d="M31.2593 18.625H17.1968C16.4511 18.6258 15.7362 18.9224 15.2089 19.4497C14.6817 19.9769 14.3851 20.6918 14.3843 21.4375V29.875C14.3851 30.6207 14.6817 31.3356 15.2089 31.8628C15.7362 32.3901 16.4511 32.6867 17.1968 32.6875H31.2593C32.0049 32.6867 32.7198 32.3901 33.2471 31.8628C33.7744 31.3356 34.071 30.6207 34.0718 29.875V21.4375C34.071 20.6918 33.7744 19.9769 33.2471 19.4497C32.7198 18.9224 32.0049 18.6258 31.2593 18.625V18.625ZM29.1719 27.0625C28.8937 27.0625 28.6219 26.98 28.3906 26.8255C28.1593 26.671 27.9791 26.4514 27.8727 26.1944C27.7662 25.9374 27.7384 25.6547 27.7926 25.3819C27.8469 25.1091 27.9808 24.8585 28.1775 24.6619C28.3742 24.4652 28.6247 24.3313 28.8975 24.277C29.1703 24.2228 29.4531 24.2506 29.71 24.357C29.967 24.4635 30.1866 24.6437 30.3411 24.875C30.4956 25.1062 30.5781 25.3781 30.5781 25.6562C30.5781 26.0292 30.43 26.3869 30.1662 26.6506C29.9025 26.9143 29.5448 27.0625 29.1719 27.0625Z"
                  fill="white"
                />
                <path
                  d="M14.4062 24.4023V20.0298C14.4062 19.0775 14.9336 17.481 16.7639 17.1351C18.3174 16.8437 19.8555 16.8438 19.8555 16.8438C19.8555 16.8438 20.8662 17.5469 20.0312 17.5469C19.1963 17.5469 19.2183 18.6235 20.0312 18.6235C20.8442 18.6235 20.0312 19.6562 20.0312 19.6562L16.7573 23.3696L14.4062 24.4023Z"
                  fill="white"
                />
                <path
                  d="M15.9238 23.5859V22.0566H18.3262V19.6543H19.8672V22.0566H22.2695V23.5859H19.8672V26H18.3262V23.5859H15.9238Z"
                  fill="#3182CE"
                />
              </svg>
            </div>
          </nuxt-link>
          <nuxt-link
            :to="{
              name: 'admin-users-history-crehistory-id___uz',
              params: { id: user.uid },
            }"
            class="debtor-sum flex justify-between rounded-xl bg-white p-5 h-full"
          >
            <div class="text">
              <h1 class="text-xl font-normal text-t_bl mb-1">
                {{ $t("result.olqarz") }} ({{ $t("result.kreditor") }})
              </h1>
              <h2
                v-if="creditorUzs != null"
                class="text-xl font-semibold text-t_gr"
              >
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
              <h2
                v-if="creditorUsd != null"
                class="text-xl font-semibold text-t_gr mb-1"
              >
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
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z"
                  fill="#3182CE"
                />
                <rect width="48" height="48" rx="8" fill="#3182CE" />
                <path
                  d="M17.1967 17.5676H31.2592C31.4234 17.5675 31.5875 17.5779 31.7505 17.5988C31.6953 17.2111 31.5621 16.8386 31.359 16.5037C31.1559 16.1689 30.8871 15.8786 30.5688 15.6505C30.2506 15.4223 29.8894 15.261 29.507 15.1762C29.1247 15.0914 28.7292 15.0849 28.3443 15.1572L16.7792 17.1316H16.766C16.0401 17.2704 15.3945 17.6812 14.9612 18.2799C15.614 17.8155 16.3955 17.5665 17.1967 17.5676Z"
                  fill="white"
                />
                <path
                  d="M31.2593 18.625H17.1968C16.4511 18.6258 15.7362 18.9224 15.2089 19.4497C14.6817 19.9769 14.3851 20.6918 14.3843 21.4375V29.875C14.3851 30.6207 14.6817 31.3356 15.2089 31.8628C15.7362 32.3901 16.4511 32.6867 17.1968 32.6875H31.2593C32.0049 32.6867 32.7198 32.3901 33.2471 31.8628C33.7744 31.3356 34.071 30.6207 34.0718 29.875V21.4375C34.071 20.6918 33.7744 19.9769 33.2471 19.4497C32.7198 18.9224 32.0049 18.6258 31.2593 18.625ZM29.1719 27.0625C28.8937 27.0625 28.6219 26.98 28.3906 26.8255C28.1593 26.671 27.9791 26.4514 27.8727 26.1944C27.7662 25.9374 27.7384 25.6547 27.7926 25.3819C27.8469 25.1091 27.9808 24.8585 28.1775 24.6619C28.3742 24.4652 28.6247 24.3313 28.8975 24.277C29.1703 24.2228 29.4531 24.2506 29.71 24.357C29.967 24.4635 30.1866 24.6437 30.3411 24.875C30.4956 25.1062 30.5781 25.3781 30.5781 25.6562C30.5781 26.0292 30.43 26.3869 30.1662 26.6506C29.9025 26.9143 29.5448 27.0625 29.1719 27.0625Z"
                  fill="white"
                />
                <path
                  d="M14.4062 24.4014V20.0288C14.4062 19.0765 14.9336 17.48 16.7639 17.1341C18.3174 16.8428 19.8555 16.8428 19.8555 16.8428C19.8555 16.8428 20.8662 17.5459 20.0312 17.5459C19.1963 17.5459 19.2183 18.6226 20.0312 18.6226C20.8442 18.6226 20.0312 19.6553 20.0312 19.6553L16.7573 23.3687L14.4062 24.4014Z"
                  fill="white"
                />
                <line x1="17" y1="21.5" x2="22" y2="21.5" stroke="#3182CE" />
              </svg>
            </div>
          </nuxt-link>
        </div>
      </div>
      <div
        class="grid gap-5 grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-x-8 mt-10 items-center self-stretch"
      >
        <nuxt-link
          :to="{
            name: 'admin-users-history-exdebhistory-id___uz',
            params: { id: user.uid },
          }"
          class="debtor-sum flex justify-between rounded-xl px-4 py-4 bg-white mb-10"
        >
          <div class="text">
            <h1 class="text-xl font-normal text-t_bl mb-3">
              {{ $t("result.muddat") }}( {{ $t("result.debitor") }})
            </h1>
            <h2
              v-if="expiredDebitorUzs != null"
              class="text-xl font-semibold text-t_gr"
            >
              {{
                expiredDebitorUzs.residual_amount
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
              }}
              <span>UZS</span>
            </h2>
            <h2 v-else class="text-xl font-semibold text-t_gr">
              0
              <span>{{ $t("result.sum") }}</span>
            </h2>
            <h2
              v-if="expiredDebitorUsd != null"
              class="text-xl font-semibold text-t_gr mb-1"
            >
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
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z"
              fill="#3182CE"
            />
            <rect width="48" height="48" rx="8" fill="#3182CE" />
            <path
              d="M24 35.25C21.775 35.25 19.5999 34.5902 17.7498 33.354C15.8998 32.1179 14.4578 30.3609 13.6064 28.3052C12.7549 26.2495 12.5321 23.9875 12.9662 21.8052C13.4003 19.623 14.4717 17.6184 16.0451 16.0451C17.6184 14.4717 19.623 13.4003 21.8052 12.9662C23.9875 12.5321 26.2495 12.7549 28.3052 13.6064C30.3609 14.4578 32.1179 15.8998 33.354 17.7498C34.5902 19.5999 35.25 21.775 35.25 24C35.25 26.9837 34.0647 29.8452 31.955 31.955C29.8452 34.0647 26.9837 35.25 24 35.25ZM24 14.25C22.0716 14.25 20.1866 14.8218 18.5832 15.8932C16.9798 16.9645 15.7301 18.4873 14.9922 20.2688C14.2542 22.0504 14.0611 24.0108 14.4373 25.9021C14.8136 27.7935 15.7422 29.5307 17.1057 30.8943C18.4693 32.2579 20.2066 33.1865 22.0979 33.5627C23.9892 33.9389 25.9496 33.7458 27.7312 33.0078C29.5127 32.2699 31.0355 31.0202 32.1068 29.4168C33.1782 27.8134 33.75 25.9284 33.75 24C33.75 21.4141 32.7228 18.9342 30.8943 17.1057C29.0658 15.2772 26.5859 14.25 24 14.25Z"
              fill="white"
            />
            <path
              d="M27.18 28.245L23.4675 24.5325C23.398 24.4624 23.343 24.3793 23.3057 24.2879C23.2684 24.1966 23.2494 24.0987 23.25 24V18H24.75V23.6925L28.245 27.18L27.18 28.245Z"
              fill="white"
            />
            <path
              d="M16.6929 21.1895V20.0425H18.4946V18.2407H19.6504V20.0425H21.4521V21.1895H19.6504V23H18.4946V21.1895H16.6929Z"
              fill="white"
            />
          </svg>
        </nuxt-link>

        <nuxt-link
          :to="{
            name: 'admin-users-history-excrehistory-id___uz',
            params: { id: user.uid },
          }"
          class="debtor-sum flex justify-between rounded-xl px-4 py-4 bg-white mb-10"
        >
          <div class="text">
            <h1 class="text-xl font-normal text-t_bl mb-3">
              {{ $t("result.muddat") }} ( {{ $t("result.kreditor") }})
            </h1>
            <h2
              v-if="expiredCreditorUzs != null"
              class="text-xl font-semibold text-t_gr"
            >
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
            <h2
              v-if="expiredCreditorUsd != null"
              class="text-xl font-semibold text-t_gr mb-1"
            >
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
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z"
              fill="#3182CE"
            />
            <rect width="48" height="48" rx="8" fill="#3182CE" />
            <path
              d="M24 35.25C21.775 35.25 19.5999 34.5902 17.7498 33.354C15.8998 32.1179 14.4578 30.3609 13.6064 28.3052C12.7549 26.2495 12.5321 23.9875 12.9662 21.8052C13.4003 19.623 14.4717 17.6184 16.0451 16.0451C17.6184 14.4717 19.623 13.4003 21.8052 12.9662C23.9875 12.5321 26.2495 12.7549 28.3052 13.6064C30.3609 14.4578 32.1179 15.8998 33.354 17.7498C34.5902 19.5999 35.25 21.775 35.25 24C35.25 26.9837 34.0647 29.8452 31.955 31.955C29.8452 34.0647 26.9837 35.25 24 35.25ZM24 14.25C22.0716 14.25 20.1866 14.8218 18.5832 15.8932C16.9798 16.9645 15.7301 18.4873 14.9922 20.2688C14.2542 22.0504 14.0611 24.0108 14.4373 25.9021C14.8136 27.7935 15.7422 29.5307 17.1057 30.8943C18.4693 32.2579 20.2066 33.1865 22.0979 33.5627C23.9892 33.9389 25.9496 33.7458 27.7312 33.0078C29.5127 32.2699 31.0355 31.0202 32.1068 29.4168C33.1782 27.8134 33.75 25.9284 33.75 24C33.75 21.4141 32.7228 18.9342 30.8943 17.1057C29.0658 15.2772 26.5859 14.25 24 14.25Z"
              fill="white"
            />
            <path
              d="M27.18 28.245L23.4675 24.5325C23.398 24.4624 23.343 24.3793 23.3057 24.2879C23.2684 24.1966 23.2494 24.0987 23.25 24V18H24.75V23.6925L28.245 27.18L27.18 28.245Z"
              fill="white"
            />
            <line x1="17" y1="20.5" x2="21" y2="20.5" stroke="white" />
          </svg>
        </nuxt-link>
      </div>

      <div
        class="grid gap-5 grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-x-8 mt-4 items-stretch self-stretch"
      >
        <div class="debitor w-full rounded-xl px-4 py-4 bg-white mb-10">
          <h1 class="text-xl font-normal text-t_bl border-b-2">
            {{ $t("result.ozmuddat") }} ( {{ $t("result.debitor") }})
          </h1>
          <div class="flex items-center justify-between">
            <div
              style="cursor: pointer"
              @click="handleTab('left', 1)"
              :class="[
                tabLeft == 1
                  ? 'flex w-full text-white bg-blue-400 rounded py-1 m-2 justify-center'
                  : 'flex w-full  rounded py-1 m-2 justify-center',
              ]"
            >
              <span style=""> UZS </span>
            </div>
            <div
              style="cursor: pointer"
              @click="handleTab('left', 2)"
              :class="[
                tabLeft == 2
                  ? 'flex w-full text-white bg-blue-400 rounded py-1 m-2 justify-center'
                  : 'flex w-full  rounded py-1 m-2 justify-center',
              ]"
            >
              <span style=""> USD </span>
            </div>
          </div>
          <table class="divide-y-2 w-full">
            <thead class="bg-t_grayy py-1 flex items-center">
              <th class="w-1/2 text-sm">{{ $t("result.vaqt") }}</th>
              <th class="w-1/2 text-sm">{{ $t("result.SUMMA") }}</th>
            </thead>
            <tbody>
              <tr
                v-for="(item, i) in debitorData"
                :key="i"
                class="text-center py-1 flex items-center"
              >
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
          <div
            class="flex justify-center items-center py-4"
            v-if="debitorData.length === 0"
          >
            {{ $t("result.malumot") }}
          </div>
        </div>
        <div class="debitor w-full rounded-xl px-4 py-4 bg-white mb-10">
          <h1 class="text-xl font-normal text-t_bl border-b-2">
            {{ $t("result.ozmuddat") }} ( {{ $t("result.kreditor") }})
          </h1>
          <div class="flex items-center justify-between">
            <div
              style="cursor: pointer"
              @click="handleTab('right', 1)"
              :class="[
                tabRight == 1
                  ? 'flex w-full text-white bg-blue-400 rounded py-1 m-2 justify-center'
                  : 'flex w-full  rounded py-1 m-2 justify-center',
              ]"
              class="flex w-full items-center justify-center"
            >
              <span style="">UZS</span>
            </div>
            <div
              style="cursor: pointer"
              @click="handleTab('right', 2)"
              :class="[
                tabRight == 2
                  ? 'flex w-full text-white bg-blue-400 rounded py-1 m-2 justify-center'
                  : 'flex w-full  rounded py-1 m-2 justify-center',
              ]"
            >
              <span>USD</span>
            </div>
          </div>
          <table class="divide-y-2 w-full">
            <thead class="bg-t_grayy py-1 flex items-center">
              <th class="w-1/2 text-sm">{{ $t("result.vaqt") }}</th>
              <th class="w-1/2 text-sm">{{ $t("result.SUMMA") }}</th>
            </thead>

            <tbody>
              <tr
                v-for="(item, i) in creditorData"
                :key="i"
                class="text-center flex items-center py-1"
              >
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
          <div
            class="flex justify-center items-center py-4"
            v-if="creditorData.length === 0"
          >
            {{ $t("result.malumot") }}
          </div>
        </div>
      </div>
      <div
        class="grid gap-5 grid-cols-1 lg:grid-cols-2 md:grid-cols-2 items-stretch gap-x-8 mt-2 items-stretch self-stretch"
      >
        <nuxt-link
          :to="{
            name: 'admin-users-history-debitor-hisobot-id___' + $i18n.locale,
            params: { id: user.uid },
          }"
          class="shadow debtor flex bg-white justify-between items-center w-full rounded-xl p-4 h-full"
        >
          <div class="text">
            <h1 class="text-xl font-normal text-t_bl">
              {{ $t("home.reportD") }}
            </h1>
          </div>

          <div class="iconn">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z"
                fill="#3182CE"
              />
              <rect width="48" height="48" rx="8" fill="#3182CE" />
              <path
                d="M19.9443 11C19.2748 11 18.6729 11.1739 18.2525 11.5934C17.8321 12.0128 17.6601 12.6135 17.6601 13.2809V20.6638C15.7451 20.9392 14.2643 22.5889 14.2643 24.578C14.2643 25.6988 14.7358 26.7131 15.4887 27.4357H15.0997C14.0199 27.4357 13.1327 28.3229 13.1327 29.4027C13.1327 29.7421 13.2275 30.0577 13.3813 30.3376C12.5864 30.5905 12 31.3306 12 32.2051C12 33.0841 12.5923 33.8269 13.3935 34.076C13.2322 34.3609 13.1327 34.6848 13.1327 35.033C13.1327 36.1128 14.0199 37 15.0997 37H21.277C22.2555 37 23.0677 36.2694 23.2131 35.3292H33.4814C34.1493 35.3292 34.7481 35.1566 35.1677 34.7401C35.5874 34.3239 35.7656 33.7249 35.7656 33.0648V13.8279C35.7644 13.6571 35.6859 13.4957 35.5523 13.3891L32.7211 11.126C32.6217 11.0458 32.4974 11.001 32.3697 11.0001L19.9443 11ZM19.9443 12.1316H30.6701V14.9594C30.669 15.2736 30.9239 15.5286 31.2381 15.5275H34.634V33.0648C34.634 33.5363 34.525 33.7883 34.3743 33.9379C34.2235 34.0874 33.9637 34.1976 33.4814 34.1976H23.0485C22.813 33.7035 22.3793 33.3264 21.8506 33.1621C22.012 32.8771 22.1125 32.5535 22.1125 32.2051C22.1125 31.8657 22.0165 31.5501 21.8627 31.2702C22.658 31.0175 23.2441 30.2774 23.2441 29.4027C23.2441 28.3229 22.3568 27.4357 21.277 27.4357H20.9577C21.7106 26.7131 22.1832 25.6989 22.1832 24.578C22.1832 22.5908 20.704 20.9427 18.7917 20.6649V13.2809C18.7917 12.7993 18.8993 12.5464 19.0503 12.3957C19.2014 12.245 19.4597 12.1316 19.9443 12.1316ZM31.8017 12.1316H32.1697L34.634 14.103V14.3959H31.8017V12.1316ZM20.4869 13.8279C19.7154 13.8105 19.7154 14.9768 20.4869 14.9594H24.8353C25.6069 14.9768 25.6069 13.8105 24.8353 13.8279H20.4869ZM20.4869 16.0911C19.7318 16.0911 19.7318 17.2237 20.4869 17.2237H26.1471C26.9022 17.2237 26.9022 16.0911 26.1471 16.0911H20.4869ZM20.4869 18.3553C19.7486 18.3709 19.7486 19.471 20.4869 19.4869H31.8017C32.5725 19.5042 32.5725 18.3387 31.8017 18.3553H20.4869ZM28.9738 21.1832C28.2023 21.1658 28.2023 22.3321 28.9738 22.3148H29.1661L25.7702 25.2841C25.202 25.7828 25.9501 26.6348 26.5184 26.1361L30.1065 22.9977V23.4464C30.1065 24.201 31.2381 24.201 31.2381 23.4464V21.8109C31.2752 21.4737 31.0093 21.1799 30.6701 21.1832H28.9738ZM18.2237 21.7512C19.7928 21.7512 21.0516 23.0089 21.0516 24.578C21.0516 26.1471 19.7928 27.4102 18.2237 27.4102C16.6546 27.4102 15.3959 26.1471 15.3959 24.578C15.3959 23.0089 16.6546 21.7512 18.2237 21.7512ZM17.6469 22.8784C17.5003 22.8818 17.3612 22.9444 17.259 23.0497L16.1274 24.178C15.5307 24.7081 16.3908 25.573 16.9242 24.9792L18.0569 23.8476C18.4225 23.488 18.1596 22.8664 17.6469 22.8784ZM19.9112 23.4419C19.7642 23.4454 19.6247 23.5079 19.5222 23.6133L17.259 25.8776C16.6401 26.4077 17.5267 27.2943 18.0569 26.6754L20.32 24.4155C20.6933 24.0568 20.4287 23.4266 19.9112 23.4419ZM29.5373 26.2786V30.8017H28.4058V27.9749C28.4052 27.6637 28.1533 27.4115 27.8422 27.4102H25.5941C25.2701 27.4102 25.0142 27.642 25.0142 27.9749V30.8017H23.8826C23.1111 30.7843 23.1111 31.9506 23.8826 31.9333C26.9005 31.935 29.9172 31.9333 32.9331 31.9333C33.7046 31.9506 33.7046 30.7843 32.9331 30.8017V26.2786C32.9342 25.9662 32.682 25.7119 32.3695 25.7106H30.0727C29.672 25.7106 29.5373 26.0154 29.5373 26.2786ZM30.6701 26.8422H31.8017V30.8017H30.6701V26.8422ZM26.1471 28.5418H27.2787V30.8017H26.1471V28.5418ZM15.0997 28.5674H21.277C21.7495 28.5674 22.1125 28.9303 22.1125 29.4028C22.1125 29.8753 21.7495 30.2382 21.277 30.2382H20.1443H15.0997C14.6272 30.2382 14.2643 29.8753 14.2643 29.4028C14.2643 28.9303 14.6272 28.5674 15.0997 28.5674ZM13.9681 31.3698H20.1443C20.6168 31.3698 20.9798 31.7327 20.9798 32.2052C20.9798 32.6777 20.6168 33.0406 20.1443 33.0406H13.9681C13.4956 33.0406 13.1327 32.6777 13.1327 32.2052C13.1327 31.7327 13.4956 31.3698 13.9681 31.3698ZM15.0997 34.1976H21.277C21.7495 34.1976 22.1125 34.5606 22.1125 35.0331C22.1125 35.5055 21.7495 35.8685 21.277 35.8685H15.0997C14.6272 35.8685 14.2643 35.5055 14.2643 35.0331C14.2643 34.5606 14.6272 34.1976 15.0997 34.1976Z"
                fill="white"
              />
              <path
                d="M9.69287 12.1895V11.0425H11.4946V9.24072H12.6504V11.0425H14.4521V12.1895H12.6504V14H11.4946V12.1895H9.69287Z"
                fill="white"
              />
            </svg>
          </div>
        </nuxt-link>
        <nuxt-link
        :to="{
            name: 'admin-users-history-creditor-hisobot-id___' + $i18n.locale,
            params: { id: user.uid },
          }"
          class="shadow debtor flex bg-white justify-between items-center w-full rounded-xl p-4 h-full"
        >
          <div class="text">
            <h1 class="text-xl font-normal text-t_bl">
              {{ $t("home.reportC") }}
            </h1>
          </div>
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z"
              fill="#3182CE"
            />
            <rect width="48" height="48" rx="8" fill="#3182CE" />
            <path
              d="M19.9443 11C19.2748 11 18.6729 11.1739 18.2525 11.5934C17.8321 12.0128 17.6601 12.6135 17.6601 13.2809V20.6638C15.7451 20.9392 14.2643 22.5889 14.2643 24.578C14.2643 25.6988 14.7358 26.7131 15.4887 27.4357H15.0997C14.0199 27.4357 13.1327 28.3229 13.1327 29.4027C13.1327 29.7421 13.2275 30.0577 13.3813 30.3376C12.5864 30.5905 12 31.3306 12 32.2051C12 33.0841 12.5923 33.8269 13.3935 34.076C13.2322 34.3609 13.1327 34.6848 13.1327 35.033C13.1327 36.1128 14.0199 37 15.0997 37H21.277C22.2555 37 23.0677 36.2694 23.2131 35.3292H33.4814C34.1493 35.3292 34.7481 35.1566 35.1677 34.7401C35.5874 34.3239 35.7656 33.7249 35.7656 33.0648V13.8279C35.7644 13.6571 35.6859 13.4957 35.5523 13.3891L32.7211 11.126C32.6217 11.0458 32.4974 11.001 32.3697 11.0001L19.9443 11ZM19.9443 12.1316H30.6701V14.9594C30.669 15.2736 30.9239 15.5286 31.2381 15.5275H34.634V33.0648C34.634 33.5363 34.525 33.7883 34.3743 33.9379C34.2235 34.0874 33.9637 34.1976 33.4814 34.1976H23.0485C22.813 33.7035 22.3793 33.3264 21.8506 33.1621C22.012 32.8771 22.1125 32.5535 22.1125 32.2051C22.1125 31.8657 22.0165 31.5501 21.8627 31.2702C22.658 31.0175 23.2441 30.2774 23.2441 29.4027C23.2441 28.3229 22.3568 27.4357 21.277 27.4357H20.9577C21.7106 26.7131 22.1832 25.6989 22.1832 24.578C22.1832 22.5908 20.704 20.9427 18.7917 20.6649V13.2809C18.7917 12.7993 18.8993 12.5464 19.0503 12.3957C19.2014 12.245 19.4597 12.1316 19.9443 12.1316ZM31.8017 12.1316H32.1697L34.634 14.103V14.3959H31.8017V12.1316ZM20.4869 13.8279C19.7154 13.8105 19.7154 14.9768 20.4869 14.9594H24.8353C25.6069 14.9768 25.6069 13.8105 24.8353 13.8279H20.4869ZM20.4869 16.0911C19.7318 16.0911 19.7318 17.2237 20.4869 17.2237H26.1471C26.9022 17.2237 26.9022 16.0911 26.1471 16.0911H20.4869ZM20.4869 18.3553C19.7486 18.3709 19.7486 19.471 20.4869 19.4869H31.8017C32.5725 19.5042 32.5725 18.3387 31.8017 18.3553H20.4869ZM28.9738 21.1832C28.2023 21.1658 28.2023 22.3321 28.9738 22.3148H29.1661L25.7702 25.2841C25.202 25.7828 25.9501 26.6348 26.5184 26.1361L30.1065 22.9977V23.4464C30.1065 24.201 31.2381 24.201 31.2381 23.4464V21.8109C31.2752 21.4737 31.0093 21.1799 30.6701 21.1832H28.9738ZM18.2237 21.7512C19.7928 21.7512 21.0516 23.0089 21.0516 24.578C21.0516 26.1471 19.7928 27.4102 18.2237 27.4102C16.6546 27.4102 15.3959 26.1471 15.3959 24.578C15.3959 23.0089 16.6546 21.7512 18.2237 21.7512ZM17.6469 22.8784C17.5003 22.8818 17.3612 22.9444 17.259 23.0497L16.1274 24.178C15.5307 24.7081 16.3908 25.573 16.9242 24.9792L18.0569 23.8476C18.4225 23.488 18.1596 22.8664 17.6469 22.8784ZM19.9112 23.4419C19.7642 23.4454 19.6247 23.5079 19.5222 23.6133L17.259 25.8776C16.6401 26.4077 17.5267 27.2943 18.0569 26.6754L20.32 24.4155C20.6933 24.0568 20.4287 23.4266 19.9112 23.4419ZM29.5373 26.2786V30.8017H28.4058V27.9749C28.4052 27.6637 28.1533 27.4115 27.8422 27.4102H25.5941C25.2701 27.4102 25.0142 27.642 25.0142 27.9749V30.8017H23.8826C23.1111 30.7843 23.1111 31.9506 23.8826 31.9333C26.9005 31.935 29.9172 31.9333 32.9331 31.9333C33.7046 31.9506 33.7046 30.7843 32.9331 30.8017V26.2786C32.9342 25.9662 32.682 25.7119 32.3695 25.7106H30.0727C29.672 25.7106 29.5373 26.0154 29.5373 26.2786ZM30.6701 26.8422H31.8017V30.8017H30.6701V26.8422ZM26.1471 28.5418H27.2787V30.8017H26.1471V28.5418ZM15.0997 28.5674H21.277C21.7495 28.5674 22.1125 28.9303 22.1125 29.4028C22.1125 29.8753 21.7495 30.2382 21.277 30.2382H20.1443H15.0997C14.6272 30.2382 14.2643 29.8753 14.2643 29.4028C14.2643 28.9303 14.6272 28.5674 15.0997 28.5674ZM13.9681 31.3698H20.1443C20.6168 31.3698 20.9798 31.7327 20.9798 32.2052C20.9798 32.6777 20.6168 33.0406 20.1443 33.0406H13.9681C13.4956 33.0406 13.1327 32.6777 13.1327 32.2052C13.1327 31.7327 13.4956 31.3698 13.9681 31.3698ZM15.0997 34.1976H21.277C21.7495 34.1976 22.1125 34.5606 22.1125 35.0331C22.1125 35.5055 21.7495 35.8685 21.277 35.8685H15.0997C14.6272 35.8685 14.2643 35.5055 14.2643 35.0331C14.2643 34.5606 14.6272 34.1976 15.0997 34.1976Z"
              fill="white"
            />
            <line x1="9" y1="10.5" x2="14" y2="10.5" stroke="white" />
          </svg>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import dateformat from "dateformat";
export default {
  middleware: "auth",
  layout: "admin",
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
  async created() {},
  async mounted() {
    const cree = await this.$axios.get(
      `/user/candidate/${this.$route.params.id}`
    );
    this.user = cree.data.data;
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
  //
  beforeDestroy() {
    if (this.countDown) {
      clearInterval(this.countDown);
    }
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
        return "<span class='text-red-500'>Bugun</span>";
      }
      const fixedNumber = restTimeMillisec / (24 * 60 * 60 * 1000).toFixed(2);

      if (Math.ceil(fixedNumber) > 1 && Math.ceil(fixedNumber) < 4) {
        return `<span class='text-red-500'>${Math.ceil(fixedNumber).toFixed(
          0
        )} kun</span>`;
      }
      if (Math.ceil(fixedNumber) > 3) {
        return `${Math.ceil(fixedNumber).toFixed(0)} kun`;
      }
      if (fixedNumber < 1 && fixedNumber > 0) {
        return "<span class='text-red-500' > 1 kun</span>";
      }
    },
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
    div.debtor {
      padding: 20px 23px;
    }
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

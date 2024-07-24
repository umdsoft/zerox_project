<template>
  <div class="bg-white height">
    <h2 class="devices">{{ $t("action.a19") }}</h2>
    <br />
    <div class="seans">
      <h6>Hozirgi seans</h6>
    </div>
    <br /><br />
    <div class="desktop">
      <svg
        class="icon1"
        width="79"
        height="79"
        viewBox="0 0 79 79"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="79" height="79" rx="39.5" fill="#3182CE" />
        <g clip-path="url(#clip0_254_25077)">
          <path
            d="M59.5555 51.5008C59.0761 51.5008 58.6875 51.1122 58.6875 50.6329V26.2583C58.6838 25.9802 58.6249 25.7056 58.5141 25.4505C58.4034 25.1954 58.243 24.9648 58.0424 24.7722C57.8418 24.5796 57.6049 24.4288 57.3455 24.3286C57.086 24.2283 56.8093 24.1806 56.5313 24.1883H23.4688C23.1908 24.1806 22.914 24.2283 22.6546 24.3286C22.3952 24.4288 22.1583 24.5796 21.9576 24.7722C21.757 24.9648 21.5967 25.1954 21.4859 25.4505C21.3752 25.7056 21.3162 25.9802 21.3125 26.2583V50.6329C21.3125 51.1122 20.9239 51.5008 20.4446 51.5008H17.6325C17.2832 51.5008 17 51.784 17 52.1333C16.9961 53.0956 17.3707 54.0209 18.0431 54.7094C18.7155 55.3979 19.6316 55.7944 20.5938 55.8133H59.4063C60.3684 55.7944 61.2846 55.3979 61.957 54.7094C62.6293 54.0209 63.004 53.0956 63 52.1333C63 51.784 62.7169 51.5008 62.3675 51.5008H59.5555ZM22.75 26.2583C22.7536 26.1688 22.7753 26.081 22.8137 26.0002C22.8522 25.9194 22.9067 25.8472 22.9739 25.7881C23.0411 25.7289 23.1196 25.6841 23.2047 25.6562C23.2898 25.6283 23.3796 25.6179 23.4688 25.6258H56.5313C56.6205 25.6179 56.7103 25.6283 56.7954 25.6562C56.8804 25.6841 56.9589 25.7289 57.0261 25.7881C57.0933 25.8472 57.1478 25.9194 57.1863 26.0002C57.2248 26.081 57.2465 26.1688 57.25 26.2583V50.6329C57.25 51.1122 56.8614 51.5008 56.3821 51.5008H23.618C23.1386 51.5008 22.75 51.1122 22.75 50.6329V26.2583ZM20.5938 54.3758C20.1551 54.3503 19.7325 54.202 19.3741 53.9479C18.8688 53.5895 19.2497 52.9383 19.8691 52.9383H36.4063C36.8032 52.9383 37.125 53.2601 37.125 53.657C37.125 54.054 36.8032 54.3758 36.4063 54.3758H20.5938ZM59.4063 54.3758H43.5938C43.1968 54.3758 42.875 54.054 42.875 53.657C42.875 53.2601 43.1968 52.9383 43.5938 52.9383H60.131C60.7504 52.9383 61.1312 53.5895 60.626 53.9479C60.2676 54.202 59.8449 54.3503 59.4063 54.3758Z"
            fill="white"
          />
          <path
            d="M24.1875 49.1946C24.1875 49.6739 24.5761 50.0625 25.0554 50.0625H54.9446C55.4239 50.0625 55.8125 49.6739 55.8125 49.1946V27.9304C55.8125 27.4511 55.4239 27.0625 54.9446 27.0625H25.0554C24.5761 27.0625 24.1875 27.4511 24.1875 27.9304V49.1946ZM25.625 29.3679C25.625 28.8886 26.0136 28.5 26.4929 28.5H53.5071C53.9864 28.5 54.375 28.8886 54.375 29.3679V47.7571C54.375 48.2364 53.9864 48.625 53.5071 48.625H26.4929C26.0136 48.625 25.625 48.2364 25.625 47.7571V29.3679Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_254_25077">
            <rect
              width="46"
              height="46"
              fill="white"
              transform="translate(17 17)"
            />
          </clipPath>
        </defs>
      </svg>
      <div v-if="userData != null">
        <p>
          <b>IP: {{ userData.ip }}</b> <br />
          ZeroX Web ({{ browserName }} {{ fullVersion }})<br />
          <b>{{ userData.city }},{{ userData.country_name }}</b>
        </p>
      </div>
    </div>
    <br /><br /><br />
    <div class="icon2">
      <a class="active" href="#">{{ $t("action.a20") }};</a>
      <svg
    
        class="hand"
        width="23"
        height="27"
        viewBox="0 0 23 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.0107 26.7032C10.8787 26.7032 8.04366 25.1372 6.63966 22.6262C6.47766 22.3562 6.01866 21.6542 5.50566 20.8442C3.96666 18.4412 3.04866 16.9832 2.88666 16.6592C2.56266 16.0652 2.21166 15.5792 1.88766 15.3092C1.45566 14.9582 1.18566 14.4992 0.942657 14.0942C0.726657 13.7162 0.645657 12.8252 1.05066 12.1502C1.34766 11.6372 1.88766 11.3402 2.48166 11.3402C3.34566 11.3402 4.31766 11.6642 5.07366 12.1772C5.58666 12.5282 6.23466 13.0682 6.88266 13.9322V5.67022C6.88266 4.37422 7.93566 3.29422 9.25866 3.29422C9.79866 3.29422 10.3117 3.48322 10.6897 3.78022V2.70022C10.6897 1.40422 11.7427 0.324219 13.0657 0.324219C14.3617 0.324219 15.4417 1.37722 15.4417 2.70022V2.83522C15.7927 2.56522 16.2247 2.43022 16.6837 2.43022C17.8717 2.43022 18.8437 3.40222 18.8437 4.59022V5.99422C19.1947 5.75122 19.6267 5.61622 20.0857 5.61622C21.2737 5.61622 22.2457 6.58822 22.2457 7.77622V19.3592C21.7867 25.8662 17.6017 26.7032 14.0107 26.7032ZM2.13066 13.4462C2.29266 13.7162 2.45466 14.0132 2.72466 14.2292C3.21066 14.6072 3.66966 15.2282 4.07466 16.0112C4.23666 16.3352 5.80266 18.7922 6.63966 20.1152C7.17966 20.9522 7.61166 21.6542 7.77366 21.9242L7.80066 21.9512C8.96166 24.0572 11.3377 25.3532 14.0107 25.3532C17.3587 25.3532 20.4907 24.6242 20.8687 19.2782V7.77622C20.8687 7.31722 20.5177 6.96622 20.0587 6.96622C19.5997 6.96622 19.2487 7.31722 19.2487 7.77622V13.0682C19.2487 13.5542 18.8437 13.9592 18.3577 13.9592C17.8717 13.9592 17.4667 13.5542 17.4667 13.0682V4.59022C17.4667 4.13122 17.1157 3.78022 16.6567 3.78022C16.1977 3.78022 15.8467 4.13122 15.8467 4.59022V12.2042C15.8467 12.6902 15.4417 13.0952 14.9557 13.0952C14.4697 13.0952 14.0647 12.6902 14.0647 12.2042V2.67322C14.0647 2.10622 13.6057 1.64722 13.0387 1.64722C12.4717 1.64722 12.0127 2.10622 12.0127 2.67322V12.2042C12.0127 12.6902 11.6077 13.0952 11.1217 13.0952C10.6357 13.0952 10.2307 12.6902 10.2307 12.2042V5.64322C10.2307 5.07622 9.77166 4.61722 9.20466 4.61722C8.63766 4.61722 8.25966 5.07622 8.25966 5.64322V15.0122C8.25966 15.2012 8.25966 15.3362 8.25966 15.4712V16.4702L7.47666 16.3352C7.01766 16.2542 6.61266 15.9842 6.36966 15.5522C5.69466 14.3642 4.88466 13.6622 4.34466 13.2842C3.80466 12.9062 3.07566 12.6632 2.50866 12.6632C2.31966 12.6632 2.26566 12.7442 2.21166 12.7982C2.07666 13.0142 2.10366 13.3382 2.13066 13.4462Z"
          fill="#3182CE"
        />
      </svg>
    </div>

    <a class="exit-device"> </a>
    <br /><br /><br />
    <br />

    <h6 class="activ_seans">{{ $t("action.a18") }}</h6>
    <br />
    <div v-if="devices != null">
      <div class="mobile1" v-for="(item,i) in devices" :key="i">
        <br />
        <svg
        v-if="item.device == 'pc'"
        class="icon1"
        width="79"
        height="79"
        viewBox="0 0 79 79"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="79" height="79" rx="39.5" fill="#3182CE" />
        <g clip-path="url(#clip0_254_25077)">
          <path
            d="M59.5555 51.5008C59.0761 51.5008 58.6875 51.1122 58.6875 50.6329V26.2583C58.6838 25.9802 58.6249 25.7056 58.5141 25.4505C58.4034 25.1954 58.243 24.9648 58.0424 24.7722C57.8418 24.5796 57.6049 24.4288 57.3455 24.3286C57.086 24.2283 56.8093 24.1806 56.5313 24.1883H23.4688C23.1908 24.1806 22.914 24.2283 22.6546 24.3286C22.3952 24.4288 22.1583 24.5796 21.9576 24.7722C21.757 24.9648 21.5967 25.1954 21.4859 25.4505C21.3752 25.7056 21.3162 25.9802 21.3125 26.2583V50.6329C21.3125 51.1122 20.9239 51.5008 20.4446 51.5008H17.6325C17.2832 51.5008 17 51.784 17 52.1333C16.9961 53.0956 17.3707 54.0209 18.0431 54.7094C18.7155 55.3979 19.6316 55.7944 20.5938 55.8133H59.4063C60.3684 55.7944 61.2846 55.3979 61.957 54.7094C62.6293 54.0209 63.004 53.0956 63 52.1333C63 51.784 62.7169 51.5008 62.3675 51.5008H59.5555ZM22.75 26.2583C22.7536 26.1688 22.7753 26.081 22.8137 26.0002C22.8522 25.9194 22.9067 25.8472 22.9739 25.7881C23.0411 25.7289 23.1196 25.6841 23.2047 25.6562C23.2898 25.6283 23.3796 25.6179 23.4688 25.6258H56.5313C56.6205 25.6179 56.7103 25.6283 56.7954 25.6562C56.8804 25.6841 56.9589 25.7289 57.0261 25.7881C57.0933 25.8472 57.1478 25.9194 57.1863 26.0002C57.2248 26.081 57.2465 26.1688 57.25 26.2583V50.6329C57.25 51.1122 56.8614 51.5008 56.3821 51.5008H23.618C23.1386 51.5008 22.75 51.1122 22.75 50.6329V26.2583ZM20.5938 54.3758C20.1551 54.3503 19.7325 54.202 19.3741 53.9479C18.8688 53.5895 19.2497 52.9383 19.8691 52.9383H36.4063C36.8032 52.9383 37.125 53.2601 37.125 53.657C37.125 54.054 36.8032 54.3758 36.4063 54.3758H20.5938ZM59.4063 54.3758H43.5938C43.1968 54.3758 42.875 54.054 42.875 53.657C42.875 53.2601 43.1968 52.9383 43.5938 52.9383H60.131C60.7504 52.9383 61.1312 53.5895 60.626 53.9479C60.2676 54.202 59.8449 54.3503 59.4063 54.3758Z"
            fill="white"
          />
          <path
            d="M24.1875 49.1946C24.1875 49.6739 24.5761 50.0625 25.0554 50.0625H54.9446C55.4239 50.0625 55.8125 49.6739 55.8125 49.1946V27.9304C55.8125 27.4511 55.4239 27.0625 54.9446 27.0625H25.0554C24.5761 27.0625 24.1875 27.4511 24.1875 27.9304V49.1946ZM25.625 29.3679C25.625 28.8886 26.0136 28.5 26.4929 28.5H53.5071C53.9864 28.5 54.375 28.8886 54.375 29.3679V47.7571C54.375 48.2364 53.9864 48.625 53.5071 48.625H26.4929C26.0136 48.625 25.625 48.2364 25.625 47.7571V29.3679Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_254_25077">
            <rect
              width="46"
              height="46"
              fill="white"
              transform="translate(17 17)"
            />
          </clipPath>
        </defs>
      </svg>
      <svg
      v-if="item.device != 'pc'"
        class="icon3"
        width="79"
        height="79"
        viewBox="0 0 79 79"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="79" height="79" rx="39.5" fill="#3182CE" />
        <path
          d="M45.6172 25H33.3828C32.7218 25 32.0879 25.2626 31.6206 25.7299C31.1532 26.1973 30.8906 26.8312 30.8906 27.4922V51.5078C30.8906 52.1688 31.1532 52.8027 31.6206 53.2701C32.0879 53.7374 32.7218 54 33.3828 54H45.6172C46.2782 54 46.9121 53.7374 47.3794 53.2701C47.8468 52.8027 48.1094 52.1688 48.1094 51.5078V27.4922C48.1094 26.8312 47.8468 26.1973 47.3794 25.7299C46.9121 25.2626 46.2782 25 45.6172 25V25ZM32.25 30.1407H46.75V47.5611H32.25V30.1407ZM33.3828 26.3594H45.6172C45.766 26.3594 45.9133 26.3887 46.0507 26.4456C46.1881 26.5025 46.313 26.586 46.4182 26.6912C46.5234 26.7964 46.6068 26.9212 46.6638 27.0587C46.7207 27.1961 46.75 27.3434 46.75 27.4922V28.7813H32.25V27.4922C32.25 27.1917 32.3693 26.9036 32.5818 26.6912C32.7942 26.4787 33.0824 26.3594 33.3828 26.3594ZM45.6172 52.6406H33.3828C33.0824 52.6406 32.7942 52.5213 32.5818 52.3088C32.3693 52.0964 32.25 51.8083 32.25 51.5078V48.9205H46.75V51.5078C46.75 51.6566 46.7207 51.8039 46.6638 51.9413C46.6068 52.0788 46.5234 52.2036 46.4182 52.3088C46.313 52.414 46.1881 52.4975 46.0507 52.5544C45.9133 52.6113 45.766 52.6406 45.6172 52.6406Z"
          fill="white"
        />
        <path
          d="M39.5 52.168C40.2508 52.168 40.8594 51.5594 40.8594 50.8086C40.8594 50.0578 40.2508 49.4492 39.5 49.4492C38.7492 49.4492 38.1406 50.0578 38.1406 50.8086C38.1406 51.5594 38.7492 52.168 39.5 52.168Z"
          fill="white"
        />
        <path
          d="M37.7168 28.2207H41.2852C41.4654 28.2207 41.6383 28.1491 41.7658 28.0216C41.8932 27.8942 41.9648 27.7213 41.9648 27.541C41.9648 27.3608 41.8932 27.1879 41.7658 27.0604C41.6383 26.9329 41.4654 26.8613 41.2852 26.8613H37.7168C37.5365 26.8613 37.3637 26.9329 37.2362 27.0604C37.1087 27.1879 37.0371 27.3608 37.0371 27.541C37.0371 27.7213 37.1087 27.8942 37.2362 28.0216C37.3637 28.1491 37.5365 28.2207 37.7168 28.2207Z"
          fill="white"
        />
      </svg>
      <br /><br />
      <p>
        <b>IP: {{ item.ip }}</b> <br />
        ZeroX Web ({{ item.version }})<br />
        {{ item.location }}
      </p>
      
    </div>
    
    </div>
  
   
  </div>
</template>

<script>
export default {
  middleware: "auth",
  data: () => ({
    userData: null,
    browserName: null,
    devices:null,
    fullVersion: null,
  }),
  methods: {
    async getSockNot() {
      this.socket.emit(
        "active_sessions",
        { userId: this.$auth.user.id },
        (data) => {}
      );
    },
  },
  async mounted() {
    this.socket = this.$nuxtSocket({
      name: "home", // Use socket "home"
      channel: "/", // connect to '/index',
      secure: true,
    });

    // this.socket.on("active_sessions", (data) => {
    //   if (data.pps == this.$auth.user.id) {
    //     this.dds.amount = data.pps1;
    //     this.dds.not = data.pps2;
    //   }
    //   console.log("dds", data);
    // });
    if (this.$auth.user.is_active == 1 && this.$auth.user.is_contract == 0) {
      this.$router.push({name:'universal_contract___'+ $i18n.locale});
    }
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    this.browserName = navigator.appName;
    this.fullVersion = "" + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;

    // In Opera, the true version is after "Opera" or after "Version"
    if ((verOffset = nAgt.indexOf("Opera")) != -1) {
      this.browserName = "Opera";
      this.fullVersion = nAgt.substring(verOffset + 6);
      if ((verOffset = nAgt.indexOf("Version")) != -1)
        this.fullVersion = nAgt.substring(verOffset + 8);
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
      this.browserName = "Microsoft Internet Explorer";
      this.fullVersion = nAgt.substring(verOffset + 5);
    }
    // In Chrome, the true version is after "Chrome"
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
      this.browserName = "Chrome";
      this.fullVersion = nAgt.substring(verOffset + 7);
    }
    // In Safari, the true version is after "Safari" or after "Version"
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
      this.browserName = "Safari";
      this.fullVersion = nAgt.substring(verOffset + 7);
      if ((verOffset = nAgt.indexOf("Version")) != -1)
        this.fullVersion = nAgt.substring(verOffset + 8);
    }
    // In Firefox, the true version is after "Firefox"
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
      this.browserName = "Firefox";
      this.fullVersion = nAgt.substring(verOffset + 8);
    }
    // In most other browsers, "name/version" is at the end of userAgent
    else if (
      (nameOffset = nAgt.lastIndexOf(" ") + 1) <
      (verOffset = nAgt.lastIndexOf("/"))
    ) {
      this.browserName = nAgt.substring(nameOffset, verOffset);
      this.fullVersion = nAgt.substring(verOffset + 1);
      if (browserName.toLowerCase() == browserName.toUpperCase()) {
        this.browserName = navigator.appName;
      }
    }
    // trim the fullVersion string at semicolon/space if present
    if ((ix = this.fullVersion.indexOf(";")) != -1)
      this.fullVersion = this.fullVersion.substring(0, ix);
    if ((ix = this.fullVersion.indexOf(" ")) != -1)
      this.fullVersion = this.fullVersion.substring(0, ix);

    majorVersion = parseInt("" + this.fullVersion, 10);
    if (isNaN(majorVersion)) {
      this.fullVersion = "" + parseFloat(navigator.appVersion);
      this.majorVersion = parseInt(navigator.appVersion, 10);
    }
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      if (data) {
        this.userData = data;
      }
      this.socket.emit("active_sessions", {
        user_id: this.$auth.user.id,
        ip: data.ip,
        location: `${data.city} ${data.country_name}`,
        device: "pc",
        version: `${this.browserName} ${this.fullVersion}`,
      });
      this.socket.on("active_sessions", (data) => {
        let sok = []
        data.forEach(elem => {
          if(elem.user_id == this.$auth.user.id){
            sok.push(elem)
          }
        });
        this.devices = sok
        // console.log("active_data", data);
      });
      // console.log("d", this.userData);
    } catch (e) {
      console.log(e);
    }
  },
};
</script>

<style scoped>
.height {
  padding-bottom: 5%;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}
.devices {
  font-size: 22px;
  color: black;
  font-weight: 600;
  padding-top: 70px;
  text-align: center;
}
.seans {
  display: flex;
  justify-content: space-around;
  padding-top: 10px;
  font-size: 15px;
}
.desktop {
  display: flex;
  align-items: center;
}
.icon1 {
  margin-left: 10%;
  margin-right: 30px;
}
p {
  font-size: 15px;
  letter-spacing: 1px;
  line-height: 25px;
}
.mobile1 {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
}
.icon2 {
  display: flex;
  vertical-align: text-top;

  /* align-items: center; */
}
a {
  display: inline-block;
  margin-top: 5px;
  margin-left: 10%;
  font-size: 15px;
  padding: 3px;
}
.active {
  color: rgb(79, 147, 211);
}
a:hover {
  cursor: pointer;
  color: rgb(79, 147, 211);
}
.hand {
  width: 22px;
}
.activ_seans {
  display: inline-block;
  margin-left: 10%;
  font-size: 15px;
}
.mobile2 {
  display: flex;
}
.icon3 {
  margin-left: 10%;
  margin-top: 25px;
  margin-right: 30px;
}
.exit-device {
  font-size: 15px;
  display: inline-block;
  margin-left: 10%;
}
</style>

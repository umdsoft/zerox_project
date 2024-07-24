<template>
  <div class="acts">
    <div class="pagebreak">
      <div class="box qarz">
        <div class="content-title">
          <h2 class="font-bold">Д А Л О Л А Т Н О М А</h2>

          <p>
            ( <span>{{ contract.number }}</span> -сонли қарз шартномасининг
            муддатини узайтириш тўғрисида )
          </p>
        </div>
        <div class="content-body">
          <p>
            Биз қуйида Имзо қўювчилар,
            <span
              >{{ contract.debitor.last_name }}
              {{ contract.debitor.first_name }}
              {{ contract.debitor.middle_name }}</span
            >
            (паспорт:
            <span
              >{{ contract.debitor.passport }}.
              {{ contract.debitor.issued_date }}</span
            >
            йилда <b>{{ contract.debitor.issued_by }} </b> томонидан берилган)
            бир томондан ва
            <span>
              {{ contract.creditor.last_name }}
              {{ contract.creditor.first_name }}
              {{ contract.creditor.middle_name }}
            </span>
            (паспорт:
            <span
              ><b> {{ contract.creditor.issued_date }}</b
              >.</span
            >
            <b> {{ contract.creditor.issued_by }}</b>
            томонидан берилган) иккинчи томондан, ушбу далолатномани қуйидагилар
            ҳақида туздилар:
          </p>
          <p>
            <span
              >{{ contract.debitor.last_name }}
              {{ contract.debitor.first_name }}
              {{ contract.debitor.middle_name }}</span
            >
            ва
            <span>
              {{ contract.creditor.last_name }}
              {{ contract.creditor.first_name }}
              {{ contract.creditor.middle_name }}</span
            >
            ўртасида тузилган <span>{{ contract.number }}</span> - сонли қарз
            шартномасининг муддати
            <span> {{ dateFormat(act.end_date) }}</span> йилгача узайтирилди.
          </p>
          <p>
            <span>{{ contract.number }}</span> - сонли қарз шартномасининг янги
            муддати сифатида <span> {{ dateFormat(act.end_date) }}</span> йил
            белгиланди.
          </p>
          <p>
            Мазкур далолатнома махсус электон имзо орқали тасдиқланган ҳолда
            электрон тарзда тузилди.
          </p>
          <p>
            Далолатнома икки томоннинг “ZeroX” дастуридаги шахсий кабинетида
            сақланади.
          </p>
          <p>
            Махсус электрон имзо орқали тасдиқланган Далолатноманинг сақланишини
            Жамият ўз зиммасига олади.
          </p>
        </div>
      </div>

      <div class="box qarz">
        <div class="content-title">
          <h2>5.Томонларнинг реквизитлари</h2>
        </div>
        <div class="content-body">
          <div class="flex">
            <div class="rekvizit">
              <div class="rek-title">
                <h2>Қарз берувчи (дебитор):</h2>
                <h2>
                  {{ contract.debitor.first_name }}
                  {{ contract.debitor.last_name }}
                  {{ contract.debitor.middle_name }}
                </h2>
              </div>
              <div class="rek-body">
                <h2>Махсус электрон имзо:</h2>
                <h2 class="mt-4">
                  <Vqr
                    :text="contract.debitor.uid"
                    :logo="logo"
                    qrcodeColor="#2D62B6"
                    backgroundColor="#ffffffff"
                    :size="160"
                    :logoSize="30"
                    :margin="10"
                    :ratio="1"
                    level="M"
                  />
                </h2>
              </div>
              <div class="rek-body">
                <h2>
                  Сана: <span>{{ dateFormat(act.createdAt) }}</span> йил
                </h2>
              </div>
            </div>
            <div class="rekvizit">
              <div class="rek-title">
                <h2>Қарз олувчи (кредитор):</h2>
                <h2>
                  {{ contract.creditor.first_name }}
                  {{ contract.creditor.last_name }}
                  {{ contract.creditor.middle_name }}
                </h2>
              </div>
              <div class="rek-body">
                <h2>Махсус электрон имзо:</h2>
                <h2 class="mt-4">
                  <Vqr
                    :text="contract.creditor.uid"
                    :logo="logo"
                    qrcodeColor="#2D62B6"
                    backgroundColor="#ffffffff"
                    :size="160"
                    :logoSize="30"
                    :margin="10"
                    :ratio="1"
                    level="M"
                  />
                </h2>
              </div>
              <div class="rek-body">
                <h2>
                  Сана: <span>{{ dateFormat(act.updatedAt) }}</span> йил
                </h2>
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
import Vqr from "v-qr";
export default {
  props: ["act", "contract"],
  components: {
    Vqr,
  },
  data: () => ({
    logo: null,
  }),
  mounted() {
    this.logo =
      "data:image/png;base64,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";
  },
  methods: {
    dateFormat(date) {
      let date1 = dateformat(date, "isoDate");
      date1 = date1.split("-").reverse();
      date1 = date1.join(".");
      return date1;
    },
  },
};
</script>

<style lang="scss" scoped>
.qr-code {
  width: 180px;
  position: relative;
}

.qr-code-image {
  position: absolute;
  background-color: rgb(252, 249, 249);
  border-radius: 0.25rem;
  z-index: 50000;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}
.pdf {
  width: 250px;
  height: 250px;
  box-shadow: 0px 4px 10px 3px rgba(0, 0, 0, 0.11);
  border-radius: 67px;
  background: #ffffff;
}

.container {
  width: 8.5in;
  min-height: 11in;
  padding: 2rem 3rem;
  margin: 0 auto;
  margin-top: 2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
}

.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content-title {
  text-align: center;
}
.qarz {
  margin: 20px 0;
}
.qarz .content-title {
  margin-bottom: 20px;
}
.qarz span {
  color: black;
  font-weight: 600;
}
.content-body p {
  font-size: 14px;
  text-align: justify;
  word-break: break-word;
  text-indent: 50px;
}
.qarz ul li p {
  font-size: 14px;
}
.rekvizit {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.rek-title {
  margin-bottom: 10px;
  text-align: center;
}
.rek-body {
  margin-bottom: 10px;
}
.rek-title h2:last-child {
  color: black;
  font-weight: 600;
}
</style>>


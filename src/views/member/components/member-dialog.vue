<template>
  <el-dialog
    v-model="dialogVisible"
    title="会员充值"
    width="25%"
    :close-on-click-modal="false"
    :close-on-press-escape="true"
    :before-close="
      () => {
        dialogVisible = false;
      }
    "
    draggable
  >
    <div class="dialog-content">
      <el-form ref="formRef" :model="form" label-width="100px" :rules="rules" style="margin-top: 25px">
        <el-form-item label="充值金额" prop="amount">
          <el-input v-model="form.amount" type="number" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" v-debounce="onConfirm">充值</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup name="memberDialog">
import { Member } from "@/api/interface/member";
import { ElMessage, FormInstance, FormRules } from "element-plus";

const dialogVisible = ref(false);
const form = reactive({
  amount: ""
});

const rules = reactive<FormRules>({
  amount: [
    { required: true, message: "请输入充值金额", trigger: "blur" },
    { min: 1, message: "充值金额不能小于1元", trigger: "blur" }
  ]
});

interface DialogProps {
  row: Member.MemberList | {};
  api?: (params: any) => Promise<any>;
  getTableList?: () => void;
}

const formRef = ref<FormInstance>();
const dialogrProps = ref();
// 接收父组件传过来的参数
const acceptParams = (params: DialogProps) => {
  dialogrProps.value = params;
  dialogVisible.value = true;
};

const onConfirm = (): void => {
  formRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      const data = await dialogrProps.value.api({
        userId: dialogrProps.value.row.userId,
        amount: form.amount
      });
      ElMessage({
        message: data.msg,
        type: "success"
      });
      dialogVisible.value = false;
      dialogrProps.value.getTableList();
    } catch (error) {
      console.error(error);
    }
  });
};

defineExpose({
  acceptParams
});
</script>
<style lang="scss" scoped>
.el-dialog__footer {
  border-top: 1px solid #ebeef5;
}
</style>

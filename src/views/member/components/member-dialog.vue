<template>
  <el-dialog
    v-model="dialogVisible"
    :title="dialogrProps?.title"
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
        <el-form-item :label="`${dialogrProps?.title === '会员充值' ? '充值' : '扣款'}金额`" prop="amount">
          <el-input v-model="form.amount" type="number" />
        </el-form-item>
        <el-form-item label="扣款描述" prop="description">
          <el-input v-model="form.description" type="textarea" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" v-debounce="onConfirm">{{ dialogrProps?.title === "会员充值" ? "充值" : "扣款" }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup name="memberDialog">
import { Member } from "@/api/interface/member";
import { ElMessage, FormInstance, FormRules } from "element-plus";

const dialogVisible = ref(false);
const form = reactive({
  amount: "",
  description: ""
});

const rules = reactive<FormRules>({
  amount: [
    { required: true, message: "请输入金额", trigger: "blur" },
    { min: 1, message: "金额不能小于1元", trigger: "blur" }
  ]
});

interface DialogProps {
  title: string;
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
      let params = {};
      if (dialogrProps.value.title === "会员扣款") {
        params = { userId: dialogrProps.value.row.userId, amount: form.amount, description: form.description };
      } else {
        params = { userId: dialogrProps.value.row.userId, amount: form.amount };
      }
      const data = await dialogrProps.value.api(params);
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

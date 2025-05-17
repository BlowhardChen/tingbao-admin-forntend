<template>
  <div class="upload-box">
    <el-upload
      :id="uuid"
      action="#"
      :class="['upload', self_disabled ? 'disabled' : '', drag ? 'no-border' : '']"
      :multiple="false"
      :disabled="self_disabled"
      :show-file-list="false"
      :on-change="handleImgUpload"
      :drag="drag"
      :accept="fileType.join(',')"
      :auto-upload="false"
    >
      <template v-if="imageUrl">
        <img :src="devImgUrl" class="upload-image" />
        <div class="upload-handle" @click.stop>
          <div v-if="!self_disabled" class="handle-icon" @click="editImg">
            <el-icon><Edit /></el-icon>
            <span>编辑</span>
          </div>
          <div class="handle-icon" @click="imgViewVisible = true">
            <el-icon><ZoomIn /></el-icon>
            <span>查看</span>
          </div>
          <div v-if="!self_disabled" class="handle-icon" @click="deleteImg">
            <el-icon><Delete /></el-icon>
            <span>删除</span>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="upload-empty">
          <slot name="empty">
            <el-icon><Plus /></el-icon>
          </slot>
        </div>
      </template>
    </el-upload>
    <div class="el-upload__tip">
      <slot name="tip"></slot>
    </div>
    <el-image-viewer v-if="imgViewVisible" :url-list="[imageUrl]" @close="imgViewVisible = false" />
  </div>
</template>

<script setup lang="ts" name="uploadImg">
import { ref, computed, inject } from "vue";
import { generateUUID } from "@/utils";
import { ElNotification, formContextKey } from "element-plus";
import type { UploadFile } from "element-plus";

interface UploadFileProps {
  imageUrl: string;
  drag?: boolean;
  disabled?: boolean;
  fileSize?: number;
  fileType?: File.ImageMimeType[];
  height?: string;
  width?: string;
  borderRadius?: string;
}

const props = withDefaults(defineProps<UploadFileProps>(), {
  imageUrl: "",
  drag: true,
  disabled: false,
  fileSize: 5,
  fileType: () => ["image/jpeg", "image/png", "image/gif"],
  height: "150px",
  width: "150px",
  borderRadius: "8px"
});

const devImgUrl = ref(props.imageUrl);
const uuid = ref("id-" + generateUUID());
const imgViewVisible = ref(false);
const formContext = inject(formContextKey, void 0);
const self_disabled = computed(() => props.disabled || formContext?.disabled);

interface UploadEmits {
  (e: "updateImageUrl", value: string): void;
  (e: "select", file: File): void;
}
const emit = defineEmits<UploadEmits>();

/**
 * @description 删除图片
 */
const deleteImg = () => {
  emit("updateImageUrl", "");
};

/**
 * @description 编辑图片
 */
const editImg = () => {
  const dom = document.querySelector(`#${uuid.value} .el-upload__input`);
  dom && dom.dispatchEvent(new MouseEvent("click"));
};

/**
 * @description 文件上传前校验并将文件传递给父组件
 */
const handleImgUpload = (rawFile: UploadFile | any) => {
  const isImage = props.fileType.includes(rawFile.raw.type as File.ImageMimeType);
  const isLtSize = rawFile.size / 1024 / 1024 < props.fileSize;

  if (!isImage) {
    ElNotification.warning({ title: "格式错误", message: "仅支持图片类型文件" });
    return false;
  }
  if (!isLtSize) {
    ElNotification.warning({ title: "大小限制", message: `不能超过 ${props.fileSize}MB` });
    return false;
  }

  // 创建本地预览 URL
  devImgUrl.value = URL.createObjectURL(rawFile.raw);
  emit("updateImageUrl", devImgUrl.value);
  emit("select", rawFile.raw); // 通知父组件
  return false; // 阻止默认上传
};
</script>

<style scoped lang="scss">
.is-error {
  .upload {
    :deep(.el-upload),
    :deep(.el-upload-dragger) {
      border: 1px dashed var(--el-color-danger) !important;
      &:hover {
        border-color: var(--el-color-primary) !important;
      }
    }
  }
}
:deep(.disabled) {
  .el-upload,
  .el-upload-dragger {
    cursor: not-allowed !important;
    background: var(--el-disabled-bg-color);
    border: 1px dashed var(--el-border-color-darker) !important;
    &:hover {
      border: 1px dashed var(--el-border-color-darker) !important;
    }
  }
}
.upload-box {
  .no-border {
    :deep(.el-upload) {
      border: none !important;
    }
  }
  :deep(.upload) {
    .el-upload {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: v-bind(width);
      height: v-bind(height);
      overflow: hidden;
      border: 1px dashed var(--el-border-color-darker);
      border-radius: v-bind(borderRadius);
      transition: var(--el-transition-duration-fast);
      &:hover {
        border-color: var(--el-color-primary);
        .upload-handle {
          opacity: 1;
        }
      }
      .el-upload-dragger {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        padding: 0;
        overflow: hidden;
        background-color: transparent;
        border: 1px dashed var(--el-border-color-darker);
        border-radius: v-bind(borderRadius);
        &:hover {
          border: 1px dashed var(--el-color-primary);
        }
      }
      .el-upload-dragger.is-dragover {
        background-color: var(--el-color-primary-light-9);
        border: 2px dashed var(--el-color-primary) !important;
      }
      .upload-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      .upload-empty {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        line-height: 30px;
        color: var(--el-color-info);
        .el-icon {
          font-size: 28px;
          color: var(--el-text-color-secondary);
        }
      }
      .upload-handle {
        position: absolute;
        top: 0;
        right: 0;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        cursor: pointer;
        background: rgb(0 0 0 / 60%);
        opacity: 0;
        transition: var(--el-transition-duration-fast);
        .handle-icon {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 6%;
          color: aliceblue;
          .el-icon {
            margin-bottom: 40%;
            font-size: 130%;
            line-height: 130%;
          }
          span {
            font-size: 85%;
            line-height: 85%;
          }
        }
      }
    }
  }
  .el-upload__tip {
    line-height: 18px;
    text-align: center;
  }
}
</style>

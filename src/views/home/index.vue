<template>
  <div>
    <el-row :gutter="20" class="mgb20">
      <el-col :span="18">
        <el-card shadow="hover">
          <div class="card-header">
            <p class="card-header-title">订单动态</p>
            <p class="card-header-desc">最近一周预约订单状态</p>
          </div>
          <v-chart class="chart" :option="orderOptions" />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="card-header">
            <p class="card-header-title">预约项目分类</p>
            <p class="card-header-desc">最近一个月预约项目的分类情况</p>
          </div>
          <v-chart class="chart" :option="projectOptions" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { graphic, use } from "echarts/core";
import { BarChart, LineChart, PieChart, MapChart } from "echarts/charts";
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent, VisualMapComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import VChart from "vue-echarts";

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  LineChart,
  PieChart,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent,
  MapChart
]);

const orderOptions = {
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周天"]
  },
  yAxis: {
    type: "value"
  },
  grid: {
    top: "2%",
    left: "2%",
    right: "3%",
    bottom: "2%",
    containLabel: true
  },
  color: ["#009688", "#f44336"],
  series: [
    {
      type: "line",
      areaStyle: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgba(0, 150, 136,0.8)"
          },
          {
            offset: 1,
            color: "rgba(0, 150, 136,0.2)"
          }
        ])
      },
      smooth: true,
      data: [120, 132, 301, 134, 90, 230, 210]
    }
  ]
};

const projectOptions = {
  legend: {
    bottom: "1%",
    left: "center"
  },
  color: ["#3f51b5", "#009688", "#f44336"],
  series: [
    {
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2
      },
      data: [
        { value: 1048, name: "手部美甲" },
        { value: 735, name: "足部美甲" },
        { value: 580, name: "美睫" }
      ]
    }
  ]
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 665px;
}
.card-header {
  padding-left: 10px;
  margin-bottom: 20px;
}
.card-header-title {
  margin-bottom: 5px;
  font-size: 18px;
  font-weight: bold;
}
.card-header-desc {
  font-size: 14px;
  color: #999999;
}
</style>
